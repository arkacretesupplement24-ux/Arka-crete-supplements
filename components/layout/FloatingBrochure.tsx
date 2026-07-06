"use client";

import React from "react";
import { Download } from "lucide-react";

export default function FloatingBrochure() {
  const [brochureUrl, setBrochureUrl] = React.useState("/ARKA CRETE_BROCHURE.pdf");

  React.useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.config?.brochureUrl) {
          setBrochureUrl(data.config.brochureUrl);
        }
      })
      .catch((err) => console.error("Error fetching brochure URL in FloatingBrochure:", err));
  }, []);

  return (
    <>
      <style>{`
        @keyframes brochure-breath {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 25px -5px rgba(245, 130, 10, 0.4), 0 8px 10px -6px rgba(245, 130, 10, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 20px 35px -5px rgba(245, 130, 10, 0.5), 0 0 0 12px rgba(245, 130, 10, 0);
          }
        }
        .animate-brochure-breath {
          animation: brochure-breath 3s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed bottom-6 left-6 z-[49] pointer-events-none">
        <a
          href={brochureUrl}
          target={brochureUrl !== "/ARKA CRETE_BROCHURE.pdf" ? "_blank" : undefined}
          rel={brochureUrl !== "/ARKA CRETE_BROCHURE.pdf" ? "noreferrer" : undefined}
          download="ARKA_CRETE_Brochure.pdf"
          className="animate-brochure-breath group flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/95 text-white text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-full shadow-xl active:scale-95 transition-all duration-300 pointer-events-auto border border-white/10"
          title="Download Technical Brochure"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <Download className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Download Brochure</span>
          <span className="sm:hidden">Brochure</span>
        </a>
      </div>
    </>
  );
}
