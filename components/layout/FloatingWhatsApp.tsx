"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  return (
    <>
      <style>{`
        @keyframes whatsapp-ring-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
        .animate-whatsapp-ring-pulse {
          animation: whatsapp-ring-pulse 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-[49] pointer-events-none flex items-center justify-center">
        <a
          href="https://wa.me/919030024111?text=Hi%2C%20I%20am%20interested%20in%20ARKA%20CRETE%20products.%20Please%20send%20more%20details."
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-20 h-20 flex items-center justify-center pointer-events-auto transition-transform duration-300 active:scale-95 hover:scale-105"
          title="Chat on WhatsApp"
        >
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#2bb166] animate-whatsapp-ring-pulse pointer-events-none" />

          {/* Inner Circle Button with Linear Gradient */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5cdc8e] to-[#25b565] flex items-center justify-center shadow-lg border border-white/10 relative z-10">
            {/* react-icons FaWhatsapp */}
            <FaWhatsapp className="w-8 h-8 text-white shrink-0" />
          </div>
        </a>
      </div>
    </>
  );
}
