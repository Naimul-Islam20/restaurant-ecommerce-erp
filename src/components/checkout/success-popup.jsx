"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/format";

export default function SuccessPopup({ orderId, total }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="bg-[var(--accent)] py-10 px-6 text-center text-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Order placed!</h2>
          <p className="mt-2 text-base text-white/85">
            Order #{orderId}
          </p>
        </div>

        <div className="p-8 text-center">
          <p className="text-base leading-relaxed text-stone-600">
            Thank you for ordering from ERP17 Restaurant! Our kitchen has
            received your order and will start cooking right away. We&apos;ll
            send you an SMS when it&apos;s on the way.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between border-t border-stone-100 pt-4 text-sm">
              <span className="text-base text-stone-500">Total</span>
              <span className="text-lg font-bold text-[var(--primary)]">{formatPrice(total)}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/track-order"
                className="block rounded-full bg-[var(--accent)] py-3.5 text-base font-semibold text-white"
              >
                Track order
              </Link>
              <Link
                href="/shop"
                className="block rounded-full border border-stone-300 py-3.5 text-base font-semibold text-stone-800"
              >
                Back to menu
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
