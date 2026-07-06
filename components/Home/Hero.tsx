"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    index: "01",
    category: "Tile Adhesives",
    headlineTop: "Your Strength,",
    headlineBottom: "Our Priority",
    highlightWord: "Priority",
    description:
      "Polymer-modified adhesives formulated for tensile bond strengths exceeding IS 15477 standards — tested every batch, every time.",
    stats: [
      { value: "3.5 MPa", label: "Tensile Bond" },
      { value: "IS 15477", label: "Certified" },
      { value: "C2TE", label: "Grade" },
    ],
    productImage: "https://res.cloudinary.com/dmohmgbut/image/upload/q_auto/f_auto/v1781852144/2._Tile_Grip_Premium_ranlb2.png",
    bgImage: "/arka_hero_bg.png",
    productMeta: "Tile Grip Premium",
    productLabel: "Tile Grip Premium",
  },
  {
    index: "02",
    category: "Block Joining Mortars",
    headlineTop: "Innovation",
    headlineBottom: "At Work",
    highlightWord: "Work",
    description:
      "Thin-bed AAC jointing mortar that cuts masonry time by 40% and reduces structural dead load without sacrificing joint integrity.",
    stats: [
      { value: "≤3 mm", label: "Joint Thickness" },
      { value: "40%", label: "Time Saved" },
      { value: "AAC", label: "Compatible" },
    ],
    productImage: "https://res.cloudinary.com/dmohmgbut/image/upload/q_auto/f_auto/v1781850504/BLOCK_FIX_ycpmsh.png",
    bgImage: "/arka_commercial_bg.png",
    productMeta: "Block Fix / AAC Grade",
    productLabel: "Block Fix — AAC Grade",
  },
  {
    index: "03",
    category: "Waterproofing",
    headlineTop: "Excellence in",
    headlineBottom: "Every Structure",
    highlightWord: "Structure",
    description:
      "Flexible cementitious coatings and crystalline systems built for podiums, bathrooms, retaining walls, and terraces.",
    stats: [
      { value: "Type B", label: "Classification" },
      { value: "MSME", label: "Green Park" },
      { value: "10+ Yr", label: "Track Record" },
    ],
    productImage: "https://res.cloudinary.com/dmohmgbut/image/upload/q_auto/f_auto/v1781852247/ARKAGUARD_WPL_x9zp5o.png",
    bgImage: "/arka_interior_bg.png",
    productMeta: "Arkaguard WPL",
    productLabel: "Arkaguard WPL",
  },
];

const ORANGE = "#E8651A";

const textVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.22, ease: "easeIn" as const } },
};

