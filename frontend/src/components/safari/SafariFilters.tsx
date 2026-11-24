"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { SafariPackage } from "@/types";
import { SafariPackageCard } from "@/components/safari/SafariPackageCard";

const durations = ["Any duration", "3–5 days", "6–8 days"];

export function SafariFilters({ packages }: { packages: SafariPackage[] }) {
  const params = useSearchParams();
  const [destination, setDestination] = useState("Any destination");
  const [duration, setDuration] = useState("Any duration");
  const [accommodation, setAccommodation] = useState("Any accommodation");
  const [safariType, setSafariType] = useState(params.get("type") ?? "Any type");
  const [groupStyle, setGroupStyle] = useState("Any style");

  const destinationOptions = useMemo(
    () => ["Any destination", ...Array.from(new Set(packages.flatMap((item) => item.destinations)))],
    [packages],
  );
  const accommodationOptions = ["Any accommodation", ...Array.from(new Set(packages.map((item) => item.accommodation)))];
  const typeOptions = ["Any type", ...Array.from(new Set(packages.map((item) => item.safariType)))];

  const results = packages.filter((item) => {
    if (destination !== "Any destination" && !item.destinations.includes(destination)) return false;
    if (duration === "3–5 days" && (item.duration < 3 || item.duration > 5)) return false;
    if (duration === "6–8 days" && (item.duration < 6 || item.duration > 8)) return false;
    if (accommodation !== "Any accommodation" && item.accommodation !== accommodation) return false;
    if (safariType !== "Any type" && item.safariType !== safariType) return false;
    if (groupStyle === "Private" && item.groupStyle === "Group") return false;
    if (groupStyle === "Group" && item.groupStyle === "Private") return false;
    return true;
  });

  return (
    <div>
      <form data-testid="safari-filters" className="grid gap-3 rounded-xl border border-sand bg-white p-4 md:grid-cols-3 lg:grid-cols-5">
        <Filter label="Destination" value={destination} onChange={setDestination} options={destinationOptions} testId="filter-destination" />
        <Filter label="Duration" value={duration} onChange={setDuration} options={durations} />
        <Filter label="Accommodation" value={accommodation} onChange={setAccommodation} options={accommodationOptions} />
        <Filter label="Safari type" value={safariType} onChange={setSafariType} options={typeOptions} />
        <Filter label="Private or group" value={groupStyle} onChange={setGroupStyle} options={["Any style", "Private", "Group"]} />
      </form>
      <p className="mt-5 text-sm text-charcoal/60">
        {results.length} of {packages.length} itineraries
      </p>
      <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {results.map((item) => (
          <SafariPackageCard key={item.id} safariPackage={item} />
        ))}
      </div>
      {results.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-sand bg-white p-6">
          Nothing matches those filters. Clear one of them to see more itineraries.
        </p>
      ) : null}
    </div>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
  testId,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  testId?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label className="text-xs tracking-wide text-gold uppercase" htmlFor={id}>
      {label}
      <select
        id={id}
        data-testid={testId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="select select-bordered mt-1 w-full bg-cream text-sm text-charcoal normal-case"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
