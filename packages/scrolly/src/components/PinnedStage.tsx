import React, { PropsWithChildren, useEffect, useRef } from "react";
import gsap from "gsap";
import { useScrollTimeline, ScrollTimelineOptions } from "../hooks/useScrollTimeline";

type Props = PropsWithChildren<
  ScrollTimelineOptions & {
    className?: string;
    stageClassName?: string;
  }
>;

export function PinnedStage({
  children,
  className,
  stageClassName,
  start = "top top",
  end = "+=2000",
  scrub = true,
  pin = true,
  markers = false
}: Props) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const { scope, timeline } = useScrollTimeline({ start, end, scrub, pin, markers });

  useEffect(() => {
    const tl = timeline.current;
    if (!tl || !stageRef.current) return;

    tl.clear();
    tl.fromTo(stageRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 });
    tl.to(stageRef.current, { y: -40, duration: 1 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [timeline]);

  return (
    <div ref={scope} className={className}>
      <div ref={stageRef} className={stageClassName}>
        {children}
      </div>
    </div>
  );
}
