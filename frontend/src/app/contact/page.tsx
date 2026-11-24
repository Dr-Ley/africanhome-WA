import Link from "next/link";
import { ContactForm } from "@/components/forms/LocalForms";
import { Container } from "@/components/shared/Container";
import { SITE, WHATSAPP_GENERAL } from "@/lib/constants";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Contact African Home Adventure Safaris",
  description: "Email, phone and WhatsApp for African Home Adventure Safaris in Nairobi, plus a safari enquiry form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-14">
      <p className="text-xs tracking-[0.2em] text-gold uppercase">Nairobi</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">Contact</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <p><a className="text-forest underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          <p><a className="text-forest underline" href={`tel:${SITE.phoneTel}`}>{SITE.phoneTel}</a></p>
          <p><a className="text-forest underline" href={WHATSAPP_GENERAL}>WhatsApp {SITE.whatsapp}</a></p>
          <p>{SITE.location}</p>
          <Link href="/plan-safari" className="btn btn-primary mt-4 rounded-full border-0">Start a safari enquiry</Link>
        </div>
        <div className="rounded-2xl bg-white p-6">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
