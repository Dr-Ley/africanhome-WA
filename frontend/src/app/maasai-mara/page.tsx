import Image from "next/image";
import Link from "next/link";
import { AccommodationCard } from "@/components/accommodation/AccommodationCard";
import { BookingEnquiryPanel } from "@/components/booking/BookingEnquiryPanel";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { SafariPackageCard } from "@/components/safari/SafariPackageCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { accommodations } from "@/data/accommodation";
import { getDestination } from "@/data/destinations";
import { loadSafariCatalog } from "@/lib/safari/catalog";
import { maraFaqs } from "@/data/site-content";
import { pageMeta } from "@/lib/metadata";
import { SITE } from "@/lib/constants";

export const metadata = pageMeta({
  title: "Maasai Mara Safaris",
  description:
    "Private Maasai Mara safaris with a 4x4 and driver-guide, migration timing, camps and indicative itineraries from African Home Adventure Safaris.",
  path: "/maasai-mara",
  image: "/images/destinations/maasai-mara.jpg",
});

export default async function MaasaiMaraPage() {
  const mara = getDestination("maasai-mara");
  const related = (await loadSafariCatalog()).filter((item) => item.destinations.includes("Maasai Mara")).slice(0, 3);
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: maraFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={faqJson} />
      <PageHero
        eyebrow="Kenya · Maasai Mara National Reserve"
        title="The Mara, at your pace."
        text="Big cats, the Mara River and a private vehicle that stays with you. Migration months are extraordinary. The rest of the year is best for privacy."
        image="/images/safari/safari.png"
        alt="Elephants silhouetted on the Maasai Mara at sunset"
      />
      <Container className="space-y-16 py-10 pb-28 lg:pb-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Destinations", href: "/destinations" }, { label: "Maasai Mara" }]} />
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeading eyebrow="Overview" title="A reserve that rewards time." description={mara?.description} />
            <p className="mt-4 leading-relaxed text-charcoal/75">
              Most of our Kenya journeys start or finish here. Two full days is the minimum that feels fair. Longer stays belong on conservancies beside the reserve when you want fewer vehicles at a sighting.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {mara?.highlights.map((item) => (
              <li key={item} className="rounded-xl border border-sand bg-white p-4">{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading title="Wildlife highlights" description="Notable species travelers seek to observe during their adventure." />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["/images/wildlife/cheetah-in-mara.png", "Cheetah", "Built for the open savanna, frequently spotted atop termite mounds surveying the grass for gazelles."],
              ["/images/wildlife/lepard.png", "Leopard", "Solitary and elusive, typically seen on the high branches of fever trees along the Mara and Talek rivers."],
              ["/images/wildlife/hippos.png", "Hippos", "Large pods crowded into muddy river bends by day, emerging onto the banks after dusk to graze."],
            ].map(([src, title, text]) => (
              <article key={title} className="overflow-hidden rounded-xl bg-white">
                <div className="relative aspect-[4/3]">
                  <Image src={src} alt={title} fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-2xl">{title}</h3>
                  <p className="mt-2 text-sm text-charcoal/70">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/images/wildlife/migration.png" alt="Wildebeest herd" fill className="object-cover" sizes="50vw" />
          </div>
          <div>
            <SectionHeading eyebrow="Great Migration" title="Patience rewards the safari." description="From July through October, millions of wildebeest and zebra transform the Mara into a stage of constant motion, drawing predators like lions, leopards, and crocodiles close to the action. Watching a river crossing takes quiet observation along the Mara River, where massive herds gather at the banks before plunging into crocodile-rich waters in pursuit of fresh pasture." />
          </div>
        </section>

        <section>
          <SectionHeading title="Best time to visit" description={mara?.bestTravelPeriod} />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["July – October", "Migration season. Busier vehicles near the river. Book camps earlier."],
              ["December – March", "Quieter reserve, good predator viewing, greener after the short rains."],
              ["April – May", "Long rains. Some camps close and tracks get heavy. We say so before you travel."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-xl bg-white p-5">
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="mt-2 text-sm text-charcoal/70">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading title="Accommodation" description="Styles we use in and beside the Mara. The specific property is named on the quotation." />
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {accommodations.filter((stay) => stay.area.includes("Mara") || stay.category === "Mid-range lodge").map((stay) => (
              <AccommodationCard key={stay.id} stay={stay} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="How long to stay" description="Three days is a first look. Five gives you two full game days. A week lets the Mara share the trip with Amboseli or the coast." />
          </div>
          <div>
            <SectionHeading title="Tailored Private Expeditions" description="Travel on your schedule in a private vehicle, with complete flexibility for bush picnics and extended sightings." />
          </div>
        </section>

        <section className="grid items-center gap-8 rounded-2xl bg-forest p-6 text-cream md:p-10 lg:grid-cols-2">
          <div>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">The vehicle matters</p>
            <h2 className="mt-3 font-display text-4xl">Custom 4x4 Safari Vehicles & Driver Guides.</h2>
            <p className="mt-4 leading-relaxed text-cream/80">
            Navigate the Mara in a high-clearance 4x4 with a pop-up roof for standing visibility, led by a driver-guide skilled in tracking, radio updates, and lighting angles. Every seating layout, child seat, and roof configuration is confirmed in advance on your quotation.
            </p>
            <Link href="/vehicle-hire" className="btn mt-6 rounded-full border-0 bg-white text-forest">See vehicle arrangements</Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/images/vehicles/destination_maasai_mara2.png" alt="Four-wheel-drive on an open road" fill className="object-cover" sizes="50vw" />
          </div>
        </section>

        <section>
          <SectionHeading title="Related itineraries" />
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {related.map((item) => (
              <SafariPackageCard key={item.id} safariPackage={item} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading title="Questions we hear first" />
          <div className="mt-6">
            <FAQAccordion items={maraFaqs} />
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHeading title="Plan the Mara around your dates" description={`Let us know your preferred travel month and who will be joining your trip. You can submit your details using the panel on this page or email us directly at  ${SITE.email}. Our team will review your preferences and help tailor your itinerary.`} />
          </div>
          <BookingEnquiryPanel packageTitle="Maasai Mara safari" />
        </section>
      </Container>
      <MobileStickyCTA href="#enquiry" label="Enquire about the Mara" />
    </>
  );
}
