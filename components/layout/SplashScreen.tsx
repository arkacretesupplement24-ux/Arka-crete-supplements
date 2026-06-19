"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = "hidden";

    // Play splash screen for 2.8s
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#171310] select-none"
        >
          {/* Subtle industrial grid background */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Central GIF Loader - unoptimized to preserve loop animation */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] flex items-center justify-center"
          >
            <Image
              src="/download.gif"
              alt="Loading ARKA CRETE..."
              fill
              priority
              unoptimized
              className="object-contain"
            />
          </motion.div>

          {/* Minimal branding text below */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-10 flex flex-col items-center gap-1.5"
          >
            <span className="text-[10px] font-mono tracking-[0.25em] text-stone-500 uppercase font-bold">
              ARKA CRETE Supplements LLP
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
