import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | ARKA CRETE SUPPLEMENTS LLP",
  description: "Read the terms and conditions of ARKA CRETE construction chemical manufacturer.",
};

export default function TermsPage() {
  return (
    <div className="bg-stone-50 min-h-screen text-brand-charcoal py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white border border-stone-200 rounded-2xl p-8 md:p-12 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-brand-deep border-b border-stone-100 pb-4">Terms & Conditions</h1>
        <p className="text-xs text-stone-400">Effective Date: June 18, 2026</p>
        
        <p className="text-stone-600 text-sm leading-relaxed">
          Welcome to the website of ARKA CRETE Supplements LLP. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h3 className="text-lg font-bold text-brand-deep">1. Product Specifications</h3>
        <p className="text-stone-600 text-sm leading-relaxed">
          All technical specifications, packaging sizes, and coverage metrics displayed on our website are typical benchmarks based on lab tests. Actual application coverage may vary depending on local site condition, mixing quality, and masonry substrates.
        </p>

        <h3 className="text-lg font-bold text-brand-deep">2. Inquiries and Quotes</h3>
        <p className="text-stone-600 text-sm leading-relaxed">
          Submitting an inquiry through the website does not create a binding sales contract. Custom pricing, dealer contracts, and supply quotes will be issued separately in writing by our corporate sales office.
        </p>

        <h3 className="text-lg font-bold text-brand-deep">3. Copyright & Intellectual Property</h3>
        <p className="text-stone-600 text-sm leading-relaxed">
          All trademarks (including ARKA CRETE, Tile Grip, Arkacoat, Arkabond), logos, visual designs, brochures, and technical sheets are the exclusive property of Arka Crete Supplements LLP and are protected by applicable trademark and copyright laws.
        </p>

        <h3 className="text-lg font-bold text-brand-deep">4. Jurisdiction</h3>
        <p className="text-stone-600 text-sm leading-relaxed">
          These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of the use of this website shall be subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana.
        </p>
      </div>
    </div>
  );
}
