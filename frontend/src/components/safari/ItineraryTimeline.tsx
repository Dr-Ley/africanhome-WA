import { MediaFill } from "@/components/shared/MediaFill";
import type { ItineraryDay } from "@/types";
import { coverImage } from "@/lib/utils";

export function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  return (
    <ol className="space-y-6">
      {days.map((day) => (
        <li key={day.day} className="grid gap-4 border-l-2 border-gold/70 pl-5 md:grid-cols-[160px_1fr]">
          <div className="relative h-44 overflow-hidden rounded-lg md:h-full md:min-h-28">
            <MediaFill src={coverImage(day.image)} alt={day.imageAlt ?? ""} sizes="(min-width: 768px) 800px, 100vw" />
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] text-gold uppercase">Day {day.day}</p>
            <h3 className="mt-1 font-display text-3xl text-charcoal">{day.title}</h3>
            <p className="mt-1 text-sm text-olive">{day.location}</p>
            {day.meals ? <p className="mt-2 text-sm text-charcoal/70">Meals: {day.meals}</p> : null}
            {day.accommodation ? <p className="text-sm text-charcoal/70">Stay: {day.accommodation}</p> : null}
            <p className="mt-2 leading-relaxed text-charcoal/75">{day.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
