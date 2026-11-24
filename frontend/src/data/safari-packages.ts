import type { FaqItem, ItineraryDay, SafariPackage } from "@/types";

const priceNote = "Quotation on request. A figure is not shown here until the currency and the current rate are confirmed.";

const sharedExcluded = [
  "International flights",
  "Kenya or Tanzania visa fees",
  "Travel insurance",
  "Drinks, laundry and other personal spending",
  "Tips for the driver-guide and camp staff",
  "Optional activities, including a balloon flight, a village visit or a guided walk, unless your quotation says they are included",
];

const imagePaths = [
  "/images/destinations/maasai-mara.png",
  "/images/destinations/1maasai-mara.jpg",
  "/images/destinations/group-joining.png",
  "/images/destinations/private.png",
  "/images/destinations/lioness.png",
  "/images/destinations/lake-nakuru.jpg",
  "/images/destinations/amboseli.jpg",
  "/images/destinations/serengeti.jpg",
  "/images/destinations/diani.jpg",
  "/images/destinations/ngorongoro.jpg",
  "/images/vehicles/land-cruiser.jpg",
  "/images/accommodation/tented-camp.jpg",
  "/images/safari/dusk-cta.jpg",
  "/images/wildlife/giraffe.jpg",
  "/images/wildlife/elephant.jpg",
  "/images/destinations/laikipia.jpg",
  "/images/safari/migration.jpg",
  "/images/wildlife/lion.jpg",
  "/images/destinations/zanzibar.jpg",
  "/images/destinations/serengetiEntrace.png",
] as const;

const [
  mara,
  maraAlt,
  maraWide,
  privateSafari,
  nakuru,
  amboseli,
  diani,
  serengeti,
  crater,
  cruiser,
  camp,
  dusk,
  giraffe,
  elephant,
  laikipia,
  migration,
  lion,
  zanzibar,
  serengetiEntrace,
] = imagePaths;

const maraShots = [mara, maraAlt, maraWide] as const;

function day(
  item: Omit<ItineraryDay, "imageAlt"> & { imageAlt?: string },
): ItineraryDay {
  return item;
}

const maraFaqs: FaqItem[] = [
  {
    question: "Is this a private safari or a shared departure?",
    answer:
      "The private Maasai Mara safaris use your own 4x4 and driver-guide. The group-joining safari shares a vehicle with other travellers. The page title says which one you are reading.",
  },
  {
    question: "Will I see the Great Migration?",
    answer:
      "River crossings are seasonal, most often talked about between July and October, and they are not scheduled. Your guide will take you toward the area where the herds are if they are in the reserve.",
  },
];

