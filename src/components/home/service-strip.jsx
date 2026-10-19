"use client";

import { useEffect, useRef } from "react";
import { LuBanknote, LuChefHat, LuSmile, LuTruck } from "react-icons/lu";
import { Container } from "@/components/layout/container";

const ITEMS = [
  {
    title: "Delivery charge",
    text: "Halishahar ৳40 · Chittagong ৳80",
    icon: LuTruck,
  },
  {
    title: "Cooked to order",
    text: "Fresh, never reheated",
    icon: LuChefHat,
  },
  {
    title: "Cash on delivery",
    text: "Pay when your food arrives",
    icon: LuBanknote,
  },
  {
    title: "1,000+ happy guests",
    text: "Dine-in & delivery",
    icon: LuSmile,
  },
];

function PromiseCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex h-full items-center gap-4 rounded-xl border border-stone-200 bg-white px-5 py-4">
      <Icon
        className="h-7 w-7 shrink-0 text-[var(--primary)]"
        strokeWidth={1.75}
        aria-hidden
      />
      <div className="min-w-0">
        <p className="text-[15px] font-semibold leading-snug text-stone-900">
          {item.title}
        </p>
        <p className="mt-0.5 text-[13px] leading-snug text-stone-500">
          {item.text}
        </p>
      </div>
    </div>
  );
}

export function ServiceStrip() {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let paused = false;
    let timer;

    const advance = () => {
      const first = el.querySelector("li");
      if (!paused && !reduceMotion.matches && first && el.clientWidth > 0) {
        const step = first.getBoundingClientRect().width;
        const max = el.scrollWidth - el.clientWidth;
        const next = el.scrollLeft + step;
        el.scrollTo({
          left: next >= max + step / 2 ? 0 : Math.min(next, max),
          behavior: "smooth",
        });
      }
      timer = window.setTimeout(advance, 2800);
    };

    const pause = () => {
      paused = true;
      window.clearTimeout(timer);
    };
    const resume = () => {
      if (!paused) return;
      paused = false;
      window.clearTimeout(timer);
      timer = window.setTimeout(advance, 2800);
    };

    timer = window.setTimeout(advance, 2800);
    el.addEventListener("pointerdown", pause);
    window.addEventListener("pointerup", resume);
    window.addEventListener("pointercancel", resume);

    return () => {
      window.clearTimeout(timer);
      el.removeEventListener("pointerdown", pause);
      window.removeEventListener("pointerup", resume);
      window.removeEventListener("pointercancel", resume);
    };
  }, []);

  return (
    <section aria-label="Our promises" className="bg-[var(--surface)]">
      <Container className="py-6 sm:py-8">
        {/* Mobile: one card with a peek of the next, auto-advancing */}
        <div
          ref={scrollerRef}
          className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain scrollbar-none sm:hidden"
        >
          <ul className="flex">
            {ITEMS.map((item) => (
              <li
                key={item.title}
                className="w-[85%] shrink-0 snap-start pr-3"
              >
                <PromiseCard item={item} />
              </li>
            ))}
          </ul>
        </div>

        <ul className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {ITEMS.map((item) => (
            <li key={item.title}>
              <PromiseCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
