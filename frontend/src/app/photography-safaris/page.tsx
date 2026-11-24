import Image from "next/image";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ItineraryTimeline } from "@/components/safari/ItineraryTimeline";
import { loadPackage } from "@/lib/safari/catalog";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Kenya Photography Safaris",
  description:
    "Private photography safaris in the Maasai Mara, Amboseli and Samburu, with a vehicle kept for your party and flexible game-drive hours.",
  path: "/photography-safaris",
  image: "/images/wildlife/photographer.jpg",
});

const seasons = [
  ["June – October", "Drier air, lower grass in many places, migration possible in the Mara. Dust can be part of the picture."],
  ["January – March", "Green or drying landscapes, calving if you cross into the southern Serengeti, and fewer vehicles."],
  ["April – May", "Dramatic skies and fewer travellers. Some camps close and the light is softer, often under cloud."],
];

export default async function PhotographyPage() {
  const sample = await loadPackage("kenya-photography-safari");
  return (
    <>
      <PageHero
        eyebrow="Photography"
        title="Light, subjects and a vehicle that will wait."
        text="Maasai Mara cats, Amboseli elephants and Samburu’s dry-country species, photographed from a private 4x4."
        image="/images/safari/yassine-khalfalli-adsQ9d_Cx0c-unsplash.jpg"
        alt="Giraffe in golden light"
      />
      <Container className="space-y-16 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["/images/wildlife/leopard-on-top-of-a-tree.png", "Maasai Mara", "Open horizons and the best chance of cats in good light."],
            ["/images/wildlife/elephant_hd.jpg", "Amboseli", "Elephants and, when the sky allows, Kilimanjaro behind them."],
            ["/images/destinations/giraffe-in-lake-naivasha.png", "Samburu", "Reticulated giraffe, Grevy’s zebra and the riverine forest."],
          ].map(([src, title, text]) => (
            <article key={title} className="overflow-hidden rounded-xl bg-white">
              <div className="relative aspect-[4/3]">
                <Image src={src} alt={title} fill className="object-cover" sizes="33vw" />
              </div>
              <div className="p-4">
                <h2 className="font-display text-3xl">{title}</h2>
                <p className="mt-2 text-sm text-charcoal/70">{text}</p>
              </div>
            </article>
          ))}
        </div>
        <section className="grid gap-8 lg:grid-cols-2">
          <SectionHeading title="How the days work" description="Dawn and late afternoon in the vehicle. Midday is for batteries, cards and shade. The driver-guide will stay with a subject. Park gate hours still apply inside the reserves." />
          <div className="space-y-4 text-sm leading-relaxed text-charcoal/75">
            <p>Bring the bodies and lenses you already trust. A beanbag is more useful than a tripod on a vehicle, and we ask for one with the car. Dust covers matter in Amboseli.</p>
            <p>A specialist photographer, as distinct from the driver-guide, can be requested at an extra cost.</p>
          </div>
        </section>
        <section>
          <SectionHeading title="Season guide" description="Choose the light and the crowds you prefer." />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {seasons.map(([title, text]) => (
              <article key={title} className="rounded-xl border border-sand bg-white p-5">
                <h2 className="font-display text-2xl">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </section>
        {sample ? (
          <section>
            <SectionHeading title="An 8-day photography outline" description="Mara, Amboseli and Samburu. Flying the long legs is the version we recommend." />
            <div className="mt-6">
              <ItineraryTimeline days={sample.itinerary} />
            </div>
          </section>
        ) : null}
        <ButtonLink href="/plan-safari">Enquire about a photography safari</ButtonLink>
      </Container>
    </>
  );
}
