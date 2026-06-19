import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { products, auditLogs } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { verifyAdminSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  const session = await verifyAdminSession(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const list = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));

    return NextResponse.json({ success: true, products: list });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await verifyAdminSession(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      categoryId,
      name,
      slug,
      shortDescription,
      longDescription,
      packaging,
      coverage,
      applicationType,
      productType,
      featuresJson,
      benefitsJson,
      specsJson,
      isFeatured,
      isActive,
      seoTitle,
      seoDescription,
    } = body;

    if (!categoryId || !name || !slug) {
      return NextResponse.json({ success: false, error: "Category, Name, and Slug are required" }, { status: 400 });
    }

    const id = `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newProduct = {
      id,
      categoryId,
      name,
      slug,
      shortDescription: shortDescription || null,
      longDescription: longDescription || null,
      packaging: packaging || null,
      coverage: coverage || null,
      applicationType: applicationType || null,
      productType: productType || null,
      featuresJson: featuresJson || "[]",
      benefitsJson: benefitsJson || "[]",
      specsJson: specsJson || "{}",
      isFeatured: isFeatured ? 1 : 0,
      isActive: isActive ? 1 : 0,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.insert(products).values(newProduct);

    // Audit Logging
    const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await db.insert(auditLogs).values({
      id: logId,
      actorUserId: session.userId as string,
      action: "product_create",
      entityType: "products",
      entityId: id,
      beforeJson: null,
      afterJson: JSON.stringify(newProduct),
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
      userAgent: request.headers.get("user-agent") || "unknown",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Product Create Error:", error);
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await verifyAdminSession(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 });
    }

    // Fetch before state
    const beforeResult = await db.select().from(products).where(eq(products.id, id)).limit(1);
    const before = beforeResult[0];

    if (!before) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    const updatedProduct = {
      ...before,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await db.update(products).set(updatedProduct).where(eq(products.id, id));

    // Audit Logging
    const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await db.insert(auditLogs).values({
      id: logId,
      actorUserId: session.userId as string,
      action: "product_update",
      entityType: "products",
      entityId: id,
      beforeJson: JSON.stringify(before),
      afterJson: JSON.stringify(updatedProduct),
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
      userAgent: request.headers.get("user-agent") || "unknown",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("Product Update Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await verifyAdminSession(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 });
    }

    // Fetch before state
    const beforeResult = await db.select().from(products).where(eq(products.id, id)).limit(1);
    const before = beforeResult[0];

    if (!before) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // Toggle active status (soft delete behavior)
    const newActive = before.isActive === 1 ? 0 : 1;
    await db.update(products).set({ isActive: newActive, updatedAt: new Date().toISOString() }).where(eq(products.id, id));

    // Audit Logging
    const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await db.insert(auditLogs).values({
      id: logId,
      actorUserId: session.userId as string,
      action: newActive === 0 ? "product_deactivate" : "product_activate",
      entityType: "products",
      entityId: id,
      beforeJson: JSON.stringify(before),
      afterJson: JSON.stringify({ ...before, isActive: newActive }),
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
      userAgent: request.headers.get("user-agent") || "unknown",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: `Product ${newActive === 0 ? "deactivated" : "activated"} successfully` });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to toggle product status" }, { status: 500 });
  }
}
