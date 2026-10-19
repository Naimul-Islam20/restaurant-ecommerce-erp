import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { Container } from "@/components/layout/container";
import {
  MenuCategoryGrid,
  MenuDivider,
  MenuHighlightGrid,
} from "@/components/collections/menu-collections";

export function CollectionsSection() {
  return (
    <section
      id="collections"
      className="border-b border-stone-200 bg-[var(--surface)]"
    >
      <Container className="pb-14 pt-6 sm:pb-20 sm:pt-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--secondary-dark)]">
            From our kitchen
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900 sm:text-[2.6rem]">
            Explore Our Menu
          </h2>
          <MenuDivider className="mt-4" />
        </div>

        <MenuCategoryGrid withCollections className="mt-10 sm:mt-14" />

        <MenuHighlightGrid className="mt-12 sm:mt-16" />

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border-b border-[var(--primary)] pb-0.5 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]"
          >
            See the full menu
            <LuArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
