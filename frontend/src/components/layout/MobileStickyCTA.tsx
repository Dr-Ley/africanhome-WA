import Link from "next/link";

export function MobileStickyCTA({
  href = "/plan-safari",
  label = "Plan Your Safari",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand bg-white/95 p-3 lg:hidden">
      <Link href={href} className="btn btn-primary w-full rounded-full border-0">
        {label}
      </Link>
    </div>
  );
}
