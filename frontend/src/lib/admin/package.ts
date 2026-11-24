import type { AccommodationCategory, SafariCategory, SafariPackage, SafariType } from "@/types";
import { coverImage, expandImages } from "@/lib/utils";

export const safariTypes = ["Wildlife", "Combined", "Beach", "Fly-in", "Photography", "Luxury"] as const satisfies readonly SafariType[];
export const groupStyles = ["Private", "Group", "Private or group"] as const;
export const accommodations = [
  "Budget camping",
  "Tented camp",
  "Mid-range lodge",
  "Luxury lodge",
  "Luxury tented camp",
  "Beach resort",
  "Mixed",
] as const satisfies readonly AccommodationCategory[];
export const categories = [
  "Wildlife safari",
  "Combined safari",
  "Beach combination",
  "Fly-in safari",
  "Photography safari",
] as const satisfies readonly SafariCategory[];

const placeholder = "/images/destinations/maasai-mara.jpg";

export function forEditing(safariPackage: SafariPackage): SafariPackage {
  const copy = structuredClone(safariPackage) as SafariPackage;
  copy.gallery = copy.gallery.flatMap((item) => expandImages(item.src).map((src) => ({ src, alt: item.alt })));
  return copy;
}

export function blankPackage(): SafariPackage {
  return {
    id: crypto.randomUUID(),
    slug: "",
    title: "New safari",
    duration: 3,
    destinations: ["Maasai Mara"],
    countryLabel: "Kenya",
    category: "Wildlife safari",
    safariType: "Wildlife",
    groupStyle: "Private",
    accommodation: "Tented camp",
    accommodationNote: "The camp or lodge is named on the quotation.",
    description: "Describe who this safari is for and how the days are spent.",
    summary: "A short line for the safari card.",
    image: placeholder,
    imageAlt: "Safari landscape",
    gallery: [{ src: placeholder, alt: "Safari landscape" }],
    price: "On request",
    priceNote: "Quotation on request. A figure is not shown here until the currency and the current rate are confirmed.",
    highlights: ["Private 4x4 and driver-guide"],
    faqs: [{ question: "Is this a private safari?", answer: "Yes. The vehicle and guide are for your party." }],
    itinerary: [
      {
        day: 1,
        title: "Arrival day",
        location: "Maasai Mara",
        image: placeholder,
        imageAlt: "Safari landscape",
        meals: "Lunch and dinner",
        accommodation: "Camp or lodge, named on the quotation",
        description: "Describe the drive, the first game drive, and where the night is spent.",
      },
    ],
    wildlife: ["Lion", "Elephant"],
    transport: "Road transfer in a 4x4 with a driver-guide.",
    included: ["Park fees for this routing", "Meals named in the itinerary"],
    excluded: ["International flights", "Travel insurance"],
    mapPoints: [{ name: "Nairobi", coordinates: { lat: -1.286, lng: 36.817 } }],
  };
}

function slugify(title: string) {
  const slug = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug || "safari";
}

function uniqueSlug(title: string, existing: SafariPackage[], currentId: string) {
  const base = slugify(title);
  const taken = new Set(existing.filter((item) => item.id !== currentId).map((item) => item.slug));
  if (!taken.has(base)) return base;
  let count = 2;
  while (taken.has(`${base}-${count}`)) count += 1;
  return `${base}-${count}`;
}

function clean(items: string[]) {
  return items.map((item) => item.trim()).filter(Boolean);
}

export function preparePackage(input: SafariPackage, isNew: boolean, existing: SafariPackage[]): SafariPackage {
  const title = input.title.trim();
  if (!title) throw new Error("Add a title before saving.");
  const duration = Number(input.duration);
  if (!Number.isFinite(duration) || duration < 1) throw new Error("Duration must be at least 1 day.");
  if (input.itinerary.length === 0) throw new Error("Add at least one itinerary day.");
  const mapPoints = input.mapPoints
    .filter((point) => point.name.trim())
    .map((point) => ({
      name: point.name.trim(),
      coordinates: { lat: Number(point.coordinates.lat), lng: Number(point.coordinates.lng) },
    }));
  if (mapPoints.some((point) => !Number.isFinite(point.coordinates.lat) || !Number.isFinite(point.coordinates.lng))) {
    throw new Error("Each map destination needs a name, a latitude, and a longitude.");
  }
  const slug = isNew ? uniqueSlug(title, existing, input.id) : input.slug.trim();
  if (!slug) throw new Error("This safari needs a web address.");
  return {
    ...input,
    title,
    slug,
    duration,
    destinations: clean(input.destinations),
    countryLabel: input.countryLabel.trim() || "Kenya",
    summary: input.summary.trim(),
    description: input.description.trim(),
    imageAlt: input.imageAlt.trim(),
    accommodationNote: input.accommodationNote.trim(),
    price: input.price?.trim() || "On request",
    priceNote: input.priceNote.trim(),
    transport: input.transport.trim(),
    highlights: clean(input.highlights),
    wildlife: clean(input.wildlife),
    included: clean(input.included),
    excluded: clean(input.excluded),
    gallery: input.gallery
      .filter((item) => coverImage(item.src))
      .map((item) => ({ src: coverImage(item.src), alt: item.alt.trim() })),
    faqs: input.faqs
      .filter((item) => item.question.trim() || item.answer.trim())
      .map((item) => ({ question: item.question.trim(), answer: item.answer.trim() })),
    mapPoints,
    itinerary: input.itinerary.map((day, index) => ({
      ...day,
      day: index + 1,
      title: day.title.trim(),
      location: day.location.trim(),
      description: day.description.trim(),
      meals: day.meals?.trim() || undefined,
      accommodation: day.accommodation?.trim() || undefined,
      imageAlt: day.imageAlt?.trim() || undefined,
      image: coverImage(day.image) || placeholder,
    })),
  };
}
