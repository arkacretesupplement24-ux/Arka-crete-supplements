"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, HelpCircle, Compass, FileText, CheckCircle, MessageSquare } from "lucide-react";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    slug: string;
    shortDescription: string | null;
    longDescription: string | null;
    packaging: string | null;
    coverage: string | null;
    applicationType: string | null;
    productType: string | null;
    featuresJson: string | null;
    benefitsJson: string | null;
    specsJson: string | null;
  };
  relatedProducts: Array<{
    name: string;
    slug: string;
    shortDescription: string | null;
  }>;
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    city: "",
    state: "",
    message: `Hi, I am interested in inquiring about ${product.name}. Please send technical details and pricing.`,
  });

  const features = product.featuresJson ? JSON.parse(product.featuresJson) : [];
  const benefits = product.benefitsJson ? JSON.parse(product.benefitsJson) : [];
  const specs = (product.specsJson ? JSON.parse(product.specsJson) : {}) as Record<string, string>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productId: product.id,
          inquiryType: "product",
          source: "product_page",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFormSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          companyName: "",
          city: "",
          state: "",
          message: "",
        });
      } else {
        alert(data.error || "Inquiry submission failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen text-brand-charcoal">
      {/* Product Hero */}
      <section className="bg-brand-deep py-20 px-6 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Link href="/products" className="text-xs text-brand-orange hover:underline uppercase tracking-wider font-bold">
            &larr; Back to Products
          </Link>
          <div className="mt-6 space-y-4">
            <span className="text-xs text-brand-orange uppercase font-mono tracking-widest">
              {product.applicationType || "Construction Chemicals"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black">{product.name}</h1>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              {product.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid gap-12 lg:grid-cols-3">
        {/* Left Col - Info */}
        <div className="lg:col-span-2 space-y-12">
          {/* Description */}
          <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-brand-deep border-b border-stone-100 pb-3 flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-orange" />
              Product Description
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
              {product.longDescription || "No detailed description available."}
            </p>
          </div>

          {/* Features & Benefits */}
          {(features.length > 0 || benefits.length > 0) && (
            <div className="grid gap-6 sm:grid-cols-2">
              {features.length > 0 && (
                <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-deep flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-orange" />
                    Key Features
                  </h4>
                  <ul className="space-y-2 text-stone-600 text-xs">
                    {features.map((f: string, idx: number) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-brand-orange font-bold font-mono">&#8226;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {benefits.length > 0 && (
                <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-deep flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-orange" />
                    Applications & Benefits
                  </h4>
                  <ul className="space-y-2 text-stone-600 text-xs">
                    {benefits.map((b: string, idx: number) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-brand-orange font-bold font-mono">&#8226;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Specifications Table */}
          {Object.keys(specs).length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-brand-deep border-b border-stone-100 pb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-orange" />
                Technical Specifications
              </h3>
              <div className="overflow-x-auto border border-stone-100 rounded-lg">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 text-stone-600 uppercase font-mono border-b border-stone-100">
                    <tr>
                      <th className="px-5 py-3">Property</th>
                      <th className="px-5 py-3">Benchmark / Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {Object.entries(specs).map(([key, val]) => (
                      <tr key={key} className="hover:bg-stone-50/50">
                        <td className="px-5 py-3 font-semibold capitalize">{key}</td>
                        <td className="px-5 py-3 font-mono">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Recommended Packaging & Coverage details */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl">
                <Package className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-stone-400 font-mono uppercase">Packaging Available</span>
                <p className="text-sm font-bold text-brand-deep">{product.packaging || "Contact sales for packaging options"}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-stone-400 font-mono uppercase">Coverage Benchmarks</span>
                <p className="text-sm font-bold text-brand-deep">{product.coverage || "Varies with substrate condition"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col - Inquiry Form & Info */}
        <div className="space-y-8">
          {/* Action form Card */}
          <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-brand-deep flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-orange" />
                Product Inquiry
              </h3>
              <p className="text-stone-400 text-xs leading-relaxed">
                Fill out the quick form below to request safety profiles, brochures, or commercial quotes.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 text-xs text-center space-y-2">
                <p className="font-bold">Inquiry Sent Successfully!</p>
                <p className="opacity-95">Our construction chemicals sales executive will call you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                    placeholder="E.g. Rajesh Kumar"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Email ID</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                    placeholder="rajesh@domain.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="city" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                      placeholder="Hyderabad"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                      placeholder="Telangana"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Message Detail</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex h-11 items-center justify-center rounded-lg bg-brand-orange text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-orange/90 transition-colors shadow-md shadow-brand-orange/10 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>

          {/* Related products card */}
          {relatedProducts.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-deep border-b border-stone-100 pb-2">
                Related Formulations
              </h4>
              <div className="divide-y divide-stone-100">
                {relatedProducts.map((rp) => (
                  <Link
                    href={`/products/${rp.slug}`}
                    key={rp.slug}
                    className="block py-3 group hover:text-brand-orange"
                  >
                    <span className="text-sm font-semibold block transition-colors group-hover:text-brand-orange">
                      {rp.name}
                    </span>
                    <span className="text-[10px] text-stone-400 block line-clamp-1">
                      {rp.shortDescription}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
