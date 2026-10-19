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
  "h-9 w-9 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:bg-white hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-12 sm:w-12 bg-black/20 sm:bg-transparent";

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
      className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900 sm:aspect-auto sm:h-[36rem] lg:h-[42rem]"
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
              i === index ? "sm:scale-110" : "scale-100"
            }`}
            sizes="100vw"
            priority={i === 0}
            fetchPriority={i === 0 ? "high" : "low"}
          />
        </div>
      ))}

      <div
        className="absolute inset-0 bg-black/35 sm:bg-transparent sm:bg-gradient-to-r sm:from-black/80 sm:via-black/50 sm:to-black/20"
        aria-hidden
      />

      <Container className="relative z-10 flex h-full items-end justify-center pb-5 sm:items-center sm:justify-start sm:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="max-w-2xl sm:pl-14 lg:pl-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="hidden font-[family-name:var(--font-display)] text-3xl italic text-[var(--secondary)] sm:block">
              {slide.welcome}
            </p>
            <h1 className="sr-only sm:not-sr-only sm:mt-3 sm:block sm:text-5xl sm:font-extrabold sm:uppercase sm:leading-[1.1] sm:text-white lg:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-5 hidden max-w-lg text-lg leading-relaxed text-white/80 sm:block">
              {slide.text}
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:mt-8 sm:justify-start sm:gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center rounded-md bg-[var(--primary)] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white sm:px-8 sm:py-4 sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Menu
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-[var(--secondary)] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-900 sm:px-8 sm:py-4 sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Book a Table
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Side arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className={`absolute left-2 top-1/2 z-10 inline-flex -translate-y-1/2 sm:left-4 lg:left-8 ${arrowClass}`}
      >
        <LuChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className={`absolute right-2 top-1/2 z-10 inline-flex -translate-y-1/2 sm:right-4 lg:right-8 ${arrowClass}`}
      >
        <LuChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
      </button>

    </div>
  );
}
