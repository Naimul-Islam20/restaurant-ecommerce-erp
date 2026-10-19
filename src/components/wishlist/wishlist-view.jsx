"use client";

import Link from "next/link";
import { LuHeart } from "react-icons/lu";
import { Container } from "@/components/layout/container";
import { ProductCard, ProductCardSkeleton } from "@/components/product/product-card";
import { useWishlist } from "@/contexts/wishlist-context";
import { getProductBySlug } from "@/lib/products";

export function WishlistView() {
  const { items, ready } = useWishlist();
  const products = items
    .map((item) => getProductBySlug(item.slug))
    .filter(Boolean);

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
            Wishlist
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-white sm:text-5xl">
            Your favourites
          </h1>
          <p className="mt-2 text-base text-white/80">
            {ready && products.length > 0
              ? `${products.length} ${products.length === 1 ? "dish" : "dishes"} saved — add them to your order anytime.`
              : "Dishes you save with the heart button show up here."}
          </p>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        {!ready ? (
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <ProductCardSkeleton />
              </li>
            ))}
          </ul>
        ) : products.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center py-10 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
              <LuHeart className="h-9 w-9" aria-hidden />
            </span>
            <h2 className="mt-6 text-2xl font-bold text-stone-900">
              No favourites yet
            </h2>
            <p className="mt-2 text-base text-stone-500">
              Tap the heart on any dish to save it here for later.
            </p>
            <Link
              href="/shop"
              className="mt-6 rounded-full bg-[var(--primary)] px-7 py-3 text-base font-semibold text-white"
            >
              Browse menu
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
