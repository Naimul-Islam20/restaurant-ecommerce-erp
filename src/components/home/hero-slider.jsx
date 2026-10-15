"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Container } from "@/components/layout/container";

const AUTO_MS = 6000;

const SLIDES = [
  {
    id: "welcome",
    welcome: "Welcome to ERP17",
    title: "Delicious Food, Unforgettable Taste",
    text: "Authentic Bangladeshi and international dishes, cooked fresh every day in the heart of Uttara.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85",
  },
  {
    id: "kitchen",
    welcome: "Fresh from our kitchen",
    title: "Cooked with Love, Served with Care",
    text: "From slow-cooked kacchi to sizzling grills — every plate is made to order.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=85",
  },
  {
    id: "family",
    welcome: "Dine in or take away",
    title: "A Perfect Place for Family & Friends",
    text: "Cozy seating, warm service and food everyone at the table will enjoy.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85",
  },
];

const arrowClass =
  "h-11 w-11 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:bg-white hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-12 sm:w-12";

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [paused, index]);

  const slide = SLIDES[index];
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIndex((i) => (i + 1) % SLIDES.length);

  return (
    <div
      className="relative h-[32rem] w-full overflow-hidden bg-stone-900 sm:h-[36rem] lg:h-[42rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${index + 1} of ${SLIDES.length}: ${slide.title}`}
      </div>

      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:duration-0 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={s.image}
            alt=""
            fill
            className={`object-cover transition-transform duration-[6000ms] ease-linear motion-reduce:transition-none ${
              i === index ? "scale-110" : "scale-100"
            }`}
            sizes="100vw"
            priority={i === 0}
            fetchPriority={i === 0 ? "high" : "low"}
          />
        </div>
      ))}

      <div
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"
        aria-hidden
      />

      <Container className="relative z-10 flex h-full items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="max-w-2xl sm:pl-14 lg:pl-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="font-[family-name:var(--font-display)] text-2xl italic text-[var(--secondary)] sm:text-3xl">
              {slide.welcome}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold uppercase leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
              {slide.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center rounded-md bg-[var(--primary)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Menu
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-[var(--secondary)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Book a Table
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Side arrows on tablet/desktop */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className={`absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 sm:inline-flex lg:left-8 ${arrowClass}`}
      >
        <LuChevronLeft className="h-6 w-6" aria-hidden />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className={`absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 sm:inline-flex lg:right-8 ${arrowClass}`}
      >
        <LuChevronRight className="h-6 w-6" aria-hidden />
      </button>

      {/* Arrows at the bottom on mobile */}
      <div className="absolute bottom-5 right-4 z-10 flex gap-2 sm:hidden">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className={`inline-flex ${arrowClass}`}
        >
          <LuChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className={`inline-flex ${arrowClass}`}
        >
          <LuChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
