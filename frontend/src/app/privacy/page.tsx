import { Container } from "@/components/shared/Container";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Privacy",
  description: "How African Home Adventure Safaris handles safari enquiry forms.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="prose-custom max-w-3xl py-14">
      <h1 className="font-display text-5xl">Privacy</h1>
      <p className="mt-4 leading-relaxed text-charcoal/75">
        Enquiry forms on this site are stored and emailed to African Home Adventure Safaris so the desk can reply. A form does not create a booking. The map tiles are loaded from OpenStreetMap.
      </p>
    </Container>
  );
}
