import type { Destination } from "@/types";

export const destinations: Destination[] = [
  {
    id: "maasai-mara",
    name: "Maasai Mara",
    country: "Kenya",
    slug: "maasai-mara",
    region: "South-west Kenya",
    description:
      "The Maasai Mara National Reserve is Kenya’s most celebrated savannah. Open plains, the Mara River and a high density of big cats make it the centrepiece of most private Kenya safaris, especially when the migration is in the ecosystem.",
    cardText: "Big cats, Great Migration herds and endless golden savannahs.",
    image: "/images/destinations/angry_lion.png",
    imageAlt: "Elephants silhouetted on the Maasai Mara at sunset",
    highlights: ["Big-cat country", "Mara River", "Great Migration", "Dawn and evening game drives"],
    wildlife: ["Lion", "Leopard", "Cheetah", "Elephant", "Wildebeest", "Zebra"],
    bestTravelPeriod:
      "July to October for migration river activity. December to March is quieter, with resident wildlife and good predator viewing.",
    href: "/maasai-mara",
    homeOrder: 1,
    badge: "Most popular",
    coordinates: { lat: -1.406, lng: 35.016 },
  },
  {
    id: "amboseli",
    name: "Amboseli",
    country: "Kenya",
    slug: "amboseli",
    region: "Southern Kenya",
    description:
      "Amboseli National Park sits on the Kenya–Tanzania border beneath Mount Kilimanjaro. Large elephant herds cross the dried lake bed, and clear mornings can put the mountain behind them.",
    cardText: "Large elephant herds beneath snow-capped Kilimanjaro.",
    image: "/images/destinations/amboseli.jpg",
    imageAlt: "African elephant, the wildlife most associated with Amboseli",
    highlights: ["Elephant herds", "Kilimanjaro viewpoints", "Observation Hill", "Swamps and plains"],
    wildlife: ["Elephant", "Giraffe", "Hyena", "Hippo", "Wildebeest"],
    bestTravelPeriod:
      "June to October, and January to February, when the skies are more often clear enough for Kilimanjaro views.",
    href: "/safaris",
    homeOrder: 2,
    coordinates: { lat: -2.653, lng: 37.261 },
  },
  {
    id: "tsavo-east",
    name: "Tsavo East",
    country: "Kenya",
    slug: "tsavo-east",
    region: "South-east Kenya",
    description:
      "Tsavo East is vast red-earth wilderness between Nairobi and the coast. It suits travellers who want space, lava-red landscapes and the Galana River rather than a compact reserve.",
    cardText: "Red earth, big skies and the Galana River on the road toward the coast.",
    image: "/images/destinations/tsavo_destination.png",
    imageAlt: "Golden acacia savannah at dusk",
    highlights: ["Yatta Plateau", "Galana River", "Aruba Dam", "Red-earth game tracks"],
    wildlife: ["Elephant", "Lion", "Oryx", "Gerenuk", "Buffalo"],
    bestTravelPeriod: "June to October, and January to February, outside the heaviest rains.",
    href: "/safaris",
    coordinates: { lat: -2.78, lng: 38.77 },
  },
  {
    id: "tsavo-west",
    name: "Tsavo West",
    country: "Kenya",
    slug: "tsavo-west",
    region: "South-east Kenya",
    description:
      "Tsavo West is greener and hillier than Tsavo East, with Mzima Springs, recent volcanic landscapes and a useful position between Amboseli and the coast.",
    cardText: "Springs, volcanic hills and a greener side of Tsavo.",
    image: "/images/wildlife/ol_pejeta_destination.png",
    imageAlt: "Wildlife silhouette on an East African plain",
    highlights: ["Mzima Springs", "Shetani lava flow", "Rhino sanctuary sector", "Ngulia hills"],
    wildlife: ["Elephant", "Hippo", "Giraffe", "Black rhino in the sanctuary", "Leopard"],
    bestTravelPeriod: "June to October and January to February. The landscape stays greener than Tsavo East after rain.",
    href: "/safaris",
    coordinates: { lat: -2.99, lng: 38.05 },
  },
  {
    id: "lake-nakuru",
    name: "Lake Nakuru",
    country: "Kenya",
    slug: "lake-nakuru",
    region: "Great Rift Valley",
    description:
      "Lake Nakuru National Park is a compact Rift Valley park known for flamingos when lake levels suit them, and for a protected rhino sanctuary on the escarpment.",
    cardText: "Flamingo-lined shores and a protected rhino sanctuary.",
    image: "/images/wildlife/flams.png",
    imageAlt: "Rhinos crossing a track, wildlife associated with Lake Nakuru",
    highlights: ["Flamingo shoreline", "Rhino sanctuary", "Baboon cliff lookout", "Rift Valley escarpment"],
    wildlife: ["Flamingo", "White rhino", "Black rhino", "Rothschild giraffe", "Lion"],
    bestTravelPeriod:
      "Flamingo numbers move with water levels. Wildlife viewing in the park is possible year-round, with drier months from June to October often easier on the tracks.",
    href: "/safaris",
    homeOrder: 3,
    coordinates: { lat: -0.366, lng: 36.083 },
  },
  {
    id: "samburu",
    name: "Samburu",
    country: "Kenya",
    slug: "samburu",
    region: "Northern Kenya",
    description:
      "Samburu National Reserve follows the Ewaso Nyiro River through dry northern country. It is known for species that are uncommon further south, including the gerenuk, Grevy’s zebra and reticulated giraffe.",
    cardText: "Dry-country specialists along the Ewaso Nyiro River.",
    image: "/images/destinations/samburu-national-park.png",
    imageAlt: "Giraffe in open East African bush",
    highlights: ["Ewaso Nyiro River", "Special five", "Riverine forest", "Northern Kenya light"],
    wildlife: ["Reticulated giraffe", "Grevy’s zebra", "Gerenuk", "Somali ostrich", "Elephant", "Leopard"],
    bestTravelPeriod: "June to October, and December to March, when the river still concentrates wildlife.",
    href: "/safaris",
    coordinates: { lat: 0.62, lng: 37.53 },
  },
  {
    id: "laikipia",
    name: "Laikipia",
    country: "Kenya",
    slug: "laikipia",
    region: "Central highlands",
    description:
      "Laikipia is a plateau of private and community conservancies between Mount Kenya and the northern deserts. It suits travellers who want walking, night drives where permitted, and a quieter alternative to the national reserves.",
    cardText: "Conservancy country between Mount Kenya and the northern deserts.",
    image: "/images/wildlife/leopard.png",
    imageAlt: "Rhinos on a park track, wildlife found in Laikipia conservancies",
    highlights: ["Conservancy tracking", "Night drives where permitted", "Walking safaris", "Mount Kenya views"],
    wildlife: ["Lion", "Wild dog on some properties", "Elephant", "Grevy’s zebra", "Reticulated giraffe"],
    bestTravelPeriod: "June to September, and January to March. Activities depend on the conservancy, not a single park rulebook.",
    href: "/safaris",
    coordinates: { lat: 0.4, lng: 36.9 },
  },
  {
    id: "diani",
    name: "Diani Beach",
    country: "Kenya",
    slug: "diani",
    region: "South coast",
    description:
      "Diani Beach is a long stretch of white sand on Kenya’s south coast, usually added after a safari. Travellers reach it overland through Tsavo or on a short domestic flight to Ukunda.",
    cardText: "Powder-white sands on Kenya’s tranquil south coast.",
    image: "/images/destinations/basking-in-diani-beach.png",
    imageAlt: "Tropical beach at sunrise, illustrating a Diani coast finish",
    highlights: ["Indian Ocean beach", "Ukunda airstrip", "Tsavo road link", "Snorkelling and dhow days"],
    wildlife: ["Coastal forest colobus", "Reef fish", "Migratory whales in season offshore"],
    bestTravelPeriod:
      "July to October and December to March are the usual beach windows. The long rains around April and May are less settled.",
    href: "/kenya-diani-beach",
    homeOrder: 4,
    coordinates: { lat: -4.28, lng: 39.595 },
  },
  {
    id: "serengeti",
    name: "Serengeti",
    country: "Tanzania",
    slug: "serengeti",
    region: "Northern Tanzania",
    description:
      "The Serengeti is the stage of the Great Migration’s dramatic river crossings and the endless short-grass plains of the south. A private safari can follow the herds or stay with resident cats in the central Seronera area.",
    cardText: "The stage of the Great Migration’s dramatic river crossings.",
    image: "/images/wildlife/wildebeest-crossing-the-mara-river.png",
    imageAlt: "Wildebeest herd moving across the Serengeti",
    highlights: ["Great Migration", "Seronera valley", "Ndutu calving plains", "Balloon-free private drives"],
    wildlife: ["Wildebeest", "Zebra", "Lion", "Cheetah", "Elephant", "Hyena"],
    bestTravelPeriod:
      "December to March on the southern plains for calving. June to October for the western corridor and northern river crossings. Resident wildlife is present year-round in the centre.",
    href: "/safaris",
    homeOrder: 1,
    coordinates: { lat: -2.333, lng: 34.833 },
  },
  {
    id: "ngorongoro",
    name: "Ngorongoro Crater",
    country: "Tanzania",
    slug: "ngorongoro",
    region: "Northern Tanzania",
    description:
      "The Ngorongoro Crater is a vast volcanic caldera with a permanent concentration of wildlife on the crater floor. Most visits are a full day descending from lodges on the rim.",
    cardText: "A natural amphitheatre sheltering an astonishing density of wildlife.",
    image: "/images/destinations/ngorongoro.png",
    imageAlt: "Acacia savannah at sunset, standing in for the Ngorongoro highlands",
    highlights: ["Crater floor", "Rim viewpoints", "Black rhino habitat", "Hippo pools"],
    wildlife: ["Black rhino", "Lion", "Elephant", "Flamingo", "Hippo", "Buffalo"],
    bestTravelPeriod: "June to October for drier tracks. The crater holds wildlife throughout the year.",
    href: "/safaris",
    homeOrder: 2,
    coordinates: { lat: -3.174, lng: 35.585 },
  },
  {
    id: "tarangire",
    name: "Tarangire",
    country: "Tanzania",
    slug: "tarangire",
    region: "Northern Tanzania",
    description:
      "Tarangire National Park is baobab country along a river that draws elephants in the dry season. It is an easy first or last park on a northern Tanzania safari from Arusha.",
    cardText: "Baobabs, elephant herds and a classic dry-season river.",
    image: "/images/destinations/Tarangire-National-Park.jpg",
    imageAlt: "Elephant on open grassland, wildlife Tarangire is known for",
    highlights: ["Tarangire River", "Baobab woodland", "Elephant concentrations", "Close to Arusha"],
    wildlife: ["Elephant", "Giraffe", "Lion", "Oryx", "Python at Silale"],
    bestTravelPeriod: "June to October, when wildlife gathers along the river.",
    href: "/safaris",
    coordinates: { lat: -3.833, lng: 36.0 },
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    slug: "zanzibar",
    region: "Indian Ocean",
    description:
      "Zanzibar is the usual beach finish to a Tanzania safari. Stone Town, spice farms and the north or east coast reefs sit a short flight from Arusha or Dar es Salaam.",
    cardText: "Spice-scented streets, dhow sails and turquoise shallows.",
    image: "/images/destinations/zanzibar.png",
    imageAlt: "Tropical beach at sunrise, illustrating a Zanzibar coast finish",
    highlights: ["Stone Town", "Spice farms", "North and east coast beaches", "Reef snorkelling"],
    wildlife: ["Reef life", "Dolphins on some excursions", "Red colobus in Jozani"],
    bestTravelPeriod: "June to October and December to February. April and May bring heavier rains.",
    href: "/safaris",
    homeOrder: 3,
    coordinates: { lat: -6.165, lng: 39.199 },
  },
];

export function getDestination(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export function destinationsByCountry(country: Destination["country"]) {
  return destinations.filter((destination) => destination.country === country);
}

export function homeDestinations(country: Destination["country"]) {
  return destinations
    .filter((destination) => destination.country === country && destination.homeOrder)
    .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));
}
