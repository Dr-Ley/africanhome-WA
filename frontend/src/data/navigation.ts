import type { NavGroup, NavLink } from "@/types";

export const destinationLinks: NavLink[] = [
  { label: "All destinations", href: "/destinations" },
  { label: "Maasai Mara", href: "/maasai-mara" },
  { label: "Amboseli", href: "/destinations#amboseli" },
  { label: "Tsavo East", href: "/destinations#tsavo-east" },
  { label: "Tsavo West", href: "/destinations#tsavo-west" },
  { label: "Lake Nakuru", href: "/destinations#lake-nakuru" },
  { label: "Samburu", href: "/destinations#samburu" },
  { label: "Laikipia", href: "/destinations#laikipia" },
  { label: "Diani Beach", href: "/kenya-diani-beach" },
  { label: "Serengeti", href: "/destinations#serengeti" },
  { label: "Ngorongoro", href: "/destinations#ngorongoro" },
  { label: "Tarangire", href: "/destinations#tarangire" },
  { label: "Zanzibar", href: "/destinations#zanzibar" },
];

export const experienceLinks: NavLink[] = [
  { label: "All safari packages", href: "/safaris" },
  { label: "Kenya & Tanzania", href: "/safaris?type=Combined" },
  { label: "Safari & Diani Beach", href: "/kenya-diani-beach" },
  { label: "Fly-in safaris", href: "/fly-in-safaris" },
  { label: "Photography safaris", href: "/photography-safaris" },
  { label: "Luxury & budget", href: "/luxury-budget-safaris" },
  { label: "Plan a custom safari", href: "/plan-safari" },
];

export const footerSafariLinks: NavLink[] = [
  { label: "3-Day Maasai Mara", href: "/safaris/3-day-maasai-mara-safari" },
  { label: "3-Day Mara Group Safari", href: "/safaris/3-day-maasai-mara-group-joining-safari" },
  { label: "4-Day Maasai Mara", href: "/safaris/4-day-maasai-mara-safari-nairobi" },
  { label: "5-Day Nakuru & Mara", href: "/safaris/5-day-lake-nakuru-naivasha-maasai-mara" },
  { label: "6-Day Kenya & Tanzania", href: "/safaris/6-day-ngorongoro-serengeti-maasai-mara" },
  { label: "Amboseli & Diani", href: "/safaris/3-day-amboseli-safari-diani-beach" },
  { label: "8-Day Safari & Diani", href: "/safaris/8-day-nakuru-mara-diani-beach-safari" },
];

export const footerExperienceLinks: NavLink[] = [
  { label: "Fly-in Safaris", href: "/fly-in-safaris" },
  { label: "Photography Safaris", href: "/photography-safaris" },
  { label: "Luxury & Budget", href: "/luxury-budget-safaris" },
  { label: "Kenya & Tanzania", href: "/safaris?type=Combined" },
  { label: "Vehicle Hire", href: "/vehicle-hire" },
  { label: "Volunteering", href: "https://www.kvcdp.org/index.html" },
];

export const primaryNav: Array<NavGroup | NavLink> = [
  { label: "Destinations", href: "/destinations", links: destinationLinks },
  { label: "Safari Experiences", href: "/safaris", links: experienceLinks },
  { label: "Vehicle Hire", href: "/vehicle-hire" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function isNavGroup(item: NavGroup | NavLink): item is NavGroup {
  return "links" in item;
}
