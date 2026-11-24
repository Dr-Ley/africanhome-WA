import type { VehicleOption } from "@/types";

export const vehicles: VehicleOption[] = [
  {
    id: "land-cruiser",
    name: "Private Land Cruiser",
    image: "/images/branding/landcruiser2.png",
    imageAlt: "Four-wheel-drive vehicle on an open road, illustrating a private safari vehicle",
    summary:
      "A private 4x4 with a professional driver-guide is the usual way to travel on a tailor-made Kenya safari. The vehicle stays with your party for the whole itinerary.",
    passengers:
      "Seating depends on the vehicle supplied. Ask for the exact layout, including child seats, when you request a quote.",
    roof: "Many safari Land Cruisers are fitted with a pop-up roof for game viewing. Confirm the roof on your quotation.",
    luggage:
      "Soft bags are easier to pack than hard suitcases. Luggage space is confirmed with the vehicle, not assumed from a brochure figure.",
    bestFor: "Private families, photographers and anyone who wants to set the pace of game drives.",
  },
  {
    id: "minivan",
    name: "Safari minivan",
    image: "/images/vehicles/van2_safari.png",
    imageAlt: "Safari 4x4 on the savannah. A minivan is a different vehicle and is only used where it is suitable.",
    summary:
      "A safari minivan can suit some shorter routes and smaller budgets. It is not the right vehicle for every park, every season or every track.",
    passengers: "Capacity is confirmed per vehicle. Do not assume a guaranteed seat count until the quote names the vehicle.",
    roof: "A pop-up roof is not guaranteed on every minivan. Ask before you travel if standing game viewing matters to you.",
    luggage: "Luggage room is tighter than in a Land Cruiser. Share your bag count when you enquire.",
    bestFor: "Suitable parks and shorter itineraries where a minivan is appropriate.",
  },
  {
    id: "fly-in",
    name: "Fly-in with ground transfers",
    image: "/images/vehicles/flights.png",
    imageAlt: "View from an aircraft window, illustrating the flight into a safari",
    summary:
      "Scheduled or shared light aircraft link Nairobi with safari airstrips. A ground vehicle and driver-guide meet the flight for game drives and camp transfers.",
    passengers: "Aircraft seating is set by the operator and the aircraft type on the day.",
    roof: "Game viewing still happens from the ground vehicle, which should be confirmed as a 4x4 with a pop-up roof where that matters.",
    luggage:
      "Soft-bag limits apply and vary by airline. Luggage is subject to the carrier’s rules, usually around 15 kg in soft bags, and must be checked before tickets are issued.",
    bestFor: "Shorter holidays and travellers who would rather fly than spend a full day on the road.",
  },
];

export const sampleRoutes = [
  {
    from: "Nairobi",
    to: "Maasai Mara",
    note: "Often planned as a full road day via Narok, or as a short flight to a Mara airstrip with a camp transfer.",
  },
  {
    from: "Nairobi",
    to: "Amboseli",
    note: "Often planned as a road day south toward the Tanzania border, with Kilimanjaro on the horizon in clear weather.",
  },
  {
    from: "Nairobi",
    to: "Lake Nakuru",
    note: "A shorter Rift Valley road journey than the Mara or Samburu, useful on the first or last day of a safari.",
  },
  {
    from: "Nairobi",
    to: "Samburu",
    note: "A long road day north, or a flight to an airstrip serving Samburu and the nearby reserves.",
  },
  {
    from: "Diani",
    to: "Tsavo",
    note: "A coast-to-bush road transfer through the south coast and into Tsavo. Timing depends on the gate and the lodge.",
  },
];
