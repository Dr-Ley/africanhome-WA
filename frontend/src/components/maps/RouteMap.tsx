"use client";

import dynamic from "next/dynamic";
import type { Coordinates } from "@/types";

const RouteMapInner = dynamic(() => import("@/components/maps/RouteMapInner"), {
  ssr: false,
  loading: () => <div className="h-[380px] animate-pulse rounded-xl bg-sand" />,
});

export function RouteMap({
  points,
}: {
  points: { name: string; coordinates: Coordinates }[];
}) {
  return (
    <div className="h-[380px] overflow-hidden rounded-xl border border-sand">
      <RouteMapInner points={points} />
    </div>
  );
}
