import Image from "next/image";
import { SafariPackageCard } from "@/components/safari/SafariPackageCard";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { loadSafariCatalog } from "@/lib/safari/catalog";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Kenya Safari and Diani Beach",
  description:
    "Combine Lake Nakuru and the Maasai Mara with Diani Beach. The published 8-day outline uses the Nairobi–Mombasa train.",
  path: "/kenya-diani-beach",
  image: "/images/destinations/diani.jpg",
});

export default async function DianiPage() {
  const packages = await loadSafariCatalog();
  const combo = packages.find((item) => item.slug === "8-day-nakuru-mara-diani-beach-safari");
  const related = packages.filter((item) => item.slug !== combo?.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Bush to beach"
        title="Safari, then the Indian Ocean."
        text="Experience the best of Kenya’s wild heartland and tranquil coast in one cohesive, expertly planned trip."
        image="/images/destinations/diani.jpg"
        alt="Tropical beach at sunrise, illustrating Diani"
      />
      <Container className="space-y-16 py-12">
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="relative min-h-72 overflow-hidden rounded-xl">
            <Image src="/images/destinations/mombasaa.png" alt="Maasai Mara at sunset" fill className="object-cover" sizes="50vw" />
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-xl">
            <Image src="/images/destinations/lantana.png" alt="Beach and palms" fill className="object-cover" sizes="50vw" />
          </div>
        </section>
        <SectionHeading title="The idea" description="Experience Lake Nakuru, three nights in the Maasai Mara, rail to Mombasa, and three coastal nights. Custom road transfers via Tsavo or flights to Ukunda are also available." />
        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-xl bg-white p-6">
            <h2 className="font-display text-3xl">By road through Tsavo</h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/75">You keep the same style of journey: game drives on the way to the coast, a night in Tsavo if the day would otherwise be too long, then Diani. It suits people who like the drive and do not mind a travel day.</p>
          </article>
          <article className="rounded-xl bg-white p-6">
            <h2 className="font-display text-3xl">By domestic flight</h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/75">A flight toward Ukunda removes the highway. You trade it for baggage limits and a schedule. The beach transfer is short. Tsavo becomes an optional day trip from the coast, not a park you sleep in, unless we add it back.</p>
          </article>
        </section>
        <section>
          <SectionHeading title="The 8-day outline" description={combo?.description} />
          {combo ? (
            <ol className="mt-6 space-y-3">
              {combo.itinerary.map((day) => (
                <li key={day.day} className="rounded-xl border border-sand bg-white p-4">
                  <span className="text-xs tracking-wide text-gold uppercase">Day {day.day} · {day.location}</span>
                  <h3 className="font-display text-2xl">{day.title}</h3>
                  <p className="text-sm text-charcoal/75">{day.description}</p>
                </li>
              ))}
            </ol>
          ) : null}
        </section>
        <section className="grid gap-5 md:grid-cols-3">
          {[
            ["Beach stay", "A seafront hotel. The name, the meal plan and whether breakfast is included are on the quotation."],
            ["Transfers", "Ukunda airstrip to the hotel, or the vehicle that has come through Tsavo. We do not leave this as ‘on arrival’."],
            ["When to go", "July to October and December to March are the usual windows for both the Mara and a settled beach. April and May are wetter on the coast."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-xl bg-sand/60 p-5">
              <h2 className="font-display text-2xl">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed">{text}</p>
            </article>
          ))}
        </section>
        <section>
          <SectionHeading title="Related packages" />
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {related.map((item) => (
              <SafariPackageCard key={item.id} safariPackage={item} />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/plan-safari">Plan this combination</ButtonLink>
          </div>
        </section>
      </Container>
    </>
  );
}
