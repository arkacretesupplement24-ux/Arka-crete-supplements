import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { products, auditLogs, productDocuments } from "@/lib/db/schema";
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
      .orderBy(products.sortOrder, desc(products.createdAt));

    const docs = await db.select().from(productDocuments);

    const productsWithDocs = list.map((prod) => {
      const doc = docs.find((d) => d.productId === prod.id);
      return {
        ...prod,
        pdfUrl: doc ? doc.fileUrl : null,
      };
    });

    return NextResponse.json({ success: true, products: productsWithDocs });
  } catch (error) {
    console.error("GET Products Error:", error);
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
      imageUrl,
      galleryImagesJson,
      price,
      sortOrder,
      pdfUrl,
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
      imageUrl: imageUrl || null,
      galleryImagesJson: galleryImagesJson || "[]",
      price: price || null,
      sortOrder: sortOrder !== undefined ? Number(sortOrder) : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.insert(products).values(newProduct);

    if (pdfUrl) {
      const docId = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await db.insert(productDocuments).values({
        id: docId,
        productId: id,
        title: "Technical Datasheet",
        fileUrl: pdfUrl,
        fileType: "pdf",
        sortOrder: 0,
      });
    }

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
    const { id, pdfUrl, features, benefits, specs, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 });
    }

    // Fetch before state
    const beforeResult = await db.select().from(products).where(eq(products.id, id)).limit(1);
    const before = beforeResult[0];

    if (!before) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // Ensure types match schema requirements
    if (updates.isFeatured !== undefined) updates.isFeatured = updates.isFeatured ? 1 : 0;
    if (updates.isActive !== undefined) updates.isActive = updates.isActive ? 1 : 0;
    if (updates.sortOrder !== undefined) updates.sortOrder = Number(updates.sortOrder);

    const updatedProduct = {
      ...before,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await db.update(products).set(updatedProduct).where(eq(products.id, id));

    if (pdfUrl !== undefined) {
      const existingResult = await db
        .select()
        .from(productDocuments)
        .where(eq(productDocuments.productId, id))
        .limit(1);
      const existing = existingResult[0];

      if (pdfUrl) {
        if (existing) {
          await db
            .update(productDocuments)
            .set({ fileUrl: pdfUrl })
            .where(eq(productDocuments.id, existing.id));
        } else {
          const docId = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          await db.insert(productDocuments).values({
            id: docId,
            productId: id,
            title: "Technical Datasheet",
            fileUrl: pdfUrl,
            fileType: "pdf",
            sortOrder: 0,
          });
        }
      } else {
        if (existing) {
          await db.delete(productDocuments).where(eq(productDocuments.id, existing.id));
        }
      }
    }

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

    // Delete associated documents first
    await db.delete(productDocuments).where(eq(productDocuments.productId, id));

    // Hard delete of the product row
    await db.delete(products).where(eq(products.id, id));

    // Audit Logging
    const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await db.insert(auditLogs).values({
      id: logId,
      actorUserId: session.userId as string,
      action: "product_delete",
      entityType: "products",
      entityId: id,
      beforeJson: JSON.stringify(before),
      afterJson: null,
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
      userAgent: request.headers.get("user-agent") || "unknown",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Product Delete Error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
  }
}
