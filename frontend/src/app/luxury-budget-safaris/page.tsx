import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { budgetTiers } from "@/data/site-content";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Luxury and Budget Safaris",
  description:
    "Compare budget camping, mid-range lodges, luxury tented camps and fly-in luxury safaris. Nightly rates are quoted for your dates.",
  path: "/luxury-budget-safaris",
});

export default function LuxuryBudgetPage() {
  return (
    <>
      <PageHero
        eyebrow="How you travel"
        title="The same parks. A different way of staying."
        text="Budget camping, mid-range lodges, luxury tents and fly-in camps are uniquely different. The wildlife does not change category with the thread count."
        image="/images/accommodation/luxury-tent.jpg"
        alt="Elephants at sunset on the savannah"
      />
      <Container className="space-y-14 py-12">
        <SectionHeading
          title="Four ways of staying"
          description="Whether you choose camping, a mid-range lodge, a luxury tent, or a fly-in camp, your selection defines your level of comfort and mode of transport, not the wildlife experience itself. Nightly rates are tailored and quoted specifically for your travel dates."
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <caption className="sr-only">Safari style comparison</caption>
            <thead className="bg-forest text-cream">
              <tr>
                {["", "Accommodation", "Transport", "Experience", "Flexibility"].map((heading) => (
                  <th key={heading || "style"} className="p-3 font-medium">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {budgetTiers.map((tier) => (
                <tr key={tier.id} className="border-b border-sand bg-white align-top">
                  <th className="p-3 font-display text-xl font-medium">{tier.name}</th>
                  <td className="p-3">{tier.accommodation}</td>
                  <td className="p-3">{tier.transport}</td>
                  <td className="p-3">{tier.experience}</td>
                  <td className="p-3">{tier.flexibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-charcoal/70">
        Let us know your preferred level of comfort, and we will provide a customized quote detailing specific camps and pricing.
        </p>
        <ButtonLink href="/plan-safari">Share Your preferences</ButtonLink>
      </Container>
    </>
  );
}
