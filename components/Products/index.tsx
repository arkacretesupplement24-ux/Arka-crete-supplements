"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Grid, Package, Sparkles } from "lucide-react";

interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  packaging: string | null;
  applicationType: string | null;
  isFeatured: number | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductsListProps {
  initialProducts: Product[];
  initialCategories: Category[];
  activeCategorySlug?: string;
}

export default function ProductsList({
  initialProducts,
  initialCategories,
  activeCategorySlug = "all",
}: ProductsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(activeCategorySlug);

  const filteredProducts = initialProducts.filter((p) => {
    // Category match
    const categoryMatch =
      selectedCategory === "all" ||
      // Match categories by mapping categoryId to slug
      initialCategories.find((cat) => cat.slug === selectedCategory)?.id ===
        initialProducts.find((prod) => prod.id === p.id)?.categoryId;

    // Search query match
    const searchString = `${p.name} ${p.shortDescription || ""} ${p.applicationType || ""}`.toLowerCase();
    const searchMatch = searchString.includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="bg-stone-50 min-h-screen text-brand-charcoal">
      {/* Products Banner */}
      <section className="bg-brand-deep py-20 px-6 text-center text-white relative">
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-4xl font-extrabold sm:text-5xl uppercase tracking-wider">Product Catalog</h1>
          <p className="text-stone-300 text-sm mt-4 max-w-md mx-auto">
            High performance construction chemical solutions engineered for structural strength.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid gap-6 md:flex md:items-center md:justify-between border-b border-stone-200">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
              selectedCategory === "all"
                ? "bg-brand-orange border-brand-orange text-white"
                : "bg-white border-stone-200 text-stone-600 hover:border-brand-orange"
            }`}
          >
            All Products
          </button>
          {initialCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                selectedCategory === cat.slug
                  ? "bg-brand-orange border-brand-orange text-white"
                  : "bg-white border-stone-200 text-stone-600 hover:border-brand-orange"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-stone-200 rounded-lg focus:border-brand-orange/60 focus:outline-none"
          />
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200/60 p-8">
            <Grid className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-brand-deep">No products found</h3>
            <p className="text-stone-400 text-xs mt-2">
              Try adjusting your filters or search keywords.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((prod) => (
              <Link
                href={`/products/${prod.slug}`}
                key={prod.id}
                className="group relative bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm hover:shadow-md hover:border-brand-orange/20 transition-all flex flex-col justify-between"
              >
                {prod.isFeatured === 1 && (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-brand-orange/10 text-brand-orange text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                )}
                <div>
                  <span className="text-[10px] text-stone-400 font-mono tracking-widest uppercase">
                    {prod.applicationType || "Construction Chemical"}
                  </span>
                  <h3 className="text-lg font-bold text-brand-deep mt-2 group-hover:text-brand-orange transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed mt-3 mb-6">
                    {prod.shortDescription}
                  </p>
                </div>

                <div className="border-t border-stone-100 pt-4 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Package className="w-4 h-4 text-brand-orange" />
                    {prod.packaging || "Std Pack"}
                  </span>
                  <span className="font-bold text-brand-orange uppercase tracking-wider group-hover:underline">
                    View Specs &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
