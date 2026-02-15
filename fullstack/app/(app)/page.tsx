"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";

import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 space-y-12">
      {/* 🔹 Hero Section */}
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-5xl font-bold tracking-tight">
          Send & Receive Anonymous Messages 💬
        </h1>

        <p className="text-muted-foreground text-lg">
          Share your unique link and receive honest messages from anyone —
          completely anonymous.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Link href="/sign-up">
            <Button size="lg">Get Started</Button>
          </Link>

          <Link href="/sign-in">
            <Button variant="outline" size="lg">
              Login
            </Button>
          </Link>
        </div>
      </div>

      {/* 🔹 Carousel Section */}
      <Carousel className="w-full max-w-3xl">
        <CarouselContent>
          {/* Slide 1 */}
          <CarouselItem>
            <div className="p-8 border rounded-xl text-center space-y-2">
              <h3 className="text-xl font-semibold">Honest Feedback</h3>
              <p className="text-muted-foreground">
                Receive real opinions from friends without fear or pressure.
              </p>
            </div>
          </CarouselItem>

          {/* Slide 2 */}
          <CarouselItem>
            <div className="p-8 border rounded-xl text-center space-y-2">
              <h3 className="text-xl font-semibold">100% Anonymous</h3>
              <p className="text-muted-foreground">
                No names, no identity — just pure honesty.
              </p>
            </div>
          </CarouselItem>

          {/* Slide 3 */}
          <CarouselItem>
            <div className="p-8 border rounded-xl text-center space-y-2">
              <h3 className="text-xl font-semibold">Share Anywhere</h3>
              <p className="text-muted-foreground">
                Post your link on Instagram, WhatsApp, or Snapchat.
              </p>
            </div>
          </CarouselItem>

          {/* Slide 4 */}
          <CarouselItem>
            <div className="p-8 border rounded-xl text-center space-y-2">
              <h3 className="text-xl font-semibold">Safe & Private</h3>
              <p className="text-muted-foreground">
                You control whether messages are accepted or not.
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* 🔹 Footer */}
      <p className="text-sm text-muted-foreground">
        Built with ❤️ for honest conversations
      </p>
    </div>
  );
};

export default Page;
