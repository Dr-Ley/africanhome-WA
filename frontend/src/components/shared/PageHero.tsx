import Image from "next/image";
import { Container } from "@/components/shared/Container";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  alt: string;
}) {
  return (
    <section className="relative min-h-[460px] text-white">
      <Image src={image} alt={alt} fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10" />
      <Container className="relative flex min-h-[460px] items-end py-12">
        <div className="max-w-3xl">
          <p className="text-[11px] tracking-[0.22em] text-gold uppercase">{eyebrow}</p>
          <h1 className="mt-3 font-display text-5xl leading-tight md:text-6xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-white/85">{text}</p>
        </div>
      </Container>
    </section>
  );
}
