import React from "react";
import ProductDetail from "@/components/ProductDetail";
import { db } from "@/lib/db/client";
import { products } from "@/lib/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const productResult = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  const product = productResult[0];

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} | ARKA CRETE SUPPLEMENTS LLP`,
    description: product.shortDescription || `View details for ${product.name} construction chemical.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch product details on the server
  const productResult = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.isActive, 1)))
    .limit(1);
  const product = productResult[0];

  if (!product) {
    notFound();
  }

  // Fetch related products in the same category (limit to 3)
  const relatedResult = await db
    .select({
      name: products.name,
      slug: products.slug,
      shortDescription: products.shortDescription,
      imageUrl: products.imageUrl,
      packaging: products.packaging
    })
    .from(products)
    .where(
      and(
        eq(products.categoryId, product.categoryId),
        ne(products.id, product.id),
        eq(products.isActive, 1)
      )
    )
    .limit(3);

  return (
    <main>
      <ProductDetail 
        product={product} 
        relatedProducts={relatedResult} 
      />
    </main>
  );
}
