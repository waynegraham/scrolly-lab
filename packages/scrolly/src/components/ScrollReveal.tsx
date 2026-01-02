import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealProps {
    /** Content to be revealed */
    children: React.ReactNode;
    /** Opacity when the content is at the edges of the viewport (default: 0.7) */
    fromOpacity?: number;
    /** Opacity when the content is in the center of the viewport (default: 0) */
    toOpacity?: number;
    /** Color of the overlay (default: "black") */
    overlayColor?: string;
    /** Text direction for RTL support */
    dir?: 'ltr' | 'rtl';
}

export function ScrollReveal({
    children,
    fromOpacity = 0.7,
    toOpacity = 0,
    overlayColor = 'black',
    dir,
}: ScrollRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const container = containerRef.current;
            const overlay = overlayRef.current;
            if (!container || !overlay) return;

            // Create a timeline that spans the entire visibility of the element
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom', // When top of element hits bottom of viewport
                    end: 'bottom top',   // When bottom of element hits top of viewport
                    scrub: true,
                },
            });

            // Animate from dark (start) to transparent (center) to dark (end)
            // We use two steps of equal duration to ensure the peak is at 50% (center of viewport)
            tl.fromTo(
                overlay,
                { opacity: fromOpacity },
                { opacity: toOpacity, duration: 1, ease: 'power1.inOut' }
            ).to(
                overlay,
                { opacity: fromOpacity, duration: 1, ease: 'power1.inOut' }
            );
        },
        { scope: containerRef, dependencies: [fromOpacity, toOpacity] }
    );

    return (
        <div
            ref={containerRef}
            dir={dir}
            style={{
                position: 'relative',
                width: '100%',
                direction: dir,
            }}
        >
            {/* Content Layer */}
            <div style={{ position: 'relative', zIndex: 0 }}>
                {children}
            </div>

            {/* Overlay Layer */}
            <div
                ref={overlayRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: overlayColor,
                    opacity: fromOpacity,
                    zIndex: 1,
                    pointerEvents: 'none', // Allow clicks to pass through to content
                }}
                aria-hidden="true"
            />
        </div>
    );
}
