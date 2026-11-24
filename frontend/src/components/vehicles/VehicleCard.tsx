import Image from "next/image";
import type { VehicleOption } from "@/types";

export function VehicleCard({ vehicle }: { vehicle: VehicleOption }) {
  return (
    <article className="overflow-hidden rounded-xl border border-sand bg-white">
      <div className="relative aspect-[16/10]">
        <Image src={vehicle.image} alt={vehicle.imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
      </div>
      <div className="space-y-3 p-5">
        <h3 className="font-display text-3xl">{vehicle.name}</h3>
        <p className="text-sm leading-relaxed text-charcoal/75">{vehicle.summary}</p>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-gold">Passengers</dt>
            <dd>{vehicle.passengers}</dd>
          </div>
          <div>
            <dt className="text-gold">Pop-up roof</dt>
            <dd>{vehicle.roof}</dd>
          </div>
          <div>
            <dt className="text-gold">Luggage</dt>
            <dd>{vehicle.luggage}</dd>
          </div>
        </dl>
        <p className="text-sm text-charcoal/70">{vehicle.bestFor}</p>
      </div>
    </article>
  );
}
