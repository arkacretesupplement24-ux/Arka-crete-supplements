"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package, FileText, Check, ChevronRight, Download, Maximize2, ShieldCheck, MessageSquare, ArrowRight, Layers, LayoutGrid
} from "lucide-react";

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
    imageUrl?: string | null;
    galleryImagesJson?: string | null;
    price?: string | null;
    pdfUrl?: string | null;
  };
  relatedProducts: Array<{
    name: string;
    slug: string;
    shortDescription: string | null;
    imageUrl?: string | null;
    packaging?: string | null;
  }>;
}

const getAttachmentUrl = (url: string | null | undefined): string => {
  if (!url) return "";
  if (url.includes("cloudinary.com") && url.includes("/upload/") && !url.includes("fl_attachment")) {
    return url.replace("/upload/", "/upload/fl_attachment/");
  }
  return url;
};

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


  // Hover Zoom States
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  // Gallery Setup
  const gallery = product.galleryImagesJson ? JSON.parse(product.galleryImagesJson) : [];
  const allImages = [product.imageUrl, ...gallery].filter(Boolean) as string[];
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (allImages.length > 0) {
      setActiveImage(allImages[0]);
    }
  }, [product.id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

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

  const features = product.featuresJson ? JSON.parse(product.featuresJson) : [];
  const benefits = product.benefitsJson ? JSON.parse(product.benefitsJson) : [];
  const specs = (product.specsJson ? JSON.parse(product.specsJson) : {}) as Record<string, string>;

  // Generate dynamic model SKU
  const sku = `AK-${product.slug.toUpperCase().replace(/-/g, "")}`;

  return (
    <div className="bg-stone-50 min-h-screen text-brand-charcoal py-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-stone-500 text-xs font-semibold mb-8 select-none">
          <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
          <Link href="/products" className="hover:text-brand-orange transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
          <span className="text-brand-deep font-bold truncate">{product.name}</span>
        </nav>

        {/* Main Details Section */}
        <div className="grid gap-12 lg:grid-cols-12 items-start">

          {/* Left Column: Media Gallery & Downloads */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">

            {/* Gallery Panel */}
            <div className="relative bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-4 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[6px] bg-brand-orange" />

              {/* Active Image Box with Interactive Zoom */}
              <div
                className="relative h-96 w-full rounded-xl overflow-hidden bg-white flex items-center justify-center border border-stone-100 p-4 cursor-zoom-in"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
              >
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-100 ease-out select-none"
                    style={isZooming ? {
                      transform: "scale(2.2)",
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                    } : undefined}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-stone-300">
                    <Package className="w-12 h-12 stroke-[1.5]" />
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-2">ARKA Crete</span>
                  </div>
                )}

                {/* Zoom Helper Indicator */}
                {!isZooming && activeImage && (
                  <span className="absolute bottom-4 right-4 flex items-center gap-1 bg-neutral-900/60 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded backdrop-blur-sm select-none">
                    <Maximize2 className="w-3 h-3" />
                    Hover to Zoom
                  </span>
                )}
              </div>

              {/* Thumbnails strip */}
              {allImages.length > 1 && (
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-lg overflow-hidden bg-stone-50 border-2 transition-all shrink-0 ${activeImage === img
                          ? "border-brand-orange shadow-sm scale-95"
                          : "border-stone-200 hover:border-brand-orange/40"
                        }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover select-none" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Downloads Card (Prominent Datasheet download) */}
            <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-deep border-b border-stone-100 pb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-orange" />
                Technical Downloads
              </h3>
              <p className="text-stone-500 text-xs leading-relaxed">
                Access product properties, installation methods, security sheets, and certifications.
              </p>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-150 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-deep line-clamp-1">{product.name} - Technical Datasheet</h4>
                    <p className="text-[10px] text-stone-400 font-medium">PDF Document &bull; 1.4 MB</p>
                  </div>
                </div>

                <a
                  href={product.pdfUrl ? getAttachmentUrl(product.pdfUrl) : "/ARKA CRETE_BROCHURE.pdf"}
                  download={`${product.name.replace(/\s+/g, "_")}_Datasheet.pdf`}
                  className="inline-flex items-center justify-center p-2.5 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-lg transition-colors shadow-sm"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Product Metadata & Info Tabs */}
          <div className="lg:col-span-7 space-y-8">

            {/* Header Info Block */}
            <div className="relative bg-white rounded-2xl border border-stone-200/60 p-8 pt-9 shadow-sm space-y-4 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[6px] bg-brand-orange" />
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[9px] font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded uppercase tracking-wider">
                  {product.applicationType || "Construction Chemistry"}
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3" />
                  In Stock
                </span>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-brand-deep leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 text-[10px] text-stone-400 font-semibold font-mono uppercase tracking-wider">
                  <span>Model: {sku}</span>
                  <span>&bull;</span>
                  <span>Packaging: {product.packaging || "Std Pack"}</span>
                </div>
              </div>

              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed border-t border-stone-100 pt-4">
                {product.shortDescription}
              </p>
            </div>

            {/* Product Overview Card */}
            <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-6">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-deep border-b border-stone-100 pb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-orange" />
                Product Overview
              </h3>
              <div className="space-y-4">
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {product.longDescription || "No detailed description available."}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 pt-6 border-t border-stone-100">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-brand-deep">Packaging Size</h4>
                    <p className="text-stone-500 text-xs mt-0.5">{product.packaging || "Contact sales for pack sizes"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-brand-deep">Coverage parameters</h4>
                    <p className="text-stone-500 text-xs mt-0.5">{product.coverage || "Dependent on surface variables"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features & Benefits Card */}
            {(features.length > 0 || benefits.length > 0) && (
              <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-6">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-deep border-b border-stone-100 pb-3 flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-orange" />
                  Features & Benefits
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {features.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-brand-deep flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {features.map((f: string, idx: number) => (
                          <li key={idx} className="flex gap-2 text-stone-600 text-xs items-start">
                            <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {benefits.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-brand-deep flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                        Applications & Benefits
                      </h4>
                      <ul className="space-y-2">
                        {benefits.map((b: string, idx: number) => (
                          <li key={idx} className="flex gap-2 text-stone-600 text-xs items-start">
                            <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Technical Specifications Card */}
            {Object.keys(specs).length > 0 && (
              <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-6">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-deep border-b border-stone-100 pb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-orange" />
                  Technical Specifications
                </h3>
                <div className="overflow-hidden border border-stone-150 rounded-xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-stone-50 text-stone-600 uppercase font-mono border-b border-stone-100">
                      <tr>
                        <th className="px-5 py-3.5">Property parameter</th>
                        <th className="px-5 py-3.5">Benchmark Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-700">
                      {Object.entries(specs).map(([key, val]) => (
                        <tr key={key} className="hover:bg-stone-50/40">
                          <td className="px-5 py-3 font-semibold capitalize">{key}</td>
                          <td className="px-5 py-3 font-mono text-stone-500">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Product Inquiry Form */}
            {/* <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-deep flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-orange" />
                  Request Quotes & Technical Details
                </h3>
                <p className="text-stone-400 text-xs">
                  Fill in the quick form below. Our construction chemicals engineer will reach you shortly.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 text-xs text-center">
                  <p className="font-bold">Inquiry Sent Successfully!</p>
                  <p className="opacity-95 mt-1">Thank you for contacting ARKA CRETE. We will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                      placeholder="E.g. Rajesh Kumar"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                      placeholder="rajesh@domain.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-500 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-500 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                        placeholder="Hyderabad"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-500 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                        placeholder="Telangana"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-500 mb-1">Company / Project Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                      placeholder="E.g. Arka Builders"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-500 mb-1">Message Detail</label>
                    <textarea
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
                    className="sm:col-span-2 w-full inline-flex h-11 items-center justify-center rounded-lg bg-brand-orange text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-orange/90 transition-colors shadow-md shadow-brand-orange/10 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </div> */}

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-stone-200 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-brand-deep uppercase tracking-wider">
                Related Formulations
              </h2>
              <Link href="/products" className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange hover:underline uppercase tracking-wider">
                All Products
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rp) => (
                <Link
                  href={`/products/${rp.slug}`}
                  key={rp.slug}
                  className="group bg-white border border-stone-200/60 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-orange/20 transition-all flex flex-col h-[400px] overflow-hidden"
                >
                  <div className="relative h-[240px] w-full overflow-hidden bg-white flex items-center justify-center border-b border-stone-100 p-6">
                    {rp.imageUrl ? (
                      <img src={rp.imageUrl} alt={rp.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 select-none" />
                    ) : (
                      <ImageIcon className="w-10 h-10 text-stone-200" />
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-brand-deep group-hover:text-brand-orange transition-colors line-clamp-1">{rp.name}</h3>
                      <p className="text-stone-500 text-[11px] leading-relaxed line-clamp-2 pt-0.5">{rp.shortDescription}</p>
                    </div>
                    <div className="border-t border-stone-100 mt-3 pt-3 flex items-center justify-between text-[11px] text-stone-500">
                      <span className="flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-brand-orange" />
                        {rp.packaging || "Std Pack"}
                      </span>
                      <span className="font-bold text-brand-orange group-hover:text-brand-orange/85 transition-colors flex items-center gap-0.5">
                        Details &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

// Simple fallback icon wrapper since Lucide icon Image conflicts with next.js Image
function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}
