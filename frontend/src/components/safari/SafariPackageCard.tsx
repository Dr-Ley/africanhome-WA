import Link from "next/link";
import { MediaFill } from "@/components/shared/MediaFill";
import type { SafariPackage } from "@/types";
import { coverImage } from "@/lib/utils";

export function SafariPackageCard({ safariPackage }: { safariPackage: SafariPackage }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[#e6dcc8] bg-white shadow-sm">
      <div className="relative aspect-[16/10]">
        <MediaFill
          src={coverImage(safariPackage.image)}
          alt={safariPackage.imageAlt}
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        <span className="absolute top-3 left-3 rounded-full bg-forest px-3 py-1 text-xs text-cream">
          {safariPackage.duration} days
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[1.7rem] leading-tight text-charcoal">{safariPackage.title}</h3>
        <p className="mt-2 text-sm text-gold">{safariPackage.destinations.join(" · ")}</p>
        <p className="mt-2 text-sm text-charcoal/70">{safariPackage.summary}</p>
        <p className="mt-2 text-xs tracking-wide text-olive uppercase">{safariPackage.accommodation}</p>
        <div className="mt-5 border-t border-sand pt-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] tracking-wide text-charcoal/50 uppercase">Price</p>
              <p className="font-display text-2xl text-charcoal">{safariPackage.price?.trim() || "On request"}</p>
              <p className="text-[11px] text-charcoal/50">quoted for your dates</p>
            </div>
            <Link href={`/safaris/${safariPackage.slug}`} className="shrink-0 text-sm font-medium text-forest">
              View itinerary →
            </Link>
          </div>
          <Link href={`/safaris/${safariPackage.slug}#enquiry`} className="mt-4 inline-block text-sm text-forest/80 underline-offset-4 hover:underline">
            Request quotation
          </Link>
        </div>
      </div>
    </article>
  );
}
