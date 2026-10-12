export default function AboutUsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:py-16 lg:py-20">
      <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
        Welcome to MAALEEN
      </h1>
      <div className="mt-4 space-y-4 text-justify text-sm sm:text-base leading-relaxed text-stone-700">
        <p>
          Welcome to MAALEEN, a Dhaka restaurant kitchen defined by careful
          cooking, familiar spices, and plates made to be shared. Every dish is
          prepared for the table — starters, mains, desserts, and drinks — with
          the same attention whether you dine in or order delivery.
        </p>
        <p>
          At MAALEEN, we cook for people who want a full meal without fuss.
          The menu is meant to be ordered again: biryani on a weeknight, cake
          after dinner, chai with the first course.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
            Our Vision
          </h2>
          <p className="mt-3 text-justify text-sm sm:text-base leading-relaxed text-stone-700">
            MAALEEN wants a restaurant people return to because the food is
            consistent. We cook dishes that stay on the menu, not one-week
            specials that disappear. The aim is a table that feels generous:
            enough spice, enough portion, and a drink that matches the plate.
          </p>
          <p className="mt-3 text-justify text-sm sm:text-base leading-relaxed text-stone-700">
            Good cooking does not need a long speech. Clear flavours, hot food,
            and a short menu done well — that is the MAALEEN table.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
            Our Craft
          </h2>
          <p className="mt-3 text-justify text-sm sm:text-base leading-relaxed text-stone-700">
            The kitchen is the centre of MAALEEN. Each plate starts with the
            same prep: fresh produce, measured spice, and a finish checked
            before it leaves the pass. We use familiar techniques — dum, tandoor,
            grill, and wok — so the food tastes like a restaurant, not a shortcut.
          </p>
          <p className="mt-3 text-justify text-sm sm:text-base leading-relaxed text-stone-700">
            From the first marinade to the box that goes out for delivery, the
            goal is the same: food that still tastes right when it reaches you.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
            Sustainability Commitment
          </h2>
          <p className="mt-3 text-justify text-sm sm:text-base leading-relaxed text-stone-700">
            MAALEEN cooks in batches that match the day’s orders so less food
            is wasted. We source produce and meat for the service in front of
            us, and we pack delivery so gravies and crisp items stay separate.
          </p>
          <p className="mt-3 text-justify text-sm sm:text-base leading-relaxed text-stone-700">
            A shorter menu, cooked properly, is how we keep quality steady for
            guests in the dining room and for orders across Dhaka.
          </p>
        </section>
      </div>

    </section>
  );
}

