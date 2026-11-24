import { Suspense } from "react";
import { DestinationExplorer } from "@/components/destinations/DestinationExplorer";
import { SafariPackageCard } from "@/components/safari/SafariPackageCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { destinations } from "@/data/destinations";
import { loadSafariCatalog } from "@/lib/safari/catalog";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Kenya and Tanzania Safari Destinations",
  description:
    "Explore Maasai Mara, Amboseli, Tsavo, Lake Nakuru, Samburu, Laikipia, Serengeti, Ngorongoro, Tarangire, Zanzibar and Diani Beach.",
  path: "/destinations",
});

export default async function DestinationsPage() {
  const packages = await loadSafariCatalog();
  return (
    <>
      <PageHero
        eyebrow="Kenya & Tanzania"
        title="Where the safari takes you."
        text="Twelve places we actually plan around — national reserves, a crater, a dry-country river and two coasts."
        image="/images/wildlife/zebras.png"
        alt="Sunset over the Maasai Mara"
      />
      <Container className="py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Destinations" }]} />
        <div className="mt-8">
          <Suspense fallback={<p>Loading destinations…</p>}>
            <DestinationExplorer />
          </Suspense>
        </div>
        <section className="mt-16">
          <SectionHeading title="Best time, in brief" description="Seasons move the wildlife. These are planning windows, not guarantees of a particular sighting." />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {destinations.map((destination) => (
              <article key={destination.id} className="rounded-xl border border-sand bg-white p-5">
                <h2 className="font-display text-2xl">{destination.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{destination.bestTravelPeriod}</p>
                <p className="mt-3 text-sm text-gold">{destination.wildlife.slice(0, 4).join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="mt-16">
          <SectionHeading title="Related safari packages" description="Indicative outlines that use these destinations. Every one is quoted to your dates." />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {packages.slice(0, 3).map((item) => (
              <SafariPackageCard key={item.id} safariPackage={item} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
