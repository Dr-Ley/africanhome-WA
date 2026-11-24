import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const styles = {
  solid: "btn btn-primary rounded-full border-0 px-6 font-medium text-cream shadow-none",
  light: "btn rounded-full border-0 bg-white px-6 font-medium text-forest shadow-none hover:bg-cream",
  outline:
    "btn btn-outline rounded-full border-white bg-transparent px-6 font-medium text-white shadow-none hover:border-white hover:bg-white hover:text-forest",
  outlineDark:
    "btn btn-outline rounded-full border-forest bg-transparent px-6 font-medium text-forest shadow-none hover:border-forest hover:bg-forest hover:text-cream",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(styles[variant], className)}>
      {children}
    </Link>
  );
}
