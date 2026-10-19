"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/container";

const LINKS = [
  { href: "/exchange-refund", label: "Refund & Replacement" },
  { href: "/return-policy", label: "Cancellation Policy" },
  { href: "/shipping-policy", label: "Delivery Policy" },
  { href: "/faqs", label: "FAQs" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

/** One titled block inside an information page. */
export function InfoSection({ title, children }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-lg font-bold text-stone-900 sm:text-xl">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function InfoPage({ title, intro, updated = "1 October 2026", children }) {
  const pathname = usePathname();
  const activeTabRef = useRef(null);

  // On phones the tab row scrolls sideways; bring the current tab into view.
  useEffect(() => {
    activeTabRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [pathname]);

  return (
    <div className="bg-[var(--surface)]">
      <section className="bg-[var(--primary)]">
        <Container className="py-10 text-center sm:py-12">
          <p className="text-xs font-medium text-white/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span>Information</span>
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-white sm:text-5xl">
            {title}
          </h1>
          {intro ? (
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {intro}
            </p>
          ) : null}
        </Container>
      </section>

      {/* Tabs */}
      <nav
        aria-label="Information pages"
        className="border-b border-stone-200 bg-white"
      >
        <Container>
          <ul className="-mx-3 flex gap-2 overflow-x-auto px-3 py-3 scrollbar-none sm:justify-center">
            {LINKS.map((item) => {
              const active = pathname === item.href;
              return (
                <li
                  key={item.href}
                  ref={active ? activeTabRef : undefined}
                  className="shrink-0"
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[var(--primary)] text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>

      <Container className="py-8 sm:py-10">
        <article className="mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-white p-6 text-sm leading-relaxed text-stone-700 sm:p-10 sm:text-base [&_li]:marker:text-[var(--primary)] [&_strong]:font-semibold [&_strong]:text-stone-900">
          {children}
          <p className="mt-10 border-t border-stone-100 pt-5 text-xs text-stone-400">
            Last updated: {updated}. Questions? Call{" "}
            <a href="tel:+8801786493740" className="text-[var(--primary)]">
              +88017 86 493 740
            </a>{" "}
            or email{" "}
            <a
              href="mailto:support@erp17restaurant.com"
              className="text-[var(--primary)]"
            >
              support@erp17restaurant.com
            </a>
            .
          </p>
        </article>
      </Container>
    </div>
  );
}
