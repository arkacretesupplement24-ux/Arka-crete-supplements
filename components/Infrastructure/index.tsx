"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Cpu, Droplet, TestTube } from "lucide-react";

export default function Infrastructure() {
  return (
    <div className="bg-white text-brand-charcoal">
      {/* Page Header */}
      <section className="bg-brand-deep py-20 px-6 text-center text-white relative">
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-4xl font-extrabold sm:text-5xl uppercase tracking-wider">Infrastructure</h1>
          <p className="text-stone-300 text-sm mt-4 max-w-md mx-auto">
            Advanced manufacturing unit and research-grade testing facilities in Hyderabad, Telangana.
          </p>
        </div>
      </section>

      {/* Factory Unit Summary */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange border-l-2 border-brand-orange pl-3">
              Manufacturing Unit
            </h2>
            <h3 className="text-2xl font-black text-brand-deep sm:text-3xl leading-snug">
              Located in TIF MSME Green Industrial Park, Dandu Malkapur
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Our automated manufacturing plant is situated in the prestigious **TIF MSME Green Industrial Park** (Choutuppal). The facility is custom-engineered to handle high-volume dry-mix blending, polymer modifier dosing, and liquid compounding.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              By using computer-controlled batching scales and high-shear mixers, we ensure that every bag of *Tile Grip Adhesive*, *Block Fix Mortar*, and *Tile Grout* complies with perfect chemical consistency thresholds, preventing site errors caused by manual mixing.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg border border-stone-100 bg-brand-deep">
            <Image
              src="/arka_commercial_bg.png"
              alt="Concrete block dry-mix automated packaging unit"
              fill
              className="object-cover opacity-85"
            />
          </div>
        </div>
      </section>

      {/* QC & Laboratory Section */}
      <section className="py-20 bg-stone-50 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg border border-stone-100 bg-brand-deep order-last lg:order-first">
            <Image
              src="/arka_hero_bg.png"
              alt="Quality testing laboratory tensile testing machine"
              fill
              className="object-cover opacity-85"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange border-l-2 border-brand-orange pl-3">
              Research & Quality Control
            </h2>
            <h3 className="text-2xl font-black text-brand-deep sm:text-3xl leading-snug">
              Scientific Testing for Structural Confidence
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              We host a fully-equipped Quality Assurance and Product Development laboratory. Each production shift is audited, with core chemical samples tested under extreme thermal and mechanical loads.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 pt-4">
              <div className="flex gap-3">
                <TestTube className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-brand-deep">Tensile Adhesion testing</h4>
                  <p className="text-stone-400 text-[10px] leading-relaxed">Verifying structural grip metrics for tile and stone adhesives.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Cpu className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-brand-deep">Compression Testing</h4>
                  <p className="text-stone-400 text-[10px] leading-relaxed">Auditing non-shrink grouts up to 70+ N/mm² benchmarks.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Droplet className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-brand-deep">Permeability chambers</h4>
                  <p className="text-stone-400 text-[10px] leading-relaxed">Testing active waterproofing layers against heavy hydraulic pressure.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-brand-deep">Batch Traceability</h4>
                  <p className="text-stone-400 text-[10px] leading-relaxed">Maintaining archived control samples for every manufactured batch.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
