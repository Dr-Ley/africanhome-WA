import type { ImageSource } from "@/types";

export function coverImage(src: ImageSource): string {
  return typeof src === "string" ? src : src[0];
}

export function isVideoSrc(src: string) {
  return /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(src);
}

export function expandImages(src: ImageSource): string[] {
  return typeof src === "string" ? [src] : [...src];
}

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function durationLabel(days: number) {
  return `${days} ${days === 1 ? "day" : "days"}`;
}
