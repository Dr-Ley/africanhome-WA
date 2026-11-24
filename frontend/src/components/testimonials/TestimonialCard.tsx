import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-[#e6dcc8] bg-white p-6 shadow-sm">
      <p className="text-gold" aria-label="5 star story">
        ★ ★ ★ ★ ★
      </p>
      <blockquote className="mt-4 flex-1 font-display text-xl leading-relaxed text-charcoal/85">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6">
        <p className="font-medium text-forest">{testimonial.name}</p>
        <p className="text-xs text-charcoal/55">{testimonial.origin} · Traveller story</p>
      </figcaption>
    </figure>
  );
}
