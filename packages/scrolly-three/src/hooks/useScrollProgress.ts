import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ensureGSAP } from '@wsgrah/scrolly';

export function useScrollProgress(triggerEl: Element | null) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    ensureGSAP();
    if (!triggerEl || typeof window === 'undefined') return;

    const st = (gsap as any).core.globals().ScrollTrigger?.create?.({
      trigger: triggerEl,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self: any) => setProgress(self.progress),
    });

    return () => st?.kill?.();
  }, [triggerEl]);

  return progress;
}
