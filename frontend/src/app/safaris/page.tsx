import { Suspense } from "react";
import { SafariFilters } from "@/components/safari/SafariFilters";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { loadSafariCatalog } from "@/lib/safari/catalog";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Safari Packages",
  description:
    "Kenya and Tanzania safari itineraries, from a 3-day Maasai Mara journey to Ngorongoro, Serengeti and Diani Beach combinations.",
  path: "/safaris",
});

export default async function SafarisPage() {
  const packages = await loadSafariCatalog();
  return (
    <>
      <PageHero
        eyebrow="Itineraries"
        title="Safari packages, shaped as starting points."
        text="Filter by destination, length, accommodation and style. Submit an enquiry for prices and we will get back to you within 2 hours."
        image="/images/safari/migration.png"
        alt="Wildebeest herd on the move"
      />
      <Container className="py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Safaris" }]} />
        <div className="mt-8">
          <Suspense fallback={<p>Loading itineraries…</p>}>
            <SafariFilters packages={packages} />
          </Suspense>
        </div>
      </Container>
    </>
  );
}
