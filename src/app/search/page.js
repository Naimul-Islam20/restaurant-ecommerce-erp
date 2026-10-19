import Link from "next/link";
import { LuSearch, LuSearchX } from "react-icons/lu";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { getCategoryLabel, getProducts } from "@/lib/products";

export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  return {
    title: query ? `Search: ${query}` : "Search",
    description: "Search the ERP17 Restaurant menu.",
  };
}

/** Every word of the query must appear in the dish name, description or category. */
function searchProducts(query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  return getProducts().filter((product) => {
    const haystack = [
      product.name,
      product.description,
      product.category,
      getCategoryLabel(product.category),
    ]
      .join(" ")
      .toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}

const SUGGESTIONS = ["Biryani", "Chicken", "Kebab", "Burger", "Dessert", "Lassi"];

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const results = searchProducts(query);

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
            Search
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-white sm:text-5xl">
            {query ? `Results for “${query}”` : "Search the menu"}
          </h1>
          <form
            action="/search"
            method="get"
            role="search"
            className="relative mt-6 max-w-2xl"
          >
            <LuSearch
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
              aria-hidden
            />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search dishes, drinks…"
              aria-label="Search dishes"
              className="h-14 w-full rounded-full bg-white pl-14 pr-32 text-lg text-stone-900 outline-none placeholder:text-stone-400 focus:ring-4 focus:ring-white/30"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[var(--secondary)] px-6 py-2.5 text-base font-semibold text-stone-900"
            >
              Search
            </button>
          </form>
        </Container>
      </section>

      <Container className="py-8 sm:py-10">
        {query && results.length > 0 ? (
          <>
            <p className="mb-6 text-base text-stone-600">
              {results.length} {results.length === 1 ? "dish" : "dishes"} found
            </p>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {results.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center py-10 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
              {query ? (
                <LuSearchX className="h-9 w-9" aria-hidden />
              ) : (
                <LuSearch className="h-9 w-9" aria-hidden />
              )}
            </span>
            <h2 className="mt-6 text-2xl font-bold text-stone-900">
              {query ? "No dishes found" : "What are you craving?"}
            </h2>
            <p className="mt-2 text-base text-stone-500">
              {query
                ? "Try another word, or pick one of these:"
                : "Type a dish name above, or try one of these:"}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((word) => (
                <Link
                  key={word}
                  href={`/search?q=${encodeURIComponent(word)}`}
                  className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  {word}
                </Link>
              ))}
            </div>
            <Link
              href="/shop"
              className="mt-8 text-base font-semibold text-[var(--primary)]"
            >
              Or browse the full menu →
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
