"use client";

import { FormEvent, useEffect, useState } from "react";
import { SafariEditor } from "@/components/admin/SafariEditor";
import { blankPackage, forEditing, preparePackage } from "@/lib/admin/package";
import type { SafariPackage } from "@/types";

type SessionState = {
  signedIn: boolean;
  hasAccount: boolean;
  setupRequired?: boolean;
  message?: string;
};

type EditorState = {
  draft: SafariPackage;
  saved: SafariPackage;
  isNew: boolean;
};

async function readJson(response: Response) {
  const payload = (await response.json().catch(() => ({}))) as { message?: string; setupRequired?: boolean; url?: string };
  return { response, payload };
}

export function AdminPanel() {
  const [session, setSession] = useState<SessionState | null>(null);
  const [packages, setPackages] = useState<SafariPackage[]>([]);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  const dirty = editor ? JSON.stringify(editor.draft) !== JSON.stringify(editor.saved) : false;

  useEffect(() => {
    void refreshSession();
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  async function refreshSession() {
    const { response, payload } = await readJson(await fetch("/api/admin/session"));
    if (!response.ok) {
      setSession({ signedIn: false, hasAccount: false, setupRequired: payload.setupRequired, message: payload.message });
      return;
    }
    const next = payload as SessionState;
    setSession(next);
    if (next.signedIn) await refreshList();
  }

  async function refreshList() {
    setLoadingList(true);
    const { response, payload } = await readJson(await fetch("/api/admin/safaris"));
    setLoadingList(false);
    if (!response.ok) {
      setMessage(payload.message ?? "The safari list could not be loaded.");
      return;
    }
    setPackages((payload as { packages?: SafariPackage[] }).packages ?? []);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    const mode = session?.hasAccount ? "sign-in" : "register";
    const { response, payload } = await readJson(
      await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, mode }),
      }),
    );
    if (!response.ok) {
      setMessage(payload.message ?? "Sign-in failed.");
      return;
    }
    setPassword("");
    await refreshSession();
  }

  async function signOut() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setEditor(null);
    setPackages([]);
    setSession({ signedIn: false, hasAccount: true });
  }

  function openNew() {
    const draft = blankPackage();
    setEditor({ draft, saved: structuredClone(draft), isNew: true });
    setMessage("");
  }

  function openExisting(safariPackage: SafariPackage) {
    const draft = forEditing(safariPackage);
    setEditor({ draft, saved: structuredClone(draft), isNew: false });
    setMessage("");
  }

  async function save() {
    if (!editor) return;
    setSaving(true);
    setMessage("");
    try {
      const prepared = preparePackage(editor.draft, editor.isNew, packages);
      const { response, payload } = await readJson(
        await fetch("/api/admin/safaris", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ package: prepared }),
        }),
      );
      if (!response.ok) throw new Error(payload.message ?? "Save failed.");
      const saved = forEditing(prepared);
      setEditor({ draft: saved, saved: structuredClone(saved), isNew: false });
      setMessage("Saved.");
      await refreshList();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(safariPackage: SafariPackage) {
    if (!window.confirm(`Delete ${safariPackage.title}?`)) return;
    const { response, payload } = await readJson(await fetch(`/api/admin/safaris/${encodeURIComponent(safariPackage.id)}`, { method: "DELETE" }));
    if (!response.ok) {
      setMessage(payload.message ?? "Delete failed.");
      return;
    }
    if (editor?.draft.id === safariPackage.id) setEditor(null);
    setMessage("Deleted.");
    await refreshList();
  }

  if (!session) {
    return <p className="px-4 py-16 text-center">Loading…</p>;
  }

  if (!session.signedIn) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16">
        <p className="text-xs tracking-[0.2em] text-gold uppercase">African Home Adventure</p>
        <h1 className="mt-2 font-display text-5xl">{session.hasAccount ? "Admin sign in" : "Create the admin account"}</h1>
        {session.setupRequired ? (
          <div className="mt-6 rounded-xl bg-white p-5 text-sm leading-relaxed">
            <p>{session.message}</p>
            <a
              className="mt-3 inline-block text-forest underline"
              href="https://supabase.com/dashboard/project/enllttuprsrsivbnvmuo/sql/new"
              target="_blank"
              rel="noreferrer"
            >
              Open the Supabase SQL editor
            </a>
            <button type="button" className="mt-4 block text-forest" onClick={() => void refreshSession()}>
              Reload
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-xl bg-white p-5">
            <label className="block text-sm">
              Username
              <input
                required
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-1 w-full rounded-md border border-sand px-3 py-2"
              />
            </label>
            <label className="block text-sm">
              Password
              <input
                required
                type="password"
                autoComplete={session.hasAccount ? "current-password" : "new-password"}
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 w-full rounded-md border border-sand px-3 py-2"
              />
            </label>
            {session.hasAccount ? null : (
              <p className="text-xs text-charcoal/60">The password is stored as a hash. This form only works while no admin exists.</p>
            )}
            {message ? <p className="text-sm text-[#8c3a3a]">{message}</p> : null}
            <button type="submit" className="rounded-full bg-forest px-4 py-2 text-sm text-cream">
              {session.hasAccount ? "Sign in" : "Create account and sign in"}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-4xl">Admin</h1>
        <button type="button" className="text-sm text-forest underline" onClick={() => void signOut()}>
          Sign out
        </button>
      </div>

      <section className="mt-8 rounded-xl border border-sand bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-sand px-4 py-4">
          <h2 className="font-display text-3xl">Safaris</h2>
          <button type="button" className="rounded-full bg-forest px-4 py-2 text-sm text-cream" onClick={openNew}>
            Add safari
          </button>
        </div>
        {loadingList ? <p className="px-4 py-6 text-sm">Loading safaris…</p> : null}
        <ul>
          {packages.map((safariPackage) => (
            <li key={safariPackage.id} className="flex items-center justify-between gap-4 border-b border-sand px-4 py-4 last:border-b-0">
              <div className="min-w-0">
                <p className="truncate font-medium">{safariPackage.title}</p>
                <p className="text-sm text-charcoal/60">
                  {safariPackage.duration} days · {safariPackage.destinations.join(", ")}
                </p>
              </div>
              <div className="flex shrink-0 gap-3">
                <button type="button" className="text-sm font-medium text-forest" onClick={() => openExisting(safariPackage)}>
                  Edit
                </button>
                <button type="button" className="text-sm text-charcoal/60 underline" onClick={() => void remove(safariPackage)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {editor ? (
        <div className="mt-12">
          <SafariEditor value={editor.draft} onChange={(draft) => setEditor({ ...editor, draft })} />
          <div className="fixed right-6 bottom-6 z-40 flex items-center gap-3">
            {message ? <p className="max-w-xs rounded-full bg-white px-4 py-2 text-sm shadow">{message}</p> : null}
            <button
              type="button"
              onClick={() => void save()}
              disabled={saving}
              className="rounded-full bg-forest px-5 py-3 text-sm text-cream shadow-lg disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
