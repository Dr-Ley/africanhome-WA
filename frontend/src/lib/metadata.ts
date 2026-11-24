import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export function pageMeta({
  title,
  description,
  path,
  image = "/images/logo/AHA_logo.png",
  absolute = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  absolute?: boolean;
}): Metadata {
  const url = `${SITE.domain}${path}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_GB",
      images: [
        {
          url: image,
          width: 1200,
          height: 800,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
