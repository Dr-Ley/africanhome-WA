import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow = "African Home Adventure · Safari",
  title,
  description,
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">{eyebrow}</p>
      <div className="mt-3 h-px w-12 bg-gold" />
      <h2
        className={cn(
          "mt-4 font-display text-4xl leading-tight font-medium md:text-5xl",
          tone === "light" ? "text-white" : "text-charcoal",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-base leading-relaxed md:text-lg", tone === "light" ? "text-white/80" : "text-charcoal/70")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
