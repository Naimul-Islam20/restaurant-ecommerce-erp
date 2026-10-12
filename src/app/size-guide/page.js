import { Container } from "@/components/layout/container";

export default function SizeGuidePage() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
            Size Guide
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Portions on the menu: S is a single plate, M is a regular serving, L and XL are for sharing.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
          alt="Maaleen dining table"
          className="block h-auto w-full rounded-md"
        />
      </Container>
    </section>
  );
}

