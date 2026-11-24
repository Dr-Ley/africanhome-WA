"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import { destinationLinks, experienceLinks, isNavGroup, primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<"destinations" | "experiences" | null>(null);
  const kenya = destinationLinks.filter((link) =>
    ["Maasai Mara", "Amboseli", "Tsavo East", "Tsavo West", "Lake Nakuru", "Samburu", "Laikipia", "Diani Beach"].includes(
      link.label,
    ),
  );
  const tanzania = destinationLinks.filter((link) =>
    ["Serengeti", "Ngorongoro", "Tarangire", "Zanzibar"].includes(link.label),
  );

  return (
    <header className="sticky top-0 z-40 border-b border-sand/80 bg-white">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <LogoMark width={122} height={42} />
          <span>
            <span className="block font-display text-xl leading-none text-forest md:text-[1.65rem]">
              African Home Adventure Safaris
            </span>
            <span className="mt-1 block text-[9px] tracking-[0.18em] text-gold uppercase">
              Kenya & Tanzania safaris
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setMenu("destinations")}
            onMouseLeave={() => setMenu(null)}
          >
            <Link
              href="/destinations"
              className="inline-flex items-center gap-1 text-sm text-charcoal hover:text-forest"
              onClick={() => setMenu(null)}
            >
              Destinations <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <div className={`${menu === "destinations" ? "visible opacity-100" : "invisible pointer-events-none opacity-0"} absolute top-full left-1/2 z-50 w-[460px] -translate-x-1/2 pt-4 transition`}>
              <div className="grid grid-cols-2 gap-6 rounded-xl border border-sand bg-white p-6 shadow-lg">
                <div>
                  <p className="text-[11px] tracking-[0.18em] text-gold uppercase">Kenya</p>
                  <ul className="mt-3 space-y-2">
                    {kenya.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm hover:text-forest" onClick={() => setMenu(null)}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.18em] text-gold uppercase">Tanzania</p>
                  <ul className="mt-3 space-y-2">
                    {tanzania.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm hover:text-forest" onClick={() => setMenu(null)}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/destinations" className="mt-4 inline-block text-sm text-forest" onClick={() => setMenu(null)}>
                    View all destinations
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setMenu("experiences")}
            onMouseLeave={() => setMenu(null)}
          >
            <Link href="/safaris" className="inline-flex items-center gap-1 text-sm text-charcoal hover:text-forest" onClick={() => setMenu(null)}>
              Safari Experiences <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <div className={`${menu === "experiences" ? "visible opacity-100" : "invisible pointer-events-none opacity-0"} absolute top-full left-0 z-50 w-64 pt-4 transition`}>
              <ul className="rounded-xl border border-sand bg-white p-4 shadow-lg">
                {experienceLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="block rounded-md px-2 py-2 text-sm hover:bg-cream hover:text-forest" onClick={() => setMenu(null)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {primaryNav.filter((item) => !isNavGroup(item)).map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-charcoal hover:text-forest">
              {item.label}
            </Link>
          ))}

          <Link href="/plan-safari" className="btn btn-primary rounded-full border-0 px-5 shadow-none">
            Plan Your Safari
          </Link>
        </nav>

        <button
          type="button"
          className="btn btn-ghost btn-square lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          data-testid="nav-toggle"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" data-testid="mobile-nav" className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-sand bg-cream lg:hidden">
          <nav className="space-y-2 px-5 py-5" aria-label="Mobile">
            <details className="rounded-lg border border-sand bg-white p-3">
              <summary className="cursor-pointer font-medium">Destinations</summary>
              <ul className="mt-3 space-y-2">
                {destinationLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="block py-1 text-sm" onClick={() => setOpen(false)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
            <details className="rounded-lg border border-sand bg-white p-3">
              <summary className="cursor-pointer font-medium">Safari Experiences</summary>
              <ul className="mt-3 space-y-2">
                {experienceLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="block py-1 text-sm" onClick={() => setOpen(false)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
            {[
              { label: "Vehicle Hire", href: "/vehicle-hire" },
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg border border-sand bg-white px-3 py-3"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/plan-safari" className={cn("btn btn-primary mt-2 w-full rounded-full border-0")} onClick={() => setOpen(false)}>
              Plan Your Safari
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
