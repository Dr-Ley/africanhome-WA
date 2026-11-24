"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { format, parseISO } from "date-fns";
import {
  plannerAccommodation,
  plannerDestinations,
  plannerStyles,
  plannerTransport,
} from "@/data/site-content";
import { sendEnquiry } from "@/lib/forms";
import { plannerSchema, type PlannerValues } from "@/lib/validations";

const steps = ["Travel", "Destinations", "Preferences", "Transportation", "Accommodation", "Contact", "Review"] as const;

const empty: PlannerValues = {
  arrival: "",
  departure: "",
  adults: 2,
  children: 0,
  childAges: "",
  destinations: [],
  otherDestination: "",
  budget: "Mid-range",
  styles: [],
  transport: "",
  accommodation: "",
  name: "",
  email: "",
  country: "",
  phone: "",
  notes: "",
};

export function CustomSafariForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [stepError, setStepError] = useState("");
  const form = useForm<PlannerValues>({ defaultValues: empty });
  const values = form.watch();

  function toggle(field: "destinations" | "styles", value: string) {
    const current = form.getValues(field);
    form.setValue(
      field,
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
      { shouldDirty: true },
    );
  }

  function validate(current: number) {
    const data = form.getValues();
    if (current === 0) {
      if (!data.arrival || !data.departure) return "Add both dates.";
      if (data.departure < data.arrival) return "Departure must be on or after arrival.";
      if (!data.adults || data.adults < 1) return "Add at least one adult.";
      if (data.children > 0 && !data.childAges?.trim()) return "Share the children's ages.";
    }
    if (current === 1 && data.destinations.length === 0) return "Select at least one destination.";
    if (current === 1 && data.destinations.includes("Other") && !data.otherDestination?.trim()) return "Type the other destinations.";
    if (current === 2 && data.styles.length === 0) return "Select at least one travel style.";
    if (current === 3 && !data.transport) return "Choose a transport arrangement.";
    if (current === 4 && !data.accommodation) return "Choose an accommodation style.";
    if (current === 5) {
      const parsed = plannerSchema.safeParse(data);
      if (!parsed.success) {
        const contactIssue = parsed.error.issues.find((issue) =>
          ["name", "email", "country", "phone", "arrival", "departure", "destinations", "styles", "transport", "accommodation"].includes(
            String(issue.path[0]),
          ),
        );
        return contactIssue?.message ?? "Check the contact details.";
      }
    }
    return "";
  }

  function next() {
    const message = validate(step);
    setStepError(message);
    if (!message) setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  async function submit() {
    const parsed = plannerSchema.safeParse(form.getValues());
    if (!parsed.success) {
      setStepError(parsed.error.issues[0]?.message ?? "Please review the form.");
      return;
    }
    setSending(true);
    try {
      await sendEnquiry("planner", parsed.data);
      setDone(true);
    } catch (error) {
      setStepError(error instanceof Error ? error.message : "The request could not be sent.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    const data = form.getValues();
    return (
      <section data-testid="enquiry-confirmation" className="rounded-2xl border border-sand bg-white p-6 md:p-10">
        <p className="text-xs tracking-[0.2em] text-gold uppercase">Request sent</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">Your custom safari request is with the desk.</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-charcoal/75">
          African Home Adventure Safaris has received this request. We aim to respond within 2 hours. The summary below is what was sent.
        </p>
        <Summary data={data} />
      </section>
    );
  }

  return (
    <div data-testid="planner-form">
      <ol className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((label, index) => (
          <li
            key={label}
            className={`shrink-0 rounded-full px-3 py-1 text-xs ${index === step ? "bg-forest text-cream" : "bg-white text-charcoal/70"}`}
          >
            {index + 1}. {label}
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-2xl border border-sand bg-white p-5 md:p-8">
        {step === 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm">
              Arrival date
              <input type="date" className="input input-bordered mt-1 w-full" {...form.register("arrival")} />
            </label>
            <label className="text-sm">
              Departure date
              <input type="date" className="input input-bordered mt-1 w-full" {...form.register("departure")} />
            </label>
            <label className="text-sm">
              Adults
              <input type="number" min={1} max={14} className="input input-bordered mt-1 w-full" {...form.register("adults", { valueAsNumber: true })} />
            </label>
            <label className="text-sm">
              Children
              <input type="number" min={0} max={10} className="input input-bordered mt-1 w-full" {...form.register("children", { valueAsNumber: true })} />
            </label>
            {values.children > 0 ? (
              <label className="text-sm md:col-span-2">
                Children&apos;s ages
                <input className="input input-bordered mt-1 w-full" placeholder="8 and 11" {...form.register("childAges")} />
              </label>
            ) : null}
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...plannerDestinations, "Other"].map((destination) => {
              const selected = values.destinations.includes(destination);
              return (
                <button
                  key={destination}
                  type="button"
                  data-testid="destination-option"
                  aria-pressed={selected}
                  onClick={() => toggle("destinations", destination)}
                  className={`rounded-xl border px-4 py-4 text-left ${selected ? "border-forest bg-forest text-cream" : "border-sand bg-cream"}`}
                >
                  {destination}
                </button>
              );
            })}
            {values.destinations.includes("Other") ? (
              <label className="text-sm sm:col-span-2 lg:col-span-3">
                Other destinations
                <input className="input input-bordered mt-1 w-full" placeholder="Kisumu, Naivasha, Lewa" {...form.register("otherDestination")} />
              </label>
            ) : null}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            <fieldset>
              <legend className="text-sm text-charcoal/70">Budget level</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Budget", "Mid-range", "Luxury"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    aria-pressed={values.budget === level}
                    onClick={() => form.setValue("budget", level as PlannerValues["budget"])}
                    className={`rounded-full border px-4 py-2 text-sm ${values.budget === level ? "border-forest bg-forest text-cream" : "border-sand"}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm text-charcoal/70">Travel style</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {plannerStyles.map((style) => {
                  const selected = values.styles.includes(style);
                  return (
                    <button
                      key={style}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggle("styles", style)}
                      className={`rounded-full border px-4 py-2 text-sm ${selected ? "border-forest bg-forest text-cream" : "border-sand"}`}
                    >
                      {style}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-3">
            {plannerTransport.map((option) => (
              <button
                key={option}
                type="button"
                data-testid="transport-option"
                aria-pressed={values.transport === option}
                onClick={() => form.setValue("transport", option)}
                className={`rounded-xl border px-4 py-4 text-left ${values.transport === option ? "border-forest bg-forest text-cream" : "border-sand"}`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}

        {step === 4 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {plannerAccommodation.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={values.accommodation === option}
                onClick={() => form.setValue("accommodation", option)}
                className={`rounded-xl border px-4 py-4 text-left ${values.accommodation === option ? "border-forest bg-forest text-cream" : "border-sand"}`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}

        {step === 5 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm">
              Full name
              <input className="input input-bordered mt-1 w-full" {...form.register("name")} />
            </label>
            <label className="text-sm">
              Email
              <input type="email" className="input input-bordered mt-1 w-full" {...form.register("email")} />
            </label>
            <label className="text-sm">
              Country of residence
              <input className="input input-bordered mt-1 w-full" {...form.register("country")} />
            </label>
            <label className="text-sm">
              Phone or WhatsApp
              <input className="input input-bordered mt-1 w-full" {...form.register("phone")} />
            </label>
            <label className="text-sm md:col-span-2">
              Additional requirements
              <textarea className="textarea textarea-bordered mt-1 w-full" rows={4} {...form.register("notes")} />
            </label>
          </div>
        ) : null}

        {step === 6 ? (
          <div data-testid="planner-review">
            <h2 className="font-display text-4xl">Final review</h2>
            <p className="mt-2 text-sm text-charcoal/70">Read this back before you send the request.</p>
            <Summary data={values} />
          </div>
        ) : null}

        {stepError ? <p className="mt-4 text-sm text-error">{stepError}</p> : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {step > 0 ? (
            <button type="button" className="btn btn-outline rounded-full border-forest" onClick={() => { setStepError(""); setStep((value) => value - 1); }}>
              Back
            </button>
          ) : null}
          {step < 6 ? (
            <button type="button" data-testid="planner-next" className="btn btn-primary rounded-full border-0" onClick={next}>
              Continue
            </button>
          ) : (
            <button type="button" data-testid="planner-submit" className="btn btn-primary rounded-full border-0" disabled={sending} onClick={() => void submit()}>
              Request My Custom Safari
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Summary({ data }: { data: PlannerValues }) {
  const rows = [
    ["Arrival", data.arrival ? format(parseISO(data.arrival), "d MMMM yyyy") : "—"],
    ["Departure", data.departure ? format(parseISO(data.departure), "d MMMM yyyy") : "—"],
    ["Travellers", `${data.adults} adults${data.children ? `, ${data.children} children (${data.childAges})` : ""}`],
    ["Destinations", [...data.destinations.filter((item) => item !== "Other"), data.otherDestination].filter(Boolean).join(", ") || "—"],
    ["Budget", data.budget],
    ["Style", data.styles.join(", ") || "—"],
    ["Transport", data.transport || "—"],
    ["Accommodation", data.accommodation || "—"],
    ["Name", data.name || "—"],
    ["Email", data.email || "—"],
    ["Country", data.country || "—"],
    ["Phone", data.phone || "—"],
    ["Notes", data.notes || "None added"],
  ];
  return (
    <dl className="mt-6 divide-y divide-sand">
      {rows.map(([label, value]) => (
        <div key={label} className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
          <dt className="text-sm text-gold">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
