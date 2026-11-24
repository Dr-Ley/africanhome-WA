import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/lib/supabase/env";

export class AdminError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

const setupMessage =
  "The Supabase admin tables are not set up yet. Open the SQL editor and run frontend/supabase/schema.sql, then reload this page.";

export function isMissingSchema(error: { code?: string; message?: string } | null) {
  const message = error?.message ?? "";
  return (
    error?.code === "PGRST205" ||
    error?.code === "PGRST202" ||
    /schema cache|Could not find the function|Could not find the table/i.test(message)
  );
}

export function throwIfDbError(error: { code?: string; message: string } | null) {
  if (!error) return;
  if (isMissingSchema(error)) throw new AdminError(setupMessage, 503);
  throw new AdminError(error.message);
}

export function adminErrorResponse(error: unknown) {
  if (error instanceof AdminError) {
    return NextResponse.json(
      { message: error.message, setupRequired: error.status === 503 },
      { status: error.status },
    );
  }
  const message = error instanceof Error ? error.message : "Something went wrong.";
  return NextResponse.json({ message }, { status: 500 });
}

export function getSupabase() {
  const { url, key } = supabaseConfig();
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function assertSession(supabase: SupabaseClient, token: string) {
  if (!token) throw new AdminError("Not signed in", 401);
  const { data, error } = await supabase.rpc("admin_session_valid", { p_token: token });
  throwIfDbError(error);
  if (!data) throw new AdminError("Not signed in", 401);
}
