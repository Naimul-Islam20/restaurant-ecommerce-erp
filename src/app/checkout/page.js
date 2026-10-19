"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  LuBanknote,
  LuBike,
  LuCheck,
  LuCreditCard,
  LuLock,
  LuMinus,
  LuPlus,
  LuSmartphone,
  LuStore,
  LuTag,
} from "react-icons/lu";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useCountry } from "@/contexts/country-context";
import { formatPrice } from "@/lib/format";
import { COUNTRY_CITIES } from "@/lib/country-config";
import { sizeOptionLabel } from "@/lib/size-chart";
import { Container } from "@/components/layout/container";
import { BrandMark } from "@/components/layout/brand-logo";
import { CheckoutAccountGate } from "@/components/checkout/checkout-account-gate";
import SuccessPopup from "@/components/checkout/success-popup";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

// Delivery zones in Chittagong (matches the Delivery Policy page).
const BD_ZONES = [
  { id: "halishahar", label: "Halishahar (all blocks)", fee: 40, time: "30–45 min" },
  {
    id: "airport",
    label: "Agrabad, Pahartali, Patenga",
    fee: 60,
    time: "40–60 min",
  },
  { id: "chittagong", label: "Rest of Chittagong", fee: 80, time: "60–90 min" },
];

// Every country other than Bangladesh uses the international options.
const INTERNATIONAL_SHIPPING = [
  {
    id: "standard-intl",
    label: "Standard Shipping",
    fee: 15,
    time: "3–5 days",
  },
  { id: "express-intl", label: "Express Shipping", fee: 25, time: "1–2 days" },
];

const PAYMENT_METHODS = [
  {
    id: "cod",
    label: "Cash",
    note: "Pay the rider when your food arrives",
    icon: LuBanknote,
    color: "#16a34a",
  },
  {
    id: "bkash",
    label: "bKash",
    note: "You'll get a payment request on your bKash number",
    icon: LuSmartphone,
    color: "#e2136e",
  },
  {
    id: "nagad",
    label: "Nagad",
    note: "You'll get a payment request on your Nagad number",
    icon: LuSmartphone,
    color: "#f7941d",
  },
  {
    id: "card",
    label: "Card",
    note: "Visa, Mastercard or Amex — secure via SSLCOMMERZ",
    icon: LuCreditCard,
    color: "#2563eb",
  },
];

const CHECKOUT_STEPS = ["Cart", "Details", "Payment", "Done"];

const PROMO_CODES = { WELCOME20: 0.2 };


const inputClass =
  "mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-base text-stone-900 outline-none placeholder:text-stone-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15";

function Field({ label, error, optional, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-semibold text-stone-700">
        {label}
        {optional ? (
          <span className="font-normal text-stone-400"> (optional)</span>
        ) : null}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block text-sm text-red-600">{error}</span>
      ) : null}
    </label>
  );
}

