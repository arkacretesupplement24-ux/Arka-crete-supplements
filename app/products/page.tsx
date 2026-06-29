import React from "react";
import ProductsList from "@/components/Products";
import { db } from "@/lib/db/client";
import { products, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Products | ARKA CRETE SUPPLEMENTS LLP",
  description: "Browse our complete catalog of tile adhesives, grouts, waterproofing membranes, repair mortars, block joining additives, and industrial construction chemicals.",
};

export default async function ProductsPage() {
  // Fetch active products and categories on the server
  const allProducts = await db
    .select({
      id: products.id,
      categoryId: products.categoryId,
      name: products.name,
      slug: products.slug,
      shortDescription: products.shortDescription,
      packaging: products.packaging,
      applicationType: products.applicationType,
      isFeatured: products.isFeatured,
      isActive: products.isActive,
      imageUrl: products.imageUrl,
      price: products.price,
      sortOrder: products.sortOrder
    })
    .from(products)
    .where(eq(products.isActive, 1))
    .orderBy(products.sortOrder);

  const allCategories = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug
    })
    .from(categories)
    .where(eq(categories.isActive, 1));

  return (
    <main>
      <ProductsList 
        initialProducts={allProducts} 
        initialCategories={allCategories} 
      />
    </main>
  );
}
