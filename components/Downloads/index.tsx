"use client";

import React from "react";
import { Download, AlertCircle } from "lucide-react";

export default function Downloads() {
  const documents = [
    {
      title: "Arka Crete Corporate Product Catalog",
      description: "Full brochure featuring tile adhesives, grouting systems, repair mortars, and waterproofing additives.",
      size: "4.8 MB",
      type: "Corporate Brochure"
    },
    {
      title: "Tile Grip Classic - Technical Data Sheet (TDS)",
      description: "Complete material safety profile, mixing instructions, and coverage parameters for Tile Grip Classic.",
      size: "1.2 MB",
      type: "Technical Sheet"
    },
    {
      title: "Tile Grip Premium - Product Specification Sheet",
      description: "Tensile adhesion, open time index, and thermal expansion compatibility specs.",
      size: "1.5 MB",
      type: "Technical Sheet"
    },
    {
      title: "EP Epoxy Grout - Installation & Safety Manual",
      description: "Grouting directions, joint preparation steps, and resin-hardener mixing ratios.",
      size: "2.1 MB",
      type: "Application Guide"
    },
    {
      title: "Waterproofing Systems - Application Specification",
      description: "Recommended plaster coats, structural layer preparation, and brush technique guidelines for Arkacoat FX.",
      size: "3.2 MB",
      type: "Application Guide"
    }
  ];

  const handleDownload = (docTitle: string) => {
    alert(`Downloading ${docTitle} placeholder. In production, this will trigger the official PDF file fetch.`);
  };

  return (
    <div className="bg-stone-50 min-h-screen text-brand-charcoal">
      {/* Page Header */}
      <section className="bg-brand-deep py-20 px-6 text-center text-white relative">
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-4xl font-extrabold sm:text-5xl uppercase tracking-wider">Downloads</h1>
          <p className="text-stone-300 text-sm mt-4 max-w-md mx-auto">
            Access product brochures, technical data sheets, and application guides.
          </p>
        </div>
      </section>

      {/* Main Downloads Container */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-6">
          <div className="flex gap-3 text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-200/60">
            <AlertCircle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">
              <strong>Technical Documentation:</strong> For customized product formulations, chemical compliance certifications, or site-specific testing reports, please contact our R&D unit directly via the inquiry form.
            </p>
          </div>

          <div className="divide-y divide-stone-100">
            {documents.map((doc, index) => (
              <div key={index} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-2 last:pb-2">
                <div className="space-y-1">
                  <span className="inline-block bg-stone-100 text-stone-500 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {doc.type}
                  </span>
                  <h3 className="text-sm font-bold text-brand-deep pt-1">{doc.title}</h3>
                  <p className="text-stone-400 text-xs leading-relaxed max-w-xl">
                    {doc.description}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(doc.title)}
                  className="inline-flex items-center gap-1.5 shrink-0 self-start sm:self-center px-4 py-2 border border-stone-200 rounded-lg text-xs font-bold uppercase tracking-wider text-brand-orange hover:bg-stone-50 transition-colors focus:outline-none"
                >
                  <Download className="w-4 h-4" />
                  PDF ({doc.size})
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
