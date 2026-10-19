import { InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata = {
  title: "Delivery Policy",
  description:
    "ERP17 Restaurant delivery areas, charges, times and how your food reaches you hot.",
};

const ZONES = [
  { area: "Uttara (all sectors)", charge: "৳40", time: "30–45 min" },
  { area: "Airport, Khilkhet, Abdullahpur", charge: "৳60", time: "40–60 min" },
  { area: "Rest of Dhaka", charge: "৳80", time: "60–90 min" },
];

export default function DeliveryPolicyPage() {
  return (
    <InfoPage
      title="Delivery Policy"
      intro="Hot food from our Uttara kitchen to your door, every day from 12 PM to 11 PM."
    >
      <InfoSection title="Delivery areas & charges">
        <div className="overflow-hidden rounded-xl border border-stone-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-stone-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Area</th>
                <th className="px-4 py-3 font-semibold">Charge</th>
                <th className="px-4 py-3 font-semibold">Usual time</th>
              </tr>
            </thead>
            <tbody>
              {ZONES.map((zone) => (
                <tr key={zone.area} className="border-t border-stone-100">
                  <td className="px-4 py-3">{zone.area}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--primary)]">
                    {zone.charge}
                  </td>
                  <td className="px-4 py-3">{zone.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Times are estimates and can be longer at peak hours (Friday lunch,
          weekend dinner) or in heavy rain.
        </p>
      </InfoSection>

      <InfoSection title="Delivery hours">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Saturday – Thursday: 12:00 PM – 10:30 PM</li>
          <li>Friday: 2:30 PM – 11:00 PM</li>
          <li>Last delivery order is taken 30 minutes before closing.</li>
        </ul>
      </InfoSection>

      <InfoSection title="Keeping your food hot & fresh">
        <p>
          Every order is packed in sealed, food-safe boxes. Gravies, rice and
          crisp items are packed separately so nothing goes soggy, and our
          riders carry insulated bags.
        </p>
      </InfoSection>

      <InfoSection title="Payment">
        <p>
          Pay by cash on delivery, bKash, Nagad or card. Please keep change
          ready for cash orders above ৳1,000.
        </p>
      </InfoSection>

      <InfoSection title="Receiving your order">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Keep your phone on — the rider will call when nearby.</li>
          <li>Check that all items are there before the rider leaves.</li>
          <li>
            If something is missing or wrong, see our Refund &amp; Replacement
            policy.
          </li>
        </ul>
      </InfoSection>
    </InfoPage>
  );
}
