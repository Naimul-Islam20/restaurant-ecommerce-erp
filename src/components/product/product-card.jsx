"use client";

import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { formatPrice } from "@/lib/format";
import { QuickAddModal } from "@/components/product/quick-add-modal";
import { useWishlist } from "@/contexts/wishlist-context";

function HeartIcon({ filled, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function ProductCard({ product }) {
  const image = product.images?.[0];
  const onSale =
    product.compareAtPrice != null && product.compareAtPrice > product.price;
  const isNew = product.tags?.includes("new");
  const { toggleItem, isWishlisted, ready } = useWishlist();
  const wishlisted = ready && isWishlisted(product.id);
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-[var(--surface-elevated)] shadow-[0_1px_2px_rgba(55,0,6,0.04)]">
      <button
        type="button"
        onClick={() => setQuickAddOpen(true)}
        aria-label={`View ${product.name}`}
        className="flex flex-1 cursor-pointer flex-col text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--secondary)]"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
          <ImageWithFallback
            src={image}
            alt={product.name}
            imageClassName="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            fallbackClassName="flex h-full w-full flex-col items-center justify-center gap-1 bg-stone-200 text-stone-500"
            fallbackLabelClassName="font-[family-name:var(--font-display)] text-xl tracking-[0.18em]"
            fallbackSubLabel="photo coming soon"
            fallbackSubLabelClassName="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400"
          />
          <div className="pointer-events-none absolute left-2.5 top-2.5 flex flex-wrap gap-1 sm:left-3 sm:top-3">
            {onSale ? (
              <span className="rounded-full bg-[var(--primary)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--secondary)]">
                Offer
              </span>
            ) : isNew ? (
              <span className="rounded-full bg-[var(--secondary)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--primary)]">
                New
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col px-3 pt-3 sm:px-4 sm:pt-4">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-tight text-stone-900 sm:text-xl">
            {product.name}
          </h2>
        </div>
      </button>

      <div className="flex items-center justify-between gap-2 px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
          <span className="text-sm font-bold text-[var(--primary)] sm:text-base">
            {formatPrice(product.price, product.currency)}
          </span>
          {onSale ? (
            <span className="text-[11px] text-stone-400 line-through sm:text-xs">
              {formatPrice(product.compareAtPrice, product.currency)}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setQuickAddOpen(true)}
          aria-label={`Add ${product.name} to order`}
          className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full bg-[var(--primary)] pl-2.5 pr-3.5 text-xs font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)]"
        >
          <LuPlus className="h-4 w-4" aria-hidden />
          Add
        </button>
      </div>

      {quickAddOpen ? (
        <QuickAddModal product={product} onClose={() => setQuickAddOpen(false)} />
      ) : null}
      <button
        type="button"
        aria-label={wishlisted ? "Remove from favourites" : "Add to favourites"}
        aria-pressed={wishlisted}
        onClick={() =>
          toggleItem({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            currency: product.currency,
            image,
          })
        }
        className="absolute right-2.5 top-2.5 z-10 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[var(--primary)] shadow-sm backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)] sm:right-3 sm:top-3"
      >
        <HeartIcon filled={wishlisted} className="h-[1.1rem] w-[1.1rem]" />
      </button>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-stone-200/80 bg-[var(--surface-elevated)]">
      <div className="aspect-[4/3] bg-stone-200" />
      <div className="space-y-2 p-3 sm:p-4">
        <div className="h-5 w-3/4 rounded bg-stone-200" />
        <div className="flex items-center justify-between pt-3">
          <div className="h-4 w-16 rounded bg-stone-200" />
          <div className="h-9 w-16 rounded-full bg-stone-200" />
        </div>
      </div>
    </div>
  );
}
