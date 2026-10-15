"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuArrowRight,
  LuCalendarCheck,
  LuClock,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";
import { BrandLogo } from "@/components/layout/brand-logo";
import { ChromeContainer } from "@/components/layout/container";

const OPENING_HOURS = [
  { days: "Saturday – Thursday", time: "12:00 PM – 11:00 PM" },
  { days: "Friday", time: "2:30 PM – 11:30 PM" },
  { days: "Kitchen last order", time: "30 min before close" },
];

const EXPLORE_LINKS = [
  { href: "/shop", label: "Our Menu" },
  { href: "/collections", label: "Chef's Specials" },
  { href: "/about-us", label: "Our Story" },
  { href: "/contact", label: "Reservations" },
  { href: "/track-order", label: "Track Your Order" },
  { href: "/faqs", label: "FAQs" },
];

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/exchange-refund", label: "Refunds" },
  { href: "/shipping-policy", label: "Delivery" },
  { href: "/return-policy", label: "Returns" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  },
  {
    label: "Instagram",
    path: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 2.127h-.396c-2.36 0-2.687.01-3.603.052-.97.044-1.5.203-1.85.34a2.775 2.775 0 00-1.023.666 2.775 2.775 0 00-.667 1.023c-.135.35-.296.88-.34 1.85-.042.916-.052 1.243-.052 3.603v.396c0 2.36.01 2.687.052 3.603.044.97.203 1.5.34 1.85.132.343.326.638.667.93a2.775 2.775 0 001.023.667c.35.135.88.296 1.85.34.916.042 1.243.052 3.603.052h.396c2.36 0 2.687-.01 3.603-.052.97-.044 1.5-.203 1.85-.34.343-.132.638-.326.93-.667.31-.344.536-.677.667-1.023.135-.35.296-.88.34-1.85.042-.916.052-1.243.052-3.603v-.396c0-2.36-.01-2.687-.052-3.603-.044-.97-.203-1.5-.34-1.85a2.775 2.775 0 00-.667-1.023 2.775 2.775 0 00-1.023-.666c-.35-.135-.88-.296-1.85-.34-.916-.042-1.243-.052-3.603-.052zM12 7.765a4.235 4.235 0 100 8.47 4.235 4.235 0 000-8.47zm0 6.343a2.108 2.108 0 110-4.216 2.108 2.108 0 010 4.216zm6.118-6.903a1.102 1.102 0 11-2.203 0 1.102 1.102 0 012.203 0z",
  },
  {
    label: "YouTube",
    path: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z",
  },
  {
    label: "TikTok",
    path: "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V15.5c0 1.42-.45 2.79-1.31 3.89-1.98 2.6-5.4 3.65-8.47 2.65-3.07-1-5.11-3.8-5.11-7.04 0-3.24 2.04-6.04 5.11-7.04 1.62-.53 3.39-.44 4.93.26l.01 4.09c-1.3-.61-2.84-.66-4.18-.14-1.34.52-2.31 1.66-2.5 3.09-.19 1.43.34 2.87 1.43 3.84 1.09.97 2.58 1.27 3.96.79 1.38-.48 2.33-1.74 2.34-3.2l.01-16.59z",
  },
];

function FooterHeading({ children }) {
  return (
    <h3 className="mb-5 flex items-center gap-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
      {children}
      <span className="h-px w-8 bg-[var(--secondary)]/60" aria-hidden />
    </h3>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (pathname === "/account") return null;

  return (
    <footer
      className={`maaleen-footer-mobile-extend bg-[var(--ink)] text-white/80 ${
        isAuthPage ? "mt-0" : "mt-16"
      }`}
    >
      {/* Reservation banner */}
      <div className="border-b border-[var(--secondary)]/25 bg-black/20">
        <ChromeContainer>
          <div className="flex flex-col items-center gap-6 py-10 text-center md:flex-row md:justify-between md:text-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--secondary)]">
                Reserve your evening
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
                A table is waiting for you
              </p>
              <p className="mt-2 text-sm text-white/65">
                Dine in with family and friends, or have the kitchen deliver to
                your door.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--secondary)] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)] transition-colors hover:bg-[#f8c76f]"
              >
                <LuCalendarCheck className="h-4 w-4" aria-hidden />
                Book a table
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--secondary)]/70 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--secondary)] transition-colors hover:bg-white/10"
              >
                Order online
                <LuArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </ChromeContainer>
      </div>

      <ChromeContainer>
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex"
              aria-label="ERP17 Restaurant home"
            >
              <BrandLogo
                markClassName="h-12 w-auto"
                nameClassName="text-3xl"
                taglineClassName="text-[10px] text-white/55"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Seasonal plates cooked from scratch in our Uttara kitchen —
              starters, mains, desserts and drinks for dine-in and delivery.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--secondary)]/40 text-[var(--secondary)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Opening hours */}
          <div>
            <FooterHeading>Opening Hours</FooterHeading>
            <ul className="space-y-3.5 text-sm">
              {OPENING_HOURS.map((row) => (
                <li
                  key={row.days}
                  className="flex items-start gap-3 border-b border-dashed border-white/15 pb-3.5 last:border-b-0 last:pb-0"
                >
                  <LuClock
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--secondary)]"
                    aria-hidden
                  />
                  <span>
                    <span className="block font-semibold text-white">
                      {row.days}
                    </span>
                    <span className="text-white/65">{row.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit us */}
          <div>
            <FooterHeading>Visit Us</FooterHeading>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <LuMapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--secondary)]"
                  aria-hidden
                />
                <span className="leading-relaxed">
                  House #1/A, Road #6, Sector #3
                  <br />
                  Uttara Model Town, Dhaka-1230
                </span>
              </li>
              <li>
                <a
                  href="tel:+8801786493740"
                  className="flex items-center gap-3 transition-colors hover:text-[var(--secondary)]"
                >
                  <LuPhone
                    className="h-4 w-4 shrink-0 text-[var(--secondary)]"
                    aria-hidden
                  />
                  +88017 86 493 740
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@maaleen.store"
                  className="flex items-center gap-3 transition-colors hover:text-[var(--secondary)]"
                >
                  <LuMail
                    className="h-4 w-4 shrink-0 text-[var(--secondary)]"
                    aria-hidden
                  />
                  support@maaleen.store
                </a>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <FooterHeading>Explore</FooterHeading>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-1">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-[var(--secondary)]"
                  >
                    <span
                      className="h-1 w-1 rounded-full bg-[var(--secondary)]/70 transition-all group-hover:w-3"
                      aria-hidden
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-3 border-t border-white/15 py-6 text-xs text-white/55 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} Maaleen Kitchen &amp; Dining. All
            rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[var(--secondary)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ChromeContainer>
      <FloatingBackToTop />
    </footer>
  );
}

function FloatingBackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-6 sm:bottom-8 sm:right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--accent)] shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Back to top"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
