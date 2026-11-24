import { NextResponse } from "next/server";
import { readSessionToken } from "@/lib/admin/session";
import { supabaseConfig } from "@/lib/supabase/env";
import { adminErrorResponse, assertSession, getSupabase } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const token = await readSessionToken();
    await assertSession(supabase, token);
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Choose an image or video." }, { status: 400 });
    }
    if (file.size > 80 * 1024 * 1024) {
      return NextResponse.json({ message: "That file is still larger than 80 MB after compression." }, { status: 400 });
    }
    const { bucket, url } = supabaseConfig();
    const extension = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
    const path = `safaris/${crypto.randomUUID()}.${extension}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage.from(bucket).upload(path, bytes, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ url: `${url}/storage/v1/object/public/${bucket}/${path}` });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
