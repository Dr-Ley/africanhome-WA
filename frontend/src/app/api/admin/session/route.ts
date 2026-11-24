import { NextResponse } from "next/server";
import { SESSION_COOKIE, readSessionToken, sessionCookieOptions } from "@/lib/admin/session";
import { adminErrorResponse, getSupabase, throwIfDbError } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data: hasAccount, error } = await supabase.rpc("admin_has_account");
    throwIfDbError(error);
    const token = await readSessionToken();
    if (!token) return NextResponse.json({ signedIn: false, hasAccount: Boolean(hasAccount) });
    const { data: valid, error: sessionError } = await supabase.rpc("admin_session_valid", { p_token: token });
    throwIfDbError(sessionError);
    return NextResponse.json({ signedIn: Boolean(valid), hasAccount: Boolean(hasAccount) });
  } catch (error) {
    return adminErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string; mode?: string };
    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";
    if (!username || !password) {
      return NextResponse.json({ message: "Enter a username and password." }, { status: 400 });
    }
    const supabase = getSupabase();
    if (body.mode === "register") {
      const { error } = await supabase.rpc("admin_register_first", { p_username: username, p_password: password });
      throwIfDbError(error);
    }
    const { data: token, error } = await supabase.rpc("admin_sign_in", { p_username: username, p_password: password });
    throwIfDbError(error);
    if (typeof token !== "string" || !token) {
      return NextResponse.json({ message: "Invalid username or password." }, { status: 401 });
    }
    const response = NextResponse.json({ signedIn: true });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return response;
  } catch (error) {
    return adminErrorResponse(error);
  }
}

export async function DELETE() {
  try {
    const token = await readSessionToken();
    if (token) {
      const supabase = getSupabase();
      await supabase.rpc("admin_sign_out", { p_token: token });
    }
    const response = NextResponse.json({ signedIn: false });
    response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
    return response;
  } catch (error) {
    return adminErrorResponse(error);
  }
}
