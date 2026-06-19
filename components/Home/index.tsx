"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, Calculator, HardHat, Compass, CheckCircle, Shield, Building, Layers, Sparkles 
} from "lucide-react";
import Hero from "./Hero";

interface FeaturedProduct {
  name: string;
  slug: string;
  category: string;
  description: string;
  packaging: string;
  coverage: string;
  image: string;
}

export default function Home() {
  // Calculator states
  const [calcType, setCalcType] = useState<"adhesive" | "block" | "waterproof">("adhesive");
  const [area, setArea] = useState<number>(1000);
  const [thickness, setThickness] = useState<string>("3mm"); // for adhesive
  const [blockWidth, setBlockWidth] = useState<string>("150mm"); // for block joining
  const [coats, setCoats] = useState<number>(2); // for waterproofing

  const featuredProducts: FeaturedProduct[] = [
    {
      name: "Tile Grip Premium",
      slug: "tile-grip-premium",
      category: "Tile Adhesives",
      description: "High performance polymer modified tile adhesive for large vitrified tiles, granite, and marble.",
      packaging: "20 Kg bag",
      coverage: "Approx. 45-55 sq. ft. per bag",
      image: "https://res.cloudinary.com/dmohmgbut/image/upload/q_auto/f_auto/v1781852144/2._Tile_Grip_Premium_ranlb2.png"
    },
    {
      name: "Block Fix",
      slug: "block-fix",
      category: "Block Joining",
      description: "High strength polymer modified thin-bed mortar for AAC blocks. Replaces conventional site mortar.",
      packaging: "40 Kg bag",
      coverage: "Approx. 120-140 sq. ft. per bag",
      image: "https://res.cloudinary.com/dmohmgbut/image/upload/q_auto/f_auto/v1781850504/BLOCK_FIX_ycpmsh.png"
    },
    {
      name: "EP Epoxy Grout",
      slug: "ep-epoxy-grout",
      category: "Grouts & Anchoring",
      description: "Stain-free, water-resistant three-component epoxy grout for pools, kitchens, and labs.",
      packaging: "5 Kg kit",
      coverage: "Varies by joint sizing",
      image: "https://res.cloudinary.com/dmohmgbut/image/upload/q_auto/f_auto/v1781852247/ARKAGUARD_WPL_x9zp5o.png" // placeholder for grout
    },
    {
      name: "Arkacoat FX",
      slug: "arkacoat-fx",
      category: "Waterproofing",
      description: "Two-component flexible acrylic-polymer modified waterproofing slurry for bathrooms & tanks.",
      packaging: "20 Kg kit",
      coverage: "Approx. 120-140 sq. ft. per kit",
      image: "https://res.cloudinary.com/dmohmgbut/image/upload/q_auto/f_auto/v1781852247/ARKAGUARD_WPL_x9zp5o.png"
    }
  ];

  // Material calculation formulas
  const getCalculatedBags = () => {
    if (calcType === "adhesive") {
      // 20kg bag covers ~50 sq ft at 3mm and ~25 sq ft at 6mm
      const divisor = thickness === "3mm" ? 50 : 25;
      const bags = Math.ceil(area / divisor);
      return {
        unit: "Bags",
        quantity: bags,
        pkgSize: "20 Kg",
        productName: "Tile Grip (Classic/Premium)"
      };
    } else if (calcType === "block") {
      // 40kg bag covers ~130 sq ft at 100mm, ~100 sq ft at 150mm, and ~75 sq ft at 200mm wall thickness
      let coveragePerBag = 100;
      if (blockWidth === "100mm") coveragePerBag = 130;
      if (blockWidth === "200mm") coveragePerBag = 75;
      const bags = Math.ceil(area / coveragePerBag);
      return {
        unit: "Bags",
        quantity: bags,
        pkgSize: "40 Kg",
        productName: "Block Fix Mortar"
      };
    } else {
      // 20kg kit covers ~130 sq ft in 2 coats, ~260 sq ft in 1 coat
      const divisor = coats === 2 ? 130 : 260;
      const kits = Math.ceil(area / divisor);
      return {
        unit: "Kits",
        quantity: kits,
        pkgSize: "20 Kg",
        productName: "Arkacoat FX Waterproofing"
      };
    }
  };

  const estimation = getCalculatedBags();

  return (
    <div className="bg-white text-brand-charcoal min-h-screen">
      {/* Hero Slider */}
      <Hero />

      {/* Slogan Banner */}
      <section className="bg-stone-50 border-y border-stone-200/60 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono font-bold text-stone-400 uppercase tracking-widest">Official Brand Motto</p>
          <div className="text-center md:text-right">
            <span className="text-lg font-black text-brand-deep tracking-wider block sm:inline italic">
              &quot;Your Strength, Our Priority&quot;
            </span>
            <span className="hidden sm:inline text-stone-300 mx-3">|</span>
            <span className="text-xs font-bold text-brand-orange tracking-widest uppercase block sm:inline">
              Innovation at Work. Excellence in Every Structure.
            </span>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">Our Offerings</h2>
            <p className="text-3xl font-extrabold text-brand-deep sm:text-4xl">Engineered Construction Solutions</p>
            <p className="text-stone-500 text-xs mt-3 leading-relaxed">
              Explore our laboratory-formulated ranges designed to support challenging masonry, tiling, and structural environments.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { 
                title: "Tile Adhesives", 
                slug: "tile-adhesives", 
                icon: Layers, 
                desc: "Polymer-modified cementitious tile binders for vitrified tiles and heavy marbles." 
              },
              { 
                title: "Block Joining", 
                slug: "block-joining", 
                icon: Building, 
                desc: " AAC block mortars offering thin-bed bonding and high thermal insulation compatibility." 
              },
              { 
                title: "Grouts & Anchoring", 
                slug: "grouts-anchoring", 
                icon: Compass, 
                desc: "Epoxy and cement joint fillers, machine foundation grouts, and rock anchoring bolts." 
              },
              { 
                title: "Repair Mortars", 
                slug: "repair-products", 
                icon: HardHat, 
                desc: "Thixotropic patch repair systems, overhead mortars, and non-shrink micro-concretes." 
              },
              { 
                title: "Waterproofing", 
                slug: "waterproofing", 
                icon: Shield, 
                desc: "Acrylic flexible slurries, SBR bonding additives, and active integral compounds." 
              }
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/category/${cat.slug}`}
                className="group relative flex flex-col justify-between bg-stone-50 p-6 rounded-2xl border border-stone-200/50 hover:border-brand-orange/30 hover:bg-stone-50/80 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <div>
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange group-hover:scale-105 transition-transform">
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-brand-deep mb-2">{cat.title}</h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed">{cat.desc}</p>
                </div>
                <div className="pt-4 flex items-center text-[10px] font-bold text-brand-orange uppercase tracking-wider gap-1">
                  View Catalog
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 md:px-12 bg-stone-50 border-y border-stone-200/50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
            <div className="max-w-md">
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">Top Formulations</h2>
              <p className="text-3xl font-extrabold text-brand-deep">Featured Products</p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-brand-brown"
            >
              View Full Catalog
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid gap-8 gap-y-24 sm:grid-cols-2 lg:grid-cols-4 pt-20">
            {featuredProducts.map((prod) => (
              <div
                key={prod.slug}
                className="group relative flex flex-col justify-between bg-gradient-to-b from-white to-stone-50/40 rounded-2xl border border-stone-200/50 shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(232,101,26,0.12)] hover:border-brand-orange/20 transition-all duration-500 ease-out pt-16 pb-6 px-6"
              >
                {/* Top orange accent hairline that expands on hover */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-16 bg-[#E8651A] rounded-b-md transition-all duration-500" />

                {/* 3D Floating Product Mockup & Shadow Podium */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[140px] h-[140px] flex items-center justify-center pointer-events-none">
                  {/* Backdrop radial orange aura on hover */}
                  <div className="absolute w-24 h-24 rounded-full bg-[#E8651A]/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  
                  {/* Floating animation wrapper with physical shadow podium */}
                  <div className="relative w-full h-full transition-all duration-500 ease-out transform group-hover:-translate-y-5 group-hover:scale-[1.12]">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.14)] group-hover:drop-shadow-[0_25px_30px_rgba(232,101,26,0.32)] transition-all duration-500"
                    />
                    
                    {/* Shadow podium under package */}
                    <div className="w-16 h-1 bg-stone-300/35 rounded-full blur-[1px] absolute -bottom-1 left-1/2 -translate-x-1/2 scale-x-75 group-hover:scale-x-110 group-hover:bg-[#E8651A]/20 transition-all duration-500" />
                  </div>
                </div>

                {/* Card Information */}
                <div className="flex-1 flex flex-col justify-between mt-6">
                  <div className="space-y-4 text-center">
                    {/* Eyebrow badge with quality indicator dot */}
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E8651A] animate-pulse" />
                      <span className="text-[9px] font-mono font-extrabold uppercase tracking-[0.16em] text-[#E8651A]">
                        {prod.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-brand-deep group-hover:text-brand-orange transition-colors duration-300">
                      {prod.name}
                    </h3>
                    
                    <p className="text-stone-500 text-[11.5px] leading-relaxed line-clamp-3 h-[52px]">
                      {prod.description}
                    </p>
                    
                    {/* Specifications Technical Dashboard */}
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-left">
                      <div className="flex-1 min-w-0">
                        <span className="block text-[8px] font-mono font-bold uppercase tracking-wider text-stone-400">Packaging</span>
                        <span className="font-sans text-[11px] font-bold text-stone-700 truncate block mt-0.5">{prod.packaging}</span>
                      </div>
                      <div className="w-px h-6 bg-stone-200/60 mx-3 shrink-0" />
                      <div className="flex-1 min-w-0 text-right">
                        <span className="block text-[8px] font-mono font-bold uppercase tracking-wider text-stone-400">Coverage</span>
                        <span className="font-sans text-[11px] font-bold text-stone-700 truncate block mt-0.5" title={prod.coverage}>{prod.coverage.replace("Approx. ", "")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <div className="pt-6">
                    <Link
                      href={`/products/${prod.slug}`}
                      className="w-full inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-stone-200/80 bg-stone-50/50 hover:bg-stone-900 group/btn px-4 text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-white transition-all duration-300 shadow-sm"
                    >
                      Technical Specs
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-stone-400 group-hover/btn:text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estimator Panel */}
      <section className="py-24 px-6 md:px-12 bg-brand-deep text-white relative">
        <div className="max-w-4xl mx-auto z-10 relative">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
              <Calculator className="w-3.5 h-3.5" />
              Interactive Tool
            </span>
            <p className="text-3xl font-extrabold sm:text-4xl">Material Quantity Estimator</p>
            <p className="mt-3 text-stone-400 text-xs max-w-md mx-auto leading-relaxed">
              Compute the estimated packaging volume of dry-mortar bags or waterproofing kits required for your structural parameters.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-8 md:p-12 backdrop-blur">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-6">
                {/* Calc Type */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-3 font-mono">Select Application Class</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "adhesive", label: "Tile Adhesive" },
                      { id: "block", label: "AAC Block Fix" },
                      { id: "waterproof", label: "Waterproofing" }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => {
                          setCalcType(btn.id as "adhesive" | "block" | "waterproof");
                          if (btn.id === "block") setArea(500); // defaults
                          else setArea(1000);
                        }}
                        className={`py-2 px-3 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-all ${
                          calcType === btn.id
                            ? "bg-brand-orange/15 border-brand-orange/50 text-brand-orange"
                            : "bg-neutral-900/50 border-neutral-800 text-stone-400 hover:border-stone-700"
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Range Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">Surface Area Coverage</label>
                    <span className="text-xs font-mono font-bold text-brand-orange">{area.toLocaleString()} Sq. Ft.</span>
                  </div>
                  <input
                    type="range"
                    min={calcType === "block" ? 100 : 250}
                    max={10000}
                    step={calcType === "block" ? 50 : 100}
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                  />
                  <div className="flex justify-between text-[8px] text-stone-500 mt-2 font-mono">
                    <span>{calcType === "block" ? "100 SQ FT" : "250 SQ FT"}</span>
                    <span>10,000 SQ FT</span>
                  </div>
                </div>

                {/* Conditional Parameter */}
                {calcType === "adhesive" && (
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-3 font-mono">Adhesive Bed Thickness</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["3mm", "6mm"].map((thick) => (
                        <button
                          key={thick}
                          onClick={() => setThickness(thick)}
                          className={`py-2 rounded-lg border text-[10px] font-semibold transition-all ${
                            thickness === thick
                              ? "bg-brand-orange/15 border-brand-orange/50 text-brand-orange"
                              : "bg-neutral-900/50 border-neutral-800 text-stone-400"
                          }`}
                        >
                          {thick} thickness ({thick === "3mm" ? "Thin bed" : "Thick bed"})
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {calcType === "block" && (
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-3 font-mono">AAC Block Width / Thickness</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["100mm", "150mm", "200mm"].map((w) => (
                        <button
                          key={w}
                          onClick={() => setBlockWidth(w)}
                          className={`py-2 rounded-lg border text-[10px] font-semibold transition-all ${
                            blockWidth === w
                              ? "bg-brand-orange/15 border-brand-orange/50 text-brand-orange"
                              : "bg-neutral-900/50 border-neutral-800 text-stone-400"
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {calcType === "waterproof" && (
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-3 font-mono">Coats Requested</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2].map((num) => (
                        <button
                          key={num}
                          onClick={() => setCoats(num)}
                          className={`py-2 rounded-lg border text-[10px] font-semibold transition-all ${
                            coats === num
                              ? "bg-brand-orange/15 border-brand-orange/50 text-brand-orange"
                              : "bg-neutral-900/50 border-neutral-800 text-stone-400"
                          }`}
                        >
                          {num} {num === 1 ? "Coat (Priming)" : "Coats (Recommended)"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Estimate Output */}
              <div className="flex flex-col justify-between rounded-2xl bg-neutral-950 border border-neutral-900 p-8 text-center md:text-left">
                <div className="space-y-4">
                  <span className="text-[9px] font-mono tracking-widest text-stone-500 uppercase">Calculated Quantity Required</span>
                  <div className="text-3xl font-extrabold text-white">
                    {estimation.quantity} <span className="text-brand-orange text-lg font-bold uppercase">{estimation.unit}</span>
                  </div>
                  <div className="text-stone-400 text-xs leading-relaxed space-y-1.5 font-sans">
                    <p>Estimated Product: <span className="text-stone-200 font-bold">{estimation.productName}</span></p>
                    <p>Standard Packing: <span className="text-stone-200 font-bold">{estimation.pkgSize} Packaging</span></p>
                    <p className="text-[10px] pt-1 opacity-75">Estimates based on standard flat substrates. Real site requirement varies with substrate levels and wastage indices.</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-900">
                  <Link
                    href={`/contact?inquiry_type=dealer&message=Hi, I would like to get a pricing quote for approximately ${estimation.quantity} ${estimation.unit} of ${estimation.productName}.`}
                    className="w-full inline-flex h-11 items-center justify-center rounded-xl bg-brand-orange text-white font-bold hover:bg-brand-orange/90 transition-all text-xs uppercase tracking-wider"
                  >
                    Request Commercial Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R&D and Quality Commitment */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange border-l-2 border-brand-orange pl-3">
              Advanced Batching Facility
            </h2>
            <h3 className="text-3xl font-black text-brand-deep leading-tight">
              Formulated for Structural Safety & Consistency
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              ARKA CRETE operate under clean industrial systems inside the MSME Green Industrial Park in Dandu Malkapur. Our facility is fitted with automated dry-powder mixers that weigh and blend raw components precisely to avoid batch fluctuations.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Every chemical batch undergoes mechanical checks in our validation laboratory. We measure tensile adhesion values, drying shrinkage limits, open-times, and compressive strength performance to ensure total compatibility with modern structural standards.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-deep bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200/50">
                <CheckCircle className="w-4 h-4 text-brand-orange" />
                BIS Quality Conformance
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-deep bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200/50">
                <CheckCircle className="w-4 h-4 text-brand-orange" />
                Zero-waste dry blending
              </span>
            </div>
          </div>

          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-lg border border-stone-100 bg-brand-deep group">
            <Image
              src="/arka_commercial_bg.png"
              alt="Industrial construction chemicals mixing plant interior"
              fill
              className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Trust & Quality Indicators */}
      <section className="py-20 bg-stone-50 border-t border-stone-200/50 px-6">
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3 text-center">
          <div className="space-y-3 p-6 bg-white rounded-2xl border border-stone-200/40 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange mx-auto">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-brand-deep">Strength Verified</h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              Our tile adhesives and grouts undergo continuous tensile pull-off testing to withstand severe structural stress and thermal shocks.
            </p>
          </div>

          <div className="space-y-3 p-6 bg-white rounded-2xl border border-stone-200/40 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange mx-auto">
              <Building className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-brand-deep">MSME Green Facility</h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              Located in Choutuppal, operating with strict energy efficiency guidelines and clean air dry-batch systems to protect the environment.
            </p>
          </div>

          <div className="space-y-3 p-6 bg-white rounded-2xl border border-stone-200/40 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-brand-deep">Bespoke Formulations</h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              Our in-house chemical engineers design customized polymer blends for specific project demands, including marine and high-vibration sites.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
