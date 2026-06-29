


// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence, useAnimate, stagger } from "framer-motion";

// export default function SplashScreen() {
//   const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
//   const [gone, setGone] = useState(false);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     // 600ms intro → hold → 2600ms start exit → 3200ms unmount
//     const t1 = setTimeout(() => setPhase("hold"), 600);
//     const t2 = setTimeout(() => setPhase("out"), 2600);
//     const t3 = setTimeout(() => {
//       setGone(true);
//       document.body.style.overflow = "unset";
//     }, 3350);

//     return () => {
//       [t1, t2, t3].forEach(clearTimeout);
//       document.body.style.overflow = "unset";
//     };
//   }, []);

//   if (gone) return null;

//   return (
//     <AnimatePresence>
//       {phase !== "out" ? (
//         // ── MAIN SPLASH ─────────────────────────────────────────
//         <motion.div
//           key="splash"
//           className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
//           style={{ background: "#E8651A" }}
//           initial={{ opacity: 1 }}
//           exit={{ opacity: 0, transition: { duration: 0.15 } }}
//         >
//           {/* Grid lines */}
//           {[33, 66].map((pct) => (
//             <React.Fragment key={pct}>
//               <div className="absolute left-0 right-0 h-px pointer-events-none" style={{ top: `${pct}%`, background: "rgba(255,255,255,0.07)" }} />
//               <div className="absolute top-0 bottom-0 w-px pointer-events-none" style={{ left: `${pct}%`, background: "rgba(255,255,255,0.07)" }} />
//             </React.Fragment>
//           ))}

//           {/* Corner brackets */}
//           {[
//             "top-5 left-5 border-t border-l",
//             "top-5 right-5 border-t border-r",
//             "bottom-5 left-5 border-b border-l",
//             "bottom-5 right-5 border-b border-r",
//           ].map((cls, i) => (
//             <motion.div
//               key={i}
//               className={`absolute w-10 h-10 pointer-events-none ${cls}`}
//               style={{ borderColor: "rgba(255,255,255,0.22)", borderWidth: "1.5px" }}
//               initial={{ opacity: 0, scale: 0.7 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//             />
//           ))}

//           {/* Center content */}
//           <div className="relative z-10 flex flex-col items-center">

//             {/* Outer pulse rings */}
//             <motion.div
//               className="absolute rounded-full pointer-events-none"
//               style={{ width: 230, height: 230, border: "1px solid rgba(255,255,255,0.15)" }}
//               initial={{ scale: 0.7, opacity: 0 }}
//               animate={{ scale: 1.25, opacity: [0, 0.5, 0] }}
//               transition={{ delay: 0.3, duration: 1.4, ease: "easeOut" }}
//             />
//             <motion.div
//               className="absolute rounded-full pointer-events-none"
//               style={{ width: 230, height: 230, border: "1px solid rgba(255,255,255,0.08)" }}
//               initial={{ scale: 0.5, opacity: 0 }}
//               animate={{ scale: 1.5, opacity: [0, 0.3, 0] }}
//               transition={{ delay: 0.5, duration: 1.6, ease: "easeOut" }}
//             />

//             {/* Logo ring */}
//             <motion.div
//               className="relative flex items-center justify-center rounded-full shadow-2xl"
//               style={{
//                 width: 170, height: 170,
//                 background: "rgba(255,255,255,0.12)",
//                 border: "2px solid rgba(255,255,255,0.28)",
//               }}
//               initial={{ scale: 0, rotate: -15, opacity: 0 }}
//               animate={{ scale: 1, rotate: 0, opacity: 1 }}
//               transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//             >
//               {/* White inner circle */}
//               <motion.div
//                 className="flex items-center justify-center rounded-full bg-white shadow-inner"
//                 style={{ width: 124, height: 124 }}
//                 initial={{ scale: 0.5 }}
//                 animate={{ scale: 1 }}
//                 transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//               >
//                 <span
//                   className="font-black leading-none select-none flex items-center justify-center"
//                   style={{ fontSize: 38, color: "#E8651A", letterSpacing: "-0.04em" }}
//                 >
//                   <Image src="/ARKA-LOGO-Print-Color.png" alt="Arka Crete" width={80} height={80} className="object-contain" />
//                 </span>
//               </motion.div>
//             </motion.div>

//             {/* Brand name */}
//             <motion.div
//               className="mt-6 text-center"
//               initial={{ opacity: 0, y: 14 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//             >
//               <div
//                 className="font-black text-white tracking-tight leading-none"
//                 style={{ fontSize: 32, letterSpacing: "-0.025em" }}
//               >
//                 ARKA CRETE
//               </div>
//               <div
//                 className="mt-2 font-semibold uppercase text-center"
//                 style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)" }}
//               >
//                 Supplements LLP
//               </div>
//             </motion.div>

//             {/* Divider line + tagline */}
//             <motion.div
//               className="mt-6 flex flex-col items-center gap-3"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.55, duration: 0.5 }}
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.3)" }} />
//                 <span
//                   className="font-medium"
//                   style={{ fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase" }}
//                 >
//                   Your Strength, Our Priority
//                 </span>
//                 <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.3)" }} />
//               </div>
//             </motion.div>
//           </div>

//           {/* Progress bar */}
//           <motion.div
//             className="absolute bottom-0 left-0 right-0 h-[3px]"
//             style={{ background: "rgba(0,0,0,0.15)" }}
//           >
//             <motion.div
//               className="h-full"
//               style={{ background: "rgba(255,255,255,0.55)" }}
//               initial={{ width: "0%" }}
//               animate={{ width: "100%" }}
//               transition={{ delay: 0.2, duration: 2.2, ease: "linear" }}
//             />
//           </motion.div>
//         </motion.div>
//       ) : (
//         // ── EXIT — curtain lifts up revealing the page ──────────
//         <motion.div
//           key="curtain"
//           className="fixed inset-0 z-[9999] pointer-events-none"
//           style={{ background: "#E8651A" }}
//           initial={{ y: 0 }}
//           animate={{ y: "-100%" }}
//           transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
//         />
//       )}
//     </AnimatePresence>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
          style={{
            background: "linear-gradient(145deg, #FDE2D4 0%, #FAD6C0 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle background texture (optional) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.6) 0%, transparent 60%)",
            }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Logo with glow */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.02 }} // subtle hover (if you want, can remove)
            >
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background: "rgba(255, 165, 100, 0.25)",
                  transform: "scale(1.3)",
                }}
              />
              <div
                className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[380px] md:h-[180px]"
              >
                <Image
                  src="/ARKA logo.png"
                  alt="ARKA CRETE"
                  fill
                  priority
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </motion.div>

            {/* Brand name (optional – can be placed below) */}
            {/* <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                className="text-2xl font-bold tracking-tight text-[#B45F3A]"
                style={{ letterSpacing: "-0.02em" }}
              >
                ARKA CRETE
              </h1>
              <p
                className="text-xs font-medium uppercase tracking-[0.2em] text-[#B45F3A]/60"
              >
                Supplements LLP
              </p>
            </motion.div> */}

            {/* Tagline with subtle divider */}
            <motion.div
              className="flex items-center gap-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="w-8 h-px bg-[#B45F3A]/20" />
              <span
                className="text-xs font-medium tracking-[0.12em] text-[#B45F3A]/70 uppercase"
              >
                Your Strength, Our Priority
              </span>
              <div className="w-8 h-px bg-[#B45F3A]/20" />
            </motion.div>
          </div>

          {/* Progress bar – subtle indicator */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/5"
          >
            <motion.div
              className="h-full bg-[#B45F3A]/40"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 2.3, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}