import { NextResponse } from "next/server";
import { readSessionToken } from "@/lib/admin/session";
import { adminErrorResponse, assertSession, getSupabase, throwIfDbError } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = getSupabase();
    const token = await readSessionToken();
    await assertSession(supabase, token);
    const { error } = await supabase.rpc("safari_delete", { p_token: token, p_id: id });
    throwIfDbError(error);
    return NextResponse.json({ deleted: id });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
