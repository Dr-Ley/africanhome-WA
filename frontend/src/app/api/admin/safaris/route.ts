import { NextResponse } from "next/server";
import { readSessionToken } from "@/lib/admin/session";
import { safariPackages } from "@/data/safari-packages";
import { adminErrorResponse, assertSession, getSupabase, throwIfDbError } from "@/lib/supabase/server";
import type { SafariPackage } from "@/types";

export const runtime = "nodejs";

async function readPackages() {
  const supabase = getSupabase();
  const token = await readSessionToken();
  await assertSession(supabase, token);
  const { data, error } = await supabase.from("safari_packages").select("package, sort_order").order("sort_order", { ascending: true });
  throwIfDbError(error);
  const ready = await supabase.rpc("safari_catalog_ready");
  throwIfDbError(ready.error);
  if (!ready.data) {
    for (const [index, safariPackage] of safariPackages.entries()) {
      const { error: seedError } = await supabase.rpc("safari_upsert", {
        p_token: token,
        p_package: safariPackage,
        p_sort: index,
      });
      throwIfDbError(seedError);
    }
    const marked = await supabase.rpc("safari_mark_seeded", { p_token: token });
    throwIfDbError(marked.error);
    const seeded = await supabase.from("safari_packages").select("package, sort_order").order("sort_order", { ascending: true });
    throwIfDbError(seeded.error);
    return (seeded.data ?? []).map((row) => row.package as SafariPackage);
  }
  return (data ?? []).map((row) => row.package as SafariPackage);
}

export async function GET() {
  try {
    return NextResponse.json({ packages: await readPackages() });
  } catch (error) {
    return adminErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const token = await readSessionToken();
    await assertSession(supabase, token);
    const body = (await request.json()) as { package?: SafariPackage };
    const safariPackage = body.package;
    if (!safariPackage?.id || !safariPackage.slug || !safariPackage.title?.trim()) {
      return NextResponse.json({ message: "Add a title before saving." }, { status: 400 });
    }
    const { error } = await supabase.rpc("safari_upsert", { p_token: token, p_package: safariPackage });
    throwIfDbError(error);
    return NextResponse.json({ package: safariPackage });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
