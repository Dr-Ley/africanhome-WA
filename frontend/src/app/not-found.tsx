import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <p className="text-xs tracking-[0.2em] text-gold uppercase">404</p>
      <h1 className="mt-3 font-display text-5xl">That trail has grown over.</h1>
      <p className="mt-4 text-charcoal/70">The page is not part of this safari site. Head back to the plains or the package list.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn btn-primary rounded-full border-0">Home</Link>
        <Link href="/safaris" className="btn btn-outline rounded-full border-forest">Safaris</Link>
      </div>
    </section>
  );
}
