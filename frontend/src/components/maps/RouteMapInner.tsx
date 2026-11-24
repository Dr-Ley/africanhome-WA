"use client";

import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import type { Coordinates } from "@/types";
import "leaflet/dist/leaflet.css";

export default function RouteMapInner({
  points,
}: {
  points: { name: string; coordinates: Coordinates }[];
}) {
  const center = points[0]?.coordinates ?? { lat: -1.29, lng: 36.82 };
  return (
    <MapContainer center={[center.lat, center.lng]} zoom={6} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {points.map((point) => (
        <CircleMarker
          key={point.name}
          center={[point.coordinates.lat, point.coordinates.lng]}
          radius={9}
          pathOptions={{ color: "#183C2B", fillColor: "#B99A5A", fillOpacity: 1, weight: 2 }}
        >
          <Popup>{point.name}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
