import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { inquiries, auditLogs } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { verifyAdminSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  const session = await verifyAdminSession(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const list = await db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt));

    return NextResponse.json({
      success: true,
      inquiries: list,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const session = await verifyAdminSession(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Inquiry ID and status are required" },
        { status: 400 }
      );
    }

    // Fetch before state
    const beforeResult = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
    const before = beforeResult[0];

    if (!before) {
      return NextResponse.json(
        { success: false, error: "Inquiry not found" },
        { status: 404 }
      );
    }

    // Update status
    await db
      .update(inquiries)
      .set({ 
        status, 
        updatedAt: new Date().toISOString() 
      })
      .where(eq(inquiries.id, id));

    // Audit logging
    const after = { ...before, status };
    const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await db.insert(auditLogs).values({
      id: logId,
      actorUserId: session.userId as string,
      action: "inquiry_status_update",
      entityType: "inquiries",
      entityId: id,
      beforeJson: JSON.stringify(before),
      afterJson: JSON.stringify(after),
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
      userAgent: request.headers.get("user-agent") || "unknown",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry status updated successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update inquiry status" },
      { status: 500 }
    );
  }
}
