"use client";

import React from "react";
import Image from "next/image";
import { ShieldAlert, BookOpen, Cpu, Award } from "lucide-react";

export default function About() {
  return (
    <div className="bg-white text-brand-charcoal">
      {/* Page Title */}
      <section className="bg-brand-deep py-20 px-6 text-center text-white relative">
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-3xl font-normal sm:text-4xl uppercase tracking-wide font-zen">About Us</h1>
          <p className="text-stone-300 text-sm mt-4 max-w-md mx-auto">
            Arka Crete Supplements LLP: Engineering advanced construction chemicals for architectural integrity.
          </p>
        </div>
      </section>

      {/* Brand Journey */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange border-l-2 border-brand-orange pl-3">
              Who We Are
            </h2>
            <h3 className="text-2xl font-black text-brand-deep sm:text-3xl leading-snug">
              Specialized Formulations Built for Tough Construction Realities
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Founded in Hyderabad, ARKA CRETE was established with the vision of elevating structural stability and convenience in building construction. We manufacture concrete supplements, high-durability tile adhesives, non-shrink grouts, structural repair mortars, and waterproofing membranes.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              We operate under the brand guideline **&quot;Your Strength, Our Priority&quot;**. By sourcing verified raw materials and checking mechanical properties (tensile adhesion, compressive strength, flexural parameters) in our laboratories, we provide contractors and structural engineers with products they can trust.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg border border-stone-100 bg-brand-deep">
            <Image
              src="/arka_interior_bg.png"
              alt="Concrete engineering research office interior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-85"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-stone-50 border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid gap-12 md:grid-cols-2">
          {/* Mission */}
          <div className="bg-white p-8 rounded-2xl border border-stone-200/60 shadow-sm space-y-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-brand-deep">Our Mission</h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              To engineer and supply high-performance construction chemicals that enhance structural safety, simplify applications, and extend concrete lifespan, while adhering to absolute sustainability practices.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-2xl border border-stone-200/60 shadow-sm space-y-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-brand-deep">Our Vision</h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              To establish ARKA CRETE as the primary choice for premium construction chemicals in Southern India by leading structural material R&D, green park operations, and building strategic dealer partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* R&D and Quality Commitment */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="max-w-xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">Our Credentials</h2>
            <p className="text-3xl font-extrabold text-brand-deep sm:text-4xl">Quality & R&D Excellence</p>
            <p className="text-stone-500 text-sm mt-3">
              Formulated for ultimate consistency, workability, and mechanical grip.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3 p-4">
              <Award className="w-8 h-8 text-brand-orange mx-auto" />
              <h4 className="text-sm font-bold text-brand-deep">Automated Blending</h4>
              <p className="text-stone-500 text-xs leading-relaxed">
                Raw components are weighed and mixed in automated batching plants to guarantee identical density and dry-mortar ratios.
              </p>
            </div>

            <div className="space-y-3 p-4">
              <ShieldAlert className="w-8 h-8 text-brand-orange mx-auto" />
              <h4 className="text-sm font-bold text-brand-deep">Certified Standards</h4>
              <p className="text-stone-500 text-xs leading-relaxed">
                Adhesives and grouts are formulated to conform to ISI standards, offering optimal open-times and zero-crack drying indices.
              </p>
            </div>

            <div className="space-y-3 p-4">
              <Cpu className="w-8 h-8 text-brand-orange mx-auto" />
              <h4 className="text-sm font-bold text-brand-deep">Green Operations</h4>
              <p className="text-stone-500 text-xs leading-relaxed">
                Operating inside the Green MSME Industrial Park allows us to follow eco-friendly waste management and clean air operations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
