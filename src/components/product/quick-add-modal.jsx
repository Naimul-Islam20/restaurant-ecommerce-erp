"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";
import { formatPrice } from "@/lib/format";
import { getCategoryLabel } from "@/lib/products";
import { sizeOptionLabel } from "@/lib/size-chart";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function OptionGroup({ label, options, value, onChange, renderLabel }) {
  return (
    <fieldset className="mt-5">
      <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
        {label}
      </legend>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={selected}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selected
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-stone-300 bg-white text-stone-700 hover:border-[var(--primary)]"
              }`}
            >
              {renderLabel ? renderLabel(option) : option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function QuickAddModal({ product, onClose }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);
  // Flipped to false to play the exit animation; onClose runs once it ends.
  const [visible, setVisible] = useState(true);
  const requestClose = useCallback(() => setVisible(false), []);
  const sizes = product.sizes ?? [];
  const preferences = product.colors?.map((c) => c.name) ?? [];
  const [size, setSize] = useState(
    sizes.includes("M") ? "M" : (sizes[0] ?? ""),
  );
  const [color, setColor] = useState(preferences[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const image = product.images?.[0];
  const onSale =
    product.compareAtPrice != null && product.compareAtPrice > product.price;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event) {
      if (event.key === "Escape") requestClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [requestClose]);

  function handleAdd() {
    if (!size || !image) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      currency: product.currency,
      image,
      size,
      color,
      quantity,
    });
    showToast(`${product.name} added to your order`);
    requestClose();
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence onExitComplete={onClose}>
      {visible ? (
        <motion.div
          key="quick-add"
          className="fixed inset-0 z-[130] flex items-end justify-center sm:items-center sm:p-4"
        >
          <motion.button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/60"
            onClick={requestClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-add-title"
            className="relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-[var(--surface-elevated)] shadow-2xl sm:max-h-[min(90dvh,48rem)] sm:max-w-md sm:rounded-3xl"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: 60,
              opacity: 0,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-y-auto">
              <div className="relative aspect-[16/10] w-full bg-stone-200">
                <ImageWithFallback
                  src={image}
                  alt={product.name}
                  sizes="(max-width: 640px) 100vw, 448px"
                  imageClassName="object-cover"
                  fallbackClassName="flex h-full w-full items-center justify-center bg-stone-200 text-stone-500"
                  fallbackLabelClassName="font-[family-name:var(--font-display)] text-2xl tracking-[0.18em]"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"
                  aria-hidden
                />
                <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)] backdrop-blur-sm">
                  {getCategoryLabel(product.category)}
                </span>
                <button
                  type="button"
                  onClick={requestClose}
                  aria-label="Close"
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-800 shadow backdrop-blur-sm hover:bg-white"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="px-5 pb-5 pt-5 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <h2
                    id="quick-add-title"
                    className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-stone-900 sm:text-[1.75rem]"
                  >
                    {product.name}
                  </h2>
                  <div className="flex shrink-0 items-baseline gap-1.5">
                    <p className="text-lg font-bold text-[var(--primary)]">
                      {formatPrice(product.price, product.currency)}
                    </p>
                    {onSale ? (
                      <p className="text-xs text-stone-400 line-through">
                        {formatPrice(product.compareAtPrice, product.currency)}
                      </p>
                    ) : null}
                  </div>
                </div>
                {product.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {product.description}
                  </p>
                ) : null}

                <div className="mt-5 border-t border-dashed border-stone-200" />

                {sizes.length > 1 ? (
                  <OptionGroup
                    label="Portion"
                    options={sizes}
                    value={size}
                    onChange={setSize}
                    renderLabel={sizeOptionLabel}
                  />
                ) : null}

                {preferences.length > 1 ? (
                  <OptionGroup
                    label="Preference"
                    options={preferences}
                    value={color}
                    onChange={setColor}
                  />
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-stone-200 bg-[var(--surface-elevated)] px-5 py-4 sm:px-6">
              <div className="flex items-center rounded-full border border-stone-300">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-stone-700 hover:bg-stone-100"
                >
                  <LuMinus className="h-4 w-4" aria-hidden />
                </button>
                <span className="min-w-6 text-center text-sm font-semibold text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQuantity((current) => Math.min(10, current + 1))
                  }
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-stone-700 hover:bg-stone-100"
                >
                  <LuPlus className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                disabled={!size}
                className="flex h-12 flex-1 items-center justify-between rounded-full bg-[var(--primary)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#7f1519] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>Add to order</span>
                <span>
                  {formatPrice(product.price * quantity, product.currency)}
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
