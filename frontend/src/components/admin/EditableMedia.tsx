"use client";

import { useState } from "react";
import { isVideoSrc } from "@/lib/utils";
import { compressForUpload } from "@/lib/media/compress";

export function EditableMedia({
  src,
  alt,
  onChange,
}: {
  src: string;
  alt: string;
  onChange: (src: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [library, setLibrary] = useState<{ src: string; video: boolean }[] | null>(null);
  const [browsing, setBrowsing] = useState(false);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  function close() {
    if (busy) return;
    setOpen(false);
    setLibrary(null);
    setBrowsing(false);
    setHighlighted(null);
    setStatus("");
  }

  async function browseSaved() {
    setBrowsing(true);
    setLibrary(null);
    setHighlighted(null);
    setStatus("Loading saved images…");
    try {
      const response = await fetch("/api/admin/media");
      const payload = (await response.json()) as { files?: { src: string; video: boolean }[]; message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Saved images could not be loaded.");
      setLibrary(payload.files ?? []);
      setStatus("");
    } catch (error) {
      setBrowsing(false);
      setLibrary(null);
      setStatus(error instanceof Error ? error.message : "Saved images could not be loaded.");
    }
  }

  function chooseSaved(next: string) {
    onChange(next);
    setOpen(false);
    setLibrary(null);
    setBrowsing(false);
    setHighlighted(null);
    setStatus("");
  }

  async function deleteSaved(src: string) {
    setBusy(true);
    setStatus("Deleting…");
    try {
      const response = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src }),
      });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Delete failed.");
      setLibrary((current) => current?.filter((file) => file.src !== src) ?? null);
      setHighlighted(null);
      setStatus("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  async function receive(file: File | undefined) {
    if (!file || busy) return;
    setBusy(true);
    setStatus("Compressing…");
    try {
      const compressed = await compressForUpload(file, setStatus);
      setStatus("Uploading…");
      const body = new FormData();
      body.set("file", compressed);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const payload = (await response.json()) as { url?: string; message?: string };
      if (!response.ok || !payload.url) throw new Error(payload.message ?? "Upload failed.");
      onChange(payload.url);
      setOpen(false);
      setStatus("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="absolute inset-0 z-10"
        aria-label={src ? "Replace image or video" : "Upload image or video"}
        onClick={() => {
          setStatus("");
          setLibrary(null);
          setBrowsing(false);
          setHighlighted(null);
          setOpen(true);
        }}
      />
      {src ? (
        isVideoSrc(src) ? (
          <video src={src} className="absolute inset-0 h-full w-full object-cover" muted playsInline controls />
        ) : (
          <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
        )
      ) : (
        <span className="absolute inset-0 flex items-center justify-center bg-sand text-sm text-charcoal/70">
          Add an image or video
        </span>
      )}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 p-4">
          <div
            className={`w-full rounded-2xl bg-cream p-6 text-center ${browsing ? "max-h-[85vh] max-w-4xl overflow-y-auto" : "max-w-lg"}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              void receive(event.dataTransfer.files[0]);
            }}
          >
            <p className="font-display text-3xl">Drop an image or video</p>
            <p className="mt-2 text-sm text-charcoal/70">
              Images stay at full size and are only replaced when a lossless PNG is smaller. A video plays through once while it is compressed, then the smaller file is uploaded.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <label className="inline-block cursor-pointer rounded-full bg-forest px-4 py-2 text-sm text-cream">
                Choose a file
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="sr-only"
                  disabled={busy}
                  onChange={(event) => {
                    void receive(event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
              </label>
              <button
                type="button"
                className="rounded-full border border-forest px-4 py-2 text-sm text-forest"
                disabled={busy}
                onClick={() => void browseSaved()}
              >
                Browse saved images
              </button>
            </div>
            {browsing && library ? (
              library.length ? (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {library.map((file) => {
                    const selected = highlighted === file.src;
                    return (
                      <div
                        key={file.src}
                        className={`relative aspect-[4/3] overflow-hidden rounded-lg border bg-sand ${selected ? "border-forest ring-2 ring-forest" : "border-sand"}`}
                      >
                        <button
                          type="button"
                          className="absolute inset-0"
                          aria-label={selected ? "Use this image" : "Highlight this image"}
                          onClick={() => (selected ? chooseSaved(file.src) : setHighlighted(file.src))}
                        />
                        {file.video ? (
                          <video src={file.src} className="h-full w-full object-cover" muted playsInline />
                        ) : (
                          <img src={file.src} alt="" className="h-full w-full object-cover" />
                        )}
                        {selected ? (
                          <button
                            type="button"
                            className="absolute top-2 right-2 z-10 rounded-full bg-white px-2 py-1 text-xs text-[#8c3a3a] shadow"
                            disabled={busy}
                            onClick={() => void deleteSaved(file.src)}
                          >
                            Delete
                          </button>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-5 text-sm text-charcoal/70">No saved images yet.</p>
              )
            ) : null}
            {status ? <p className="mt-4 text-sm text-charcoal/80">{status}</p> : null}
            <div className="mt-4">
              <button type="button" className="text-sm text-charcoal/70 underline" disabled={busy} onClick={close}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
