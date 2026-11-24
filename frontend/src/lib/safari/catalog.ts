import { cache } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { safariPackages } from "@/data/safari-packages";
import { getSupabase } from "@/lib/supabase/server";
import type { SafariPackage } from "@/types";

export const loadSafariCatalog = cache(async (): Promise<SafariPackage[]> => {
  noStore();
  try {
    const supabase = getSupabase();
    const ready = await supabase.rpc("safari_catalog_ready");
    if (ready.error || !ready.data) return safariPackages;
    const { data, error } = await supabase
      .from("safari_packages")
      .select("package, sort_order")
      .order("sort_order", { ascending: true });
    if (error || !data) return safariPackages;
    return data.map((row) => row.package as SafariPackage);
  } catch {
    return safariPackages;
  }
});

export async function loadPackage(slug: string) {
  const packages = await loadSafariCatalog();
  return packages.find((item) => item.slug === slug);
}

export async function loadRelatedPackages(slug: string) {
  const packages = await loadSafariCatalog();
  const current = packages.find((item) => item.slug === slug);
  if (!current) return [];
  return packages
    .filter(
      (item) =>
        item.slug !== slug &&
        (item.countryLabel === current.countryLabel ||
          item.destinations.some((destination) => current.destinations.includes(destination))),
    )
    .slice(0, 3);
}
