"use client";

import { useMemo, useState, useEffect } from "react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import type { Destination } from "@/types";

const wildlifeFilters = ["All wildlife", "Lion", "Elephant", "Rhino", "Flamingo", "Beach", "Migration"];

export function DestinationExplorer() {
  const [country, setCountry] = useState<Destination["country"]>("Kenya");
  const [query, setQuery] = useState("");
  const [wildlife, setWildlife] = useState("All wildlife");

  useEffect(() => {
    const slug = window.location.hash.replace("#", "");
    const match = destinations.find((item) => item.slug === slug);
    if (match) setCountry(match.country);
  }, []);

  const results = useMemo(() => {
    return destinations.filter((destination) => {
      if (destination.country !== country) return false;
      const haystack = `${destination.name} ${destination.description} ${destination.wildlife.join(" ")} ${destination.highlights.join(" ")}`.toLowerCase();
      if (query && !haystack.includes(query.toLowerCase())) return false;
      if (wildlife === "All wildlife") return true;
      if (wildlife === "Migration") return haystack.includes("migration") || haystack.includes("wildebeest");
      if (wildlife === "Beach") return haystack.includes("beach") || haystack.includes("reef") || haystack.includes("dhow");
      return destination.wildlife.some((item) => item.toLowerCase().includes(wildlife.toLowerCase()));
    });
  }, [country, query, wildlife]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div role="tablist" aria-label="Country" className="tabs tabs-box w-fit bg-white">
          {(["Kenya", "Tanzania"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={country === tab}
              className={`tab ${country === tab ? "tab-active" : ""}`}
              onClick={() => setCountry(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="destination-search" className="text-xs tracking-wide text-gold uppercase">
              Search
            </label>
            <input
              id="destination-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search parks, wildlife, coast"
              className="input input-bordered mt-1 w-full bg-white"
            />
          </div>
          <div>
            <label htmlFor="wildlife-filter" className="text-xs tracking-wide text-gold uppercase">
              Wildlife
            </label>
            <select
              id="wildlife-filter"
              value={wildlife}
              onChange={(event) => setWildlife(event.target.value)}
              className="select select-bordered mt-1 w-full bg-white"
            >
              {wildlifeFilters.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-charcoal/60">
        {results.length} {results.length === 1 ? "destination" : "destinations"}
      </p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
      {results.length === 0 ? (
        <p className="mt-8 rounded-xl border border-sand bg-white p-6">No destinations match that search. Try another wildlife filter or clear the search.</p>
      ) : null}
    </div>
  );
}
