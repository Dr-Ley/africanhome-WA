"use client";

import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { MediaFill } from "@/components/shared/MediaFill";
import type { ImageSource } from "@/types";
import { expandImages } from "@/lib/utils";

export function DestinationGallery({
  images,
}: {
  images: { src: ImageSource; alt: string }[];
}) {
  const slides = images.flatMap((image) => expandImages(image.src).map((src) => ({ src, alt: image.alt })));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {slides.map((image, imageIndex) => (
            <div className="relative min-w-0 flex-[0_0_100%] aspect-[16/9]" key={`${image.src}-${imageIndex}`}>
              <MediaFill src={image.src} alt={image.alt} sizes="100vw" controls />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {slides.map((image, imageIndex) => (
          <button
            key={`${image.src}-${imageIndex}`}
            type="button"
            className={`relative h-16 w-24 overflow-hidden rounded-md border ${index === imageIndex ? "border-forest" : "border-transparent"}`}
            onClick={() => {
              setIndex(imageIndex);
              emblaApi?.scrollTo(imageIndex);
            }}
          >
            <MediaFill src={image.src} alt="" sizes="96px" playing={false} />
            <span className="sr-only">Show image {imageIndex + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
