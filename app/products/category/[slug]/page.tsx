import React from "react";
import ProductsList from "@/components/Products";
import { db } from "@/lib/db/client";
import { products, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryResult = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  const category = categoryResult[0];

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} | ARKA CRETE SUPPLEMENTS LLP`,
    description: category.description || `Browse ${category.name} construction supplements.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  // Verify category exists
  const categoryResult = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  const category = categoryResult[0];

  if (!category) {
    notFound();
  }

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
      isActive: products.isActive
    })
    .from(products)
    .where(eq(products.isActive, 1));

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
        activeCategorySlug={slug}
      />
    </main>
  );
}
