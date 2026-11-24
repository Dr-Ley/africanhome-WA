"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/layout/Logo";
import { footerExperienceLinks, footerSafariLinks } from "@/data/navigation";
import { sendEnquiry } from "@/lib/forms";
import { SITE } from "@/lib/constants";
import { newsletterSchema } from "@/lib/validations";

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message ?? "Enter a valid email address");
      return;
    }
    try {
      await sendEnquiry("newsletter", { email });
      setMessage("Thank you. You are on the list.");
      setEmail("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The signup could not be sent.");
    }
  }

  return (
    <footer className="bg-[#1c221e] text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-cream p-1">
              <LogoMark width={120} height={48} />
            </span>
            {/* <p className="font-display text-2xl leading-tight">African Home Adventure Safaris</p> */}
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/75">
            Private safari operator crafting tailor-made journeys across Kenya and Tanzania since {SITE.founded}.
          </p>
          <ul className="mt-5 flex gap-2" aria-label="Social">
            <li>
              <a href="https://www.facebook.com/africahomeadventure/" aria-label="Facebook" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-md border border-cream/20">
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/africahomeadventuresafaris/" aria-label="Instagram" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-md border border-cream/20">
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@albert.janeno?is_from_webapp=1&sender_device=pc" aria-label="TikTok" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-md border border-cream/20">
                <TikTokIcon />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm tracking-wide text-gold">Safaris</h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {footerSafariLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm tracking-wide text-gold">Safari Experiences</h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {footerExperienceLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("http") ? (
                  <a href={link.href} className="hover:text-white" target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm tracking-wide text-gold">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>{SITE.location}</li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.phoneTel}`} className="whitespace-nowrap hover:text-white">
                {SITE.phoneTel}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm tracking-wide text-gold">Safari Notes, Monthly</h2>
          <form className="mt-4" onSubmit={onSubmit}>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex gap-2">
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                className="input input-bordered w-full border-cream/30 bg-transparent text-cream placeholder:text-cream/40"
              />
              <button type="submit" className="btn btn-outline rounded-lg border-cream/40 text-cream">
                Join
              </button>
            </div>
            {message ? <p className="mt-2 text-xs text-gold">{message}</p> : null}
          </form>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-cream/15 px-5 py-5 text-xs text-cream/60 md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {SITE.legalName} · {SITE.location}
        </p>
        <p className="flex gap-3">
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <span>KATO Member</span>
        </p>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M15.1 8.5h-2V7.1c0-.5.3-.6.6-.6H15V4.1h-2.2C10.4 4.1 9.6 5.4 9.6 7v1.5H8v2.4h1.6V20h2.5v-9.1h2.1l.3-2.4z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm8 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm-4 2.8A4.2 4.2 0 1 1 7.8 12 4.2 4.2 0 0 1 12 7.8zm0 2A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.4 6.4a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M14.2 3c.4 2.6 1.8 4.4 4.3 4.7v2.7c-1.5-.1-2.9-.6-4.1-1.5v6.7c0 3.4-2.7 6.1-6.2 6.1S2 19 2 15.6 4.7 9.5 8.2 9.5c.4 0 .8 0 1.1.1v2.9c-.3-.1-.7-.2-1.1-.2-1.8 0-3.2 1.5-3.2 3.3s1.4 3.3 3.2 3.3 3.2-1.5 3.2-3.3V3h2.8z" />
    </svg>
  );
}
