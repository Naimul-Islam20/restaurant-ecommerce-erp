import Link from "next/link";
import { LuClock, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";

export const metadata = {
  title: "Contact Us",
  description:
    "Book a table, ask about an order or get in touch with ERP17 Restaurant in Uttara, Dhaka.",
};

const INFO = [
  {
    title: "Phone",
    icon: LuPhone,
    lines: ["+88017 86 493 740"],
    href: "tel:+8801786493740",
  },
  {
    title: "Email",
    icon: LuMail,
    lines: ["support@erp17restaurant.com"],
    href: "mailto:support@erp17restaurant.com",
  },
  {
    title: "Address",
    icon: LuMapPin,
    lines: ["House #1/A, Road #6, Sector #3", "Uttara, Dhaka-1230"],
  },
  {
    title: "Opening hours",
    icon: LuClock,
    lines: ["Sat – Thu: 12 PM – 11 PM", "Friday: 2:30 PM – 11:30 PM"],
  },
];

const SOCIAL = [
  {
    label: "Facebook",
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.21 10.44 22v-7.04H7.9v-2.9h2.54V9.86c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22C18.34 21.21 22 17.08 22 12.06Z",
  },
  {
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 4.66a5.14 5.14 0 1 0 0 10.28 5.14 5.14 0 0 0 0-10.28Zm0 8.48a3.34 3.34 0 1 1 0-6.68 3.34 3.34 0 0 1 0 6.68Zm5.34-9.89a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z",
  },
  {
    label: "YouTube",
    path: "M21.6 7.2a2.4 2.4 0 0 0-1.68-1.7C18.2 5 12 5 12 5s-6.2 0-7.92.5A2.4 2.4 0 0 0 2.4 7.2 25.1 25.1 0 0 0 2 12a25.1 25.1 0 0 0 .4 4.8 2.4 2.4 0 0 0 1.68 1.7C5.8 19 12 19 12 19s6.2 0 7.92-.5a2.4 2.4 0 0 0 1.68-1.7A25.1 25.1 0 0 0 22 12a25.1 25.1 0 0 0-.4-4.8ZM10 15.2V8.8L15.2 12 10 15.2Z",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[var(--surface)]">
      <section className="bg-[var(--primary)]">
        <Container className="py-12 text-center sm:py-16">
          <p className="text-sm font-medium text-white/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span>Contact</span>
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Book a table, ask about an order or just say hello.
          </p>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-20px_rgba(36,30,27,0.25)] lg:grid-cols-[400px_minmax(0,1fr)]">
          {/* Contact details */}
          <div className="flex flex-col bg-[var(--ink)] p-8 text-white sm:p-10">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
              Get in touch
            </h2>
            <p className="mt-2 text-base text-white/70">
              We usually answer calls and messages within a few minutes during
              opening hours.
            </p>

            <ul className="mt-8 space-y-6">
              {INFO.map(({ title, icon: Icon, lines, href }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--ink)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold uppercase tracking-wider text-[var(--secondary)]">
                      {title}
                    </p>
                    {lines.map((line) =>
                      href ? (
                        <a
                          key={line}
                          href={href}
                          className="mt-0.5 block text-base text-white [overflow-wrap:anywhere] hover:text-[var(--secondary)]"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="mt-0.5 text-base text-white/90">
                          {line}
                        </p>
                      ),
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-white/15 pt-6 lg:mt-auto">
              <p className="text-sm font-semibold text-white/70">Follow us</p>
              <div className="mt-3 flex gap-3">
                {SOCIAL.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white hover:border-[var(--secondary)] hover:text-[var(--secondary)]"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 sm:p-10">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900">
              How can we help?
            </h2>
            <p className="mt-2 mb-6 text-base text-stone-600">
              Reserve a table or send us a message — we&apos;ll get back to you
              quickly.
            </p>
            <ContactForm />
          </div>
        </div>

        {/* Map */}
        <div className="relative mx-auto mt-8 max-w-6xl overflow-hidden rounded-3xl bg-stone-200 shadow-sm">
          <iframe
            title="ERP17 Restaurant location"
            src="https://www.google.com/maps?q=Uttara%20Sector%203%2C%20Dhaka%201230&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full sm:h-96"
          />
          <a
            href="https://www.google.com/maps/search/?api=1&query=Uttara%20Sector%203%2C%20Dhaka%201230"
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg"
          >
            <LuMapPin className="h-4 w-4" aria-hidden />
            Get directions
          </a>
        </div>
      </Container>
    </div>
  );
}
