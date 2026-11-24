"use client";

import type { ReactNode } from "react";
import { RouteMap } from "@/components/maps/RouteMap";
import { EditableMedia } from "@/components/admin/EditableMedia";
import { EditableChoice, EditableText } from "@/components/admin/EditableText";
import { accommodations, categories, groupStyles, safariTypes } from "@/lib/admin/package";
import { coverImage } from "@/lib/utils";
import type { ItineraryDay, SafariPackage } from "@/types";

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl bg-white p-4">
      <p className="text-xs tracking-wide text-gold uppercase">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function StringList({
  items,
  onChange,
  addLabel,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
}) {
  return (
    <div>
      <ul className="mt-4 list-disc space-y-3 pl-5">
        {items.map((item, index) => (
          <li key={index} className="leading-relaxed text-charcoal/80">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <EditableText
                  value={item}
                  onChange={(next) => onChange(items.map((entry, itemIndex) => (itemIndex === index ? next : entry)))}
                />
              </div>
              <button
                type="button"
                className="shrink-0 text-sm text-charcoal/60 underline"
                onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className="mt-4 text-sm font-medium text-forest" onClick={() => onChange([...items, ""])}>
        {addLabel}
      </button>
    </div>
  );
}

export function SafariEditor({
  value,
  onChange,
}: {
  value: SafariPackage;
  onChange: (next: SafariPackage) => void;
}) {
  const update = (partial: Partial<SafariPackage>) => onChange({ ...value, ...partial });
  const updateDay = (index: number, partial: Partial<ItineraryDay>) => {
    update({
      itinerary: value.itinerary.map((day, dayIndex) => (dayIndex === index ? { ...day, ...partial } : day)),
    });
  };

  return (
    <div className="space-y-12 pb-28">
      <section>
        <article className="flex max-w-md flex-col overflow-hidden rounded-xl border border-[#e6dcc8] bg-white shadow-sm">
          <div className="relative aspect-[16/10] bg-sand">
            <EditableMedia src={coverImage(value.image)} alt={value.imageAlt} onChange={(image) => update({ image })} />
            <span className="absolute top-3 left-3 z-20 flex items-center rounded-full bg-forest px-3 py-1 text-xs text-cream">
              <EditableText
                value={String(value.duration)}
                iconClassName="text-cream"
                onChange={(next) => update({ duration: Number(next.replace(/[^\d]/g, "")) })}
              />
              <span className="pointer-events-none">days</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <EditableText
              value={value.title}
              onChange={(title) => update({ title })}
              className="font-display text-[1.7rem] leading-tight text-charcoal"
            />
            <div className="mt-2 text-sm text-gold">
              <StringList
                items={value.destinations}
                onChange={(destinations) => update({ destinations })}
                addLabel="Add destination"
              />
            </div>
            <div className="mt-2 text-sm text-charcoal/70">
              <EditableText value={value.summary} onChange={(summary) => update({ summary })} />
            </div>
            <div className="mt-2 text-xs tracking-wide text-olive uppercase">
              <EditableChoice
                value={value.accommodation}
                options={accommodations}
                onChange={(accommodation) => update({ accommodation: accommodation as SafariPackage["accommodation"] })}
              />
            </div>
            <div className="mt-5 border-t border-sand pt-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] tracking-wide text-charcoal/50 uppercase">Price</p>
                  <EditableText
                    value={value.price?.trim() || "On request"}
                    onChange={(price) => update({ price })}
                    className="font-display text-2xl text-charcoal"
                  />
                  <p className="text-[11px] text-charcoal/50">quoted for your dates</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-forest">View itinerary →</span>
              </div>
              <span className="mt-4 inline-block text-sm text-forest/80 underline">Request quotation</span>
            </div>
          </div>
        </article>
        <div className="mt-3 max-w-md text-sm text-charcoal/70">
          <EditableText value={value.imageAlt} onChange={(imageAlt) => update({ imageAlt })} />
        </div>
      </section>

      <section className="space-y-4">
        {value.gallery.map((item, index) => (
          <figure key={index} className="overflow-hidden rounded-xl border border-sand bg-white">
            <div className="relative aspect-[16/9] bg-sand">
              <EditableMedia
                src={coverImage(item.src)}
                alt={item.alt}
                onChange={(src) =>
                  update({
                    gallery: value.gallery.map((entry, entryIndex) => (entryIndex === index ? { ...entry, src } : entry)),
                  })
                }
              />
            </div>
            <figcaption className="flex items-start gap-3 p-3">
              <div className="min-w-0 flex-1 text-sm text-charcoal/70">
                <EditableText
                  value={item.alt}
                  onChange={(alt) =>
                    update({
                      gallery: value.gallery.map((entry, entryIndex) => (entryIndex === index ? { ...entry, alt } : entry)),
                    })
                  }
                />
              </div>
              <button
                type="button"
                className="text-sm text-charcoal/60 underline"
                onClick={() => update({ gallery: value.gallery.filter((_, entryIndex) => entryIndex !== index) })}
              >
                Delete
              </button>
            </figcaption>
          </figure>
        ))}
        <button
          type="button"
          className="text-sm font-medium text-forest"
          onClick={() => update({ gallery: [...value.gallery, { src: "", alt: "" }] })}
        >
          Add image
        </button>
      </section>

      <header>
        <EditableText
          value={value.countryLabel}
          onChange={(countryLabel) => update({ countryLabel })}
          className="text-xs tracking-[0.2em] text-gold uppercase"
        />
        <div className="mt-2">
          <EditableText value={value.title} onChange={(title) => update({ title })} className="font-display text-5xl" />
        </div>
        <div className="mt-4 max-w-3xl">
          <EditableText
            value={value.description}
            onChange={(description) => update({ description })}
            multiline
            className="leading-relaxed text-charcoal/75"
          />
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Fact label="Duration">
            <EditableText
              value={String(value.duration)}
              onChange={(next) => update({ duration: Number(next.replace(/[^\d]/g, "")) })}
            />
          </Fact>
          <Fact label="Destinations">
            <StringList items={value.destinations} onChange={(destinations) => update({ destinations })} addLabel="Add destination" />
          </Fact>
          <Fact label="Travel style">
            <EditableChoice
              value={value.safariType}
              options={safariTypes}
              onChange={(safariType) => update({ safariType: safariType as SafariPackage["safariType"] })}
            />
            <EditableChoice
              value={value.groupStyle}
              options={groupStyles}
              onChange={(groupStyle) => update({ groupStyle: groupStyle as SafariPackage["groupStyle"] })}
            />
          </Fact>
          <Fact label="Category">
            <EditableChoice
              value={value.category}
              options={categories}
              onChange={(category) => update({ category: category as SafariPackage["category"] })}
            />
          </Fact>
          <Fact label="Accommodation">
            <EditableChoice
              value={value.accommodation}
              options={accommodations}
              onChange={(accommodation) => update({ accommodation: accommodation as SafariPackage["accommodation"] })}
            />
          </Fact>
          <Fact label="Price">
            <EditableText value={value.price?.trim() || "On request"} onChange={(price) => update({ price })} />
          </Fact>
        </dl>
        <div className="mt-3 space-y-2 text-sm text-charcoal/60">
          <EditableText value={value.accommodationNote} onChange={(accommodationNote) => update({ accommodationNote })} multiline />
          <EditableText value={value.priceNote} onChange={(priceNote) => update({ priceNote })} multiline />
        </div>
      </header>

      <section>
        <h2 className="font-display text-4xl">Highlights</h2>
        <StringList items={value.highlights} onChange={(highlights) => update({ highlights })} addLabel="Add highlight" />
      </section>

      <section>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-4xl">Daily itinerary</h2>
          <button
            type="button"
            className="text-sm font-medium text-forest"
            onClick={() =>
              update({
                itinerary: [
                  ...value.itinerary,
                  {
                    day: value.itinerary.length + 1,
                    title: "New day",
                    location: "",
                    image: coverImage(value.image),
                    imageAlt: "",
                    meals: "",
                    accommodation: "",
                    description: "",
                  },
                ],
              })
            }
          >
            Add day
          </button>
        </div>
        <ol className="mt-6 space-y-6">
          {value.itinerary.map((day, index) => (
            <li key={index} className="grid gap-4 border-l-2 border-gold/70 pl-5 md:grid-cols-[160px_1fr]">
              <div className="relative h-28 overflow-hidden rounded-lg bg-sand md:h-full md:min-h-28">
                <EditableMedia
                  src={coverImage(day.image)}
                  alt={day.imageAlt ?? ""}
                  onChange={(image) => updateDay(index, { image })}
                />
              </div>
              <div>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs tracking-[0.18em] text-gold uppercase">Day {index + 1}</p>
                  {value.itinerary.length > 1 ? (
                    <button type="button" className="text-sm text-charcoal/60 underline" onClick={() => update({ itinerary: value.itinerary.filter((_, dayIndex) => dayIndex !== index) })}>
                      Delete day
                    </button>
                  ) : null}
                </div>
                <EditableText
                  value={day.title}
                  onChange={(title) => updateDay(index, { title })}
                  className="mt-1 font-display text-3xl text-charcoal"
                />
                <EditableText
                  value={day.location}
                  onChange={(location) => updateDay(index, { location })}
                  className="mt-1 text-sm text-olive"
                />
                <EditableText
                  value={day.meals ?? ""}
                  onChange={(meals) => updateDay(index, { meals })}
                  className="mt-2 text-sm text-charcoal/70"
                />
                <EditableText
                  value={day.accommodation ?? ""}
                  onChange={(accommodation) => updateDay(index, { accommodation })}
                  className="text-sm text-charcoal/70"
                />
                <EditableText
                  value={day.description}
                  onChange={(description) => updateDay(index, { description })}
                  multiline
                  className="mt-2 leading-relaxed text-charcoal/75"
                />
                <div className="mt-2 text-xs text-charcoal/50">
                  <EditableText value={day.imageAlt ?? ""} onChange={(imageAlt) => updateDay(index, { imageAlt })} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="font-display text-4xl">Wildlife</h2>
        <StringList items={value.wildlife} onChange={(wildlife) => update({ wildlife })} addLabel="Add animal" />
      </section>

      <section>
        <h2 className="font-display text-4xl">Transport</h2>
        <div className="mt-3">
          <EditableText value={value.transport} onChange={(transport) => update({ transport })} multiline className="leading-relaxed text-charcoal/75" />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">Included</h2>
          <StringList items={value.included} onChange={(included) => update({ included })} addLabel="Add included item" />
        </div>
        <div>
          <h2 className="font-display text-3xl">Not included</h2>
          <StringList items={value.excluded} onChange={(excluded) => update({ excluded })} addLabel="Add excluded item" />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-4xl">Questions about this safari</h2>
          <button
            type="button"
            className="text-sm font-medium text-forest"
            onClick={() => update({ faqs: [...value.faqs, { question: "", answer: "" }] })}
          >
            Add question
          </button>
        </div>
        <div className="mt-4 divide-y divide-sand border-y border-sand">
          {value.faqs.map((item, index) => (
            <div key={index} className="py-5">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <EditableText
                    value={item.question}
                    onChange={(question) =>
                      update({ faqs: value.faqs.map((entry, entryIndex) => (entryIndex === index ? { ...entry, question } : entry)) })
                    }
                    className="font-display text-2xl text-charcoal"
                  />
                </div>
                <button
                  type="button"
                  className="text-sm text-charcoal/60 underline"
                  onClick={() => update({ faqs: value.faqs.filter((_, entryIndex) => entryIndex !== index) })}
                >
                  Delete
                </button>
              </div>
              <div className="mt-3 pr-8">
                <EditableText
                  value={item.answer}
                  multiline
                  onChange={(answer) =>
                    update({ faqs: value.faqs.map((entry, entryIndex) => (entryIndex === index ? { ...entry, answer } : entry)) })
                  }
                  className="leading-relaxed text-charcoal/75"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-4xl">Route map</h2>
          <button
            type="button"
            className="text-sm font-medium text-forest"
            onClick={() =>
              update({
                mapPoints: [...value.mapPoints, { name: "", coordinates: { lat: -1.286, lng: 36.817 } }],
              })
            }
          >
            Add destination
          </button>
        </div>
        <p className="mt-2 text-sm text-charcoal/70">Pins show the destinations named in this outline.</p>
        <div className="mt-4 space-y-4">
          {value.mapPoints.map((point, index) => (
            <div key={index} className="grid gap-3 rounded-xl bg-white p-4 md:grid-cols-[1fr_140px_140px_auto]">
              <EditableText
                value={point.name}
                onChange={(name) =>
                  update({
                    mapPoints: value.mapPoints.map((entry, entryIndex) => (entryIndex === index ? { ...entry, name } : entry)),
                  })
                }
              />
              <EditableText
                value={Number.isFinite(point.coordinates.lat) ? String(point.coordinates.lat) : ""}
                onChange={(lat) => {
                  const parsed = Number(lat);
                  if (!Number.isFinite(parsed)) return;
                  update({
                    mapPoints: value.mapPoints.map((entry, entryIndex) =>
                      entryIndex === index ? { ...entry, coordinates: { ...entry.coordinates, lat: parsed } } : entry,
                    ),
                  });
                }}
              />
              <EditableText
                value={Number.isFinite(point.coordinates.lng) ? String(point.coordinates.lng) : ""}
                onChange={(lng) => {
                  const parsed = Number(lng);
                  if (!Number.isFinite(parsed)) return;
                  update({
                    mapPoints: value.mapPoints.map((entry, entryIndex) =>
                      entryIndex === index ? { ...entry, coordinates: { ...entry.coordinates, lng: parsed } } : entry,
                    ),
                  });
                }}
              />
              <button
                type="button"
                className="text-sm text-charcoal/60 underline"
                onClick={() => update({ mapPoints: value.mapPoints.filter((_, entryIndex) => entryIndex !== index) })}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <RouteMap
            key={value.mapPoints.map((point) => `${point.name}:${point.coordinates.lat}:${point.coordinates.lng}`).join("|")}
            points={value.mapPoints.filter(
              (point) => point.name.trim() && Number.isFinite(point.coordinates.lat) && Number.isFinite(point.coordinates.lng),
            )}
          />
        </div>
      </section>
    </div>
  );
}
