import { InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata = {
  title: "Cancellation Policy",
  description:
    "How to cancel or change an ERP17 Restaurant order or table booking.",
};

export default function CancellationPolicyPage() {
  return (
    <InfoPage
      title="Cancellation Policy"
      intro="Plans change. Here is how to cancel or change an order or a table booking."
    >
      <InfoSection title="Cancelling a delivery or pickup order">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Within 5 minutes of ordering:</strong> free cancellation,
            full refund.
          </li>
          <li>
            <strong>After the kitchen starts cooking:</strong> we can&apos;t cancel,
            because the food is already being made for you.
          </li>
          <li>
            <strong>Pre-orders for a later time:</strong> free to cancel up to
            1 hour before the scheduled time.
          </li>
        </ul>
      </InfoSection>

      <InfoSection title="Changing an order">
        <p>
          Need to add a dish, change a portion or fix the address? Call us as
          soon as possible. We will update the order if the kitchen has not
          started on it yet.
        </p>
      </InfoSection>

      <InfoSection title="Table bookings">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Cancel or move a booking free of charge up to 2 hours before.</li>
          <li>We hold your table for 15 minutes after the booking time.</li>
          <li>
            Group bookings of 10+ guests need 24 hours&apos; notice to cancel.
          </li>
        </ul>
      </InfoSection>

      <InfoSection title="Party & catering orders">
        <p>
          Orders for events and parties are cooked to plan, so they need at
          least <strong>24 hours&apos; notice</strong> to cancel. The advance
          payment is refunded in full within that window.
        </p>
      </InfoSection>

      <InfoSection title="If we have to cancel">
        <p>
          Very rarely a dish sells out or a delivery area is closed due to
          weather. If ERP17 Restaurant cancels your order, you get a full
          refund — no questions asked.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
