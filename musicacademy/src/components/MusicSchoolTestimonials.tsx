"use client";

import { cn } from "@/lib/utils";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const musicSchoolTestimonials = [
  {
    quote:
      "The instructors focus on fundamentals without limiting creativity. The learning environment feels professional and motivating.",
    name: "Aarav Mehta",
    title: "Piano Student",
  },
  {
    quote:
      "What stood out to me was the structure of the curriculum. Every lesson builds naturally on the previous one.",
    name: "Riya Sharma",
    title: "Vocal Training Student",
  },
  {
    quote:
      "The academy balances technical training with real musical expression. It never feels rushed or superficial.",
    name: "Kunal Verma",
    title: "Guitar Student",
  },
  {
    quote:
      "I noticed a clear improvement in my rhythm and control within a few weeks. The feedback is detailed and honest.",
    name: "Ananya Iyer",
    title: "Drums Student",
  },
  {
    quote:
      "This is one of the few places where music education feels both disciplined and inspiring.",
    name: "Rahul Khanna",
    title: "Music Production Student",
  },
];

export const MusicSchoolTestimonials = () => {
  return (
    <section className="relative flex min-h-90 flex-col items-center justify-center overflow-hidden bg-white font-mono dark:bg-black">
      {/* Heading */}
      <h2 className="relative z-10 mb-10 text-center text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Can you feel the music?
      </h2>

      {/* Background Grid */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#e5e5e5_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#2a2a2a_1px,transparent_1px)]",
        )}
      />

      {/* Vignette Mask */}
      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <InfiniteMovingCards
          items={musicSchoolTestimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  );
};
