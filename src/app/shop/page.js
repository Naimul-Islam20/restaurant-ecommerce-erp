import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ProductShopIntro } from "@/components/product/product-shop-intro";
import { ProductsCatalog } from "@/components/product/products-catalog";
import { ProductCardSkeleton } from "@/components/product/product-card";
import { Container } from "@/components/layout/container";
import { getShopEdit } from "@/data/shop-edits";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Shop",
  description: "Browse the full ERP17 Restaurant menu.",
};

function CatalogFallback() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <li key={i}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}

function IntroFallback() {
  return (
    <div className="animate-pulse text-center" aria-hidden>
      <div className="mx-auto h-3 w-28 rounded bg-stone-200" />
      <div className="mx-auto mt-3 h-9 w-40 rounded bg-stone-200 sm:h-10" />
      <div className="mt-5 flex justify-center">
        <div className="h-4 w-48 rounded bg-stone-200" />
      </div>
    </div>
  );
}

function DividerFallback() {
  return (
    <div
      aria-hidden
      className="mt-6 w-screen max-w-none border-b border-stone-200 sm:mt-8 ml-[calc(50%-50vw)]"
    />
  );
}

function ShopPageSkeleton() {
  return (
    <>
      <IntroFallback />
      <DividerFallback />
      <div className="mt-6 sm:mt-8">
        <CatalogFallback />
      </div>
    </>
  );
}

function ShopContent({ products }) {
  return (
    <>
      <Suspense fallback={<IntroFallback />}>
        <ProductShopIntro />
      </Suspense>
      <DividerFallback />
      <div className="mt-6 sm:mt-8">
        <Suspense fallback={<CatalogFallback />}>
          <ProductsCatalog products={products} />
        </Suspense>
      </div>
    </>
  );
}

export default async function ShopPage({ searchParams }) {
  const sp = await searchParams;
  const raw = sp?.edit;
  const editParam =
    typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : "";
  const trimmed = editParam?.trim() ?? "";
  if (trimmed && getShopEdit(trimmed)) {
    redirect(`/collections/${encodeURIComponent(trimmed)}`);
  }

  const products = getProducts();

  return (
    <Container className="py-8 sm:py-10">
      <Suspense fallback={<ShopPageSkeleton />}>
        <ShopContent products={products} />
      </Suspense>
    </Container>
  );
}
