import Image from "next/image";
import { VehicleEnquiryForm } from "@/components/forms/LocalForms";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { sampleRoutes } from "@/data/vehicles";
import { vehicleFaqs } from "@/data/site-content";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Safari 4x4 Land Cruiser and Jeep Vehicle Hire",
  description:
    "Hire a converted Toyota Land Cruiser with a TRA driver-guide for up to 7 guests. US$250 a day covers the vehicle, driver, fuel and vehicle and driver park fees.",
  path: "/vehicle-hire",
  image: "/images/vehicles/landcruiser1.png",
});

const reasons = [
  "An experienced driver-guide with a TRA badge travels with the vehicle.",
  "The Land Cruiser takes a maximum of 7 passengers.",
  "The higher 4x4 platform gives a clearer view for game watching and photography.",
  "It is set up for off-road tracks, with suspension built for park roads.",
  "Two fuel tanks and two spare wheels keep a long safari day moving.",
  "The cabin is more spacious than a safari minivan.",
  "A pop-up roof lets the party stand for photographs and a wider view.",
];

const specs = [
  "Pop-up roof",
  "Charging sockets",
  "7 fabric seats with seat belts",
  "2 spare wheels",
  "Bull bar",
  "Clear sliding windows",
  "5 doors",
];

export default function VehicleHirePage() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: vehicleFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={faq} />
      <PageHero
        eyebrow="Kenya · Land Cruiser hire"
        title="Safari 4x4 Land Cruiser and Jeep Vehicle Hire."
        text="Affordable converted Toyota Land Cruisers, sent out with an experienced driver-guide. The vehicle stays with your party for game drives, park roads and the transfers in between."
        image="/images/vehicles/landcruiser1.png"
        alt="Safari Land Cruiser on an open road"
      />
      <Container className="space-y-16 py-12 pb-28">
        <section className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why this vehicle"
              title="A 4x4 built for the parks"
              description="These are converted Toyota Land Cruiser jeeps used for private safari hire. The higher stance, pop-up roof and extra space are the reasons guests choose them over a minivan."
            />
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-charcoal/80">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/branding/landcruiser2.png"
              alt="Converted safari Land Cruiser with a pop-up roof"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl bg-forest p-6 text-cream md:p-8">
            <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Daily hire</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">US$250 a day</h2>
            <p className="mt-4 leading-relaxed text-cream/80">
              The day rate covers the vehicle, the driver, fuel, and park fees for the vehicle and the driver. It does not cover passenger park fees. Guests pay their own park entry, accommodation and meals. Accommodation and food can be booked with the hire.
            </p>
          </article>
          <article className="rounded-2xl border border-sand bg-white p-6 md:p-8">
            <h2 className="font-display text-3xl">On the vehicle</h2>
            <ul className="mt-4 grid gap-2 text-sm text-charcoal/80 sm:grid-cols-2">
              {specs.map((spec) => (
                <li key={spec} className="rounded-lg bg-cream px-3 py-2">{spec}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="max-w-3xl">
          <SectionHeading
            eyebrow="Photography"
            title="Photo permits are a separate request"
            description="Photography and filming permits inside the parks are limited. They are not guaranteed with the vehicle, and the fee changes by park and by the kind of shoot. Ask when you enquire if stills or video are part of the trip."
          />
        </section>

        <section>
          <SectionHeading title="Routes people ask for" description="Pick one of these in the form, or choose Other and type the journey you have in mind. Road time changes with stops, weather and gates." />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {sampleRoutes.map((route) => (
              <article key={route.to} className="rounded-xl border border-sand bg-white p-5">
                <h3 className="font-display text-2xl">{route.from} to {route.to}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{route.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <FAQAccordion items={vehicleFaqs} />
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <SectionHeading title="Request a Safari Vehicle Quote" description="Tell us the route and the dates. A quote confirms whether a Land Cruiser and driver-guide are free. Sending the form does not hold the vehicle." />
          <div className="rounded-2xl bg-white p-5 md:p-8">
            <VehicleEnquiryForm />
          </div>
        </section>
      </Container>
      <MobileStickyCTA href="#vehicle-enquiry" label="Request a Safari Vehicle Quote" />
    </>
  );
}
