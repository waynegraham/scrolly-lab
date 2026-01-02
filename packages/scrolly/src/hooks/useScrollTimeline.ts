import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ensureGSAP } from "../gsap/register";

export type ScrollTimelineOptions = {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
};

export function useScrollTimeline(options: ScrollTimelineOptions = {}) {
  const scope = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      ensureGSAP();
      if (!scope.current) return;

      timeline.current = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: options.start ?? "top bottom",
          end: options.end ?? "bottom top",
          scrub: options.scrub ?? true,
          pin: options.pin ?? false,
          markers: options.markers ?? false
        }
      });
    },
    { scope }
  );

  return { scope, timeline };
}
