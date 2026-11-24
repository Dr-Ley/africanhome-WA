import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingEnquiryPanel } from "@/components/booking/BookingEnquiryPanel";
import { DestinationGallery } from "@/components/destinations/DestinationGallery";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { RouteMap } from "@/components/maps/RouteMap";
import { ItineraryTimeline } from "@/components/safari/ItineraryTimeline";
import { SafariPackageCard } from "@/components/safari/SafariPackageCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { JsonLd } from "@/components/shared/JsonLd";
import { loadPackage, loadRelatedPackages } from "@/lib/safari/catalog";
import { SITE } from "@/lib/constants";
import { coverImage } from "@/lib/utils";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const safariPackage = await loadPackage(slug);
  if (!safariPackage) return { title: "Safari" };
  const url = `${SITE.domain}/safaris/${slug}`;
  return {
    title: safariPackage.title,
    description: safariPackage.description,
    alternates: { canonical: url },
    openGraph: {
      title: safariPackage.title,
      description: safariPackage.description,
      url,
      images: [{ url: coverImage(safariPackage.image), alt: safariPackage.imageAlt }],
    },
  };
}

export default async function SafariDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const safariPackage = await loadPackage(slug);
  if (!safariPackage) notFound();
  const related = await loadRelatedPackages(slug);
  const trip = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: safariPackage.title,
    description: safariPackage.description,
    touristType: safariPackage.groupStyle,
    itinerary: {
      "@type": "ItemList",
      itemListElement: safariPackage.itinerary.map((day) => ({
        "@type": "ListItem",
        position: day.day,
        name: day.title,
      })),
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: safariPackage.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <article className="pb-24 lg:pb-0">
      <JsonLd data={trip} />
      <JsonLd data={faq} />
      <Container className="py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Safaris", href: "/safaris" },
            { label: safariPackage.title },
          ]}
        />
        <div className="mt-6">
          <DestinationGallery images={safariPackage.gallery} />
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-12">
            <header>
              <p className="text-xs tracking-[0.2em] text-gold uppercase">{safariPackage.countryLabel}</p>
              <h1 className="mt-2 font-display text-5xl">{safariPackage.title}</h1>
              <p className="mt-4 max-w-3xl leading-relaxed text-charcoal/75">{safariPackage.description}</p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Duration", `${safariPackage.duration} days`],
                  ["Destinations", safariPackage.destinations.join(", ")],
                  ["Travel style", `${safariPackage.safariType} · ${safariPackage.groupStyle}`],
                  ["Accommodation", safariPackage.accommodation],
                  ["Price", safariPackage.price?.trim() || "On request"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-white p-4">
                    <dt className="text-xs tracking-wide text-gold uppercase">{label}</dt>
                    <dd className="mt-1">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm text-charcoal/60">{safariPackage.accommodationNote} {safariPackage.priceNote}</p>
            </header>

            <section>
              <h2 className="font-display text-4xl">Highlights</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-charcoal/80">
                {safariPackage.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-4xl">Daily itinerary</h2>
              <div className="mt-6">
                <ItineraryTimeline days={safariPackage.itinerary} />
              </div>
            </section>

            <section>
              <h2 className="font-display text-4xl">Wildlife</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {safariPackage.wildlife.map((item) => (
                  <li key={item} className="rounded-full bg-white px-3 py-1 text-sm">{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-4xl">Transport</h2>
              <p className="mt-3 leading-relaxed text-charcoal/75">{safariPackage.transport}</p>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl">Included</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
                  {safariPackage.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-3xl">Not included</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
                  {safariPackage.excluded.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-4xl">Questions about this safari</h2>
              <div className="mt-4">
                <FAQAccordion items={safariPackage.faqs} />
              </div>
            </section>

            <section>
              <h2 className="font-display text-4xl">Route map</h2>
              <p className="mt-2 text-sm text-charcoal/70">Pins show the destinations named in this outline.</p>
              <div className="mt-4">
                <RouteMap points={safariPackage.mapPoints} />
              </div>
            </section>

            {related.length > 0 ? (
              <section>
                <h2 className="font-display text-4xl">Related packages</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {related.map((item) => (
                    <SafariPackageCard key={item.id} safariPackage={item} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <BookingEnquiryPanel packageTitle={safariPackage.title} />
          </aside>
        </div>
      </Container>
      <MobileStickyCTA href="#enquiry" label="Enquire about this safari" />
    </article>
  );
}
