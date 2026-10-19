import Link from "next/link";
import { LuClock, LuPhone, LuTruck } from "react-icons/lu";
import { Container } from "@/components/layout/container";
import { TrackOrderForm } from "@/components/order/track-order-form";

export const metadata = {
  title: "Track Order",
  description: "Track your ERP17 Restaurant order live — from our kitchen to your door.",
};

export default function TrackOrderPage() {
  return (
    <div className="bg-[var(--surface)]">
      <section className="bg-[var(--primary)]">
        <Container className="py-12 text-center sm:py-16">
          <p className="text-xs font-medium text-white/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span>Track Order</span>
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-white sm:text-5xl">
            Track Your Order
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            See where your food is — from our kitchen to your door.
          </p>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <TrackOrderForm />

          <aside className="space-y-4 self-start">
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-stone-900">Need help?</h2>
              <p className="mt-1 text-sm text-stone-500">
                Our team can check your order and talk to your rider.
              </p>
              <a
                href="tel:+8801786493740"
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white"
              >
                <LuPhone className="h-4 w-4" aria-hidden />
                +88017 86 493 740
              </a>
            </div>

            <div className="space-y-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                  <LuTruck className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-stone-900">Delivery time</p>
                  <p className="text-sm text-stone-500">
                    30–45 min in Uttara, up to 90 min across Dhaka
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                  <LuClock className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-stone-900">Delivery hours</p>
                  <p className="text-sm text-stone-500">Daily, 12 PM – 10:30 PM</p>
                </div>
              </div>
              <Link
                href="/shipping-policy"
                className="block text-sm font-semibold text-[var(--primary)]"
              >
                Read our delivery policy →
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
