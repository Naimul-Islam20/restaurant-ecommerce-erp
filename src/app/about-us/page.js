import Link from "next/link";
import {
  LuChefHat,
  LuEye,
  LuLeaf,
  LuShieldCheck,
  LuStar,
} from "react-icons/lu";
import { MenuDivider } from "@/components/collections/menu-collections";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Our Story",
  description:
    "ERP17 Restaurant is a family kitchen in Uttara, Dhaka serving biryani, grills, desserts and drinks for dine-in and delivery since 2019.",
};

const TIMELINE = [
  {
    year: "2019",
    title: "A small kitchen opens",
    text: "ERP17 Restaurant starts in Uttara Sector 3 with six tables and a short menu of kacchi, kebabs and chai.",
  },
  {
    year: "2021",
    title: "Home delivery begins",
    text: "Our own riders start delivering across Uttara, with packaging that keeps gravies and crisp items apart.",
  },
  {
    year: "2023",
    title: "A bigger dining room",
    text: "We move next door into a 60-seat dining room with a family area and a proper tandoor.",
  },
  {
    year: "2025",
    title: "Order online",
    text: "The full menu goes online — order for delivery, book a table or pick up on the way home.",
  },
];

const VALUES = [
  {
    title: "Cooked Fresh",
    icon: LuChefHat,
    text: "Every plate is made to order — nothing is reheated. Dum, tandoor, grill and wok, done properly.",
  },
  {
    title: "100% Halal",
    icon: LuShieldCheck,
    text: "All meat and poultry come from trusted halal suppliers we have worked with for years.",
  },
  {
    title: "Consistent Taste",
    icon: LuEye,
    text: "Dishes stay on the menu and taste the same every visit — generous portions, honest spice.",
  },
  {
    title: "Less Waste",
    icon: LuLeaf,
    text: "We cook in batches that match the day's orders and buy for the service in front of us.",
  },
];

const TEAM = [
  {
    name: "Rafiq Ahmed",
    role: "Head Chef",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80",
  },
  {
    name: "Kamal Hossain",
    role: "Pastry Chef",
    image:
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600&q=80",
  },
  {
    name: "Tanvir Hasan",
    role: "Restaurant Manager",
    image:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&q=80",
  },
];

const REVIEWS = [
  {
    name: "Sabbir Rahman",
    area: "Uttara Sector 7",
    text: "Best kacchi in Uttara, no question. The meat falls off the bone and the rice is never oily. We come almost every Friday with the family.",
  },
  {
    name: "Farhana Akter",
    area: "Banani",
    text: "Ordered for my office lunch and everything arrived hot. The butter chicken and naan were perfect, and the packaging kept the gravy separate.",
  },
  {
    name: "Imran Chowdhury",
    area: "Uttara Sector 3",
    text: "Clean place, friendly staff and fair prices. The molten chocolate cake is a must — my kids won't leave without it.",
  },
];

function SectionHeading({ title, className = "" }) {
  return (
    <div className={className}>
      <h2 className="text-center font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900 sm:text-4xl">
        {title}
      </h2>
      <MenuDivider className="mt-4" />
    </div>
  );
}