export const safariPackages: SafariPackage[] = [
  {
    id: "mara-3-private",
    slug: "3-day-maasai-mara-safari",
    title: "3-Day Maasai Mara Safari in Kenya – Private Wildlife Experience",
    duration: 3,
    destinations: ["Maasai Mara"],
    countryLabel: "Kenya",
    category: "Wildlife safari",
    safariType: "Wildlife",
    groupStyle: "Private",
    accommodation: "Tented camp",
    accommodationNote:
      "Two nights on a full-board meal plan in a Mara camp or lodge. The property is named when the quotation is prepared. This short outline does not lock a single camp.",
    description:
      "A private 3-day Maasai Mara safari from Nairobi for travellers who want the reserve without a longer circuit. You travel in your own 4x4 Land Cruiser with a driver-guide, with game drives on the afternoon you arrive and a full day in the reserve before the drive back to Nairobi.",
    summary: "Private 4x4 from Nairobi, two nights in the Mara, and game drives on every safari day.",
    image: mara,
    imageAlt: "Elephants on open grassland at sunset",
    gallery: [
      { src: maraShots, alt: "Elephants on open grassland at sunset" },
      { src: cruiser, alt: "Open-sided safari vehicle in warm evening light" },
      { src: camp, alt: "Acacia savannah at sunset, used to illustrate a tented camp setting" },
    ],
    priceNote,
    highlights: [
      "Private 4x4 Land Cruiser and driver-guide from Nairobi",
      "Afternoon game drive on arrival and a full day in the reserve",
      "Countryside and, where the road allows, a Great Rift Valley viewpoint",
      "Optional Maasai village visit or guided walk, arranged separately",
    ],
    faqs: maraFaqs,
    wildlife: ["Lion", "Elephant", "Giraffe", "Plains game", "Leopard where the guide finds one"],
    transport: "Return road transfer from Nairobi in a private 4x4 Land Cruiser with a professional driver-guide. Bottled drinking water is in the vehicle.",
    included: [
      "Return transport from Nairobi in a 4x4 Land Cruiser",
      "Full-board accommodation on the safari nights",
      "Park entrance fees for this routing",
      "Professional driver-guide",
      "Game drives as described in the itinerary",
      "Bottled drinking water",
    ],
    excluded: [...sharedExcluded, "A balloon safari, which can be requested as an extra"],
    mapPoints: [
      { name: "Nairobi", coordinates: { lat: -1.286, lng: 36.817 } },
      { name: "Maasai Mara", coordinates: { lat: -1.406, lng: 35.016 } },
    ],
    itinerary: [
      day({
        day: 1,
        title: "Nairobi to the Maasai Mara",
        location: "Maasai Mara",
        image: cruiser,
        imageAlt: "Safari vehicle on a grassland track",
        meals: "Lunch and dinner",
        accommodation: "Mara camp or lodge, named on the quotation",
        description:
          "Your safari begins when you leave Nairobi in the morning and travel towards the Maasai Mara. The road crosses Kenya's changing countryside and, where the route permits, stops at a Great Rift Valley viewpoint so you can look out over the escarpment. You reach the Mara area around lunchtime, depending on the departure time and the road that day. After lunch and check-in, you head out for an afternoon game drive and stay out until evening, looking for the wildlife that uses the cooler hours. You return to camp or lodge for dinner and the night.",
      }),
      day({
        day: 2,
        title: "A full day of game drives in the Maasai Mara",
        location: "Maasai Mara",
        image: mara,
        imageAlt: "Elephants on the grassland at sunset",
        meals: "Breakfast, lunch and dinner",
        accommodation: "Mara camp or lodge, named on the quotation",
        description:
          "The whole day is for the reserve. Morning and afternoon drives, with a break for meals, take you into different parts of the Maasai Mara so your guide can search for resident wildlife rather than repeating a single loop. The timing follows the schedule you agree with the guide. If you would like a Maasai cultural village visit or a guided nature walk, either can be added. Both are optional and are arranged as an extra, not as part of the basic day.",
      }),
      day({
        day: 3,
        title: "Maasai Mara back to Nairobi",
        location: "Nairobi",
        image: dusk,
        imageAlt: "Acacia tree against a dusk sky",
        meals: "Breakfast",
        accommodation: "Not included after the safari",
        description:
          "An early breakfast, then you check out and start the drive back to Nairobi. You arrive in the late afternoon or evening. The exact hour depends on road conditions and city traffic. This is the end of the safari. Tell us your onward flight time when you enquire so the morning is not tighter than it needs to be.",
      }),
    ],
  },
  {
    id: "mara-3-group",
    slug: "3-day-maasai-mara-group-joining-safari",
    title: "3-Day Maasai Mara Group Joining Safari from Nairobi",
    duration: 3,
    destinations: ["Maasai Mara"],
    countryLabel: "Kenya",
    category: "Wildlife safari",
    safariType: "Wildlife",
    groupStyle: "Group",
    accommodation: "Tented camp",
    accommodationNote:
      "The earlier outline used two nights at Enchoro Wildlife Camp on full board. Ask us to confirm that camp is available. If it is not, a comparable camp is named on the quotation.",
    description:
      "A 3-day group-joining Maasai Mara safari for travellers who want to share a 4x4 and keep the cost down. You leave Nairobi with a driver-guide and a small group, sleep two nights in the Mara, and spend a full day in the reserve with a picnic by the Mara River.",
    summary: "Shared 4x4, two nights in the Mara, and a full-day game drive with a picnic lunch.",
    image: maraWide,
    imageAlt: "Elephants on open grassland at sunset",
    gallery: [
      { src: maraShots, alt: "Elephants on open grassland at sunset" },
      { src: cruiser, alt: "Safari vehicle in evening light" },
      { src: giraffe, alt: "Giraffe beside an acacia tree at sunset" },
    ],
    priceNote,
    highlights: [
      "Group-joining departure with a shared 4x4 Land Cruiser",
      "Pickup in Nairobi around 7:30 am and a Rift Valley viewpoint stop",
      "Evening game drive on arrival day",
      "Full day in the reserve with a picnic by the Mara River",
      "Optional Maasai village visit in the evening of the full day",
    ],
    faqs: [
      ...maraFaqs,
      {
        question: "How does a group-joining safari work?",
        answer:
          "You share the vehicle and the driver-guide with other travellers on the same departure. The game-drive plan is the group's plan. A private 4x4 is the other 3-day Mara safari on this site if you want the vehicle to yourself.",
      },
    ],
    wildlife: ["Lion", "Elephant", "Buffalo", "Plains game", "Birds of the reserve"],
    transport:
      "Shared 4x4 Land Cruiser with a professional driver-guide. Pickup from your Nairobi hotel or residence, and drop-off at a city hotel or JKIA depending on your flight.",
    included: [
      "Driver-guide",
      "Nairobi pickup and drop-off",
      "Game drives in the itinerary",
      "Meals named in the itinerary, on a full-board basis at camp",
      "Shared 4x4 Land Cruiser",
      "Park entry fees for this routing",
      "Accommodation on safari",
      "Drinking water",
      "Government taxes",
    ],
    excluded: sharedExcluded,
    mapPoints: [
      { name: "Nairobi", coordinates: { lat: -1.286, lng: 36.817 } },
      { name: "Maasai Mara", coordinates: { lat: -1.406, lng: 35.016 } },
    ],
    itinerary: [
      day({
        day: 1,
        title: "Nairobi to the Maasai Mara",
        location: "Maasai Mara",
        image: cruiser,
        imageAlt: "Safari vehicle on a grassland track",
        meals: "Lunch and dinner",
        accommodation: "Enchoro Wildlife Camp if confirmed, otherwise a comparable camp",
        description:
          "You leave your Nairobi hotel or residence at about 7:30 am and drop down into the Great Rift Valley, with a short stop for the view from the escarpment. There is another stop in Narok, the last major town before the reserve, so you can collect anything you still need while the driver refuels. You reach the Maasai Mara in time for lunch at camp and a rest after the drive. Later you go out for an evening game drive, when many animals are moving to feed. Dinner and the night are at camp. The outline uses Enchoro Wildlife Camp. We confirm that name, or name the camp that replaces it, before you travel.",
      }),
      day({
        day: 2,
        title: "Full day in the Maasai Mara",
        location: "Maasai Mara",
        image: mara,
        imageAlt: "Grassland and elephants at sunset",
        meals: "Breakfast, picnic lunch and dinner",
        accommodation: "Enchoro Wildlife Camp if confirmed, otherwise a comparable camp",
        description:
          "Breakfast is at about 6:00 am. You leave with a packed picnic at about 6:30 am and spend the day in the reserve, looking for lion, leopard, elephant, buffalo and rhino where the guide can find them, together with wildebeest, zebra, warthog, jackal, antelope, crocodile and giraffe. More than 450 bird species have been recorded in the reserve, so the day suits both wildlife watchers and people who like birds. Picnic lunch is in the reserve along the Mara River, the stretch associated with migration crossings. A crossing is not promised. In the evening you can add a visit to a Maasai village to hear about local culture. That visit is optional and priced separately. You then return to camp for dinner and the night.",
      }),
      day({
        day: 3,
        title: "Maasai Mara back to Nairobi",
        location: "Nairobi",
        image: dusk,
        imageAlt: "Acacia against a dusk sky",
        meals: "Breakfast",
        accommodation: "Not included after the safari",
        description:
          "Breakfast is at camp. You then leave the Maasai Mara and drive back to Nairobi. On arrival you are dropped at your city hotel or at JKIA, depending on your flight. That is the end of the safari.",
      }),
    ],
  },
  {
    id: "mara-4-private",
    slug: "4-day-maasai-mara-safari-nairobi",
    title: "4-Day Maasai Mara Safari from Nairobi – Private Game Drives",
    duration: 4,
    destinations: ["Maasai Mara"],
    countryLabel: "Kenya",
    category: "Wildlife safari",
    safariType: "Wildlife",
    groupStyle: "Private",
    accommodation: "Tented camp",
    accommodationNote:
      "Three nights on full board. The earlier outline named Enchoro Wildlife Camp. Confirm that camp, or accept a comparable camp, when you enquire.",
    description:
      "A private 4-day Maasai Mara safari with three nights in camp, an arrival game drive, and two further days on the plains. The extra night gives you a second full wildlife day before the drive back to Nairobi, with lunch on the way.",
    summary: "Three nights in the Mara, a private 4x4, and room for a second full day of game drives.",
    image: privateSafari,
    imageAlt: "Elephants on open grassland at sunset",
    gallery: [
      { src: maraShots, alt: "Elephants on open grassland at sunset" },
      { src: camp, alt: "Savannah at sunset" },
      { src: giraffe, alt: "Giraffe and acacia at sunset" },
    ],
    priceNote,
    highlights: [
      "Three nights on a full-board basis",
      "Private 4x4 Land Cruiser and driver-guide",
      "First game drive after a 2 pm meet on arrival day",
      "A flexible second wildlife day, or a balloon flight if you add one",
      "Return to a Nairobi hotel or JKIA, with lunch on the road",
    ],
    faqs: maraFaqs,
    wildlife: ["Lion", "Elephant", "Plains game", "Migration herds in season"],
    transport:
      "Private 4x4 Land Cruiser from Nairobi, including pickup and drop-off. An airport transfer from JKIA is included in this outline.",
    included: [
      "Professional driver-guide",
      "Nairobi pickup and drop-off, including a JKIA transfer",
      "Game drives in the itinerary",
      "Meals in the itinerary",
      "Private 4x4 Land Cruiser",
      "Park entry fees",
      "Accommodation on safari",
      "Drinking water",
      "Government taxes",
    ],
    excluded: sharedExcluded,
    mapPoints: [
      { name: "Nairobi", coordinates: { lat: -1.286, lng: 36.817 } },
      { name: "Maasai Mara", coordinates: { lat: -1.406, lng: 35.016 } },
    ],
    itinerary: [
      day({
        day: 1,
        title: "Nairobi to the Maasai Mara",
        location: "Maasai Mara",
        image: cruiser,
        imageAlt: "Safari vehicle in evening light",
        meals: "Lunch and dinner",
        accommodation: "Enchoro Wildlife Camp if confirmed",
        description:
          "You leave Nairobi by road in the morning and travel across the Rift Valley towards the Maasai Mara. The outline aims to reach camp in time for lunch. At 2 pm you meet your driver-guide for the first game drive in the reserve. Dinner and the night are at camp. The named camp in the source outline is Enchoro Wildlife Camp. We confirm it is open for your dates before treating it as booked.",
      }),
      day({
        day: 2,
        title: "Full day in the Maasai Mara",
        location: "Maasai Mara",
        image: mara,
        imageAlt: "Grassland wildlife setting at sunset",
        meals: "Breakfast, lunch in the reserve, and dinner",
        accommodation: "Enchoro Wildlife Camp if confirmed",
        description:
          "After breakfast you leave camp for a full day of game drives, moving between areas where wildlife is concentrated. The reserve has a long species list, often quoted at more than 450 recorded animals, and between July and September the plains can fill with migrating wildebeest and zebra. That window is a season, not a guarantee of a river crossing. Lunch is served in the park. You return to camp for dinner and the night.",
      }),
      day({
        day: 3,
        title: "Another day of Maasai Mara game drives",
        location: "Maasai Mara",
        image: elephant,
        imageAlt: "Elephant on open grass",
        meals: "Breakfast, lunch and dinner",
        accommodation: "Enchoro Wildlife Camp if confirmed",
        description:
          "This day is again for wildlife. You can take a full day of game drives, or split the drives and leave time for a short excursion nearby. Your driver-guide will shape the day around what you prefer. A hot-air balloon flight over the plains can be added. It is arranged before you travel, at extra cost, and the current price is on the quotation rather than printed here.",
      }),
      day({
        day: 4,
        title: "Maasai Mara back to Nairobi",
        location: "Nairobi",
        image: dusk,
        imageAlt: "Dusk over the savannah",
        meals: "Breakfast and lunch on the way",
        accommodation: "Not included after the safari",
        description:
          "Breakfast is at camp. You then drive back to Nairobi, with lunch on the way. On arrival you are dropped at your city hotel or at JKIA, depending on your flight time.",
      }),
    ],
  },
  {
    id: "nakuru-mara-5",
    slug: "5-day-lake-nakuru-naivasha-maasai-mara",
    title: "5-Day Lake Nakuru, Naivasha and Maasai Mara Safari",
    duration: 5,
    destinations: ["Lake Nakuru", "Lake Naivasha", "Maasai Mara"],
    countryLabel: "Kenya",
    category: "Wildlife safari",
    safariType: "Wildlife",
    groupStyle: "Private",
    accommodation: "Mid-range lodge",
    accommodationNote:
      "Mid-range lodges and a Mara camp. An earlier outline named Sopa lodges and Zebra Plains Mara Camp. Those names are confirmed, or replaced, on the quotation. The company's published 5-day page lists this same route.",
    description:
      "A private 5-day Kenya safari that starts at Lake Nakuru, continues to Hell's Gate and Lake Naivasha, and finishes with two nights in the Maasai Mara. You travel in your own 4x4 with a driver-guide, on a mid-range meal plan.",
    summary: "Nakuru rhinos and birds, Hell's Gate, then two nights of Mara game drives.",
    image: nakuru,
    imageAlt: "Rhinos on a park track, illustrating Lake Nakuru's rhino country",
    gallery: [
      { src: nakuru, alt: "Rhinos on a park track" },
      { src: maraShots, alt: "Maasai Mara grassland at sunset" },
      { src: migration, alt: "Giraffe and acacia at sunset" },
    ],
    priceNote,
    highlights: [
      "Lake Nakuru game drive for flamingos, rhinos and birds",
      "Hell's Gate on foot or by bicycle, with rock climbing only if you choose it",
      "Lake Naivasha boat ride, listed as included on the company's published 5-day page",
      "Two nights in the Maasai Mara with a picnic by the Mara River",
      "Private 4x4 Land Cruiser and JKIA transfers",
    ],
    faqs: [
      {
        question: "Is the Lake Naivasha boat ride included?",
        answer:
          "The company's published 5-day page lists the boat ride as included. An earlier internal outline treated it as optional. The quotation states which version you are booking.",
      },
      {
        question: "Can I visit a Maasai village?",
        answer:
          "Yes, on the morning you leave the Mara, if you want it. It is optional and is not assumed in the basic price.",
      },
    ],
    wildlife: ["Rhino", "Flamingo", "Lion", "Elephant", "Giraffe", "Plains game"],
    transport:
      "Private 4x4 Land Cruiser throughout, with Nairobi pickup and drop-off and transfers to and from JKIA.",
    included: [
      "Professional driver-guide",
      "Nairobi pickup and drop-off",
      "JKIA transfers and the other transfers in the itinerary",
      "Game drives in the itinerary",
      "Meals in the itinerary",
      "Private 4x4 Land Cruiser",
      "Park entry fees",
      "Accommodation on safari",
      "Drinking water",
      "Government taxes",
      "Lake Naivasha boat ride when the quotation follows the published website inclusion",
    ],
    excluded: [
      ...sharedExcluded,
      "A single-room supplement, if it applies",
      "Any government increase in park fees after the quotation",
    ],
    mapPoints: [
      { name: "Nairobi", coordinates: { lat: -1.286, lng: 36.817 } },
      { name: "Lake Nakuru", coordinates: { lat: -0.366, lng: 36.083 } },
      { name: "Lake Naivasha", coordinates: { lat: -0.77, lng: 36.35 } },
      { name: "Maasai Mara", coordinates: { lat: -1.406, lng: 35.016 } },
    ],
    itinerary: [
      day({
        day: 1,
        title: "Nairobi to Lake Nakuru",
        location: "Lake Nakuru",
        image: nakuru,
        imageAlt: "Rhinos on a park track",
        meals: "Lunch and dinner",
        accommodation: "Mid-range lodge in Nakuru, named on the quotation",
        description:
          "You leave Nairobi at about 7:30 am and drive via the Rift Valley viewpoint to look at the escarpment. A short distance further on, the route stops at the little Italian church built by Italian workers while the road was being made, so they had a place to worship. You reach Nakuru in time for lunch, then take an afternoon game drive in Lake Nakuru National Park. The alkaline lake is a bird sanctuary, and lesser and greater flamingos can cover large parts of the surface when the water suits them. The park is known for white and black rhinos. Older copy said a sighting was assured. We do not promise that. Elephant are not the focus of this park. You return to the lodge for dinner and the night.",
      }),
      day({
        day: 2,
        title: "Lake Nakuru to Lake Naivasha and Hell's Gate",
        location: "Lake Naivasha",
        image: laikipia,
        imageAlt: "Open East African landscape used to illustrate the Rift Valley lakes",
        meals: "Breakfast and dinner. Lunch depends on the Hell's Gate timing.",
        accommodation: "Lodge or resort by Lake Naivasha",
        description:
          "After breakfast you make the short drive to Lake Naivasha and visit Hell's Gate National Park. The park is known for cliffs, geothermal springs and Hell's Gate Gorge. Unlike many parks, you can explore on foot or by bicycle, and rock climbing can be arranged if you want it. Zebra, giraffe and birds use the valley. Large predators are not the reason to come here. A boat ride on Lake Naivasha, looking for hippos and birds, is part of the company's published 5-day page. An earlier outline listed that boat as optional. We state on the quotation which one applies. Dinner and the night are at a lodge or resort by the lake.",
      }),
      day({
        day: 3,
        title: "Lake Naivasha to the Maasai Mara",
        location: "Maasai Mara",
        image: mara,
        imageAlt: "Maasai Mara at sunset",
        meals: "Breakfast, lunch and dinner",
        accommodation: "Mara camp, Zebra Plains if confirmed",
        description:
          "After breakfast you drive through Narok town to the Maasai Mara National Reserve and arrive in time for lunch at camp. The afternoon is a game drive for the Big Five where the guide can find them, plus the plains animals and birds the reserve is known for. More than 450 bird species have been recorded. You return to camp for dinner and the night. An earlier outline used Zebra Plains Mara Camp for these two nights. That name is confirmed before it is treated as booked.",
      }),
      day({
        day: 4,
        title: "Full day in the Maasai Mara",
        location: "Maasai Mara",
        image: giraffe,
        imageAlt: "Giraffe at sunset",
        meals: "Breakfast, picnic lunch and dinner",
        accommodation: "Mara camp, Zebra Plains if confirmed",
        description:
          "After breakfast you spend the day in the reserve. From July to October, wildebeest and zebra move between the Serengeti and the Mara. Being in the reserve in those months raises the chance of seeing the herds. It does not book a crossing. Picnic lunch is at the Mara River, with time to watch whatever is on the banks and the plains: lion, giraffe, antelope, gazelle and oryx among the animals the outline mentions. You return to the tented camp for dinner and the night.",
      }),
      day({
        day: 5,
        title: "Maasai Mara back to Nairobi",
        location: "Nairobi",
        image: cruiser,
        imageAlt: "Safari vehicle at sunset",
        meals: "Breakfast",
        accommodation: "Not included after the safari",
        description:
          "After breakfast you can visit a Maasai village and hear about Maasai culture. The visit is optional. You then drive back to Nairobi and are dropped at JKIA or another point in the city that you have agreed.",
      }),
    ],
  },
  {
    id: "kt-6",
    slug: "6-day-ngorongoro-serengeti-maasai-mara",
    title: "6-Day Ngorongoro, Serengeti and Maasai Mara Safari",
    duration: 6,
    destinations: ["Ngorongoro Crater", "Serengeti", "Maasai Mara"],
    countryLabel: "Kenya and Tanzania",
    category: "Combined safari",
    safariType: "Combined",
    groupStyle: "Private",
    accommodation: "Mid-range lodge",
    accommodationNote:
      "Mid-range camps and lodges. The outline names Angata Ngorongoro Camp, Angata Serengeti Camp and Maasai Mara Sopa Lodge. Confirm each property. The company's website describes a 6-day Arusha, Ngorongoro, Serengeti and Mara journey. This page starts in Nairobi, which is how the detailed outline is written.",
    description:
      "A private 6-day Kenya and Tanzania safari from Nairobi through the Ngorongoro Crater and the Serengeti, then back into the Maasai Mara. One full day on the crater floor, one full day on the Serengeti plains, and one full day in the Mara, with a private 4x4 and an English-speaking driver-guide.",
    summary: "Crater, Serengeti and Mara in six days, crossing at Namanga and Isebania.",
    image: serengetiEntrace,
    imageAlt: "Giraffe and acacia at sunset, illustrating the Serengeti plains",
    gallery: [
      { src: crater, alt: "Acacia savannah used for the Ngorongoro highlands" },
      { src: serengeti, alt: "Giraffe on open plains at sunset" },
      { src: maraShots, alt: "Maasai Mara elephants at sunset" },
    ],
    priceNote,
    highlights: [
      "Crater-floor game drive with a picnic at Ngoitoktok Springs",
      "Full day on the Serengeti plains",
      "Border crossings at Namanga and later at Isebania",
      "Full day in the Maasai Mara",
      "Private 4x4 Land Cruiser and driver-guide",
    ],
    faqs: [
      {
        question: "Does the trip start in Nairobi or Arusha?",
        answer:
          "This itinerary starts with a 5 am pickup in Nairobi and a drive to the Namanga border. The company website also describes a 6-day version that starts from Arusha. Tell us which city you are flying into and we will quote the matching start.",
      },
      {
        question: "Is the first night in Nairobi included?",
        answer:
          "No. Accommodation before the 5 am pickup is excluded. The safari nights in the itinerary are included.",
      },
    ],
    wildlife: ["Black rhino where found in the crater", "Lion", "Elephant", "Cheetah", "Wildebeest"],
    transport:
      "Private 4x4 Land Cruiser. You are driven from Nairobi to the Namanga border, met there, and later cross back into Kenya at Isebania. The drive from the Mara returns to Nairobi.",
    included: [
      "Accommodation in the itinerary",
      "Meals specified in the itinerary",
      "Park entrance fees",
      "Private 4x4 Land Cruiser",
      "Bottled drinking water",
      "Transfer to the Namanga border",
      "Government taxes",
      "English-speaking driver-guide",
      "Game drives in the itinerary",
    ],
    excluded: [...sharedExcluded, "The night in Nairobi before the safari", "Domestic flights"],
    mapPoints: [
      { name: "Nairobi", coordinates: { lat: -1.286, lng: 36.817 } },
      { name: "Ngorongoro", coordinates: { lat: -3.17, lng: 35.58 } },
      { name: "Serengeti", coordinates: { lat: -2.33, lng: 34.83 } },
      { name: "Maasai Mara", coordinates: { lat: -1.406, lng: 35.016 } },
    ],
    itinerary: [
      day({
        day: 1,
        title: "Nairobi to the Ngorongoro Crater",
        location: "Ngorongoro Crater",
        image: crater,
        imageAlt: "Savannah landscape used for the crater highlands",
        meals: "Picnic lunch and dinner",
        accommodation: "Angata Ngorongoro Camp in the Nyati area, if confirmed",
        description:
          "You are picked up from your Nairobi hotel at 5 am and driven to the Namanga border, where your guide meets you. From there you continue to the Ngorongoro Crater for a day on the crater floor. Picnic lunch is at the Ngoitoktok Springs picnic site. Lion, elephant, buffalo, rhino and leopard are all possible here, along with cheetah, Grant's and Thomson's gazelles, zebra, wildebeest and spotted hyena. Flamingos are sometimes on the crater lake. None of those sightings is promised. Dinner and the night are at Angata Ngorongoro Camp in the Nyati area, if that camp is confirmed for your dates.",
      }),
      day({
        day: 2,
        title: "Ngorongoro Crater to the Serengeti",
        location: "Serengeti",
        image: serengeti,
        imageAlt: "Open plains at sunset",
        meals: "Breakfast and dinner",
        accommodation: "Angata Serengeti Camp, if confirmed",
        description:
          "After breakfast you leave the crater and drive across the Ngorongoro highlands before dropping onto the Serengeti plains. The name is often explained as the Maasai word for endless plains. Game drives start as you enter the park. Elephant, giraffe and, if you are fortunate, leopard are among the animals your guide will watch for. You reach camp in the late afternoon, rest, and go out again for an evening game drive. Dinner and the night are at Angata Serengeti Camp if that property is confirmed.",
      }),
      day({
        day: 3,
        title: "A full day in the Serengeti",
        location: "Serengeti",
        image: giraffe,
        imageAlt: "Giraffe on the plains at sunset",
        meals: "Breakfast, picnic lunch and dinner",
        accommodation: "Angata Serengeti Camp, if confirmed",
        description:
          "After breakfast the day belongs to the Serengeti plains. The park is a UNESCO World Heritage Site and holds the Big Five together with a wide range of other wildlife. The central plains are a useful place to look for leopard, hyena and cheetah. The same ecosystem carries the yearly movement of wildebeest and zebra between the Serengeti and the Maasai Mara, so the herds may be here, further north, or further south, depending on the month. Birds you may see include eagles, flamingos, ducks, geese and vultures. Picnic lunch is in the bush. You explore another part of the park in the afternoon and return to camp for dinner and the night.",
      }),
      day({
        day: 4,
        title: "Serengeti to the Maasai Mara",
        location: "Maasai Mara",
        image: mara,
        imageAlt: "Maasai Mara at sunset",
        meals: "Early breakfast, packed lunch and dinner",
        accommodation: "Maasai Mara Sopa Lodge, if confirmed",
        description:
          "After an early breakfast you leave camp with a last game drive on the way out of the Serengeti. The drive continues to Isebania for immigration, with a packed lunch along the way. Once you are in the Maasai Mara there is more game viewing across the savannah. You reach the lodge in the evening for dinner and the night. The outline uses Maasai Mara Sopa Lodge. We confirm it before travel.",
      }),
      day({
        day: 5,
        title: "A full day in the Maasai Mara",
        location: "Maasai Mara",
        image: elephant,
        imageAlt: "Elephant on the grassland",
        meals: "Breakfast, picnic lunch and dinner",
        accommodation: "Maasai Mara Sopa Lodge, if confirmed",
        description:
          "After breakfast you spend the day on game drives across the grasslands and rolling hills of the Maasai Mara. The reserve is known for large herds of plains game, black-maned lions, leopards, cheetahs and elephants, along with much of the wildlife found elsewhere in Kenya. Depending on the season you may be in the reserve while wildebeest and zebra are crossing the Mara River for fresh grazing. Picnic lunch is by the river or under an acacia. An afternoon drive follows, then dinner and the night at the lodge.",
      }),
      day({
        day: 6,
        title: "Maasai Mara back to Nairobi",
        location: "Nairobi",
        image: cruiser,
        imageAlt: "Safari vehicle at sunset",
        meals: "Breakfast and lunch on the way",
        accommodation: "Not included after the safari",
        description:
          "After breakfast you leave the Maasai Mara and drive back to Nairobi. The road crosses the Rift Valley, with lunch on the way. You arrive in the late afternoon. That is the end of the safari.",
      }),
    ],
  },
  {
    id: "amboseli-diani-3",
    slug: "3-day-amboseli-safari-diani-beach",
    title: "3-Day Amboseli Safari with a Diani Beach Finish",
    duration: 3,
    destinations: ["Amboseli", "Diani Beach"],
    countryLabel: "Kenya",
    category: "Beach combination",
    safariType: "Beach",
    groupStyle: "Private",
    accommodation: "Tented camp",
    accommodationNote:
      "Two nights at Nyati Safari Camp in the source outline. Confirm the camp. The Diani hotel is yours to book, or we can add it. This safari ends with a drop-off, not with beach nights included.",
    description:
      "A private 3-day Amboseli safari that starts in Nairobi and ends at your hotel in Diani. Two nights in the park, morning and afternoon game drives, and Kilimanjaro in the background when the sky is clear. The beach stay itself is not included unless you ask for it.",
    summary: "Two nights in Amboseli, then a road drop-off at Diani with lunch on the way.",
    image: amboseli,
    imageAlt: "Elephants with a mountain backdrop",
    gallery: [
      { src: amboseli, alt: "Elephants with Kilimanjaro behind them" },
      { src: diani, alt: "Tropical beach at sunrise, illustrating the Diani finish" },
      { src: elephant, alt: "Elephant on open grass" },
    ],
    priceNote,
    highlights: [
      "Pickup in Nairobi at about 8 am",
      "Two nights in Amboseli with afternoon and full-day game drives",
      "Elephants on the open flats, and Kilimanjaro when it is visible",
      "Departure for Diani at about 9 am on the last morning",
      "Drop-off at your Diani hotel after lunch on the road",
    ],
    faqs: [
      {
        question: "Are the Diani hotel nights included?",
        answer:
          "No. This outline drops you at the beach hotel. Nights, meals and activities in Diani are a separate booking unless the quotation adds them.",
      },
      {
        question: "Is this the same as a 3-day Amboseli safari back to Nairobi?",
        answer:
          "The company website also lists a 3-day, 2-night Amboseli safari. This page is the version that continues to Diani instead of returning to Nairobi. Ask if you need the return-to-Nairobi routing.",
      },
    ],
    wildlife: ["Elephant", "Lion", "Giraffe", "Zebra", "Birds, including raptors"],
    transport: "Private 4x4 Land Cruiser from Nairobi to Amboseli and on to Diani. There is no return vehicle to Nairobi on this outline.",
    included: [
      "Professional driver-guide",
      "Pickup in Nairobi and drop-off in Diani",
      "Game drives in the itinerary",
      "Meals in the itinerary",
      "Private 4x4 Land Cruiser",
      "Park entry fees",
      "Accommodation at the Amboseli camp named on the quotation",
      "Drinking water",
      "Government taxes",
    ],
    excluded: [...sharedExcluded, "Diani hotel nights and beach activities"],
    mapPoints: [
      { name: "Nairobi", coordinates: { lat: -1.286, lng: 36.817 } },
      { name: "Amboseli", coordinates: { lat: -2.65, lng: 37.26 } },
      { name: "Diani Beach", coordinates: { lat: -4.32, lng: 39.57 } },
    ],
    itinerary: [
      day({
        day: 1,
        title: "Nairobi to Amboseli National Park",
        location: "Amboseli",
        image: amboseli,
        imageAlt: "Elephants with a mountain behind them",
        meals: "Lunch and dinner",
        accommodation: "Nyati Safari Camp if confirmed",
        description:
          "You are picked up from your Nairobi hotel at about 8 am and drive to Amboseli National Park, arriving for a relaxed lunch at camp. The afternoon game drive is the late feed of the day, when many animals leave cover to graze and stand in the sun. Amboseli is famous for close views of free-ranging elephants, and for Kilimanjaro, the highest free-standing mountain, when cloud is not sitting on it. You return to camp for dinner and the night. The source outline uses Nyati Safari Camp. We confirm that camp before you travel.",
      }),
      day({
        day: 2,
        title: "A full day in Amboseli",
        location: "Amboseli",
        image: elephant,
        imageAlt: "Elephant on the grass",
        meals: "Breakfast, picnic lunch and dinner",
        accommodation: "Nyati Safari Camp if confirmed",
        description:
          "You leave early to be out for sunrise, when animals are moving and looking for food on the open grass. The rest of the day is game viewing with a packed picnic lunch. As the heat builds, many animals gather near water. Big cats are often harder to find until the light drops, so the morning and late afternoon matter. Amboseli holds all of the Big Five through the year, which means you can look for them. It does not mean each one will appear. More than 470 bird species have been recorded in the park, and about 60 of those are raptors. Dinner and the night are back at camp.",
      }),
      day({
        day: 3,
        title: "Amboseli to Diani Beach",
        location: "Diani Beach",
        image: diani,
        imageAlt: "Beach at sunrise, illustrating the Diani drop-off",
        meals: "Breakfast and lunch on the way",
        accommodation: "Your own Diani hotel, not included",
        description:
          "After an early breakfast you leave for Diani at about 9 am. Lunch is on the way. You are then dropped at your hotel in Diani. The safari ends there. Beach nights are not part of this price unless we add them.",
      }),
    ],
  },
  {
    id: "diani-8",
    slug: "8-day-nakuru-mara-diani-beach-safari",
    title: "8-Day Maasai Mara, Lake Nakuru and Diani Beach Safari",
    duration: 8,
    destinations: ["Lake Nakuru", "Maasai Mara", "Diani Beach"],
    countryLabel: "Kenya",
    category: "Beach combination",
    safariType: "Beach",
    groupStyle: "Private",
    accommodation: "Beach resort",
    accommodationNote:
      "Mid-range safari lodges, then three nights on full board at the coast. The outline names Lake Nakuru Sopa Lodge, Zebra Plains Mara Camp and Baobab Beach Resort or a similar Diani resort. Each name is confirmed on the quotation. The link to the coast in this outline is the train, not the Tsavo road.",
    description:
      "An 8-day private Kenya safari from Nairobi: Lake Nakuru, three nights in the Maasai Mara, then the afternoon train to Mombasa and three nights at Diani Beach. You return to Nairobi on the afternoon train. Game drives are in a private 4x4.",
    summary: "Nakuru, three Mara nights, the Nairobi–Mombasa train, and three nights in Diani.",
    image: diani,
    imageAlt: "Tropical beach at sunrise, illustrating Diani",
    gallery: [
      { src: nakuru, alt: "Rhinos on a park track" },
      { src: maraShots, alt: "Maasai Mara at sunset" },
      { src: diani, alt: "Beach at sunrise" },
    ],
    priceNote,
    highlights: [
      "Afternoon game drive at Lake Nakuru",
      "Three nights in the Maasai Mara and two full days of game drives",
      "Afternoon train between Nairobi and Mombasa, both ways",
      "Three nights on full board at a Diani beach resort",
      "Private 4x4 for the safari section",
    ],
    faqs: [
      {
        question: "Is the train included?",
        answer:
          "Yes, in this outline: Nairobi to Mombasa after the Mara, and Mombasa back to Nairobi on the last day. The source text uses a 3 pm departure. Train times change, so the quotation uses the timetable that is actually on sale.",
      },
      {
        question: "Can I fly back from Mombasa instead?",
        answer:
          "A flight from Mombasa is not included. It can be quoted instead of the return train if you need it.",
      },
    ],
    wildlife: ["Rhino", "Flamingo", "Lion", "Elephant", "Plains game"],
    transport:
      "Private 4x4 Land Cruiser from Nairobi through Nakuru and the Mara, back to the Nairobi railway station. Train tickets Nairobi–Mombasa and Mombasa–Nairobi. Transfers between the station, the resort and the airport where the itinerary needs them.",
    included: [
      "Professional driver-guide for the safari section",
      "Nairobi pickup and the drop-offs in the itinerary",
      "Game drives in the itinerary",
      "Meals in the itinerary, including full board at the beach resort",
      "Private 4x4 Land Cruiser on safari",
      "Park entry fees",
      "Safari accommodation and the beach resort",
      "Train tickets between Nairobi and Mombasa in both directions",
      "Station and airport transfers named in the itinerary",
      "Drinking water on safari",
      "Government taxes",
    ],
    excluded: [...sharedExcluded, "A flight from Mombasa if you choose one", "Fishing trips and other beach activities that the resort desk charges for"],
    mapPoints: [
      { name: "Nairobi", coordinates: { lat: -1.286, lng: 36.817 } },
      { name: "Lake Nakuru", coordinates: { lat: -0.366, lng: 36.083 } },
      { name: "Maasai Mara", coordinates: { lat: -1.406, lng: 35.016 } },
      { name: "Diani Beach", coordinates: { lat: -4.32, lng: 39.57 } },
    ],
    itinerary: [
      day({
        day: 1,
        title: "Nairobi to Lake Nakuru",
        location: "Lake Nakuru",
        image: nakuru,
        imageAlt: "Rhinos on a park track",
        meals: "Lunch and dinner",
        accommodation: "Lake Nakuru Sopa Lodge if confirmed",
        description:
          "Pickup at your Nairobi hotel is at about 8 am. You drive south along the Great Rift Valley, stop at the viewpoint for the escarpment, and a few minutes later stop at the little Italian church built by Italian workers as a place to worship while they built the road. You reach Nakuru for lunch. The outline uses Lake Nakuru Sopa Lodge. An afternoon game drive follows in Lake Nakuru National Park, a bird sanctuary where flamingos can cover the lake when conditions suit them. The park is known for white and black rhinos and for the Big Five other than elephant. You return to the lodge for dinner and the night.",
      }),
      day({
        day: 2,
        title: "Lake Nakuru to the Maasai Mara",
        location: "Maasai Mara",
        image: mara,
        imageAlt: "Maasai Mara at sunset",
        meals: "Breakfast, lunch and dinner",
        accommodation: "Zebra Plains Mara Camp if confirmed",
        description:
          "Breakfast is at the lodge. You then drive to the Maasai Mara, with lunch when you arrive and a short rest before an afternoon game drive. The Mara is the northern end of the Serengeti ecosystem and, in season, holds the movement of wildebeest, zebra and the predators that follow them. You are back at camp for dinner and the night. The outline uses Zebra Plains Mara Camp for the three Mara nights. We confirm the camp.",
      }),
      day({
        day: 3,
        title: "A full day in the Maasai Mara",
        location: "Maasai Mara",
        image: lion,
        imageAlt: "Rhinos on a track. This frame is not a lion photograph.",
        meals: "Breakfast, picnic lunch and dinner",
        accommodation: "Zebra Plains Mara Camp if confirmed",
        description:
          "The day is spent in the reserve. A packed lunch is served picnic-style near the Mara River. The Mara is known for black-maned lions and for resident wildlife, and it is one of the places where a morning drive can include several of the Big Five. Cheetahs are often seen in the open. You return to camp in the evening for dinner and the night.",
      }),
      day({
        day: 4,
        title: "A second full day in the Maasai Mara",
        location: "Maasai Mara",
        image: giraffe,
        imageAlt: "Giraffe at sunset",
        meals: "Breakfast, lunch and dinner",
        accommodation: "Zebra Plains Mara Camp if confirmed",
        description:
          "After breakfast you leave at about 6:30 am and stay out until about 6:30 pm, looking for wildlife you did not see the day before. The route covers different parts of the reserve because a sighting cannot be ordered. The Mara is famous for the size of its wildlife populations and for holding all of the Big Five. About 470 bird species are recorded, including the lilac-breasted roller, and the reserve is also a place to look for less common animals such as roan antelope and the nocturnal bat-eared fox. You return to camp for dinner and the night.",
      }),
      day({
        day: 5,
        title: "Maasai Mara to Nairobi, then the train to Diani",
        location: "Diani Beach",
        image: diani,
        imageAlt: "Beach at sunrise",
        meals: "Breakfast. Later meals follow the train and the resort.",
        accommodation: "Baobab Beach Resort or a similar Diani resort",
        description:
          "After breakfast you drive back to Nairobi and are dropped at the railway station for the afternoon train to Mombasa. The source outline uses a 3 pm departure. The live timetable is what we ticket. In Mombasa you are met and taken to Baobab Beach Resort, or a similar resort in Diani, for the night.",
      }),
      day({
        day: 6,
        title: "A day at Diani Beach",
        location: "Diani Beach",
        image: diani,
        imageAlt: "Tropical shoreline at sunrise",
        meals: "Breakfast, lunch and dinner",
        accommodation: "Diani beach resort, full board",
        description:
          "Breakfast is at the resort. The day is yours on the coast, in the part of Kenya associated with Swahili culture. Lunch is at the resort. Swimming, a boat ride and birdwatching are the sorts of things you can do, depending on what you arranged. Dinner and the night stay on a full-board basis at the resort.",
      }),
      day({
        day: 7,
        title: "Another beach day in Diani",
        location: "Diani Beach",
        image: zanzibar,
        imageAlt: "Tropical beach, illustrating a coast day rather than a specific Diani hotel",
        meals: "Breakfast, lunch and dinner",
        accommodation: "Diani beach resort, full board",
        description:
          "Breakfast is at the resort. You can continue with beach time, take photographs, or ask the front desk about a short fishing trip. Fishing is for beginners and experienced anglers and is arranged with local guides for a fee you agree with them. It is not included. All meals and the night remain at the resort.",
      }),
      day({
        day: 8,
        title: "Diani back to Nairobi by train",
        location: "Nairobi",
        image: cruiser,
        imageAlt: "Warm evening light on a vehicle, marking the journey home",
        meals: "Breakfast",
        accommodation: "Not included after the train",
        description:
          "You wake without a game-drive alarm and have breakfast at your own pace. You then leave the resort to connect with the afternoon train from Mombasa back to Nairobi. The source outline again uses a 3 pm train. That is the end of the safari.",
      }),
    ],
  },
];

export function getPackage(slug: string) {
  return safariPackages.find((item) => item.slug === slug);
}

export function getRelatedPackages(slug: string) {
  const current = getPackage(slug);
  if (!current) return [];
  return safariPackages
    .filter(
      (item) =>
        item.slug !== slug &&
        (item.countryLabel === current.countryLabel ||
          item.destinations.some((destination) => current.destinations.includes(destination))),
    )
    .slice(0, 3);
}
