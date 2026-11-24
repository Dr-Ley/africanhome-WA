import { PartnershipForm } from "@/components/forms/LocalForms";
import { Container } from "@/components/shared/Container";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Safari Ground-Handling Partnerships",
  description:
    "Vehicle supply, driver-guides, accommodation coordination and group logistics for operators sending guests to Kenya and Tanzania.",
  path: "/partnerships",
});

const services = [
  ["Vehicle supply", "Private 4x4s and, where suitable, minivans, allocated to your series or to a single FIT booking."],
  ["Driver-guide coordination", "Guides briefed on your itinerary, not a different one rewritten on the morning of arrival."],
  ["Itinerary support", "A local read on driving days, park timing and where a plan is too tight."],
  ["Accommodation coordination", "Holds and amendments with the camps you have already chosen, or suggestions if you want them."],
  ["Group logistics", "Multiple vehicles, rooming lists and the unglamorous timing of lunch stops."],
  ["Custom requests", "Something that is not on this list. Describe it in the form and we will say whether we can do it."],
];

export default function PartnershipsPage() {
  return (
    <div className="bg-white">
      <Container className="py-14">
        <p className="text-xs tracking-[0.22em] text-gold uppercase">Trade partners</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl leading-tight md:text-6xl">
          Your Local Safari Ground-Handling Partner in Kenya and Tanzania.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-charcoal/75">
          For tour operators who need a Nairobi and Arusha desk, not another consumer brochure. The work is vehicles, guides, beds and the hours between them.
        </p>
        <div className="mt-12 grid gap-px bg-sand md:grid-cols-3">
          {services.map(([title, text]) => (
            <article key={title} className="bg-white p-6">
              <h2 className="font-display text-3xl">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/75">{text}</p>
            </article>
          ))}
        </div>
        <section className="mt-14 grid gap-10 border-t border-sand pt-10 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="font-display text-4xl">Discuss a Safari Partnership</h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
              Tell us the season, the group size and whether you need Kenya, Tanzania or both. Sending the form does not open a trade account.
            </p>
          </div>
          <PartnershipForm />
        </section>
      </Container>
    </div>
  );
}
