import Image from "next/image";
import { BrandLogo } from "@/components/layout/brand-logo";

const DEFAULT_AUTH_IMAGE =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85";

export function AuthShell({
  children,
  imageSrc = DEFAULT_AUTH_IMAGE,
  imageAlt = "ERP17 Restaurant fine dining",
}) {
  return (
    <div className="flex min-h-svh">
      {/* ── Left: Form panel ── */}
      <div className="flex flex-1 flex-col justify-center bg-[#0f0a07] px-6 py-12 sm:px-10 lg:px-16">
        {/* Brand */}
        <div className="mb-10">
          <BrandLogo
            tone="light"
            showTagline
            markClassName="h-8 w-auto"
            nameClassName="text-[1.3rem]"
          />
        </div>

        {/* Form */}
        <div className="w-full max-w-sm">{children}</div>
      </div>

      {/* ── Right: Restaurant image (desktop only) ── */}
      <div className="relative hidden w-[52%] shrink-0 lg:block">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="52vw"
          className="object-cover object-center"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,10,7,0.55) 0%, rgba(165,30,34,0.2) 100%)",
          }}
          aria-hidden
        />
        {/* Left gold line */}
        <div
          className="absolute inset-y-0 left-0 w-[3px]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #f5b54a 40%, #f5b54a 60%, transparent)",
          }}
          aria-hidden
        />
        {/* Bottom quote */}
        <div className="absolute bottom-10 left-10 right-10 z-10">
          <p
            className="text-[1.25rem] italic leading-relaxed text-white/90"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            &ldquo;Good food is the foundation of genuine happiness.&rdquo;
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#f5b54a]">
            — Auguste Escoffier
          </p>
        </div>
      </div>
    </div>
  );
}
