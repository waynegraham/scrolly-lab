import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// @see https://codepen.io/moussamamadou/pen/WbNepNG

/** Data model for a single parallax card. */
export interface CardParallaxItem {
  id: string;
  title: string;
  image: string;
  description?: string;
  video?: string; // Optional video overlay from CodePen logic
  metadata?: { label: string; value: string }[];
}

/** Props for the card-stacking parallax reveal component. */
export interface CardParallaxRevealProps {
  items: CardParallaxItem[];
}

/**
 * Scroll-driven parallax stack that reveals cards using clip-path wipes
 * and optional floating video panels.
 */
export function CardParallaxReveal({ items }: CardParallaxRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fixedContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const ghostItems = gsap.utils.toArray<HTMLElement>('.ghost-item', containerRef.current);
      const workItems = gsap.utils.toArray<HTMLElement>('.work-item', fixedContainerRef.current);

      // Initial State: All items fixed at top (except maybe first one dependent on layout preference)
      // CodePen logic: fixed, top 0.

      // We assume the first item is already visible or handled by the hero section prior.
      // However, for this self-contained component, we'll make the first item visible by default or animate it too.
      // The CodePen animates ALL items including the first one if they are all in the loop.

      // Reset clips
      gsap.set(workItems, {
        clipPath: 'inset(100% 0 0 0)',
        zIndex: (i) => i + 1,
      });

      // Make first item visible immediately if desired, OR let them all scroll in.
      // Let's following CodePen exact logic:
      // It loops through all workItems and blindly assigns triggers.

      workItems.forEach((workItem, index) => {
        const ghost = ghostItems[index]; // The spacer that drives this animation
        const img = workItem.querySelector('.work-image');
        const videoContainer = workItem.querySelector('.work-video-container');

        // Reveal the section (Clip Path Wipe)
        gsap.to(workItem, {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: ghost,
            start: 'top bottom', // Start revealing when ghost top hits viewport bottom
            end: 'center center', // Fully revealed when ghost is half way up? CodePen uses +75vh
            scrub: true,
          },
        });

        // Image Parallax & Scale
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.2, yPercent: 10 },
            {
              scale: 1,
              yPercent: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: ghost,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }

        // Video Slide In (if present)
        if (videoContainer) {
          gsap.fromTo(
            videoContainer,
            { x: index % 2 === 0 ? '100vw' : '-100vw' },
            {
              x: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ghost,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 1,
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Ghost Items (Spacers) - These Create the Scroll Height */}
      <div style={{ position: 'relative', zIndex: 0 }}>
        {items.map((item) => (
          <div
            key={`ghost-${item.id}`}
            className="ghost-item"
            style={{
              height: '150vh', // Each item gets plenty of scroll room
              pointerEvents: 'none', // Pass clicks through to fixed items? No, fixed items are on top.
              visibility: 'hidden', // Invisible structure
            }}
          />
        ))}
        {/* Extra buffer at bottom */}
        <div style={{ height: '50vh' }}></div>
      </div>

      {/* Fixed Items (Visuals) - These are stacked fixed on top */}
      <div
        ref={fixedContainerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          pointerEvents: 'none', // Allow scroll to pass through to body?
          // Actually, if they are fixed 100vh, they might block scroll if pointer-events: auto.
          // But we need text to be selectable.
          // Solution: pointer-events: none on container, auto on children.
          zIndex: 10,
        }}
      >
        {items.map((item) => (
          <div
            key={`work-${item.id}`}
            className="work-item"
            style={{
              position: 'absolute', // Absolute relative to the fixed container
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#111', // Dark background for contrast
              overflow: 'hidden',
              pointerEvents: 'auto',
              willChange: 'clip-path',
            }}
          >
            {/* Background Image */}
            <div
              className="work-image-wrapper"
              style={{ width: '100%', height: '100%', position: 'absolute' }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="work-image"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
            </div>

            {/* Content Overlay */}
            <div
              className="content-wrapper"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                padding: '2rem',
                alignItems: 'center',
                color: '#fff',
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              {/* Secondary Video/Image Floating Card */}
              {item.video && (
                <div
                  className="work-video-container"
                  style={{
                    gridColumn: '2 / span 4',
                    aspectRatio: '16/9',
                    background: '#000',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    zIndex: 2,
                  }}
                >
                  {/* In a real app, video tag. Here placeholder or img */}
                  <img
                    src={item.video}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Text Content */}
              <div
                className="work-text"
                style={{
                  gridColumn: item.video ? '7 / span 5' : '2 / span 10',
                  textAlign: item.video ? 'left' : 'center',
                  zIndex: 2,
                }}
              >
                <h2
                  style={{
                    fontSize: 'clamp(3rem, 6vw, 8rem)',
                    lineHeight: 0.9,
                    fontWeight: 800,
                    margin: '0 0 2rem 0',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.title}
                </h2>
                {item.description && (
                  <p
                    style={{
                      fontSize: '1.25rem',
                      opacity: 0.8,
                      maxWidth: '600px',
                      margin: item.video ? '0' : '0 auto',
                    }}
                  >
                    {item.description}
                  </p>
                )}

                {item.metadata && (
                  <div
                    style={{
                      marginTop: '3rem',
                      display: 'flex',
                      gap: '3rem',
                      justifyContent: item.video ? 'flex-start' : 'center',
                    }}
                  >
                    {item.metadata.map((meta, i) => (
                      <div key={i}>
                        <div
                          style={{
                            fontSize: '0.875rem',
                            opacity: 0.6,
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {meta.label}
                        </div>
                        <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{meta.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
