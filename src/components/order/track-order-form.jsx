"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LuBike,
  LuChefHat,
  LuCircleCheck,
  LuClipboardCheck,
  LuPackageCheck,
  LuPhone,
  LuSearch,
} from "react-icons/lu";
import { formatPrice } from "@/lib/format";
import { getProductBySlug } from "@/lib/products";

const STEPS = [
  { id: "placed", label: "Order placed", icon: LuClipboardCheck },
  { id: "confirmed", label: "Confirmed", icon: LuCircleCheck },
  { id: "cooking", label: "Cooking", icon: LuChefHat },
  { id: "on-the-way", label: "On the way", icon: LuBike },
  { id: "delivered", label: "Delivered", icon: LuPackageCheck },
];

// Demo orders until tracking is connected to the order system.
const DEMO_ORDERS = {
  "ERP-10501": {
    step: 3,
    eta: "Arriving in about 15 minutes",
    times: ["1:40 PM", "1:42 PM", "1:45 PM", "2:05 PM", null],
    rider: { name: "Rahim Uddin", phone: "+8801700000000" },
    address: "House 12, Road 7, Sector 7, Uttara",
    items: [
      { slug: "dhaka-kacchi-biryani", qty: 2 },
      { slug: "mango-lassi", qty: 2 },
    ],
  },
  "ERP-10482": {
    step: 4,
    eta: "Delivered on 12 Oct at 8:32 PM",
    times: ["7:50 PM", "7:52 PM", "7:55 PM", "8:15 PM", "8:32 PM"],
    rider: { name: "Karim Hossain", phone: "+8801700000001" },
    address: "Flat 4B, Road 3, Sector 3, Uttara",
    items: [
      { slug: "butter-chicken", qty: 1 },
      { slug: "beef-seekh-kebab", qty: 1 },
      { slug: "masala-chai", qty: 2 },
    ],
  },
};

function normaliseOrderId(value) {
  const digits = value.replace(/\D/g, "");
  return digits ? `ERP-${digits}` : "";
}

export function TrackOrderForm() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); // { id, order } | { id, notFound: true }

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = normaliseOrderId(orderId);
    if (!id) {
      setError("Please enter your order number.");
      setResult(null);
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter the phone number used for the order.");
      setResult(null);
      return;
    }
    setError("");
    const order = DEMO_ORDERS[id];
    setResult(order ? { id, order } : { id, notFound: true });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-stone-900">Find your order</h2>
        <p className="mt-1 text-base text-stone-500">
          You&apos;ll find the order number in your SMS or email confirmation.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-stone-700">Order number</span>
            <input
              type="text"
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
              placeholder="e.g. ERP-10501"
              className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-base text-stone-900 outline-none placeholder:text-stone-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15"
              aria-required="true"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-stone-700">Phone number</span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="01XXXXXXXXX"
              className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-base text-stone-900 outline-none placeholder:text-stone-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15"
              aria-required="true"
            />
          </label>
        </div>

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] sm:w-auto"
        >
          <LuSearch className="h-4 w-4" aria-hidden />
          Track order
        </button>
      </form>

      {result?.notFound ? (
        <div className="mt-8 border-t border-stone-200 pt-8 text-center">
          <p className="text-lg font-bold text-stone-900">
            We couldn&apos;t find order #{result.id}
          </p>
          <p className="mt-1 text-sm text-stone-500">
            Check the number and phone, or call us and we&apos;ll look it up for you.
          </p>
          <a
            href="tel:+8801786493740"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-[var(--primary)]"
          >
            <LuPhone className="h-4 w-4" aria-hidden />
            +88017 86 493 740
          </a>
        </div>
      ) : null}

      {result?.order ? <OrderStatus id={result.id} order={result.order} /> : null}
    </div>
  );
}

function OrderStatus({ id, order }) {
  const delivered = order.step === STEPS.length - 1;
  const lines = order.items
    .map((item) => ({ ...item, product: getProductBySlug(item.slug) }))
    .filter((line) => line.product);
  const total = lines.reduce(
    (sum, line) => sum + line.product.price * line.qty,
    0,
  );

  return (
    <div className="mt-8 border-t border-stone-200 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-stone-500">Order #{id}</p>
          <p className="mt-0.5 text-2xl font-bold text-stone-900">{order.eta}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            delivered ? "bg-emerald-500 text-white" : "bg-[var(--secondary)] text-stone-900"
          }`}
        >
          {STEPS[order.step].label}
        </span>
      </div>

      {/* Progress */}
      <ol className="mt-8 grid grid-cols-5 gap-1">
        {STEPS.map(({ id: stepId, label, icon: Icon }, i) => {
          const done = i <= order.step;
          const current = i === order.step && !delivered;
          return (
            <li key={stepId} className="relative flex flex-col items-center text-center">
              {i > 0 ? (
                <span
                  className={`absolute right-1/2 top-5 h-1 w-full -translate-y-1/2 ${
                    i <= order.step ? "bg-[var(--primary)]" : "bg-stone-200"
                  }`}
                  aria-hidden
                />
              ) : null}
              <span
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                  done ? "bg-[var(--primary)] text-white" : "bg-stone-100 text-stone-400"
                } ${current ? "ring-4 ring-[var(--primary)]/20" : ""}`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span
                className={`mt-2 text-[11px] font-semibold leading-tight sm:text-xs ${
                  done ? "text-stone-900" : "text-stone-400"
                }`}
              >
                {label}
              </span>
              <span className="mt-0.5 text-[11px] text-stone-400">
                {order.times[i] ?? "—"}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 grid gap-8 border-t border-stone-200 pt-8 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            {delivered ? "Delivered by" : "Your rider"}
          </p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                <LuBike className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-sm font-bold text-stone-900">{order.rider.name}</span>
            </div>
            {!delivered ? (
              <a
                href={`tel:${order.rider.phone}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)] px-3.5 py-2 text-xs font-semibold text-white"
              >
                <LuPhone className="h-3.5 w-3.5" aria-hidden />
                Call
              </a>
            ) : null}
          </div>
          <p className="mt-3 text-xs text-stone-500">Delivering to</p>
          <p className="text-sm text-stone-800">{order.address}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Order summary
          </p>
          <ul className="mt-2 space-y-2.5">
            {lines.map(({ product, qty }) => (
              <li key={product.slug} className="flex items-center gap-3">
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-stone-200">
                  <Image src={product.images[0]} alt="" fill sizes="36px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1 truncate text-base text-stone-800">
                  {product.name} <span className="text-stone-400">× {qty}</span>
                </span>
                <span className="text-sm font-semibold text-stone-900">
                  {formatPrice(product.price * qty, product.currency)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-stone-200 pt-3 text-sm">
            <span className="text-stone-600">Total</span>
            <span className="font-bold text-[var(--primary)]">{formatPrice(total, "BDT")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