const productVariants = {
  enter: { x: 90, opacity: 0, scale: 0.93 },
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { x: -55, opacity: 0, scale: 0.96, transition: { duration: 0.28, ease: "easeIn" as const } },
};

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];
  const rest = slide.headlineBottom.replace(slide.highlightWord, "").trim();

  return (
    <section
      className="relative w-full flex overflow-hidden"
      style={{ minHeight: "min(90vh, 820px)", maxHeight: "820px" }}
    >
      {/* ─── LEFT PANEL ─────────────────────────────────────── */}
      <div className="relative flex-1 min-w-0 bg-white flex flex-col justify-center px-12 lg:px-14 xl:px-16 py-10 overflow-hidden">

        {/* 5 px orange top bar */}
        <div className="absolute top-0 left-0 right-0 h-[5px] z-10" style={{ background: `linear-gradient(90deg, ${ORANGE} 0%, #f5956a 100%)` }} />

        {/* Triangle accent — top-left */}
        <div
          className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
          style={{ background: "#FEF6F1", clipPath: "polygon(0 0,100% 0,0 100%)" }}
        />

        {/* Triangle accent — bottom-right */}
        <div
          className="absolute bottom-0 right-0 w-52 h-52 pointer-events-none"
          style={{ background: "#FEF6F1", clipPath: "polygon(100% 0,100% 100%,0 100%)" }}
        />

        {/* Vertical slide rail */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="group flex items-center gap-1.5 py-2.5"
              aria-label={`Slide ${s.index}`}
            >
              <div className={`h-px transition-all duration-500 ${current === idx ? "w-5 bg-[#E8651A]" : "w-2.5 bg-stone-300 group-hover:bg-stone-400"}`} />
              <span className={`font-mono text-[8px] transition-colors ${current === idx ? "text-[#E8651A]" : "text-stone-400"}`}>{s.index}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative z-10 flex flex-col gap-5 max-w-lg"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.13em] text-white px-2.5 py-1 rounded-[3px]"
                style={{ background: ORANGE }}
              >
                {slide.category}
              </span>
              <span className="font-mono text-[10px] text-stone-400 tracking-[0.1em]">
                {slide.index} / 03
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-5xl xl:text-[52px] font-black text-stone-900 leading-[1.02] tracking-[-0.025em]">
                {slide.headlineTop}
              </h1>
              <h1 className="text-5xl xl:text-[52px] font-black leading-[1.02] tracking-[-0.025em] mt-0.5">
                {rest && <span className="text-stone-900">{rest} </span>}
                <span className="relative inline-block text-stone-900">
                  {slide.highlightWord}
                  <span className="absolute left-0 right-0 -bottom-0.5 h-[5px] rounded-sm" style={{ background: ORANGE }} />
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-[13px] leading-[1.75] text-stone-500 max-w-sm">
              {slide.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
              {slide.stats.map((s, i) => (
                <div key={i} className={`px-4 py-3 ${i > 0 ? "border-l border-stone-200" : ""}`}>
                  <div className="text-[17px] font-black text-stone-900 tracking-tight font-mono">
                    {s.value}
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.1em] text-stone-400 mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4">
              <Link
                href="/products"
                className="inline-flex h-11 items-center gap-2 text-white text-[11px] font-bold uppercase tracking-[0.1em] px-6 rounded-lg transition-colors"
                style={{ background: ORANGE, boxShadow: "0 4px 14px rgba(232,101,26,0.30)" }}
              >
                View Product
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-4 decoration-stone-300"
              >
                Request Sample
              </Link>
            </div>

            {/* Trust strip — inside a subtle card */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50">
              {[
                { icon: true, label: "IS Certified" },
                { label: "MSME Park" },
                { label: "Hyderabad" },
                { label: "Since 2012" },
                { label: "Free Sample" },
              ].map((item, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="w-px h-3 bg-stone-300 shrink-0" />}
                  <div className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-stone-400 whitespace-nowrap">
                    {item.icon && (
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2l1.5 3 3.3.5-2.4 2.3.6 3.3L8 9.5l-3 1.6.6-3.3L3.2 5.5l3.3-.5L8 2z" fill={ORANGE} />
                      </svg>
                    )}
                    {item.label}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── RIGHT PANEL ────────────────────────────────────── */}
      <div
        className="relative hidden md:flex w-[45%] xl:w-[44%] shrink-0 items-center justify-center overflow-hidden"
        style={{ background: "#171310" }}
      >
        {/* Background image — 10% opacity */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="absolute inset-0"
          >
            <Image
              src={slide.bgImage}
              alt=""
              fill
              priority={current === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover select-none"
              style={{ opacity: 0.1 }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Orange radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,101,26,0.2) 0%, transparent 65%)",
            top: "50%", left: "50%", transform: "translate(-45%, -50%)",
          }}
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Dashed left stripe */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[4px] pointer-events-none"
          style={{
            background: `repeating-linear-gradient(to bottom, ${ORANGE} 0px, ${ORANGE} 18px, transparent 18px, transparent 28px)`,
            opacity: 0.65,
          }}
        />

        {/* Slide rail — right edge */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="group flex flex-row-reverse items-center gap-1.5 py-2.5"
              aria-label={`Slide ${s.index}`}
            >
              <div className={`h-px transition-all duration-500 ${current === idx ? "w-5 bg-[#E8651A]" : "w-2.5 bg-white/20 group-hover:bg-white/40"}`} />
              <span className={`font-mono text-[8px] ${current === idx ? "text-[#E8651A]" : "text-white/25"}`}>{s.index}</span>
            </button>
          ))}
        </div>

        {/* Product */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Meta label */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-5 h-px bg-[#E8651A]/50" />
            <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.16em]">
              {slide.productMeta}
            </span>
            <div className="w-5 h-px bg-[#E8651A]/50" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`product-${current}`}
              variants={productVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center"
            >
              {/* Frame */}
              <div className="relative" style={{ width: 330, height: 330 }}>
                {/* Corners */}
                {(["tl", "tr", "bl", "br"] as const).map((c) => (
                  <div
                    key={c}
                    className="absolute w-5 h-5 pointer-events-none"
                    style={{
                      top: c.startsWith("t") ? -1 : "auto",
                      bottom: c.startsWith("b") ? -1 : "auto",
                      left: c.endsWith("l") ? -1 : "auto",
                      right: c.endsWith("r") ? -1 : "auto",
                      borderTop: c.startsWith("t") ? `2px solid ${ORANGE}` : undefined,
                      borderBottom: c.startsWith("b") ? `2px solid ${ORANGE}` : undefined,
                      borderLeft: c.endsWith("l") ? `2px solid ${ORANGE}` : undefined,
                      borderRight: c.endsWith("r") ? `2px solid ${ORANGE}` : undefined,
                    }}
                  />
                ))}

                {/* Inner subtle border */}
                <div className="absolute inset-2 border border-white/5 rounded-sm pointer-events-none" />

                <Image
                  src={slide.productImage}
                  alt={slide.productLabel}
                  fill
                  sizes="(max-width: 768px) 100vw, 330px"
                  className="object-contain p-4 transition-all duration-300 hover:scale-[1.06]"
                  priority={current === 0}
                />
              </div>

              {/* Label tag with left accent */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.35 }}
                className="flex items-center mt-4"
              >
                <div className="w-1 h-8 shrink-0" style={{ background: ORANGE }} />
                <div
                  className="h-8 flex items-center px-4 border border-white/7 border-l-0"
                  style={{ background: "#242018" }}
                >
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/70">
                    {slide.productLabel}
                  </span>
                </div>
              </motion.div>

              {/* Slide dots */}
              <div className="flex items-center gap-1.5 mt-5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`h-[2px] transition-all duration-500 ${current === idx ? "w-6 bg-[#E8651A]" : "w-2.5 bg-white/18 hover:bg-white/35"}`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/8">
          <motion.div
            className="h-full"
            style={{ background: ORANGE }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            key={current}
            transition={{ duration: 6, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}


// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";

// const slides = [
//   {
//     index: "01",
//     category: "Tile Adhesives",
//     headlineTop: "Your Strength,",
//     headlineBottom: "Our Priority",
//     highlightWord: "Priority",
//     description:
//       "Polymer-modified adhesives formulated for tensile bond strengths exceeding IS 15477 standards — tested every batch, every time.",
//     stats: [
//       { value: "3.5 MPa", label: "Tensile Bond" },
//       { value: "IS 15477", label: "Certified" },
//       { value: "C2TE", label: "Grade" },
//     ],
//     productImage:
//       "https://res.cloudinary.com/dmohmgbut/image/upload/q_auto/f_auto/v1781852144/2._Tile_Grip_Premium_ranlb2.png",
//     productLabel: "Tile Grip Premium",
//   },
//   {
//     index: "02",
//     category: "Block Joining Mortars",
//     headlineTop: "Innovation",
//     headlineBottom: "At Work",
//     highlightWord: "Work",
//     description:
//       "Thin-bed AAC jointing mortar that cuts masonry time by 40% and reduces structural dead load without sacrificing joint integrity.",
//     stats: [
//       { value: "≤3 mm", label: "Joint Thickness" },
//       { value: "40%", label: "Time Saved" },
//       { value: "AAC", label: "Compatible" },
//     ],
//     productImage:
//       "https://res.cloudinary.com/dmohmgbut/image/upload/q_auto/f_auto/v1781850504/BLOCK_FIX_ycpmsh.png",
//     productLabel: "Block Fix — AAC Grade",
//   },
//   {
//     index: "03",
//     category: "Waterproofing",
//     headlineTop: "Excellence in",
//     headlineBottom: "Every Structure",
//     highlightWord: "Structure",
//     description:
//       "Flexible cementitious coatings and crystalline systems built for podiums, bathrooms, retaining walls, and terraces.",
//     stats: [
//       { value: "Type B", label: "Classification" },
//       { value: "MSME", label: "Green Park" },
//       { value: "10+ Yr", label: "Track Record" },
//     ],
//     productImage:
//       "https://res.cloudinary.com/dmohmgbut/image/upload/q_auto/f_auto/v1781852247/ARKAGUARD_WPL_x9zp5o.png",
//     productLabel: "Arkaguard WPL",
//   },
// ];

// const ORANGE = "#E8651A";

// const fadeInUp = {
//   enter: { opacity: 0, y: 20 },
//   center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
//   exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" } },
// };

// const productAnim = {
//   enter: { opacity: 0, scale: 0.92 },
//   center: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
//   exit: { opacity: 0, scale: 0.96, transition: { duration: 0.3, ease: "easeIn" } },
// };

// export default function Hero() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000);
//     return () => clearInterval(t);
//   }, []);

//   const slide = slides[current];
//   const rest = slide.headlineBottom.replace(slide.highlightWord, "").trim();

//   return (
//     <section
//       className="relative w-full overflow-hidden"
//       style={{ minHeight: "min(90vh, 820px)", maxHeight: "820px" }}
//     >
//       {/* ─── Unified Background ─────────────────────────────── */}
//       {/* Base dark gradient */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           background: `radial-gradient(ellipse at 70% 50%, #2a1f1a 0%, #171310 65%, #0e0c0a 100%)`,
//         }}
//       />

//       {/* Diagonal line pattern – 45° subtle lines */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: `
//             repeating-linear-gradient(
//               45deg,
//               transparent,
//               transparent 40px,
//               rgba(255, 255, 255, 0.02) 40px,
//               rgba(255, 255, 255, 0.02) 41px
//             )
//           `,
//         }}
//       />

//       {/* Second diagonal layer – finer lines for depth */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: `
//             repeating-linear-gradient(
//               -45deg,
//               transparent,
//               transparent 80px,
//               rgba(255, 255, 255, 0.015) 80px,
//               rgba(255, 255, 255, 0.015) 81px
//             )
//           `,
//         }}
//       />

//       {/* Warm orange glow on the right */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           background: `radial-gradient(ellipse at 80% 50%, rgba(232,101,26,0.12) 0%, transparent 60%)`,
//         }}
//       />

//       {/* Light diagonal accent line (decorative) */}
//       <div
//         className="absolute top-0 right-0 w-1/3 h-px z-0 pointer-events-none"
//         style={{
//           background: `linear-gradient(90deg, transparent, ${ORANGE}40, transparent)`,
//           transform: "rotate(-12deg) translateX(30%)",
//         }}
//       />

//       {/* ─── Main Content ───────────────────────────────────── */}
//       <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-6 sm:px-10 lg:px-16 xl:px-20 py-12">
//         {/* Left: Text */}
//         <div className="flex-1 max-w-xl lg:max-w-2xl w-full">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`text-${current}`}
//               variants={fadeInUp}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               className="flex flex-col gap-5"
//             >
//               {/* Eyebrow + index */}
//               <div className="flex items-center gap-4">
//                 <span
//                   className="text-[10px] font-bold uppercase tracking-[0.13em] text-white px-3 py-1 rounded-sm"
//                   style={{ background: ORANGE }}
//                 >
//                   {slide.category}
//                 </span>
//                 <span className="font-mono text-[10px] text-white/30 tracking-[0.1em]">
//                   {slide.index} / 03
//                 </span>
//               </div>

//               {/* Headline */}
//               <div>
//                 <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-[-0.025em]">
//                   {slide.headlineTop}
//                 </h1>
//                 <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.05] tracking-[-0.025em] mt-0.5">
//                   {rest && <span className="text-white">{rest} </span>}
//                   <span className="relative inline-block text-white">
//                     {slide.highlightWord}
//                     <span
//                       className="absolute left-0 right-0 -bottom-0.5 h-[5px] rounded-sm"
//                       style={{ background: ORANGE }}
//                     />
//                   </span>
//                 </h1>
//               </div>

//               {/* Description */}
//               <p className="text-sm sm:text-base leading-relaxed text-white/60 max-w-md">
//                 {slide.description}
//               </p>

//               {/* Stats — glass-morphism cards */}
//               <div className="grid grid-cols-3 gap-3 mt-1">
//                 {slide.stats.map((s, i) => (
//                   <div
//                     key={i}
//                     className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-center"
//                   >
//                     <div className="text-base sm:text-lg font-black text-white tracking-tight font-mono">
//                       {s.value}
//                     </div>
//                     <div className="text-[9px] uppercase tracking-[0.1em] text-white/40 mt-0.5">
//                       {s.label}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* CTAs */}
//               <div className="flex flex-wrap items-center gap-4 mt-2">
//                 <Link
//                   href="/products"
//                   className="inline-flex h-11 items-center gap-2 text-white text-[11px] font-bold uppercase tracking-[0.1em] px-6 rounded-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
//                   style={{
//                     background: ORANGE,
//                     boxShadow: "0 4px 20px rgba(232,101,26,0.35)",
//                   }}
//                 >
//                   View Product
//                   <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
//                     <path
//                       d="M3 8h10M9 4l4 4-4 4"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40 hover:text-white/80 transition-colors underline underline-offset-4 decoration-white/20"
//                 >
//                   Request Sample
//                 </Link>
//               </div>

//               {/* Trust strip — dark glass */}
//               <div className="flex flex-wrap items-center gap-2.5 px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm mt-1">
//                 {[
//                   { icon: true, label: "IS Certified" },
//                   { label: "MSME Park" },
//                   { label: "Hyderabad" },
//                   { label: "Since 2012" },
//                   { label: "Free Sample" },
//                 ].map((item, i) => (
//                   <React.Fragment key={i}>
//                     {i > 0 && <div className="w-px h-3 bg-white/20 shrink-0" />}
//                     <div className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-white/40 whitespace-nowrap">
//                       {item.icon && (
//                         <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
//                           <path
//                             d="M8 2l1.5 3 3.3.5-2.4 2.3.6 3.3L8 9.5l-3 1.6.6-3.3L3.2 5.5l3.3-.5L8 2z"
//                             fill={ORANGE}
//                           />
//                         </svg>
//                       )}
//                       {item.label}
//                     </div>
//                   </React.Fragment>
//                 ))}
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Right: Product Visual */}
//         <div className="flex-1 flex items-center justify-center w-full max-w-md lg:max-w-lg xl:max-w-xl">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`product-${current}`}
//               variants={productAnim}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               className="relative w-full flex flex-col items-center"
//             >
//               {/* Product container with consistent background */}
//               <div className="relative w-full aspect-square max-w-[360px] sm:max-w-[400px] lg:max-w-[420px] mx-auto">
//                 {/* Glow behind product */}
//                 <div
//                   className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
//                   style={{
//                     background: `radial-gradient(circle, ${ORANGE}30, transparent 70%)`,
//                   }}
//                 />

//                 {/* Subtle diagonal line pattern inside the product area (matches background) */}
//                 <div
//                   className="absolute inset-0 pointer-events-none rounded-2xl"
//                   style={{
//                     backgroundImage: `
//                       repeating-linear-gradient(
//                         45deg,
//                         transparent,
//                         transparent 40px,
//                         rgba(255,255,255,0.02) 40px,
//                         rgba(255,255,255,0.02) 41px
//                       )
//                     `,
//                   }}
//                 />

//                 {/* Corner brackets */}
//                 {(["tl", "tr", "bl", "br"] as const).map((c) => (
//                   <div
//                     key={c}
//                     className="absolute w-6 h-6 pointer-events-none"
//                     style={{
//                       top: c.startsWith("t") ? 0 : "auto",
//                       bottom: c.startsWith("b") ? 0 : "auto",
//                       left: c.endsWith("l") ? 0 : "auto",
//                       right: c.endsWith("r") ? 0 : "auto",
//                       borderTop: c.startsWith("t") ? `2px solid ${ORANGE}40` : undefined,
//                       borderBottom: c.startsWith("b") ? `2px solid ${ORANGE}40` : undefined,
//                       borderLeft: c.endsWith("l") ? `2px solid ${ORANGE}40` : undefined,
//                       borderRight: c.endsWith("r") ? `2px solid ${ORANGE}40` : undefined,
//                     }}
//                   />
//                 ))}

//                 <Image
//                   src={slide.productImage}
//                   alt={slide.productLabel}
//                   fill
//                   className="object-contain p-4 drop-shadow-2xl"
//                   priority={current === 0}
//                 />
//               </div>

//               {/* Product label */}
//               <div className="flex items-center gap-3 mt-4">
//                 <div
//                   className="w-1 h-6 shrink-0 rounded-full"
//                   style={{ background: ORANGE }}
//                 />
//                 <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
//                   {slide.productLabel}
//                 </span>
//               </div>

//               {/* Slide dots */}
//               <div className="flex items-center gap-2 mt-5">
//                 {slides.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrent(idx)}
//                     className={`h-[2px] transition-all duration-500 rounded-full ${current === idx
//                         ? "w-6 bg-[#E8651A]"
//                         : "w-2.5 bg-white/20 hover:bg-white/40"
//                       }`}
//                     aria-label={`Slide ${idx + 1}`}
//                   />
//                 ))}
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* ─── Progress Bar ────────────────────────────────────── */}
//       <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5 z-10">
//         <motion.div
//           className="h-full"
//           style={{ background: ORANGE }}
//           initial={{ width: "0%" }}
//           animate={{ width: "100%" }}
//           key={current}
//           transition={{ duration: 6, ease: "linear" }}
//         />
//       </div>
//     </section>
//   );
// }