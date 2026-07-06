"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, FileText, ArrowRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const [brochureUrl, setBrochureUrl] = React.useState("/ARKA CRETE_BROCHURE.pdf");

  React.useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.config?.brochureUrl) {
          setBrochureUrl(data.config.brochureUrl);
        }
      })
      .catch((err) => console.error("Error fetching brochure URL in Footer:", err));
  }, []);

  // Don't show public footer on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-deep text-stone-300 border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Company Info */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center select-none py-0.5">
            <Image
              src="/white-logo.png"
              alt="ARKA CRETE"
              width={250}
              height={60}
              className="object-contain h-20 w-auto"
            />
          </Link>
          <p className="text-xs text-stone-400 leading-relaxed pt-2">
            Hyderabad-based construction chemical manufacturer focused on high-performance polymer mortars, adhesives, waterproofing, and concrete supplements.
          </p>
          <p className="text-xs italic text-brand-orange font-semibold">
            &quot;Your Strength, Our Priority&quot;
          </p>
        </div>

        {/* Categories / Links */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-brand-orange pl-3">
            Product Categories
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/products/category/tile-adhesives" className="hover:text-white hover:underline flex items-center gap-1 group">
                <ArrowRight className="w-3 h-3 text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                Tile Adhesives
              </Link>
            </li>
            <li>
              <Link href="/products/category/block-joining" className="hover:text-white hover:underline flex items-center gap-1 group">
                <ArrowRight className="w-3 h-3 text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                Block Joining Mortar
              </Link>
            </li>
            <li>
              <Link href="/products/category/grouts-anchoring" className="hover:text-white hover:underline flex items-center gap-1 group">
                <ArrowRight className="w-3 h-3 text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                Grouts & Anchoring
              </Link>
            </li>
            <li>
              <Link href="/products/category/repair-products" className="hover:text-white hover:underline flex items-center gap-1 group">
                <ArrowRight className="w-3 h-3 text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                Repair Mortars
              </Link>
            </li>
            <li>
              <Link href="/products/category/waterproofing" className="hover:text-white hover:underline flex items-center gap-1 group">
                <ArrowRight className="w-3 h-3 text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                Waterproofing Slurry
              </Link>
            </li>
          </ul>
        </div>

        {/* Corporate Address */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-brand-orange pl-3">
            Registered Office
          </h4>
          <p className="text-xs text-stone-400 leading-relaxed flex gap-2">
            <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            <span>
              H NO 5-4-159, PLOT NO 26,<br />
              KAMALA NAGAR, VANASTHALI PURAM,<br />
              Hyderabad, Telangana - 500070
            </span>
          </p>
          <p className="text-xs text-stone-400 leading-relaxed flex items-center gap-2 pt-1">
            <Phone className="w-4 h-4 text-brand-orange" />
            <a href="tel:+919030024111" className="hover:text-white">+91 9030024111</a>
          </p>
          <p className="text-xs text-stone-400 leading-relaxed flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-orange" />
            <a href="mailto:info@arkacrete.com" className="hover:text-white">info@arkacrete.com</a>
          </p>
        </div>

        {/* Factory Location */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-brand-orange pl-3">
            Manufacturing Unit
          </h4>
          <p className="text-xs text-stone-400 leading-relaxed flex gap-2">
            <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            <span>
              Plot No - 96, TIF MSME Green Industrial Park,<br />
              Dandu Malkapur, Choutuppal,<br />
              Yadadri Bhuvanagiri - 58252
            </span>
          </p>
          <div className="pt-2">
            <a
              href={brochureUrl}
              target={brochureUrl !== "/ARKA CRETE_BROCHURE.pdf" ? "_blank" : undefined}
              rel={brochureUrl !== "/ARKA CRETE_BROCHURE.pdf" ? "noreferrer" : undefined}
              download="ARKA_CRETE_Brochure.pdf"
              className="inline-flex items-center gap-1.5 text-xs text-brand-orange hover:text-white font-bold tracking-wider uppercase"
            >
              <FileText className="w-4 h-4" />
              Download Brochure
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-neutral-900 text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500">
        <div>
          &copy; {currentYear} ARKA CRETE Supplements LLP. All rights reserved.
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/privacy-policy" className="hover:text-stone-300">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-stone-300">Terms & Conditions</Link>
          <Link href="/admin/login" className="hover:text-stone-300 font-semibold text-stone-600 hover:text-brand-orange">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
