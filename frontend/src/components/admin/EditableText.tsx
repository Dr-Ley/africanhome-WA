"use client";

import { Link2 } from "lucide-react";
import { useState } from "react";

export function EditableText({
  value,
  onChange,
  multiline = false,
  className = "",
  iconClassName = "text-gold",
}: {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  className?: string;
  iconClassName?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function startEditing() {
    setDraft(value);
    setEditing(true);
  }

  function change(next: string) {
    setDraft(next);
    onChange(next);
  }

  return (
    <div className="relative pr-7">
      {editing ? null : (
        <button
          type="button"
          className={`absolute top-0 right-0 z-10 rounded-full p-0.5 hover:bg-sand ${iconClassName}`}
          aria-label="Edit field"
          onClick={startEditing}
        >
          <Link2 className="h-4 w-4" />
        </button>
      )}
      {editing ? (
        multiline ? (
          <textarea
            autoFocus
            value={draft}
            rows={5}
            onChange={(event) => change(event.target.value)}
            onBlur={() => setEditing(false)}
            className={`w-full rounded-md border border-sand bg-white p-2 ${className}`}
          />
        ) : (
          <input
            autoFocus
            value={draft}
            onChange={(event) => change(event.target.value)}
            onBlur={() => setEditing(false)}
            className={`w-full rounded-md border border-sand bg-white px-2 py-1 ${className}`}
          />
        )
      ) : (
        <div className={`whitespace-pre-wrap ${className}`}>{value || "Empty"}</div>
      )}
    </div>
  );
}

export function EditableChoice({
  value,
  options,
  onChange,
  className = "",
}: {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="relative pr-7">
      {editing ? null : (
        <button
          type="button"
          className="absolute top-0 right-0 z-10 rounded-full p-0.5 text-gold hover:bg-sand"
          aria-label="Edit field"
          onClick={() => setEditing(true)}
        >
          <Link2 className="h-4 w-4" />
        </button>
      )}
      {editing ? (
        <select
          autoFocus
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setEditing(false);
          }}
          onBlur={() => setEditing(false)}
          className={`w-full rounded-md border border-sand bg-white px-2 py-1 ${className}`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className={className}>{value}</div>
      )}
    </div>
  );
}
