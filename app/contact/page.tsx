import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | ARKA CRETE SUPPLEMENTS LLP",
  description: "Get in touch with ARKA CRETE. Direct contacts for our Hyderabad office and our factory in TIF MSME Green Industrial Park, Dandu Malkapur.",
};

export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  );
}
