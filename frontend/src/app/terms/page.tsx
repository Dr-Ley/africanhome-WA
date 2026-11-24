import { Container } from "@/components/shared/Container";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Terms",
  description: "Terms for using the African Home Adventure Safaris website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="font-display text-5xl">Terms</h1>
      <p className="mt-4 leading-relaxed text-charcoal/75">
        Itineraries on this site are planning outlines. They are not an offer, a quotation or a confirmed reservation. Park rules, flight allowances and vehicle specifications are confirmed in writing before travel. Sending a form does not create a contract or a booking.
      </p>
    </Container>
  );
}
