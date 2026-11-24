import type { FaqItem } from "@/types";

export const trustStats = [
  { value: "25+", label: "Years arranging safaris" },
  { value: "Private", label: "Or group-joining 4x4 departures" },
  { value: "2", label: "Countries · Kenya & Tanzania" },
  { value: "1:1", label: "Tailor-made itineraries" },
];

export const whyTravel = [
  {
    title: "Local experts, end to end",
    text: "Kenyan-owned and operated, with ground teams in Nairobi, the Mara and Arusha.",
  },
  {
    title: "Private 4x4 fleet",
    text: "Land Cruisers for private safaris, and a shared vehicle on group-joining departures. A pop-up roof is confirmed for the actual car.",
  },
  {
    title: "Truly tailor-made",
    text: "Private trips are built around your dates. Group-joining safaris share a set routing and a vehicle.",
  },
  {
    title: "Family & group ready",
    text: "From honeymoon tented camps to multi-generational private safaris.",
  },
];

export const maraFaqs: FaqItem[] = [
  {
    question: "How many days do you need in the Maasai Mara?",
    answer:
      "Two full game-viewing days is a useful minimum. Three or four nights lets you slow down, revisit a sighting and, in season, spend time at the river. The right length depends on whether the Mara is the whole safari or one stop.",
  },
  {
    question: "When is the Great Migration in the Mara?",
    answer:
      "Herds are most often in the Mara from July into October, with river crossings possible when animals are gathered on the Mara River. Crossing days are not guaranteed. Resident wildlife, including big cats, is present all year.",
  },
  {
    question: "Do we need a 4x4 with a pop-up roof?",
    answer:
      "A private 4x4 with a pop-up roof and a professional driver-guide is the most practical way to watch wildlife at eye level and to choose how long you stay with a sighting. Confirm the roof, seating and child seats on your quotation.",
  },
  {
    question: "Can we fly instead of driving from Nairobi?",
    answer:
      "Yes. Light aircraft serve Mara airstrips, and a vehicle meets the flight. Luggage limits are set by the airline and are usually soft bags only. We confirm the allowance before tickets are requested.",
  },
];

export const flyInFaqs: FaqItem[] = [
  {
    question: "Which airstrips do fly-in safaris use?",
    answer:
      "The airstrip depends on the camp. The Mara, Amboseli, Samburu and the northern Serengeti are commonly served.",
  },
  {
    question: "What are the luggage limits?",
    answer:
      "Limits are set by the carrier and can change. A common scheduled-safari allowance is about 15 kg in soft bags, including hand luggage. Hard suitcases are often refused. We treat the airline’s rule as final.",
  },
  {
    question: "Is a fly-in safari always faster?",
    answer:
      "It removes a long road day, which matters on a week-long trip. You still need a ground vehicle for game drives, and flights can be rescheduled for weather or weight.",
  },
];

export const vehicleFaqs: FaqItem[] = [
  {
    question: "What does US$250 a day include?",
    answer:
      "The day rate covers the Land Cruiser, the driver, fuel, and park fees for the vehicle and the driver. Passenger park fees, accommodation and meals are separate. Accommodation and meals can be arranged with the hire.",
  },
  {
    question: "How many people fit in the Land Cruiser?",
    answer:
      "The converted safari Land Cruiser takes a maximum of 7 passengers, with fabric seats and seat belts.",
  },
  {
    question: "Is a vehicle available on the dates I want?",
    answer:
      "Availability is confirmed when you enquire. Sending the form does not hold a vehicle.",
  },
];

export const plannerDestinations = [
  "Maasai Mara",
  "Amboseli",
  "Tsavo",
  "Lake Nakuru",
  "Samburu",
  "Serengeti",
  "Ngorongoro",
  "Diani Beach",
  "Zanzibar",
];

export const plannerStyles = ["Private", "Group", "Photography", "Family", "Honeymoon"];

export const plannerTransport = [
  "Private 4x4 Land Cruiser with driver-guide",
  "Safari minivan where suitable",
  "Fly-in safari with ground transfers",
  "Self-drive enquiry, subject to availability",
];

export const plannerAccommodation = [
  "Budget camping",
  "Tented camp",
  "Mid-range lodge",
  "Luxury lodge",
  "No accommodation required",
];

export const budgetTiers = [
  {
    id: "camping",
    name: "Budget camping",
    accommodation: "Campsites or basic tents, sometimes outside the park gate.",
    transport: "Safari minivan or a shared-style vehicle where a private 4x4 is not required.",
    experience: "Early starts, simpler meals, more time on the road between public campsites.",
    flexibility: "Easier to keep the nightly cost down. Less privacy and fewer camps that can move with the migration.",
  },
  {
    id: "mid",
    name: "Mid-range lodges",
    accommodation: "Permanent lodges or simple tented camps with an en-suite room.",
    transport: "Private 4x4 with driver-guide, or a minivan where the route allows.",
    experience: "A full game-drive day with a comfortable base and a set meal plan.",
    flexibility: "A wide choice of camps. Migration-season rooms still need to be requested early.",
  },
  {
    id: "luxury",
    name: "Luxury tented camps",
    accommodation: "Spacious tents, often on a conservancy or a private concession.",
    transport: "Private 4x4 kept for your party, with a guide who can wait at a sighting.",
    experience: "Fewer vehicles at a sighting on conservancies, and a slower daily rhythm.",
    flexibility: "High, within the nights the camp will release. Conservancy fees may apply.",
  },
  {
    id: "fly",
    name: "Fly-in luxury safaris",
    accommodation: "Luxury camps chosen because an airstrip sits close by.",
    transport: "Light aircraft between strips, then a private ground vehicle.",
    experience: "More time in the bush on a short holiday. Luggage is restricted.",
    flexibility: "Flight seats and soft-bag limits are the constraint, not the driving day.",
  },
];
