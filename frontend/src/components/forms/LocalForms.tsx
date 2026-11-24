"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/components/booking/BookingEnquiryPanel";
import {
  contactSchema,
  partnershipSchema,
  vehicleEnquirySchema,
  type ContactValues,
  type PartnershipValues,
  type VehicleEnquiryValues,
} from "@/lib/validations";
import { sampleRoutes } from "@/data/vehicles";
import { sendEnquiry } from "@/lib/forms";

function SavedNote({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-sand bg-white p-6" data-testid="form-confirmation">
      <p className="text-xs tracking-[0.18em] text-gold uppercase">Request sent</p>
      <h2 className="mt-2 font-display text-4xl">{title}</h2>
      <p className="mt-3 leading-relaxed text-charcoal/75">{text}</p>
    </div>
  );
}

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", country: "", message: "" },
  });
  if (done) {
    return (
      <SavedNote
        title="Message sent"
        text="Your note is with African Home Adventure Safaris. We will reply by email."
      />
    );
  }
  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={form.handleSubmit(async (values) => {
        setError("");
        try {
          await sendEnquiry("contact", values);
          setDone(true);
        } catch (reason) {
          setError(reason instanceof Error ? reason.message : "The message could not be sent.");
        }
      })}
    >
      <Field label="Full name" error={form.formState.errors.name?.message}>
        <input className="input input-bordered w-full" {...form.register("name")} />
      </Field>
      <Field label="Email" error={form.formState.errors.email?.message}>
        <input type="email" className="input input-bordered w-full" {...form.register("email")} />
      </Field>
      <Field label="Phone or WhatsApp" error={form.formState.errors.phone?.message}>
        <input className="input input-bordered w-full" {...form.register("phone")} />
      </Field>
      <Field label="Country of residence" error={form.formState.errors.country?.message}>
        <input className="input input-bordered w-full" {...form.register("country")} />
      </Field>
      <Field label="How can we help?" error={form.formState.errors.message?.message}>
        <textarea className="textarea textarea-bordered w-full" rows={5} {...form.register("message")} />
      </Field>
      {error ? <p className="text-sm text-error">{error}</p> : null}
      <button type="submit" className="btn btn-primary rounded-full border-0" disabled={form.formState.isSubmitting}>
        Send message
      </button>
    </form>
  );
}

export function VehicleEnquiryForm() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<VehicleEnquiryValues>({
    resolver: zodResolver(vehicleEnquirySchema),
    defaultValues: { name: "", email: "", phone: "", country: "", route: sampleRoutes[0].from + " to " + sampleRoutes[0].to, customRoute: "", dates: "", message: "" },
  });
  const route = form.watch("route");
  if (done) {
    return (
      <SavedNote
        title="Vehicle request sent"
        text="This is not a confirmed vehicle hold. We will reply with availability and a quotation."
      />
    );
  }
  return (
    <form
      id="vehicle-enquiry"
      className="space-y-4"
      noValidate
      onSubmit={form.handleSubmit(async (values) => {
        setError("");
        try {
          const { customRoute, ...rest } = values;
          await sendEnquiry("vehicle", {
            ...rest,
            route: values.route === "Other" ? customRoute : values.route,
          });
          setDone(true);
        } catch (reason) {
          setError(reason instanceof Error ? reason.message : "The request could not be sent.");
        }
      })}
    >
      <Field label="Full name" error={form.formState.errors.name?.message}>
        <input className="input input-bordered w-full" {...form.register("name")} />
      </Field>
      <Field label="Email" error={form.formState.errors.email?.message}>
        <input type="email" className="input input-bordered w-full" {...form.register("email")} />
      </Field>
      <Field label="Phone or WhatsApp" error={form.formState.errors.phone?.message}>
        <input className="input input-bordered w-full" {...form.register("phone")} />
      </Field>
      <Field label="Country of residence" error={form.formState.errors.country?.message}>
        <input className="input input-bordered w-full" {...form.register("country")} />
      </Field>
      <Field label="Route" error={form.formState.errors.route?.message}>
        <select className="select select-bordered w-full" {...form.register("route")}>
          {sampleRoutes.map((item) => (
            <option key={item.to}>{item.from} to {item.to}</option>
          ))}
          <option value="Other">Other</option>
        </select>
      </Field>
      {route === "Other" ? (
        <Field label="Your route" error={form.formState.errors.customRoute?.message}>
          <input className="input input-bordered w-full" placeholder="Nairobi to Kisumu" {...form.register("customRoute")} />
        </Field>
      ) : null}
      <Field label="Travel dates" error={form.formState.errors.dates?.message}>
        <input className="input input-bordered w-full" {...form.register("dates")} />
      </Field>
      <Field label="What do you need the vehicle for?" error={form.formState.errors.message?.message}>
        <textarea className="textarea textarea-bordered w-full" rows={4} {...form.register("message")} />
      </Field>
      {error ? <p className="text-sm text-error">{error}</p> : null}
      <button type="submit" className="btn btn-primary rounded-full border-0" disabled={form.formState.isSubmitting}>
        Request a Safari Vehicle Quote
      </button>
    </form>
  );
}

export function PartnershipForm() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<PartnershipValues>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: { name: "", company: "", email: "", phone: "", country: "", message: "" },
  });
  if (done) {
    return (
      <SavedNote
        title="Partnership note sent"
        text="The ground team has your request and will reply by email."
      />
    );
  }
  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={form.handleSubmit(async (values) => {
        setError("");
        try {
          await sendEnquiry("partnership", values);
          setDone(true);
        } catch (reason) {
          setError(reason instanceof Error ? reason.message : "The note could not be sent.");
        }
      })}
    >
      <Field label="Your name" error={form.formState.errors.name?.message}>
        <input className="input input-bordered w-full" {...form.register("name")} />
      </Field>
      <Field label="Company" error={form.formState.errors.company?.message}>
        <input className="input input-bordered w-full" {...form.register("company")} />
      </Field>
      <Field label="Email" error={form.formState.errors.email?.message}>
        <input type="email" className="input input-bordered w-full" {...form.register("email")} />
      </Field>
      <Field label="Phone or WhatsApp" error={form.formState.errors.phone?.message}>
        <input className="input input-bordered w-full" {...form.register("phone")} />
      </Field>
      <Field label="Country" error={form.formState.errors.country?.message}>
        <input className="input input-bordered w-full" {...form.register("country")} />
      </Field>
      <Field label="Ground-handling request" error={form.formState.errors.message?.message}>
        <textarea className="textarea textarea-bordered w-full" rows={5} {...form.register("message")} />
      </Field>
      {error ? <p className="text-sm text-error">{error}</p> : null}
      <button type="submit" className="btn btn-primary rounded-full border-0" disabled={form.formState.isSubmitting}>
        Discuss a Safari Partnership
      </button>
    </form>
  );
}
