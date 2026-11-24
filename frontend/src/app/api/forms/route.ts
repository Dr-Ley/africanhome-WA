import { NextResponse } from "next/server";
import { resendConfig } from "@/lib/supabase/env";
import { getSupabase, isMissingSchema } from "@/lib/supabase/server";

export const runtime = "nodejs";

const recipient = "bradleyouko911@gmail.com";

const subjects: Record<string, string> = {
  contact: "New contact message",
  vehicle: "New safari vehicle enquiry",
  partnership: "New partnership enquiry",
  booking: "New safari quotation request",
  newsletter: "New safari notes signup",
  planner: "New custom safari request",
};

function lines(fields: Record<string, unknown>) {
  return Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : String(value)}`)
    .join("\n");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { kind?: string; fields?: Record<string, unknown> };
    const kind = body.kind ?? "";
    const fields = body.fields ?? {};
    if (!subjects[kind]) return NextResponse.json({ message: "Unknown form." }, { status: 400 });

    const supabase = getSupabase();
    const saved = await supabase.rpc("submit_form", { p_kind: kind, p_fields: fields });
    if (saved.error) {
      const message = isMissingSchema(saved.error)
        ? "The form tables are not in Supabase yet. Run frontend/supabase/forms.sql in the SQL editor."
        : saved.error.message;
      return NextResponse.json({ message }, { status: 503 });
    }

    const { apiKey, from } = resendConfig();
    if (!apiKey) return NextResponse.json({ message: "The enquiry was saved, but email is not configured." }, { status: 500 });
    const email = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: typeof fields.email === "string" ? fields.email : undefined,
        subject: subjects[kind],
        text: lines(fields),
      }),
    });
    if (!email.ok) {
      const detail = (await email.json().catch(() => null)) as { message?: string } | null;
      return NextResponse.json(
        { message: detail?.message ?? "The enquiry was saved, but the email could not be sent." },
        { status: 502 },
      );
    }
    return NextResponse.json({ sent: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The form could not be sent.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
