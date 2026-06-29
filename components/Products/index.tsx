"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Grid, Package, Sparkles, SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  packaging: string | null;
  applicationType: string | null;
  isFeatured: number | null;
  imageUrl?: string | null;
  price?: string | null;
  sortOrder?: number | null;
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
  const [sortBy, setSortBy] = useState<"sortOrder" | "name-asc" | "name-desc">("sortOrder");

  const filteredProducts = initialProducts.filter((p) => {
    // Category match
    const categoryMatch =
      selectedCategory === "all" ||
      initialCategories.find((cat) => cat.slug === selectedCategory)?.id === p.categoryId;

    // Search query match
    const searchString = `${p.name} ${p.shortDescription || ""} ${p.applicationType || ""}`.toLowerCase();
    const searchMatch = searchString.includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    const aOrder = a.sortOrder ?? 999;
    const bOrder = b.sortOrder ?? 999;
    return aOrder - bOrder;
  });

  return (
    <div className="bg-stone-50 min-h-screen text-brand-charcoal">
      {/* Products Banner */}
      <section className="bg-brand-deep py-20 px-6 text-center text-white relative">
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-3xl font-normal sm:text-4xl uppercase tracking-wide font-zen">Product Catalog</h1>
          <p className="text-stone-300 text-sm mt-4 max-w-md mx-auto">
            High performance construction chemical solutions engineered for structural strength.
          </p>
        </div>
      </section>

      {/* Filter, Search, and Sort Bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between border-b border-stone-200">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
              selectedCategory === "all"
                ? "bg-brand-orange border-brand-orange text-white shadow-sm"
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
                  ? "bg-brand-orange border-brand-orange text-white shadow-sm"
                  : "bg-white border-stone-200 text-stone-600 hover:border-brand-orange"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search and Sort controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-stone-200 rounded-lg focus:border-brand-orange/60 focus:outline-none"
            />
          </div>

          {/* Sort Selector */}
          <div className="relative w-full sm:w-48">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-stone-200 rounded-lg focus:border-brand-orange/60 focus:outline-none appearance-none font-semibold text-stone-600"
            >
              <option value="sortOrder">Default Order</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200/60 p-8">
            <Grid className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-brand-deep">No products found</h3>
            <p className="text-stone-400 text-xs mt-2">
              Try adjusting your filters or search keywords.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((prod) => (
              <Link
                href={`/products/${prod.slug}`}
                key={prod.id}
                className="group relative bg-white rounded-2xl border border-stone-200/60 shadow-sm hover:shadow-md hover:border-brand-orange/20 transition-all flex flex-col h-[480px] overflow-hidden"
              >
                {/* Product Image Panel (approx 70% height) */}
                <div className="relative h-[325px] w-full overflow-hidden bg-white flex items-center justify-center border-b border-stone-100 p-8">
                  {prod.imageUrl ? (
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 select-none"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-stone-300">
                      <Package className="w-12 h-12 stroke-[1.5]" />
                      <span className="text-[10px] uppercase font-bold tracking-widest mt-2">ARKA Crete</span>
                    </div>
                  )}
                  {prod.isFeatured === 1 && (
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-brand-orange text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm z-10">
                      <Sparkles className="w-2.5 h-2.5" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Product Details Panel (approx 30% height) */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-stone-50/20">
                  <div className="space-y-1">
                    <span className="text-[8px] text-stone-400 font-mono tracking-widest uppercase block">
                      {prod.applicationType || "Construction Chemical"}
                    </span>
                    <h3 className="text-sm font-bold text-brand-deep group-hover:text-brand-orange transition-colors line-clamp-1">
                      {prod.name}
                    </h3>
                    <p className="text-stone-500 text-[11px] leading-relaxed line-clamp-2 pt-0.5">
                      {prod.shortDescription}
                    </p>
                  </div>

                  <div className="border-t border-stone-100 mt-3 pt-3 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="flex items-center gap-1">
                      <Package className="w-3.5 h-3.5 text-brand-orange" />
                      {prod.packaging || "Std Pack"}
                    </span>
                    <span className="font-bold text-brand-orange group-hover:text-brand-orange/80 transition-colors flex items-center gap-0.5">
                      View More &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
