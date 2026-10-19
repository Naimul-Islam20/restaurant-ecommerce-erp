"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";

const INITIAL_COUNT = 15; // 3 full rows of 5 on desktop
const INITIAL_COUNT_MOBILE = 16; // 8 full rows of 2 on phones
const LOAD_MORE_COUNT = 8;

const MOBILE_QUERY = "(max-width: 639px)";

function subscribeToMobile(onChange) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribeToMobile,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}

/** Home products: a plain grid that reveals more dishes on demand. */
export function ProductsGridSection({
  products,
  title = "Products",
  ctaLabel = "See all",
  ctaHref = "/shop",
}) {
  const isMobile = useIsMobile();
  const initialCount = isMobile ? INITIAL_COUNT_MOBILE : INITIAL_COUNT;
  const [loads, setLoads] = useState(0);
  const visible = initialCount + loads * LOAD_MORE_COUNT;
  // Items from this index on were just revealed and play the entrance animation.
  const revealFrom =
    loads === 0 ? Infinity : initialCount + (loads - 1) * LOAD_MORE_COUNT;
  // Grid height is animated so the list unrolls and the button slides down.
  const gridRef = useRef(null);
  const [gridHeight, setGridHeight] = useState("auto");

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(() => setGridHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!products.length) return null;

  const shown = products.slice(0, visible);
  const remaining = products.length - shown.length;

  return (
    <section className="border-t border-stone-200 bg-[var(--surface)]">
      <Container className="py-8 sm:py-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-stone-900 sm:text-3xl">
            {title}
          </h2>
          <Link
            href={ctaHref}
            className="text-sm font-medium text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {ctaLabel}
          </Link>
        </div>

        <motion.div
          className="mt-6 overflow-hidden"
          initial={false}
          animate={{ height: gridHeight }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          <ul
            ref={gridRef}
            className="grid grid-cols-2 pb-1 gap-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
          >
            {shown.map((product, i) => {
              const isNew = i >= revealFrom;
              return (
                <motion.li
                  key={product.id}
                  initial={isNew ? { opacity: 0, y: -24 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: isNew ? 0.1 + (i - revealFrom) * 0.06 : 0,
                  }}
                >
                  <ProductCard product={product} />
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        {/* Once everything is shown, the button rides the grid down, then fades. */}
        <AnimatePresence initial={false}>
          {remaining > 0 ? (
            <motion.div
              key="load-more"
              className="mt-10 flex justify-center"
              exit={{ opacity: 0, transition: { delay: 0.8, duration: 0.3 } }}
            >
              <button
                type="button"
                onClick={() => {
                  setLoads((n) => n + 1);
                }}
                className="inline-flex items-center rounded-full border-2 border-[var(--primary)] px-8 py-3 text-sm font-semibold text-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                Load more
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </section>
  );
}
