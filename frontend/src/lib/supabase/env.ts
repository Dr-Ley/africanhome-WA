import fs from "node:fs";
import path from "node:path";

function readEnvFile(file: string, into: Record<string, string>) {
  if (!fs.existsSync(file)) return;
  const text = fs.readFileSync(file, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in into)) into[key] = value;
  }
}

function envValue(name: string) {
  if (process.env[name]) return process.env[name] as string;
  const fromFile: Record<string, string> = {};
  readEnvFile(path.join(process.cwd(), ".env.local"), fromFile);
  readEnvFile(path.join(process.cwd(), "..", ".env.local"), fromFile);
  return fromFile[name] ?? "";
}

export function resendConfig() {
  const from = envValue("RESEND_FROM_EMAIL") || "African Home Adventure <onboarding@africanhomeadventure.com>";
  return {
    apiKey: envValue("RESEND_API_KEY"),
    from: from.replace(/^(.*?)<([^>]+)>$/, "$1 <$2>").trim(),
  };
}

export function supabaseConfig() {
  const url = envValue("NEXT_PUBLIC_SUPABASE_URL").replace(/\/$/, "");
  const key = envValue("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  const bucket = envValue("NEXT_PUBLIC_SUPABASE_BUCKET_ID").replace(/^['"]|['"]$/g, "") || "aha-files";
  if (!url || !key) {
    throw new Error("Supabase credentials are missing from .env.local");
  }
  return { url, key, bucket };
}
