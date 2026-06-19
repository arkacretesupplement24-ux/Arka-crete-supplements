import React from "react";
import About from "@/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | ARKA CRETE SUPPLEMENTS LLP",
  description: "Learn about ARKA CRETE, a Hyderabad-based manufacturer of premium construction chemicals, tile adhesives, grouts, and waterproofing systems.",
};

export default function AboutPage() {
  return (
    <main>
      <About />
    </main>
  );
}
