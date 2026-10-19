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
    id: "flavours",
    title: "Real Chittagong flavours, *made fresh* every day",
    text: "Slow-cooked kacchi, charcoal kebabs and warm desserts from our Halishahar kitchen.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85",
  },
  {
    id: "delivery",
    title: "Hot food from our kitchen *to your door*",
    text: "Order online and get it delivered across Chittagong — usually in 30–45 minutes in Halishahar.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=85",
  },
  {
    id: "together",
    title: "A table for family, friends & *good food*",
    text: "A cozy dining room with a family area — book your table in seconds.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85",
  },
];

/** Splits a title into words; words inside *...* are highlighted. */
function titleWords(title) {
  return title.split(/(\*[^*]+\*)/).flatMap((part) => {
    const highlight = part.startsWith("*");
    return part
      .replaceAll("*", "")
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, highlight }));
  });
}

// Text animation: each line is wiped in from left to right (curtain reveal),
// one after another. On slide change the text wipes out to the right.
const curtain = [0.77, 0, 0.175, 1];
const textBlock = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.2 } },
  exit: { transition: { staggerChildren: 0.06 } },
};
const wipe = {
  hidden: { clipPath: "inset(0 100% 0 0)", x: -12 },
  show: {
    clipPath: "inset(0 0% 0 0)",
    x: 0,
    transition: { duration: 1, ease: curtain },
    // Drop the clip once revealed so focus rings aren't cut off.
    transitionEnd: { clipPath: "none" },
  },
  exit: {
    clipPath: "inset(0 0 0 100%)",
    transition: { duration: 0.45, ease: curtain },
  },
};

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
        {`Slide ${index + 1} of ${SLIDES.length}: ${slide.title.replaceAll("*", "")}`}
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
            className="w-full max-w-5xl sm:pl-14 lg:pl-0"
            variants={textBlock}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.h1
              variants={wipe}
              className="sr-only pb-1 sm:not-sr-only sm:block sm:max-w-3xl sm:text-5xl sm:font-extrabold sm:leading-[1.1] sm:tracking-tight sm:text-white lg:text-6xl"
            >
              {titleWords(slide.title).map(({ word, highlight }, i) => (
                <span
                  key={`${word}-${i}`}
                  className={highlight ? "text-[var(--secondary)]" : undefined}
                >
                  {word}{" "}
                </span>
              ))}
            </motion.h1>
            <motion.p
              variants={wipe}
              className="mt-5 hidden max-w-2xl text-lg leading-relaxed text-white/85 sm:block lg:text-xl"
            >
              {slide.text}
            </motion.p>
            <motion.div
              variants={wipe}
              className="flex flex-wrap justify-center gap-3 sm:mt-9 sm:justify-start sm:gap-4"
            >
              <Link
                href="/shop"
                className="inline-flex items-center rounded-full bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-white sm:px-8 sm:py-3.5 sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore menu
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/80 bg-black/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm sm:px-8 sm:py-3.5 sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Book a table
              </Link>
            </motion.div>
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
