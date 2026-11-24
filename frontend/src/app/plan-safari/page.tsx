import { CustomSafariForm } from "@/components/forms/CustomSafariForm";
import { Container } from "@/components/shared/Container";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Plan a Custom Safari",
  description:
    "Build a private Kenya or Tanzania safari request: dates, destinations, style, vehicle and accommodation.",
  path: "/plan-safari",
});

export default function PlanSafariPage() {
  return (
    <Container className="py-12">
      <p className="text-xs tracking-[0.22em] text-gold uppercase">Custom safari planner</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">Tell us the trip. We will shape the rest.</h1>
      <p className="mt-4 max-w-2xl text-charcoal/75">
        Six short steps, review then submit. Your request will be sent directly to African Home Adventure Safaris. We respond within 2 hours.
      </p>
      <div className="mt-8">
        <CustomSafariForm />
      </div>
    </Container>
  );
}