/** One step of the form: plain section, separated from the next by a line. */
function Section({ number, title, children, disabled = false }) {
  return (
    <section
      className={`border-t border-stone-200 py-8 first:border-t-0 first:pt-0 ${
        disabled ? "pointer-events-none opacity-50" : ""
      }`}
      {...(disabled ? { inert: true } : {})}
    >
      <h2 className="flex items-center gap-3 text-xl font-bold text-stone-900">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">
          {number}
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** A row inside a grouped radio list (rows share one border). */
function RadioRow({
  checked,
  onChange,
  name,
  icon,
  iconColor,
  title,
  note,
  aside,
}) {
  const Icon = icon;
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors ${
        checked ? "bg-[var(--primary)]/[0.06]" : "bg-white hover:bg-stone-50"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
          checked ? "border-[var(--primary)]" : "border-stone-300"
        }`}
        aria-hidden
      >
        {checked ? (
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
        ) : null}
      </span>
      {Icon ? (
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: iconColor }}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold text-stone-900">
          {title}
        </span>
        {note ? (
          <span className="block text-sm text-stone-500">{note}</span>
        ) : null}
      </span>
      {aside ? (
        <span className="shrink-0 text-base font-bold text-stone-900">
          {aside}
        </span>
      ) : null}
    </label>
  );
}

function RadioGroup({ children }) {
  return (
    <div className="divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200">
      {children}
    </div>
  );
}

/** Two-option pill toggle. */
function Toggle({ value, onChange, options }) {
  return (
    <div className="inline-grid w-full grid-cols-2 rounded-full bg-stone-100 p-1 sm:w-auto">
      {options.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-pressed={value === id}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-base font-semibold transition-colors ${
            value === id
              ? "bg-white text-[var(--primary)] shadow-sm"
              : "text-stone-500"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden />
          {label}
        </button>
      ))}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart, updateQuantity } = useCart();
  const { user, ready: authReady, isAuthenticated, loginWithEmail } = useAuth();
  const { country, countryCode } = useCountry();
  const isBangladesh = countryCode === "BD";

  const [guestContact, setGuestContact] = useState("");
  const [orderType, setOrderType] = useState("delivery"); // "delivery" | "pickup"
  const [form, setForm] = useState({
    name: "",
    phone: "",
    zone: BD_ZONES[0].id,
    city: "",
    address: "",
    note: "",
    payment: "cod",
  });
  const [errors, setErrors] = useState({});
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState(null); // { code, rate }
  const [promoError, setPromoError] = useState("");
  const [placed, setPlaced] = useState(null); // { id, total }

  const checkoutUnlocked = isAuthenticated || Boolean(guestContact);
  const deliveryOptions = isBangladesh ? BD_ZONES : INTERNATIONAL_SHIPPING;
  const selectedDelivery =
    deliveryOptions.find((option) => option.id === form.zone) ??
    deliveryOptions[0];
  const deliveryFee = orderType === "pickup" ? 0 : selectedDelivery.fee;
  const discount = promo ? Math.round(subtotal * promo.rate) : 0;
  const total = Math.max(0, subtotal - discount) + deliveryFee;
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const set = (field) => (event) => {
    const value =
      field === "phone"
        ? event.target.value.replace(/\D/g, "").slice(0, country.phoneMaxLength)
        : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  function continueAsGuest(contact) {
    setGuestContact(contact);
    if (!contact.includes("@")) {
      // Keep the local part only (e.g. 01712345678 -> 1712345678 after +880).
      const local = contact.replace(/^0+/, "").slice(-country.phoneMaxLength);
      setForm((prev) => ({ ...prev, phone: prev.phone || local }));
    }
  }

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (PROMO_CODES[code]) {
      setPromo({ code, rate: PROMO_CODES[code] });
      setPromoError("");
    } else {
      setPromo(null);
      setPromoError("This code isn't valid.");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!checkoutUnlocked) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (form.phone.length < 8)
      next.phone = "Please enter a valid phone number.";
    if (orderType === "delivery") {
      if (!form.address.trim())
        next.address = "Please enter your delivery address.";
      if (!isBangladesh && !form.city) next.city = "Please choose your city.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setPlaced({ id: `ERP-${Date.now().toString().slice(-5)}`, total });
    clearCart();
  }

  if (placed) {
    return (
      <div className="min-h-[60vh] bg-[var(--surface)]">
        <SuccessPopup orderId={placed.id} total={placed.total} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[var(--surface)]">
        <Container className="flex flex-col items-center py-20 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--background)]">
            <BrandMark className="h-9 w-auto text-[var(--primary)]" />
          </span>
          <h1 className="mt-6 text-2xl font-bold text-stone-900">
            Your order is empty
          </h1>
          <p className="mt-2 text-base text-stone-500">
            Add a few dishes from the menu to start checkout.
          </p>
          <Link
            href="/shop"
            className="mt-6 rounded-full bg-[var(--primary)] px-7 py-3 text-base font-semibold text-white"
          >
            Browse menu
          </Link>
        </Container>
      </div>
    );
  }

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
            <Link href="/cart" className="hover:text-white">
              Cart
            </Link>
            <span className="mx-1.5">/</span>
            Checkout
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-white sm:text-5xl">
            Almost there!
          </h1>
          <p className="mt-2 text-base text-white/80">
            A few details and your food goes straight to the kitchen.
          </p>
          <ol className="mt-7 flex max-w-xl items-center">
            {CHECKOUT_STEPS.map((step, i) => {
              const done = i === 0;
              const current = i === 1;
              return (
                <li
                  key={step}
                  className="flex flex-1 items-center last:flex-none"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        done
                          ? "bg-[var(--secondary)] text-stone-900"
                          : current
                            ? "bg-white text-[var(--primary)] ring-4 ring-white/25"
                            : "bg-white/15 text-white/70"
                      }`}
                    >
                      {done ? (
                        <LuCheck className="h-4 w-4" aria-hidden />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span
                      className={`hidden text-sm font-semibold sm:inline ${
                        done || current ? "text-white" : "text-white/60"
                      }`}
                    >
                      {step}
                    </span>
                  </span>
                  {i < CHECKOUT_STEPS.length - 1 ? (
                    <span
                      className={`mx-2 h-0.5 flex-1 rounded-full sm:mx-3 ${
                        done ? "bg-[var(--secondary)]" : "bg-white/20"
                      }`}
                      aria-hidden
                    />
                  ) : null}
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <Container className="py-8 sm:py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid overflow-hidden rounded-3xl bg-white shadow-sm lg:grid-cols-[minmax(0,1fr)_440px]"
        >
          {/* Left: customer details */}
          <div className="p-6 sm:p-10">
            <section className="pb-8">
              <CheckoutAccountGate
                authReady={authReady}
                user={user}
                isAuthenticated={isAuthenticated}
                loginWithEmail={loginWithEmail}
                guestContact={guestContact}
                onGuest={continueAsGuest}
                onChangeGuest={() => setGuestContact("")}
              />
            </section>

            <Section
              number={2}
              title="Delivery details"
              disabled={!checkoutUnlocked}
            >
              <Toggle
                value={orderType}
                onChange={setOrderType}
                options={[
                  { id: "delivery", label: "Delivery", icon: LuBike },
                  { id: "pickup", label: "Pickup", icon: LuStore },
                ]}
              />

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  <input
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    autoComplete="name"
                    className={`${inputClass} ${errors.name ? "border-red-400" : "border-stone-200"}`}
                  />
                </Field>
                <Field label="Phone number" error={errors.phone}>
                  <div
                    className={`mt-1.5 flex items-center overflow-hidden rounded-xl border bg-white focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/15 ${
                      errors.phone ? "border-red-400" : "border-stone-200"
                    }`}
                  >
                    <span className="inline-flex shrink-0 items-center gap-1.5 self-stretch whitespace-nowrap border-r border-stone-200 bg-stone-50 px-3 text-base text-stone-600">
                      {country.flag} +{country.dialCode}
                    </span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="1XXXXXXXXX"
                      autoComplete="tel-national"
                      className="w-full px-4 py-3 text-base text-stone-900 outline-none placeholder:text-stone-400"
                    />
                  </div>
                </Field>
              </div>

              {orderType === "delivery" ? (
                <div className="mt-6 space-y-5">
                  {isBangladesh ? (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-stone-700">
                        Delivery area
                      </p>
                      <RadioGroup>
                        {BD_ZONES.map((zone) => (
                          <RadioRow
                            key={zone.id}
                            name="zone"
                            checked={form.zone === zone.id}
                            onChange={() =>
                              setForm((prev) => ({ ...prev, zone: zone.id }))
                            }
                            title={zone.label}
                            note={`Usually ${zone.time}`}
                            aside={formatPrice(zone.fee)}
                          />
                        ))}
                      </RadioGroup>
                    </div>
                  ) : (
                    <>
                      <Field label="City" error={errors.city}>
                        <select
                          value={form.city}
                          onChange={set("city")}
                          className={`${inputClass} ${errors.city ? "border-red-400" : "border-stone-200"}`}
                        >
                          <option value="">Select city</option>
                          {(COUNTRY_CITIES[countryCode] ?? []).map((city) => (
                            <option key={city}>{city}</option>
                          ))}
                        </select>
                      </Field>
                      <RadioGroup>
                        {INTERNATIONAL_SHIPPING.map((option) => (
                          <RadioRow
                            key={option.id}
                            name="zone"
                            checked={selectedDelivery.id === option.id}
                            onChange={() =>
                              setForm((prev) => ({ ...prev, zone: option.id }))
                            }
                            title={option.label}
                            note={option.time}
                            aside={formatPrice(option.fee)}
                          />
                        ))}
                      </RadioGroup>
                    </>
                  )}
                  <Field label="Full address" error={errors.address}>
                    <input
                      value={form.address}
                      onChange={set("address")}
                      placeholder="House, road, sector / area"
                      autoComplete="street-address"
                      className={`${inputClass} ${errors.address ? "border-red-400" : "border-stone-200"}`}
                    />
                  </Field>
                </div>
              ) : (
                <p className="mt-6 flex items-start gap-3 text-base text-stone-700">
                  <LuStore
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]"
                    aria-hidden
                  />
                  <span>
                    <span className="font-semibold text-stone-900">
                      Pick up from ERP17 Restaurant
                    </span>
                    <br />
                    House #1/A, Road #6, K Block, Halishahar · ready in 20–25 min
                  </span>
                </p>
              )}

              <Field
                label="Note for the kitchen or rider"
                optional
                className="mt-5"
              >
                <input
                  value={form.note}
                  onChange={set("note")}
                  placeholder="e.g. less spicy, call on arrival"
                  className={`${inputClass} border-stone-200`}
                />
              </Field>
            </Section>

          </div>

          {/* Right: payment + order summary */}
          <div className="border-t border-stone-200 bg-[#faf6f1] p-6 sm:p-10 lg:border-l lg:border-t-0">
            <div
              className={
                checkoutUnlocked ? "" : "pointer-events-none opacity-50"
              }
            >
              <h2 className="text-xl font-bold text-stone-900">
                Payment method
              </h2>
              <div className="mt-4">
                <RadioGroup>
                  {PAYMENT_METHODS.map((method) => (
                    <RadioRow
                      key={method.id}
                      name="payment"
                      checked={form.payment === method.id}
                      onChange={() =>
                        setForm((prev) => ({ ...prev, payment: method.id }))
                      }
                      icon={method.icon}
                      iconColor={method.color}
                      title={
                        method.id === "cod"
                          ? orderType === "pickup"
                            ? "Pay at the counter"
                            : "Cash on delivery"
                          : method.label
                      }
                      note={
                        method.id === "cod" && orderType === "pickup"
                          ? "Pay when you collect your food"
                          : method.note
                      }
                    />
                  ))}
                </RadioGroup>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <h2 className="text-xl font-bold text-stone-900">Your order</h2>
              <span className="text-sm font-medium text-stone-500">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>

            <ul className="mt-4 max-h-72 space-y-4 overflow-y-auto">
              {items.map((line) => (
                <li key={line.lineId} className="flex gap-3">
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-200">
                    <ImageWithFallback
                      src={line.image}
                      alt=""
                      useNative
                      imageClassName="object-cover"
                    />
                    <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-900/80 px-1 text-xs font-bold text-white">
                      {line.quantity}
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold leading-snug text-stone-900">
                      {line.name}
                    </p>
                    <p className="text-sm text-stone-500">
                      {sizeOptionLabel(line.size)}
                      {line.color ? ` · ${line.color}` : ""}
                    </p>
                    <div className="mt-1.5 flex items-center gap-3 text-stone-500">
                      <button
                        type="button"
                        aria-label={`Decrease ${line.name}`}
                        onClick={() =>
                          updateQuantity(line.lineId, line.quantity - 1)
                        }
                        className="hover:text-[var(--primary)]"
                      >
                        <LuMinus className="h-4 w-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        aria-label={`Increase ${line.name}`}
                        onClick={() =>
                          updateQuantity(line.lineId, line.quantity + 1)
                        }
                        className="hover:text-[var(--primary)]"
                      >
                        <LuPlus className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </div>
                  <span className="text-base font-semibold text-stone-900">
                    {formatPrice(line.price * line.quantity, line.currency)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-2">
              <div className="relative flex-1">
                <LuTag
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                  aria-hidden
                />
                <input
                  value={promoInput}
                  onChange={(event) => {
                    setPromoInput(event.target.value);
                    setPromoError("");
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      applyPromo();
                    }
                  }}
                  placeholder="Promo code"
                  className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-3 text-base uppercase outline-none placeholder:normal-case placeholder:text-stone-400 focus:border-[var(--primary)]"
                />
              </div>
              <button
                type="button"
                onClick={applyPromo}
                className="rounded-xl border border-stone-300 bg-white px-5 text-base font-semibold text-stone-800"
              >
                Apply
              </button>
            </div>
            {promoError ? (
              <p className="mt-2 text-sm text-red-600">{promoError}</p>
            ) : null}
            {promo ? (
              <p className="mt-2 text-sm font-medium text-emerald-700">
                {promo.code} applied — {Math.round(promo.rate * 100)}% off
              </p>
            ) : null}

            <dl className="mt-6 space-y-3 border-t border-stone-200 pt-6 text-base">
              <div className="flex justify-between">
                <dt className="text-stone-600">Subtotal</dt>
                <dd className="font-semibold text-stone-900">
                  {formatPrice(subtotal)}
                </dd>
              </div>
              {discount > 0 ? (
                <div className="flex justify-between">
                  <dt className="text-stone-600">Discount</dt>
                  <dd className="font-semibold text-emerald-700">
                    − {formatPrice(discount)}
                  </dd>
                </div>
              ) : null}
              <div className="flex justify-between">
                <dt className="text-stone-600">
                  {orderType === "pickup" ? "Pickup" : "Delivery fee"}
                </dt>
                <dd className="font-semibold text-stone-900">
                  {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-stone-200 pt-4">
                <dt className="text-lg font-bold text-stone-900">Total</dt>
                <dd className="text-2xl font-bold text-[var(--primary)]">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            <button
              type="submit"
              className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-[var(--primary)] text-base font-bold text-white shadow-[0_12px_28px_-10px_rgba(165,30,34,0.7)] transition-transform active:scale-[0.99]"
            >
              Place order · {formatPrice(total)}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-stone-500">
              <LuLock className="h-3.5 w-3.5" aria-hidden />
              {checkoutUnlocked
                ? "Your details are kept secure"
                : "Sign in or continue as guest to place your order"}
            </p>
          </div>
        </form>
      </Container>
    </div>
  );
}
