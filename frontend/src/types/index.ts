export type ImageSource = string | readonly string[];

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Destination {
  id: string;
  name: string;
  country: "Kenya" | "Tanzania";
  slug: string;
  region: string;
  description: string;
  cardText: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  wildlife: string[];
  bestTravelPeriod: string;
  href: string;
  homeOrder?: number;
  badge?: string;
  coordinates: Coordinates;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  location: string;
  image: ImageSource;
  imageAlt?: string;
  meals?: string;
  accommodation?: string;
}

export type AccommodationCategory =
  | "Budget camping"
  | "Tented camp"
  | "Mid-range lodge"
  | "Luxury lodge"
  | "Luxury tented camp"
  | "Beach resort"
  | "Mixed";

export type SafariType =
  | "Wildlife"
  | "Combined"
  | "Beach"
  | "Fly-in"
  | "Photography"
  | "Luxury";

export interface SafariPackage {
  id: string;
  slug: string;
  title: string;
  duration: number;
  destinations: string[];
  countryLabel: string;
  category: SafariCategory;
  safariType: SafariType;
  groupStyle: "Private" | "Group" | "Private or group";
  accommodation: AccommodationCategory;
  accommodationNote: string;
  description: string;
  summary: string;
  image: ImageSource;
  imageAlt: string;
  gallery: { src: ImageSource; alt: string }[];
  price?: string;
  priceNote: string;
  highlights: string[];
  faqs: FaqItem[];
  itinerary: ItineraryDay[];
  wildlife: string[];
  transport: string;
  included: string[];
  excluded: string[];
  mapPoints: { name: string; coordinates: Coordinates }[];
}

export type SafariCategory =
  | "Wildlife safari"
  | "Combined safari"
  | "Beach combination"
  | "Fly-in safari"
  | "Photography safari";

export interface VehicleOption {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  summary: string;
  passengers: string;
  roof: string;
  luggage: string;
  bestFor: string;
}

export interface AccommodationOption {
  id: string;
  name: string;
  category: string;
  image: string;
  imageAlt: string;
  area: string;
  summary: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  origin: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href: string;
  links: NavLink[];
}