export default function AboutUsPage() {
  const stats = [
    { value: "2019", label: "Serving Uttara since" },
    { value: `${getProducts().length}+`, label: "Dishes on the menu" },
    { value: "1,000+", label: "Happy guests every week" },
    { value: "60", label: "Seats in our dining room" },
  ];

  return (
    <div className="bg-[var(--surface)]">
      {/* Banner */}
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
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            Our Story
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            ERP17 Restaurant · Uttara, Dhaka · Since 2019
          </p>
        </Container>
      </section>

      <Container className="pt-5">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/about-us", label: "Our Story", current: true },
          ]}
        />
      </Container>

      {/* Intro */}
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-200">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"
              alt="Dishes from the ERP17 Restaurant kitchen"
              sizes="(max-width: 1024px) 100vw, 50vw"
              imageClassName="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-4 rounded-2xl bg-[var(--primary)] px-6 py-4 text-white shadow-xl sm:right-6">
            <p className="text-3xl font-bold text-[var(--secondary)]">6+</p>
            <p className="text-xs font-medium text-white/80">
              Years of cooking
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900 sm:text-4xl">
            Welcome to ERP17 Restaurant
          </h2>
          <MenuDivider className="mt-4 w-fit" />
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-stone-700 sm:text-base">
            <p>
              ERP17 Restaurant started in 2019 as a small family kitchen in
              Uttara with one idea: cook the food we grew up eating, and cook it
              properly. Kacchi on a slow dum, kebabs off real charcoal and chai
              brewed the long way.
            </p>
            <p>
              Today we serve starters, mains, desserts and drinks to guests in
              our dining room and to homes across Dhaka. The menu has grown, but
              the kitchen still works the same way — fresh every service,
              nothing reheated, and every plate checked before it leaves.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white"
            >
              See our menu
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800"
            >
              Book a table
            </Link>
          </div>
        </div>
      </Container>

      {/* Numbers */}
      <section className="bg-[var(--primary)]">
        <Container className="grid grid-cols-2 gap-y-8 py-10 sm:py-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-[var(--secondary)] sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-medium text-white/80 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </Container>
      </section>

      {/* Journey */}
      <Container className="py-12 sm:py-16">
        <SectionHeading title="Our Journey" />
        <ol className="relative mx-auto mt-10 max-w-3xl sm:mt-12">
          <span
            className="absolute bottom-2 left-[1.6rem] top-2 w-px bg-[var(--secondary)]/60 sm:left-1/2"
            aria-hidden
          />
          {TIMELINE.map((step, i) => (
            <li
              key={step.year}
              className={`relative mb-8 flex gap-5 last:mb-0 sm:w-1/2 ${
                i % 2 === 0
                  ? "sm:pr-10 sm:text-right"
                  : "sm:ml-auto sm:flex-row-reverse sm:pl-10 sm:text-left"
              }`}
            >
              <span
                className={`relative z-10 flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-white ring-4 ring-[var(--surface)] sm:absolute sm:top-0 ${
                  i % 2 === 0 ? "sm:-right-[1.625rem]" : "sm:-left-[1.625rem]"
                }`}
              >
                {step.year}
              </span>
              <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:flex-1">
                <h3 className="font-bold text-stone-900">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      {/* Values */}
      <div className="border-y border-stone-200 bg-[var(--background)]/60">
        <Container className="py-12 sm:py-16">
          <SectionHeading title="What We Stand For" />
          <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {VALUES.map(({ title, icon: Icon, text }) => (
              <li
                key={title}
                className="rounded-2xl border border-stone-200 bg-white p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--secondary)]">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold text-stone-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Team */}
      <Container className="py-12 sm:py-16">
        <SectionHeading title="Meet the Team" />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-5 sm:mt-12 sm:grid-cols-3">
          {TEAM.map((person) => (
            <li
              key={person.name}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white"
            >
              <div className="relative aspect-[4/5] bg-stone-200">
                <ImageWithFallback
                  src={person.image}
                  alt={person.name}
                  sizes="(max-width: 640px) 100vw, 300px"
                  imageClassName="object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <p className="text-lg font-bold text-stone-900">
                  {person.name}
                </p>
                <p className="mt-0.5 text-sm font-medium text-[var(--primary)]">
                  {person.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      {/* Reviews */}
      <div className="border-t border-stone-200">
        <Container className="py-12 sm:py-16">
          <SectionHeading title="What Our Guests Say" />
          <ul className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-3 md:gap-5">
            {REVIEWS.map((review) => (
              <li
                key={review.name}
                className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 sm:p-7"
              >
                <div
                  className="flex gap-0.5 text-[var(--secondary)]"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <LuStar
                      key={i}
                      className="h-4 w-4 fill-current"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-stone-700 sm:text-[15px]">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-stone-100 pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-[var(--secondary)]">
                    {review.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-stone-900">
                      {review.name}
                    </p>
                    <p className="text-xs text-stone-500">{review.area}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </div>
  );
}
