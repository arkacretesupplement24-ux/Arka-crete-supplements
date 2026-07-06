import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { settings, auditLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyAdminSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  const session = await verifyAdminSession(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { brochureUrl } = await request.json();
    if (!brochureUrl) {
      return NextResponse.json({ success: false, error: "Brochure URL is required" }, { status: 400 });
    }

    const beforeResult = await db.select().from(settings).where(eq(settings.key, "global_config")).limit(1);
    const before = beforeResult[0];

    const valueJson = JSON.stringify({ brochureUrl });

    if (before) {
      await db.update(settings).set({ valueJson, updatedAt: new Date().toISOString() }).where(eq(settings.key, "global_config"));
    } else {
      const id = `setting-${Date.now()}`;
      await db.insert(settings).values({ id, key: "global_config", valueJson, updatedAt: new Date().toISOString() });
    }

    // Audit Logging
    const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await db.insert(auditLogs).values({
      id: logId,
      actorUserId: session.userId as string,
      action: "settings_update",
      entityType: "settings",
      entityId: "global_config",
      beforeJson: before ? JSON.stringify(before) : null,
      afterJson: valueJson,
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
      userAgent: request.headers.get("user-agent") || "unknown",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Settings updated successfully" });
  } catch (error) {
    console.error("POST Admin Settings Error:", error);
    return NextResponse.json({ success: false, error: "Failed to save settings" }, { status: 500 });
  }
}
export async function GET(request: Request) {
  const session = await verifyAdminSession(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await db.select().from(settings).where(eq(settings.key, "global_config")).limit(1);
    const config = res[0] ? JSON.parse(res[0].valueJson) : { brochureUrl: "/ARKA CRETE_BROCHURE.pdf" };
    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error("GET Admin Settings Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}
