import React from "react";
import Downloads from "@/components/Downloads";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brochures & Technical Sheets | ARKA CRETE",
  description: "Download ARKA CRETE construction chemical product brochures, technical data sheets (TDS), and product manuals.",
};

export default function DownloadsPage() {
  return (
    <main>
      <Downloads />
    </main>
  );
}
