import Image from "next/image";
import { isVideoSrc } from "@/lib/utils";

export function MediaFill({
  src,
  alt,
  sizes,
  controls = false,
  playing = true,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  controls?: boolean;
  playing?: boolean;
  priority?: boolean;
}) {
  if (!src) return null;
  if (isVideoSrc(src)) {
    return (
      <video
        src={src}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        loop={playing}
        autoPlay={playing}
        controls={controls}
        preload={playing ? "metadata" : "metadata"}
      />
    );
  }
  return <Image src={src} alt={alt} fill priority={priority} className="object-cover" sizes={sizes} />;
}
