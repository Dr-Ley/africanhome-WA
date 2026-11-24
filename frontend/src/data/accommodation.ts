import type { AccommodationOption } from "@/types";

export const accommodations: AccommodationOption[] = [
  {
    id: "mara-tented",
    name: "Mara tented camp",
    category: "Tented camp",
    image: "/images/accommodation/destination_maasai_mara1.png",
    imageAlt: "Acacia savannah where tented camps are set",
    area: "Maasai Mara",
    summary:
      "Canvas tents with en-suite rooms on the edge of the reserve or a neighbouring conservancy. The exact camp is named in your quotation.",
  },
  {
    id: "mara-luxury",
    name: "Luxury tented camp",
    category: "Luxury tented camp",
    image: "/images/accommodation/Mara-intrepidsjpg.jpg",
    imageAlt: "Elephants at sunset, the view a luxury camp is booked for",
    area: "Maasai Mara or Serengeti",
    summary:
      "A higher-service tented camp with a private vehicle rhythm. Availability and any conservancy fee are confirmed per stay.",
  },
  {
    id: "lodge",
    name: "Mid-range safari lodge",
    category: "Mid-range lodge",
    image: "/images/accommodation/oltukai2.png",
    imageAlt: "Elephants in front of Kilimanjaro, a lodge landscape in Amboseli",
    area: "Kenya and Tanzania parks",
    summary:
      "Permanent lodges inside or beside the parks. A practical base when you want a fixed room rather than a seasonal tent.",
  },
  {
    id: "diani-beach",
    name: "Diani beach stay",
    category: "Beach resort",
    image: "/images/destinations/lantana.png",
    imageAlt: "Tropical beach illustrating a Diani coast finish",
    area: "Diani Beach",
    summary:
      "Seafront rooms after the safari. The property, meal plan and transfer from Ukunda or the Tsavo road are part of the quotation.",
  },
];
