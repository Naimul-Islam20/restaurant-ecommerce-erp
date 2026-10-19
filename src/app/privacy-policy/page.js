import { InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata = {
  title: "Privacy Policy",
  description:
    "What information ERP17 Restaurant collects, why we need it and how we keep it safe.",
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      intro="We only ask for what we need to cook and deliver your order — and we never sell it."
    >
      <InfoSection title="What we collect">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Contact details:</strong> your name, phone number and email.
          </li>
          <li>
            <strong>Delivery details:</strong> your address and any delivery
            notes.
          </li>
          <li>
            <strong>Order details:</strong> the dishes you order, special
            requests and order history.
          </li>
          <li>
            <strong>Booking details:</strong> date, time and number of guests
            for table bookings.
          </li>
          <li>
            <strong>Website data:</strong> basic device and browser information
            and cookies that keep your cart and login working.
          </li>
        </ul>
      </InfoSection>

      <InfoSection title="How we use it">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>To cook, deliver and confirm your orders</li>
          <li>To call you about a delivery or a change to your order</li>
          <li>To manage table bookings and party orders</li>
          <li>To handle refunds and replacements</li>
          <li>
            To send offers by SMS or email — only if you agree, and you can
            stop them at any time
          </li>
        </ul>
      </InfoSection>

      <InfoSection title="Payments">
        <p>
          Card, bKash and Nagad payments are handled by the payment provider.
          ERP17 Restaurant never sees or stores your full card number or PIN.
        </p>
      </InfoSection>

      <InfoSection title="Who we share it with">
        <p>
          We share your name, phone and address only with our delivery riders
          so they can reach you, and with payment providers to complete a
          payment. We never sell or rent your information to anyone.
        </p>
      </InfoSection>

      <InfoSection title="How long we keep it">
        <p>
          Order records are kept for up to 2 years for accounts and support.
          You can ask us to delete your account and personal details at any
          time.
        </p>
      </InfoSection>

      <InfoSection title="Your choices">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>View or update your details from your account page</li>
          <li>Unsubscribe from offers using the link in any message</li>
          <li>Ask for a copy of your data, or for it to be deleted</li>
        </ul>
      </InfoSection>
    </InfoPage>
  );
}
