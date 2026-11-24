export const SITE = {
  name: "African Home Adventure Safaris",
  legalName: "African Home Adventure",
  domain: "https://www.africanhomeadventure.com",
  tagline: "Kenya & Tanzania safaris",
  description:
    "Private Kenya and Tanzania safaris, unforgettable wildlife experiences and customised African adventures.",
  email: "info@africahomeadventure.com",
  phoneDisplay: "+254 722 760 661",
  phoneTel: "+254 722 760 661",
  whatsapp: "254799870461",
  location: "YWCA Parkview Suites, Ground Floor, Nyerere Road, Opposite Central Park",
  founded: "2001",
  tripadvisor:
    "https://www.tripadvisor.co.uk/Attraction_Review-g294207-d2218596-Reviews-African_Home_Adventure_Safaris-Nairobi.html",
} as const;

export function whatsappHref(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_GENERAL = whatsappHref(
  "Hello African Home Adventure Safaris, I would like to enquire about a private safari.",
);
