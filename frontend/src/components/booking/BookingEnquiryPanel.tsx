"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendEnquiry } from "@/lib/forms";
import { bookingEnquirySchema, type BookingEnquiryValues } from "@/lib/validations";

export function BookingEnquiryPanel({ packageTitle }: { packageTitle: string }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<BookingEnquiryValues>({
    resolver: zodResolver(bookingEnquirySchema),
    defaultValues: { name: "", email: "", phone: "", dates: "", travellers: "2", message: "" },
  });

  if (done) {
    const values = form.getValues();
    return (
      <div className="rounded-xl border border-sand bg-white p-5" data-testid="booking-confirmation">
        <p className="text-xs tracking-[0.18em] text-gold uppercase">Request sent</p>
        <h2 className="mt-2 font-display text-3xl">Quotation request sent</h2>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
          {values.name}, your note about {packageTitle} has been sent to African Home Adventure Safaris. We aim to respond within 2 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      id="enquiry"
      className="rounded-xl border border-sand bg-white p-5 shadow-sm"
      onSubmit={form.handleSubmit(async (values) => {
        setError("");
        try {
          await sendEnquiry("booking", { ...values, packageTitle });
          setDone(true);
        } catch (reason) {
          setError(reason instanceof Error ? reason.message : "The request could not be sent.");
        }
      })}
      noValidate
    >
      <p className="text-xs tracking-[0.18em] text-gold uppercase">Quotation request</p>
      <h2 className="mt-2 font-display text-3xl">Ask about this itinerary</h2>
      {/* <p className="mt-2 text-sm text-charcoal/70">{packageTitle}. This note stays in your browser. It is not sent, and it is not a booking.</p> */}
      <div className="mt-4 space-y-3">
        <Field label="Full name" error={form.formState.errors.name?.message}>
          <input className="input input-bordered w-full" {...form.register("name")} />
        </Field>
        <Field label="Email" error={form.formState.errors.email?.message}>
          <input type="email" className="input input-bordered w-full" {...form.register("email")} />
        </Field>
        <Field label="Phone or WhatsApp" error={form.formState.errors.phone?.message}>
          <input className="input input-bordered w-full" {...form.register("phone")} />
        </Field>
        <Field label="Approximate dates" error={form.formState.errors.dates?.message}>
          <input className="input input-bordered w-full" placeholder="September 2027" {...form.register("dates")} />
        </Field>
        <Field label="Travellers" error={form.formState.errors.travellers?.message}>
          <input className="input input-bordered w-full" {...form.register("travellers")} />
        </Field>
        <Field label="Notes" error={form.formState.errors.message?.message}>
          <textarea className="textarea textarea-bordered w-full" rows={4} {...form.register("message")} />
        </Field>
      </div>
      {error ? <p className="mt-3 text-sm text-error">{error}</p> : null}
      <button type="submit" className="btn btn-primary mt-4 w-full rounded-full border-0" disabled={form.formState.isSubmitting}>
        Enquire about this safari
      </button>
    </form>
  );
}

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-charcoal/80">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-error">{error}</span> : null}
    </label>
  );
}
