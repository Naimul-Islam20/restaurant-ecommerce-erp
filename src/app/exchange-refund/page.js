import { InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata = {
  title: "Refund & Replacement",
  description:
    "When ERP17 Restaurant replaces a dish or refunds an order, and how to report a problem.",
};

export default function RefundReplacementPage() {
  return (
    <InfoPage
      title="Refund & Replacement"
      intro="Something wrong with your order? Tell us within 2 hours and we will make it right."
    >
      <InfoSection title="When we replace or refund">
        <p>
          ERP17 Restaurant will replace the dish or refund it in full when your
          order:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>has a wrong dish, portion or preference (e.g. spicy instead of mild)</li>
          <li>is missing an item you paid for</li>
          <li>arrives spilled, damaged or not safe to eat</li>
          <li>contains an ingredient you asked us to leave out</li>
        </ul>
      </InfoSection>

      <InfoSection title="What we can't refund">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>A change of mind after the food has been cooked</li>
          <li>Taste preferences when the dish was made as described on the menu</li>
          <li>Orders delayed by a wrong address or an unreachable phone number</li>
          <li>Dishes that were mostly eaten before the problem was reported</li>
        </ul>
      </InfoSection>

      <InfoSection title="How to report a problem">
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>
            Call or WhatsApp us within <strong>2 hours of delivery</strong>.
          </li>
          <li>Share your order number and a photo of the dish.</li>
          <li>
            We confirm within 30 minutes and either send a fresh dish or start
            a refund — your choice.
          </li>
        </ol>
      </InfoSection>

      <InfoSection title="How refunds are paid">
        <p>
          <strong>bKash / Nagad / card:</strong> back to the same account
          within 3–5 working days.
        </p>
        <p>
          <strong>Cash on delivery:</strong> sent to your bKash number, or
          kept as credit for your next order.
        </p>
      </InfoSection>

      <InfoSection title="Dining in">
        <p>
          If a dish is not right at the table, tell your server straight away.
          We will cook it again or take it off the bill.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
