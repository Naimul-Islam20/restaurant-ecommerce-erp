import { InfoPage } from "@/components/layout/info-page";

export default function ExchangeRefundPage() {
  return (
    <InfoPage title="Exchange & Refund">
      <p className="text-justify">
        Ready-to-serve dishes can be replaced within the same day when the order
        arrives damaged, incomplete, or not as described. MAALEEN does not refund
        a change of mind once food has left the kitchen. Custom spice or portion
        requests that were cooked as asked are not eligible for a remake, except
        when the kitchen sent the wrong dish.
      </p>

      <section className="mt-8 space-y-3 text-justify">
        <h2>Exchange</h2>
        <p>An item is eligible for exchange only when it is:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Unopened drinks, or food still sealed in the delivery pack</li>
          <li>In the condition it arrived, with the order slip</li>
          <li>Free from extra damage caused after delivery</li>
        </ul>
        <p>
          Contact us before sending anything back. Once the request is approved, we share
          an exchange authorization and the return address.
        </p>
      </section>

      <section className="mt-8 space-y-3 text-justify">
        <h2>Refund</h2>
        <p>
          We do not accept finished meals back for a refund. If a verified kitchen
          mistake cannot be replaced with the same dish, our team will confirm the
          next step with you directly.
        </p>
        <p>Send the approved package only. Items sent without authorization are not accepted.</p>
        <p>
          You cover the delivery charge for sending an item back, unless the issue is a
          verified defect.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2>Contact</h2>
        <p>
          <span className="font-medium">Phone:</span>{" "}
          <a href="tel:+8801786493740" className="text-[var(--accent)] hover:underline">
            +88017 86 493 740
          </a>
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          <a href="mailto:support@maaleen.store" className="text-[var(--accent)] hover:underline">
            support@maaleen.store
          </a>
        </p>
        <p>Include your order number, the item, and the reason for the request.</p>
      </section>
    </InfoPage>
  );
}
