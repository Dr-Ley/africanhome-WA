import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/types";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article id={destination.slug} className="flex h-full flex-col overflow-hidden rounded-xl border border-[#e6dcc8] bg-white shadow-sm">
      <div className="relative aspect-[4/3]">
        <Image
          src={destination.image}
          alt={destination.imageAlt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        {destination.badge ? (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs text-forest">
            {destination.badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-3xl text-charcoal">{destination.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{destination.cardText}</p>
        <p className="mt-3 text-xs tracking-wide text-gold uppercase">{destination.bestTravelPeriod.split(".")[0]}</p>
        <Link href={destination.href} className="mt-auto pt-8 text-sm font-medium text-forest">
          Discover →
        </Link>
      </div>
    </article>
  );
}
