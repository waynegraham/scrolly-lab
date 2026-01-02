import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxHeroProps {
    /** URL of the background image */
    backgroundImage: string;
    /** Height of the hero section */
    height?: string;
    /** Parallax speed factor (0 = no movement, 1 = fixed, < 1 = slower than scroll) */
    speed?: number;
    /** Content to display in the foreground */
    children?: React.ReactNode;
    /** Text direction for RTL support */
    dir?: 'ltr' | 'rtl';
}

export function ParallaxHero({
    backgroundImage,
    height = '100vh',
    speed = 0.5,
    children,
    dir,
}: ParallaxHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const bg = bgRef.current;
            const container = containerRef.current;
            if (!bg || !container) return;

            // Ensure the background is large enough to cover the movement
            // If speed is 0.5, the background moves half as fast as the scroll.
            // So over 100vh scroll, it moves 50vh relative to viewport.
            // We set height slightly larger to accommodate.
            gsap.set(bg, { height: '120%', top: '-10%' });

            gsap.to(bg, {
                yPercent: 20 * speed, // Move background vertically
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        },
        { scope: containerRef, dependencies: [speed] }
    );

    return (
        <div
            ref={containerRef}
            dir={dir}
            style={{
                position: 'relative',
                height,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                direction: dir, // Ensure CSS follows dir prop
            }}
        >
            {/* Background Layer */}
            <div
                ref={bgRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0,
                }}
                aria-hidden="true"
            />

            {/* Foreground Content */}
            <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                {children}
            </div>
        </div>
    );
}
