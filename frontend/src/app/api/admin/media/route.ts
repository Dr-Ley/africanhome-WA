import { NextResponse } from "next/server";
import { readSessionToken } from "@/lib/admin/session";
import { supabaseConfig } from "@/lib/supabase/env";
import { adminErrorResponse, assertSession, getSupabase, throwIfDbError } from "@/lib/supabase/server";
import { expandImages, isVideoSrc } from "@/lib/utils";
import type { ImageSource, SafariPackage } from "@/types";

export const runtime = "nodejs";

const mediaPattern = /\.(avif|gif|jpe?g|png|svg|webp|mp4|webm|ogg|mov|m4v)(\?|$)/i;

function remember(urls: Set<string>, src: string) {
  const value = src.trim();
  if (!value || !mediaPattern.test(value)) return;
  urls.add(value);
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const token = await readSessionToken();
    await assertSession(supabase, token);
    const { bucket, url } = supabaseConfig();
    const urls = new Set<string>();

    const packages = await supabase.from("safari_packages").select("package");
    throwIfDbError(packages.error);
    for (const row of packages.data ?? []) {
      const safariPackage = row.package as SafariPackage;
      expandImages(safariPackage.image).forEach((src) => remember(urls, src));
      safariPackage.gallery?.forEach((item) => expandImages(item.src).forEach((src) => remember(urls, src)));
      safariPackage.itinerary?.forEach((day) => expandImages(day.image).forEach((src) => remember(urls, src)));
    }

    const stored = await supabase.storage.from(bucket).list("safaris", {
      limit: 1000,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (!stored.error) {
      for (const file of stored.data ?? []) {
        if (!file.name || file.name.endsWith("/")) continue;
        remember(urls, `${url}/storage/v1/object/public/${bucket}/safaris/${encodeURIComponent(file.name)}`);
      }
    }

    return NextResponse.json({
      files: [...urls].map((src) => ({ src, video: isVideoSrc(src) })),
    });
  } catch (error) {
    return adminErrorResponse(error);
  }
}

function withoutImage(source: ImageSource, src: string): ImageSource {
  const all = expandImages(source);
  if (!all.includes(src)) return source;
  const kept = all.filter((item) => item !== src);
  if (kept.length === 0) return "";
  if (kept.length === 1) return kept[0];
  return kept;
}

function stripImage(safariPackage: SafariPackage, src: string): SafariPackage {
  return {
    ...safariPackage,
    image: withoutImage(safariPackage.image, src),
    gallery: safariPackage.gallery.flatMap((item) => {
      const next = withoutImage(item.src, src);
      return next ? [{ ...item, src: next }] : [];
    }),
    itinerary: safariPackage.itinerary.map((day) => ({ ...day, image: withoutImage(day.image, src) })),
  };
}

export async function DELETE(request: Request) {
  try {
    const supabase = getSupabase();
    const token = await readSessionToken();
    await assertSession(supabase, token);
    const body = (await request.json()) as { src?: string };
    const src = body.src?.trim() ?? "";
    if (!src) return NextResponse.json({ message: "Choose an image to delete." }, { status: 400 });

    const { bucket, url } = supabaseConfig();
    const prefix = `${url}/storage/v1/object/public/${bucket}/`;
    if (src.startsWith(prefix)) {
      const objectPath = decodeURIComponent(src.slice(prefix.length).split("?")[0]);
      const removed = await supabase.storage.from(bucket).remove([objectPath]);
      if (removed.error) return NextResponse.json({ message: removed.error.message }, { status: 400 });
    }

    const packages = await supabase.from("safari_packages").select("package");
    throwIfDbError(packages.error);
    for (const row of packages.data ?? []) {
      const safariPackage = row.package as SafariPackage;
      const next = stripImage(safariPackage, src);
      if (JSON.stringify(next) === JSON.stringify(safariPackage)) continue;
      const saved = await supabase.rpc("safari_upsert", { p_token: token, p_package: next });
      throwIfDbError(saved.error);
    }

    return NextResponse.json({ deleted: src });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
