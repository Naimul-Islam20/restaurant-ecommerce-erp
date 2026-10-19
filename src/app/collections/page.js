import {
  MenuCategoryGrid,
  MenuDivider,
  MenuHighlightGrid,
} from "@/components/collections/menu-collections";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

export const metadata = {
  title: "Categories",
  description:
    "Explore the ERP17 Restaurant menu — starters, mains, desserts, drinks, chef's specials and today's offers.",
};

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--secondary-dark)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900 sm:text-4xl">
        {title}
      </h2>
      <MenuDivider className="mt-4" />
      {children ? (
        <p className="mt-4 text-sm leading-relaxed text-stone-600 sm:text-base">
          {children}
        </p>
      ) : null}
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <div className="bg-[var(--surface)]">
      <section className="relative isolate overflow-hidden bg-[var(--primary)]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
          alt=""
          priority
          sizes="100vw"
          imageClassName="object-cover opacity-35"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/40 via-[var(--primary)]/60 to-[var(--primary)]"
          aria-hidden
        />
        <Container className="relative py-16 text-center sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--secondary)]">
            Browse the menu
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            Categories
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
            Pick a course, try what the chef recommends today, or catch an
            offer before it&apos;s gone.
          </p>
        </Container>
      </section>

      <Container className="pt-5">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/collections", label: "Categories", current: true },
          ]}
        />
      </Container>

      <Container className="py-12 sm:py-16">
        <SectionHeading eyebrow="Browse the menu" title="All Categories">
          Every course, the chef&apos;s specials, new dishes and today&apos;s
          offers — pick where to start.
        </SectionHeading>
        <MenuCategoryGrid withCollections className="mt-10 sm:mt-14" />
      </Container>

      <div className="border-y border-stone-200 bg-[var(--background)]/60">
        <Container className="py-12 sm:py-16">
          <SectionHeading eyebrow="Chef recommends" title="Specials & Offers">
            Dishes the kitchen is proud of, new plates this week, and
            favourites at a lighter price.
          </SectionHeading>
          <MenuHighlightGrid className="mt-10 sm:mt-14" />
        </Container>
      </div>
    </div>
  );
}
