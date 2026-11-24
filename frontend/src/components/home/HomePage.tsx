import Image from "next/image";
import Link from "next/link";
import { Compass, ShieldCheck, Share2, Users } from "lucide-react";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SafariPackageCard } from "@/components/safari/SafariPackageCard";
import { homeDestinations } from "@/data/destinations";
import type { SafariPackage } from "@/types";
import { trustStats, whyTravel } from "@/data/site-content";
import { SITE, WHATSAPP_GENERAL } from "@/lib/constants";
import ScrollReplayVideo from "@/components/layout/ScrollReplayVideo";

const featuredSlugs = [
  "3-day-maasai-mara-safari",
  "5-day-lake-nakuru-naivasha-maasai-mara",
  "6-day-ngorongoro-serengeti-maasai-mara",
];
const icons = [ShieldCheck, Compass, Share2, Users];

export function HomePage({ packages }: { packages: SafariPackage[] }) {
  const featured = featuredSlugs
    .map((slug) => packages.find((item) => item.slug === slug))
    .filter((item) => item !== undefined);

  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden text-white">
        <Image
          src="/images/safari/hero-mara.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/safari/hero-mara.jpg"
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.62)_34%,rgba(0,0,0,0.28)_64%,rgba(0,0,0,0.08)_100%)]" />
        <Container className="relative flex min-h-[88vh] flex-col justify-end py-16 md:justify-center">
          <p className="text-[11px] tracking-[0.24em] text-white/90 uppercase">Kenya & Tanzania · Tailor-made safaris</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.95] font-medium sm:text-7xl">
            Discover East Africa, Your Way.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/90 sm:text-lg">
            Private Kenya and Tanzania safaris, unforgettable wildlife experiences and customised African adventures.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/safaris" variant="light">Explore Safaris</ButtonLink>
            <ButtonLink href="/plan-safari" variant="outline">Plan a Custom Safari</ButtonLink>
          </div>
          <p className="mt-10 text-sm text-white/80">Maasai Mara National Reserve, Kenya</p>
        </Container>
      </section>

      <section className="bg-sand">
        <Container className="grid grid-cols-2 gap-8 pb-4 lg:grid-cols-4">
          {trustStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl text-forest md:text-5xl">{stat.value}</p>
              <p className="mt-1 text-sm text-charcoal/70">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <DestinationBand
        title="Explore Kenya"
        text="From the Mara’s big cats to Diani’s white sands, below are hand-picked destinations crafted around you."
        country="Kenya"
      />
      <DestinationBand
        title="Explore Tanzania"
        text="The Serengeti’s great herds, the Ngorongoro Crater and the spice islands of Zanzibar."
        country="Tanzania"
        tone="white"
      />

      <section className="bg-[#f3efe4] py-16 md:py-20">
        <Container>
          <SectionHeading
            title="Featured Safari Packages"
            description="Indicative itineraries carefully designed to showcase the best of East African wildlife and landscapes. Choose your adventure, then let us perfect the details for you."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featured.map((item) => (
              <SafariPackageCard key={item.id} safariPackage={item} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/images/destinations/mt_kilimanjaro_destination.png" alt="Giraffe beside an acacia tree at sunset" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">Combined safaris</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Kenya & Tanzania, One Seamless Journey</h2>
            <p className="mt-4 leading-relaxed text-charcoal/75">
              Cross the border from the Maasai Mara into the Serengeti and descend into the Ngorongoro Crater — one itinerary, one ground team, zero friction. We handle park fees, flights and transfers on both sides.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/safaris?type=Combined">View Combined Itineraries</ButtonLink>
              <ButtonLink href="/plan-safari" variant="outlineDark">Request Quotation</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <p className="text-xs tracking-[0.2em] text-gold uppercase">Bush to beach</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Safari & Diani Beach</h2>
            <p className="mt-4 leading-relaxed text-charcoal/75">
              Trade the savannah for the Indian Ocean. Pair the Maasai Mara with three or four nights on Diani’s white-sand beach. Travel overland through Tsavo or by a short domestic flight to Ukunda.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/kenya-diani-beach">Explore 7–10 Day Combos</ButtonLink>
              <ButtonLink href="/fly-in-safaris" variant="outlineDark">Fly-in Options</ButtonLink>
            </div>
          </div>
          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-xl lg:order-2">
            <Image src="/images/destinations/diani.jpg" alt="Tropical beach at sunrise, illustrating a Diani coast finish" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </Container>
      </section>

      <section className="bg-[#f3efe4] py-16">
        <Container>
          <SectionHeading title="Specialist Safaris" description="Fly straight to the action or chase the perfect frame." />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <Specialist
              href="/fly-in-safaris"
              image="/images/vehicles/flightsheader.png"
              alt="Acacia tree on open savannah at sunset"
              kicker="Fly-in safaris"
              title="Skip the Road, Keep the Wild"
              text="Land at Mara airstrips and be on game drive within the hour — ideal for short, high-impact safaris."
              link="Explore fly-in safaris"
            />
            <Specialist
              href="/photography-safaris"
              image="/images/wildlife/lion-mara.png"
              alt="Sunset through an acacia tree"
              kicker="Photography safaris"
              title="Light, Subjects & Patience"
              text="Private vehicles, flexible hours and driver-guides who understand a photographer’s rhythm."
              link="Explore photography safaris"
            />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeading title="Why Travel With African Home Adventure Safaris" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyTravel.map((item, index) => {
              const Icon = icons[index] ?? Compass;
              return (
                <div key={item.title}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{item.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#f3efe4] py-16">
        <Container>
          <SectionHeading
            title="What travellers say"
            description="Read verified guest feedback on TripAdvisor to see why travellers love exploring Kenya with us."
          />
          <div className="mt-8 max-w-2xl rounded-xl bg-white p-6">
            <p  className="leading-relaxed text-charcoal/75">
            <strong>Trusted by safari travellers</strong>
            <br />
            Past guests frequently highlight our knowledgeable local guides, clear communication, and seamless safari planning on our Nairobi TripAdvisor page.
            <br />
            <a href={SITE.tripadvisor} className="mt-4 inline-block font-medium text-forest underline-offset-4 hover:underline">
              Read reviews on TripAdvisor →
            </a>
            </p>
          </div>
        </Container>
      </section>

      <section className="relative min-h-[88vh] text-white">
      <Image
          src="/images/wildlife/leo-silhoettejpg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      <ScrollReplayVideo
        src="/videos/leo.mp4"
        poster="/images/wildlife/leo-silhoettejpg.jpg"
        delayMs={10000}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.62)_34%,rgba(0,0,0,0.28)_64%,rgba(0,0,0,0.08)_100%)]" />
        <Container className="relative grid min-h-[420px] items-center gap-8 py-16 lg:grid-cols-[1.4fr_auto]">
          <div>
            <h2 className="max-w-xl font-display text-5xl leading-tight md:text-6xl">Tell us your dates, we’ll craft the rest.</h2>
            <p className="mt-4 max-w-lg text-white/85">
              Answer six questions about your dates and the parks you want to see. We will tailor the requested safari to your needs and get back to you within 2 hours.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <ButtonLink href="/plan-safari" variant="light">Plan a Custom Safari</ButtonLink>
            <Link href={WHATSAPP_GENERAL} className="btn btn-outline rounded-full border-white text-white hover:bg-white hover:text-forest">
              WhatsApp Our Team
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function DestinationBand({
  title,
  text,
  country,
  tone = "cream",
}: {
  title: string;
  text: string;
  country: "Kenya" | "Tanzania";
  tone?: "cream" | "white";
}) {
  const items = homeDestinations(country);
  return (
    <section className={tone === "white" ? "bg-white py-16" : "bg-cream py-16"}>
      <Container>
        <SectionHeading title={title} description={text} />
        <div className={`mt-8 grid gap-5 sm:grid-cols-2 ${items.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {items.map((destination) => (
            <article key={destination.id} className="flex h-full flex-col overflow-hidden rounded-xl border border-[#e6dcc8] bg-white">
              <div className="relative aspect-[4/3]">
                <Image src={destination.image} alt={destination.imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 100vw" />
                {destination.badge ? (
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs text-forest">{destination.badge}</span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-3xl">{destination.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{destination.cardText}</p>
                <Link href={destination.href} className="mt-auto pt-8 text-sm font-medium text-forest">Discover →</Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Specialist({
  href,
  image,
  alt,
  kicker,
  title,
  text,
  link,
}: {
  href: string;
  image: string;
  alt: string;
  kicker: string;
  title: string;
  text: string;
  link: string;
}) {
  return (
    <Link href={href} className="group relative block min-h-[340px] overflow-hidden rounded-xl text-white">
      <Image src={image} alt={alt} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 50vw, 100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
      <div className="relative flex min-h-[340px] flex-col justify-end p-6">
        <p className="text-[11px] tracking-[0.2em] uppercase">{kicker}</p>
        <h3 className="mt-2 font-display text-4xl">{title}</h3>
        <p className="mt-2 max-w-md text-sm text-white/85">{text}</p>
        <span className="mt-4 text-sm">{link} →</span>
      </div>
    </Link>
  );
}
