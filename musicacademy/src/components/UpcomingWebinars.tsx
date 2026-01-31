"use client";
import Link from "next/link";
import { HoverEffect } from "./ui/card-hover-effect";
export const UpcomingWebinars = () => {
  const featuredWebinars = [
    {
      title: "Foundations of Indian Classical Music",
      description:
        "An in-depth session covering the basics of swar, raga, and tala, designed for beginners and early-stage learners.",
      slug: "foundations-of-indian-classical-music",
      isFeatured: true,
    },
    {
      title: "Vocal Training: Breath, Pitch, and Control",
      description:
        "Learn essential vocal techniques to improve breath control, pitch accuracy, and overall vocal strength.",
      slug: "vocal-training-breath-pitch-control",
      isFeatured: true,
    },
    {
      title: "Introduction to Western Music Theory",
      description:
        "A beginner-friendly webinar exploring scales, chords, and harmony in Western music.",
      slug: "introduction-to-western-music-theory",
      isFeatured: false,
    },
    {
      title: "Mastering Rhythm and Timing",
      description:
        "Understand rhythm patterns, tempo, and timing techniques crucial for both instrumentalists and vocalists.",
      slug: "mastering-rhythm-and-timing",
      isFeatured: true,
    },
    {
      title: "Stage Performance and Confidence for Musicians",
      description:
        "Practical guidance on stage presence, managing performance anxiety, and connecting with your audience.",
      slug: "stage-performance-confidence-for-musicians",
      isFeatured: false,
    },
    {
      title: "Building a Daily Practice Routine",
      description:
        "Learn how to structure an effective daily practice routine to achieve consistent musical progress.",
      slug: "building-daily-practice-routine",
      isFeatured: false,
    },
  ];

  return (
    <div className="p-12 bg-black font-mono text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide uppercase">
            Featured Webinars
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
            Enhance Your Musical Journey
          </p>
        </div>
        <div className="mt-10 ">
          <HoverEffect
            items={featuredWebinars.map((webinar) => ({
              title: webinar.title,
              description: webinar.description,
              link: `/webinar/${webinar.slug}`,
            }))}
          />
        </div>
        <div className="mt-10 text-center">
          <Link
            href={"/"}
            className="px-4 py-2 border rounded-md border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200"
          >
            View all Webinars
          </Link>
        </div>
      </div>
    </div>
  );
};
