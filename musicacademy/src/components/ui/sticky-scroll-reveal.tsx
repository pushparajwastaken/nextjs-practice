"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, i) => i / cardLength);
    const closestIndex = breakpoints.reduce((acc, bp, i) => {
      return Math.abs(latest - bp) < Math.abs(latest - breakpoints[acc])
        ? i
        : acc;
    }, 0);

    setActiveCard(closestIndex);
  });

  /* ===============================
     Premium Dark System
  =============================== */

  const backgroundColors = ["#0B0D10", "#0F1115", "#111318", "#0E1014"];

  const gradients = [
    "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    "linear-gradient(135deg, #141e30, #243b55)",
    "linear-gradient(135deg, #232526, #414345)",
    "linear-gradient(135deg, #000000, #1a1a1a)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(gradients[0]);

  useEffect(() => {
    setBackgroundGradient(gradients[activeCard % gradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      ref={ref}
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative flex font-mono h-[32rem] gap-10 overflow-y-auto justify-center rounded-2xl px-10 py-14"
    >
      {/* LEFT CONTENT */}
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={index} className="my-24">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.35 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-2xl font-semibold tracking-tight text-white"
              >
                {item.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.35 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-6 max-w-sm text-sm leading-relaxed text-white/70"
              >
                {item.description}
              </motion.p>
            </div>
          ))}

          {/* spacer */}
          <div className="h-40" />
        </div>
      </div>

      {/* RIGHT STICKY CARD */}
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-64 w-80 rounded-xl lg:block",
          "border border-white/10 backdrop-blur-xl",
          "shadow-[0_25px_80px_rgba(0,0,0,0.65)]",
          contentClassName,
        )}
      >
        {content[activeCard]?.content ?? null}
      </div>
    </motion.div>
  );
};
