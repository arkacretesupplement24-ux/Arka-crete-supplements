import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { products, categories, inquiries, auditLogs } from "@/lib/db/schema";
import { count, desc } from "drizzle-orm";
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
    // 1. Total products
    const prodCountRes = await db.select({ value: count() }).from(products);
    const prodCount = prodCountRes[0]?.value || 0;

    // 2. Total categories
    const catCountRes = await db.select({ value: count() }).from(categories);
    const catCount = catCountRes[0]?.value || 0;

    // 3. Total inquiries
    const inqCountRes = await db.select({ value: count() }).from(inquiries);
    const inqCount = inqCountRes[0]?.value || 0;

    // 4. Recent inquiries
    const recentInquiries = await db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt))
      .limit(5);

    // 5. Recent audit logs
    const recentLogs = await db
      .select()
      .from(auditLogs)
      .orderBy(desc(auditLogs.createdAt))
      .limit(5);

    return NextResponse.json({
      success: true,
      stats: {
        products: prodCount,
        categories: catCount,
        inquiries: inqCount,
      },
      recentInquiries,
      recentLogs,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard metrics" },
      { status: 500 }
    );
  }
}
