import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { settings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const res = await db.select().from(settings).where(eq(settings.key, "global_config")).limit(1);
    const config = res[0] ? JSON.parse(res[0].valueJson) : { brochureUrl: "/ARKA CRETE_BROCHURE.pdf" };
    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error("GET Settings Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch settings" });
  }
}
