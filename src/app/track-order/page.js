import Link from "next/link";
import { LuPhone } from "react-icons/lu";
import { Container } from "@/components/layout/container";
import { TrackOrderForm } from "@/components/order/track-order-form";

export const metadata = {
  title: "Track Order",
  description: "Track your ERP17 Restaurant order live — from our kitchen to your door.",
};

export default function TrackOrderPage() {
  return (
    <div className="bg-[var(--surface)]">
      <section className="relative overflow-hidden bg-[var(--primary)]">
        <div
          className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[var(--secondary)]/20 blur-3xl"
          aria-hidden
        />
        <Container className="relative py-10 sm:py-12">
          <p className="text-sm text-white/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            Track Order
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-white sm:text-5xl">
            Where&apos;s my food?
          </h1>
          <p className="mt-2 text-base text-white/80">
            Follow your order live — from our kitchen to your door.
          </p>
        </Container>
      </section>

      <Container className="py-8 sm:py-10">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm sm:p-10">
          <TrackOrderForm />

          <p className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-stone-200 pt-6 text-base text-stone-600">
            <span>Need help with your order?</span>
            <a
              href="tel:+8801786493740"
              className="inline-flex items-center gap-1.5 font-semibold text-[var(--primary)]"
            >
              <LuPhone className="h-4 w-4" aria-hidden />
              +88017 86 493 740
            </a>
            <span className="text-stone-300" aria-hidden>
              ·
            </span>
            <Link href="/shipping-policy" className="font-semibold text-[var(--primary)]">
              Delivery policy
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
