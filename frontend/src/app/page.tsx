import { HomePage } from "@/components/home/HomePage";
import { loadSafariCatalog } from "@/lib/safari/catalog";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "African Home Adventure Safaris · Private Kenya & Tanzania Safaris",
  description:
    "Private Kenya and Tanzania safaris, unforgettable wildlife experiences and customised African adventures from African Home Adventure Safaris in Nairobi.",
  path: "/",
  absolute: true,
});

export default async function Page() {
  const packages = await loadSafariCatalog();
  return <HomePage packages={packages} />;
}
