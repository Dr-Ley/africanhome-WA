import { z } from "zod";

const required = (label: string) => z.string().trim().min(1, `Please enter your ${label}`);

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(6, "Enter a phone or WhatsApp number"),
  country: z.string().trim().min(2, "Enter your country of residence"),
  message: z.string().trim().min(12, "Tell us a little more about your trip"),
});

export const vehicleEnquirySchema = contactSchema
  .extend({
    route: required("preferred route"),
    customRoute: z.string().trim().optional(),
    dates: required("travel dates"),
  })
  .refine((data) => data.route !== "Other" || Boolean(data.customRoute && data.customRoute.length > 1), {
    path: ["customRoute"],
    message: "Type the route you have in mind",
  });

export const partnershipSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  company: z.string().trim().min(2, "Please enter your company"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(6, "Enter a phone or WhatsApp number"),
  country: z.string().trim().min(2, "Enter your country"),
  message: z.string().trim().min(12, "Describe the ground-handling support you need"),
});

export const bookingEnquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(6, "Enter a phone or WhatsApp number"),
  dates: required("approximate travel dates"),
  travellers: z.string().trim().min(1, "Tell us how many people are travelling"),
  message: z.string().trim().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

export const plannerSchema = z
  .object({
    arrival: z.string().min(1, "Choose an arrival date"),
    departure: z.string().min(1, "Choose a departure date"),
    adults: z.coerce.number().int().min(1, "At least one adult").max(14),
    children: z.coerce.number().int().min(0).max(10),
    childAges: z.string().trim().optional(),
    destinations: z.array(z.string()).min(1, "Select at least one destination"),
    otherDestination: z.string().trim().optional(),
    budget: z.enum(["Budget", "Mid-range", "Luxury"], {
      message: "Choose a budget level",
    }),
    styles: z.array(z.string()).min(1, "Select at least one travel style"),
    transport: z.string().min(1, "Choose a transport arrangement"),
    accommodation: z.string().min(1, "Choose an accommodation style"),
    name: z.string().trim().min(2, "Please enter your full name"),
    email: z.string().trim().email("Enter a valid email address"),
    country: z.string().trim().min(2, "Enter your country of residence"),
    phone: z.string().trim().min(6, "Enter a phone or WhatsApp number"),
    notes: z.string().trim().optional(),
  })
  .refine((data) => data.departure >= data.arrival, {
    path: ["departure"],
    message: "Departure must be on or after arrival",
  })
  .refine((data) => data.children === 0 || Boolean(data.childAges && data.childAges.length > 0), {
    path: ["childAges"],
    message: "Please share the children's ages",
  })
  .refine((data) => !data.destinations.includes("Other") || Boolean(data.otherDestination && data.otherDestination.length > 1), {
    path: ["otherDestination"],
    message: "Type the other destinations",
  });

export type ContactValues = z.infer<typeof contactSchema>;
export type VehicleEnquiryValues = z.infer<typeof vehicleEnquirySchema>;
export type PartnershipValues = z.infer<typeof partnershipSchema>;
export type BookingEnquiryValues = z.infer<typeof bookingEnquirySchema>;
export type PlannerValues = z.infer<typeof plannerSchema>;
