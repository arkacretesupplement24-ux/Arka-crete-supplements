"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsScrolled(false);
  }, [pathname]);

  const categories = [
    { name: "Tile Adhesives", slug: "tile-adhesives" },
    { name: "Block Joining", slug: "block-joining" },
    { name: "Grouts & Anchoring", slug: "grouts-anchoring" },
    { name: "Repair Products", slug: "repair-products" },
    { name: "Waterproofing", slug: "waterproofing" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Don't show public header on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-brand-deep text-white text-xs py-2 px-6 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-brand-orange" />
              <a href="tel:+919030024111" className="hover:text-brand-orange transition-colors">+91 9030024111</a>
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-brand-orange" />
              <a href="mailto:info@arkacrete.com" className="hover:text-brand-orange transition-colors">info@arkacrete.com</a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-stone-400">Hyderabad, TS</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
            ? "bg-white/95 shadow-md backdrop-blur-md py-4"
            : "bg-white py-5 border-b border-stone-100"
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
          <Link href="/" className="flex items-center select-none py-0.5">
            <Image
              src="/ARKA logo.png"
              alt="ARKA CRETE"
              width={220}
              height={66}
              priority
              className={`object-contain transition-all duration-300 w-auto ${
                isScrolled ? "h-12 sm:h-14" : "h-14 sm:h-16"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-charcoal">
            <Link
              href="/"
              className={`transition-colors hover:text-brand-orange ${isActive("/") ? "text-brand-orange" : ""
                }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`transition-colors hover:text-brand-orange ${isActive("/about") ? "text-brand-orange" : ""
                }`}
            >
              About Us
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 transition-colors hover:text-brand-orange focus:outline-none py-2 ${pathname?.startsWith("/product") ? "text-brand-orange" : ""
                  }`}
              >
                Products
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full -left-4 w-56 bg-white border border-stone-100 shadow-xl rounded-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/products"
                    className="block px-5 py-2 text-xs font-bold uppercase tracking-wider text-brand-orange hover:bg-stone-50"
                  >
                    All Products
                  </Link>
                  <hr className="border-stone-100 my-1" />
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products/category/${cat.slug}`}
                      className="block px-5 py-2.5 text-xs text-stone-700 hover:bg-stone-50 hover:text-brand-orange transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/infrastructure"
              className={`transition-colors hover:text-brand-orange ${isActive("/infrastructure") ? "text-brand-orange" : ""
                }`}
            >
              Infrastructure
            </Link>

            <Link
              href="/contact"
              className={`transition-colors hover:text-brand-orange ${isActive("/contact") ? "text-brand-orange" : ""
                }`}
            >
              Contact
            </Link>
          </nav>

          {/* Header Action */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact#inquiry-form"
              className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-brand-orange/90 hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-brand-orange/10"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-brand-deep hover:text-brand-orange focus:outline-none p-1.5 rounded-lg border border-stone-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden fixed inset-x-0 top-[77px] bg-white border-b border-stone-100 shadow-xl z-40 py-6 px-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col gap-4 text-sm font-bold text-brand-charcoal">
              <Link href="/" onClick={toggleMenu} className="py-2 border-b border-stone-50">
                Home
              </Link>
              <Link href="/about" onClick={toggleMenu} className="py-2 border-b border-stone-50">
                About Us
              </Link>

              {/* Products Section */}
              <div className="py-2 border-b border-stone-50">
                <span className="text-stone-400 text-xs uppercase tracking-wider block mb-2">Products</span>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  <Link
                    href="/products"
                    onClick={toggleMenu}
                    className="text-xs py-1.5 text-brand-orange hover:text-brand-orange"
                  >
                    View All
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products/category/${cat.slug}`}
                      onClick={toggleMenu}
                      className="text-xs py-1.5 text-stone-600 hover:text-brand-orange"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/infrastructure" onClick={toggleMenu} className="py-2 border-b border-stone-50">
                Infrastructure
              </Link>

              <Link href="/contact" onClick={toggleMenu} className="py-2 border-b border-stone-50">
                Contact
              </Link>

              <Link
                href="/contact#inquiry-form"
                onClick={toggleMenu}
                className="mt-4 w-full inline-flex h-11 items-center justify-center rounded-lg bg-brand-orange text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-brand-orange/10"
              >
                Get a Quote
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
