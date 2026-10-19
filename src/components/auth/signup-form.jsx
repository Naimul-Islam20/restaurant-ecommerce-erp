"use client";

import Link from "next/link";
import { useState } from "react";
import { useCountry } from "@/contexts/country-context";

const inputClassName =
  "mt-2 w-full rounded-lg border border-white/15 bg-white/8 px-3.5 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[var(--secondary)] focus:bg-white/12";

const labelClassName = "text-sm font-semibold text-white/80";

export function SignupForm() {
  const { country } = useCountry();
  const [phone, setPhone] = useState("");

  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl">
        Create Account
      </h1>
      <p className="mt-2 text-sm text-white/50 sm:text-base">
        Join us today and start ordering
      </p>

      <form className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className={labelClassName}>
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClassName}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="signup-phone" className={labelClassName}>
            Phone Number
          </label>
          <div className="mt-2 flex overflow-hidden rounded-lg border border-white/15 bg-white/8 focus-within:border-[var(--secondary)]">
            <span className="inline-flex items-center border-r border-white/15 px-3 text-sm font-medium text-white/60">
              +{String(country.dialCode).replace(/^\+/, "")}
            </span>
            <input
              id="signup-phone"
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(event) =>
                setPhone(
                  event.target.value
                    .replace(/\D/g, "")
                    .slice(0, country.phoneMaxLength),
                )
              }
              placeholder="1712345678"
              className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-sm text-white outline-none placeholder:text-white/30"
            />
          </div>
          <p className="mt-2 text-xs text-white/40">
            Enter number without country code
          </p>
        </div>

        <div>
          <label htmlFor="password" className={labelClassName}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Minimum 8 characters"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className={labelClassName}>
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Re-enter your password"
            className={inputClassName}
          />
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[var(--primary)] px-4 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)]"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-white/40">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[var(--secondary)] hover:underline"
        >
          Login
        </Link>
      </p>
    </>
  );
}
