"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";
import { InfoPage, InfoSection } from "@/components/layout/info-page";

const FAQ_GROUPS = [
  {
    title: "About ERP17 Restaurant",
    items: [
      {
        q: "Where is ERP17 Restaurant?",
        a: "House #1/A, Road #6, Sector #3, Uttara Model Town, Dhaka-1230. We are open every day — Saturday to Thursday 12 PM – 11 PM, Friday 2:30 PM – 11:30 PM.",
      },
      {
        q: "Is the food halal?",
        a: "Yes. All meat and poultry come from trusted halal suppliers, and we do not serve pork or alcohol.",
      },
      {
        q: "Do you have a family area?",
        a: "Yes, our dining room has a separate family section and high chairs for kids.",
      },
    ],
  },
  {
    title: "Ordering & Delivery",
    items: [
      {
        q: "How do I order online?",
        a: "Open the Menu, tap a dish, choose your portion and preference, then add it to your order. When you are ready, go to Checkout and confirm your address and payment.",
      },
      {
        q: "Which areas do you deliver to?",
        a: "All of Uttara, plus Airport, Khilkhet, Abdullahpur and the rest of Dhaka. Charges start from ৳40 — see the Delivery Policy for the full list.",
      },
      {
        q: "How long does delivery take?",
        a: "Usually 30–45 minutes inside Uttara and up to 90 minutes for the rest of Dhaka. Peak hours and rain can add a little time.",
      },
      {
        q: "Can I track my order?",
        a: "Yes. Use Track Order with your order number and phone number to see where your food is.",
      },
    ],
  },
  {
    title: "Food & Menu",
    items: [
      {
        q: "Can I choose spice level and portion?",
        a: "Most dishes let you pick a portion (Small, Regular, Large or Family) and a preference such as mild or spicy.",
      },
      {
        q: "Can you leave out an ingredient?",
        a: "Add a note at checkout (for example no nuts, no onion or less sugar). If the kitchen can't make the change, we will call you before cooking.",
      },
      {
        q: "Do you take party or catering orders?",
        a: "Yes — birthdays, office lunches and family events. Call us at least 24 hours ahead for a custom menu and price.",
      },
    ],
  },
  {
    title: "Payment & Bookings",
    items: [
      {
        q: "Which payment methods do you accept?",
        a: "Cash on delivery, bKash, Nagad and all major debit/credit cards.",
      },
      {
        q: "How do I book a table?",
        a: "Use the Book a Table button or call us. We hold your table for 15 minutes after the booking time.",
      },
      {
        q: "Can I cancel my order?",
        a: "Yes, free within 5 minutes of ordering. After the kitchen starts cooking we can't cancel — see the Cancellation Policy for details.",
      },
    ],
  },
];

function FaqItem({ question, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-stone-200 bg-white">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-semibold text-stone-900 sm:text-base"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-[var(--primary)]"
        >
          <LuChevronDown className="h-5 w-5" aria-hidden />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-sm text-stone-600">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqsPage() {
  return (
    <InfoPage
      title="FAQs"
      intro="Quick answers about our food, delivery, payments and bookings."
    >
      {FAQ_GROUPS.map((group) => (
        <InfoSection key={group.title} title={group.title}>
          <div className="space-y-2.5">
            {group.items.map((item) => (
              <FaqItem key={item.q} question={item.q}>
                {item.a}
              </FaqItem>
            ))}
          </div>
        </InfoSection>
      ))}
    </InfoPage>
  );
}
