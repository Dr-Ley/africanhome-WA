import Image from "next/image";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { ItineraryTimeline } from "@/components/safari/ItineraryTimeline";
import { loadPackage } from "@/lib/safari/catalog";
import { flyInFaqs } from "@/data/site-content";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Kenya Fly-in Safaris",
  description:
    "Fly from Nairobi Wilson to Maasai Mara and Amboseli airstrips, with ground transfers and a private game-drive vehicle. Luggage rules follow the airline.",
  path: "/fly-in-safaris",
  image: "/images/safari/aircraft.jpg",
});

export default async function FlyInPage() {
  const sample = await loadPackage("kenya-fly-in-safari");
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: flyInFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={faq} />
      <PageHero
        eyebrow="Fly-in safaris"
        title="Skip the road. Keep the game drive."
        text="Light aircraft from Nairobi Wilson to a park airstrip, then a vehicle and driver-guide for the actual safari."
        image="/images/safari/aircraft.jpg"
        alt="View from an aircraft window at sunset"
      />
      <Container className="space-y-16 py-12">
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="relative min-h-80 overflow-hidden rounded-xl">
            <Image src="/images/vehicles/flights.png" alt="Tented camp on the plains after a short transfer from the airstrip" fill className="object-cover" sizes="50vw" />
          </div>
          <div>
            <SectionHeading title="Nairobi to the Mara" description="The usual first flight leaves Wilson in the morning and lands at the airstrip that serves your camp. Someone meets you. You can be on a game drive the same day. The flight is scheduled, shared with other passengers unless a private charter is quoted." />
          </div>
        </section>
        <section className="grid gap-5 md:grid-cols-3">
          {[
            ["Worth it when", "Your holiday is a week or less, or you would rather spend the day in the Mara than on the Narok road."],
            ["The limit", "Soft bags, a weight cap set by the airline, and flights that can move for weather. We do not override the carrier."],
            ["Still on the ground", "Game drives, picnics and the guide all happen in a 4x4 after you land. Flying does not replace that."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-xl bg-white p-5">
              <h2 className="font-display text-2xl">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{text}</p>
            </article>
          ))}
        </section>
        {sample ? (
          <section>
            <SectionHeading title="An example week" description="Mara and Amboseli by air. Indicative only." />
            <div className="mt-6">
              <ItineraryTimeline days={sample.itinerary} />
            </div>
          </section>
        ) : null}
        <section>
          <SectionHeading title="Before you pack" />
          <div className="mt-4">
            <FAQAccordion items={flyInFaqs} />
          </div>
        </section>
        <ButtonLink href="/plan-safari">Enquire about a fly-in safari</ButtonLink>
      </Container>
    </>
  );
}
