import { RouteMap } from "@/components/maps/RouteMap";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SITE } from "@/lib/constants";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "About African Home Adventure Safaris",
  description:
    "A Nairobi-based safari desk planning private journeys in Kenya and Tanzania, with driver-guides and 4x4 vehicles arranged per departure.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Nairobi · since ${SITE.founded}`}
        title="A Kenyan desk for private safaris."
        text="African Home Adventure Safaris plans Kenya and Tanzania journeys for people who want their own vehicle, their own dates and a ground team that is already in the country."
        image="/images/wildlife/leo.jpg"
        alt="Acacia at dusk"
      />
      <Container className="space-y-16 py-12">
        <section className="max-w-3xl">
          <SectionHeading title="The story" description="The company is built around tailor-made safaris rather than a coach departure board. Guests arrive into Nairobi or Kilimanjaro, and the itinerary has already decided who meets them, which vehicle they use and where they sleep." />
          <p className="mt-4 leading-relaxed text-charcoal/75">
            We work in Kenya and across the border in Tanzania. Combined trips are one plan, with the border or the flight treated as part of the design instead of a surprise on day four.
          </p>
        </section>
        <section className="grid gap-5 md:grid-cols-3">
          {[
            ["Safari planners", "The people who turn a month and a passenger list into a route that can actually be driven."],
            ["Driver-guides", "Professionals assigned to a departure. We introduce the guide when the safari is confirmed, rather than inventing a roster here."],
            ["Ground operations", "Park tickets, camp holds, flight manifests and the phone that rings when a landing time changes."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-xl bg-white p-5">
              <h2 className="font-display text-3xl">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/75">{text}</p>
            </article>
          ))}
        </section>
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="Fleet and coverage" description="Private 4x4 Land Cruisers are the usual vehicle, with pop-up roofs when the car supplied for that departure has one. The number of vehicles on the road changes with the month, so we do not print a fleet total. Tanzania ground transport is arranged with partners on that side of the border." />
            
          </div>
          <RouteMap
            points={[
              { name: "Kisumu", coordinates: { lat: -0.102, lng: 34.762 } },
              { name: "Mt Kenya", coordinates: { lat: -0.152, lng: 37.308 } },
              { name: "Nairobi", coordinates: { lat: -1.29, lng: 36.82 } },
              { name: "Maasai Mara", coordinates: { lat: -1.406, lng: 35.016 } },
              { name: "Amboseli", coordinates: { lat: -2.65, lng: 37.26 } },
              { name: "Mt Kilimanjaro", coordinates: { lat: -3.067, lng: 37.356 } },
              { name: "Arusha", coordinates: { lat: -3.387, lng: 36.683 } },
              { name: "Serengeti", coordinates: { lat: -2.33, lng: 34.83 } },
              { name: "Tarangire", coordinates: { lat: -3.95, lng: 36.0 } },
              { name: "Diani Beach", coordinates: { lat: -4.28, lng: 39.59 } },
            ]}
          />
        </section>
        <section>
          <SectionHeading title="Reviews" description="Read verified guest feedback on TripAdvisor to see why travellers love exploring Kenya with us." />
          <p className="mt-4 max-w-3xl leading-relaxed text-charcoal/75">
            
            <a href={SITE.tripadvisor} className="text-forest underline-offset-4 hover:underline">TripAdvisor.</a>
          </p>
        </section>
        <section className="rounded-2xl bg-forest p-8 text-cream">
          <h2 className="font-display text-4xl">Talk to the desk</h2>
          <p className="mt-3">{SITE.location}</p>
          <p>{SITE.email}</p>
          <p>{SITE.phoneDisplay}</p>
        </section>
      </Container>
    </>
  );
}
