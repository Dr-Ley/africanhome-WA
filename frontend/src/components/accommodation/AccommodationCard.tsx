import Image from "next/image";
import type { AccommodationOption } from "@/types";

export function AccommodationCard({ stay }: { stay: AccommodationOption }) {
  return (
    <article className="overflow-hidden rounded-xl border border-sand bg-white">
      <div className="relative aspect-[16/10]">
        <Image src={stay.image} alt={stay.imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 100vw" />
      </div>
      <div className="p-5">
        <p className="text-xs tracking-[0.16em] text-gold uppercase">{stay.category}</p>
        <h3 className="mt-2 font-display text-3xl">{stay.name}</h3>
        <p className="mt-1 text-sm text-olive">{stay.area}</p>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/75">{stay.summary}</p>
      </div>
    </article>
  );
}
