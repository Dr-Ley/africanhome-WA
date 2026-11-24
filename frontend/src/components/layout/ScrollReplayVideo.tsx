"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  delayMs?: number;   // pause between plays
  threshold?: number; // how much of the video must be visible to start
  className?: string;
};

export default function ScrollReplayVideo({
  src,
  poster,
  delayMs = 100000,
  threshold = 0.4,
  className,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let inView = false;

    const play = () => {
      video.play().catch(() => {}); // ignore autoplay-policy rejections
    };

    const onEnded = () => {
      if (!inView) return;
      timer = setTimeout(() => {
        timer = undefined;
        video.currentTime = 0;
        play();
      }, delayMs);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          if (video.ended) video.currentTime = 0;
          play();
        } else {
          clearTimeout(timer);
          timer = undefined;
          video.pause();
        }
      },
      { threshold }
    );

    video.addEventListener("ended", onEnded);
    observer.observe(video);

    return () => {
      clearTimeout(timer);
      video.removeEventListener("ended", onEnded);
      observer.disconnect();
    };
  }, [delayMs, threshold]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}