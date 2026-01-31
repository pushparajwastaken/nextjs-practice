"use client";
import { div } from "motion/react-client";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
const musicschoolContent = [
  {
    title: "Learn Music from Industry Professionals",
    description:
      "Get trained by experienced musicians and certified instructors who guide you through practical techniques, theory, and real-world performance skills.",
  },
  {
    title: "Courses for Every Skill Level",
    description:
      "Whether you are a complete beginner or an advanced musician, our structured courses are designed to help you grow at your own pace.",
  },
  {
    title: "Hands-on Practical Training",
    description:
      "Focus on real playing, live practice sessions, and performance-based learning instead of just theory-heavy lessons.",
  },
  {
    title: "Flexible Learning Schedules",
    description:
      "Attend classes at your convenience with flexible timings, weekend batches, and personalized learning plans.",
  },
  {
    title: "Performance & Certification",
    description:
      "Participate in live performances, workshops, and earn recognized certifications that validate your musical journey.",
  },
];

export const WhyChooseUs = () => {
  return (
    <div>
      <StickyScroll content={musicschoolContent} />
    </div>
  );
};
