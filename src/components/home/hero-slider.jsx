"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { buildShopEditHref } from "@/data/shop-edits";

const AUTO_MS = 6000;

const SLIDES = [
  {
    id: "1",
    title: "Dinner from the Maaleen kitchen",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85",
    imageAlt: "",
    shopHref: "/shop",
  },
  {
    id: "2",
    title: "House mains, plated to order",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1920&q=85",
    imageAlt: "",
    shopHref: buildShopEditHref("outer-layers"),
  },
  {
    id: "3",
    title: "New plates from the kitchen",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=85",
    imageAlt: "",
    shopHref: buildShopEditHref("new-arrivals"),
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [paused]);

  const slide = SLIDES[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[28rem] w-full overflow-hidden rounded-md sm:h-[34rem] lg:h-[40rem]">
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {`Slide ${index + 1} of ${SLIDES.length}: ${slide.title}`}
        </div>

        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:duration-0 ${
              i === index ? "z-0 opacity-100" : "z-0 opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "low"}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-stone-950/15 to-transparent"
              aria-hidden
            />
          </div>
        ))}

        <Container className="relative z-10 flex h-full flex-col items-center justify-end pb-16 sm:pb-20 lg:pb-24">
          <Link
            href={slide.shopHref}
            className="inline-flex rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Shop now
          </Link>
        </Container>

        <div
          className="absolute inset-x-0 bottom-0 z-10 pb-6 sm:pb-8"
          role="tablist"
          aria-label="Hero slides"
        >
          <Container>
            <div className="flex justify-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}: ${s.title}`}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    i === index
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
