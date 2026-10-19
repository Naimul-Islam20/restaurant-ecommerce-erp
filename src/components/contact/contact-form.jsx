"use client";

import { useState } from "react";
import { LuCalendarCheck, LuCircleCheck, LuMessageSquare } from "react-icons/lu";

const TABS = [
  { id: "booking", label: "Book a Table", icon: LuCalendarCheck },
  { id: "message", label: "Send a Message", icon: LuMessageSquare },
];

const TIMES = [
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM",
];

const inputClass =
  "mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-base text-stone-900 outline-none placeholder:text-stone-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-stone-700">{label}</span>
      {children}
    </label>
  );
}

export function ContactForm() {
  const [tab, setTab] = useState("booking");
  const [sent, setSent] = useState(null); // "booking" | "message" | null

  function handleSubmit(event) {
    event.preventDefault();
    setSent(tab);
    event.currentTarget.reset();
  }

  return (
    <div>
      <div className="flex gap-6 border-b border-stone-200">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setTab(id);
              setSent(null);
            }}
            aria-pressed={tab === id}
            className={`-mb-px inline-flex items-center gap-2 rounded-none border-b-2 pb-3 text-base font-semibold transition-colors ${
              tab === id
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </button>
        ))}
      </div>

      {sent ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-800">
          <LuCircleCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p className="text-sm sm:text-base">
            {sent === "booking"
              ? "Thank you! We've received your booking request and will call you shortly to confirm your table."
              : "Thank you! Your message has been sent. We usually reply within a few hours."}
          </p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name">
            <input name="name" required placeholder="Your name" className={inputClass} />
          </Field>
          <Field label="Phone number">
            <input
              name="phone"
              type="tel"
              required
              placeholder="01XXXXXXXXX"
              className={inputClass}
            />
          </Field>
        </div>

        {tab === "booking" ? (
          <>
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="Date">
                <input name="date" type="date" required className={inputClass} />
              </Field>
              <Field label="Time">
                <select name="time" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select time
                  </option>
                  {TIMES.map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              </Field>
              <Field label="Guests">
                <select name="guests" defaultValue="2" className={inputClass}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                  <option value="13+">13+ (party)</option>
                </select>
              </Field>
            </div>
            <Field label="Special request (optional)">
              <textarea
                name="note"
                rows={3}
                placeholder="Birthday, family area, high chair…"
                className={inputClass}
              />
            </Field>
          </>
        ) : (
          <>
            <Field label="Email">
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>
            <Field label="Message">
              <textarea
                name="message"
                rows={5}
                required
                placeholder="How can we help? Orders, catering, feedback…"
                className={inputClass}
              />
            </Field>
          </>
        )}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-base font-semibold text-white sm:w-auto sm:px-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          {tab === "booking" ? "Request booking" : "Send message"}
        </button>
      </form>
    </div>
  );
}
