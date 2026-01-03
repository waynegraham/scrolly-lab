import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/** Content model for each masked image section. */
export interface ImageMaskRevealItem {
  id: string;
  title: string;
  description: string;
  image: string;
  backgroundColor: string;
  accentColor?: string;
  linkText?: string;
  linkUrl?: string;
}

/** Props for the split-layout image mask reveal component. */
export interface ImageMaskRevealProps {
  items: ImageMaskRevealItem[];
  dir?: 'ltr' | 'rtl';
}

/**
 * Split layout that pins images on desktop and reveals them via mask transitions.
 * On mobile, uses a stacked layout with scroll-driven parallax and color shifts.
 */
export function ImageMaskReveal({ items, dir = 'ltr' }: ImageMaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const rightCol = rightColRef.current;
      if (!container || !rightCol) return;

      const imgs = gsap.utils.toArray<HTMLImageElement>('.img-wrapper img', container);
      const bgColors = items.map((item) => item.backgroundColor);

      // Desktop Animation (min-width: 769px) - Pinned split layout
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        // Pin the right column
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            pin: rightCol,
            scrub: true,
          },
        });

        // Initialize images: full size, clipPath open
        gsap.set(imgs, { clipPath: 'inset(0)', objectPosition: '0px 0%' });

        // Build the timeline
        imgs.forEach((_, index) => {
          const currentImage = imgs[index];
          const nextImage = imgs[index + 1] ? imgs[index + 1] : null;

          if (nextImage) {
            const sectionTimeline = gsap.timeline();
            sectionTimeline
              // Animate container background
              .to(
                container,
                {
                  backgroundColor: bgColors[index + 1] || bgColors[index],
                  duration: 1.5,
                  ease: 'power2.inOut',
                },
                0
              )
              // Wipe current image up (inset bottom goes to 100%)
              .to(
                currentImage,
                {
                  clipPath: 'inset(0px 0px 100% 0px)',
                  objectPosition: '0px 60%',
                  duration: 1.5,
                  ease: 'none',
                },
                0
              )
              // Parallax effect for next image
              .to(nextImage, { objectPosition: '0px 40%', duration: 1.5, ease: 'none' }, 0);

            mainTimeline.add(sectionTimeline);
          }
        });
      });

      // Mobile Animation (max-width: 768px) - Stacked with scroll effects
      mm.add('(max-width: 768px)', () => {
        const mobileTimeline = gsap.timeline();
        gsap.set(imgs, { objectPosition: '0px 60%' });

        imgs.forEach((image, index) => {
          const innerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: image,
              start: 'top-=70% top+=50%',
              end: 'bottom+=200% bottom',
              scrub: true,
            },
          });

          innerTimeline
            .to(image, { objectPosition: '0px 30%', duration: 5, ease: 'none' })
            .to(
              container,
              { backgroundColor: bgColors[index], duration: 1.5, ease: 'power2.inOut' },
              0
            );

          mobileTimeline.add(innerTimeline);
        });
      });
    },
    { scope: containerRef, dependencies: [items] }
  );

  return (
    <div
      ref={containerRef}
      dir={dir}
      style={{
        backgroundColor: items[0]?.backgroundColor || '#fff',
        color: '#121212',
        fontFamily: '"Outfit", sans-serif',
        padding: '2rem 1rem', // Added padding for container
        minHeight: '100vh',
        transition: 'background-color 0.5s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          gap: '60px',
          justifyContent: 'space-between',
          flexDirection: 'row', // Default to row, media query handles stack in JS/CSS or via styled-components if used.
          // Since we're using inline styles here for simplicity without CSS Modules/Tailwind:
          flexWrap: 'wrap', // Allow wrapping for mobile
        }}
        className="arch-container" // Hook for custom css if needed, but we'll try to rely on matchMedia or inline styles.
      >
        {/* Left Column: Text */}
        <div
          ref={leftColRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 300px',
            zIndex: 2, // Ensure text is clickable
          }}
          className="arch__left"
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                height: '100vh',
                display: 'grid',
                placeItems: 'center',
                textAlign: dir === 'rtl' ? 'right' : 'left',
              }}
            >
              <div style={{ maxWidth: '360px' }}>
                <h2
                  style={{ fontSize: '42px', fontWeight: 800, margin: 0, letterSpacing: '-0.8px' }}
                >
                  {item.title}
                </h2>
                <p
                  style={{ fontSize: '18px', opacity: 0.8, margin: '16px 0 28px', lineHeight: 1.5 }}
                >
                  {item.description}
                </p>
                {item.linkText && (
                  <a
                    href={item.linkUrl || '#'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '16px 24px',
                      borderRadius: '40px',
                      backgroundColor: item.accentColor || '#000',
                      color: '#121212',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    {/* Use a simple arrow or generic icon */}
                    <span>{item.linkText}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Images */}
        <div
          ref={rightColRef}
          style={{
            flex: '1 1 500px',
            position: 'relative',
            height: '100vh',
            // On mobile this needs to be auto height, handled by CSS usually.
            // We'll trust the matchMedia logic mostly, but styling needs to be robust.
            // For the sake of this component, we assume desktop-first driven by the CodePen logic.
          }}
          className="arch__right"
        >
          {items.map((item, index) => (
            // Stack images. They must be absolute for the wipe effect to work layer-by-layer.
            // We reverse order visually using zIndex or DOM order.
            // The CodePen GSAP logic relies on them being accessible via .img-wrapper img
            <div
              key={item.id}
              className="img-wrapper"
              data-index={items.length - index} // Reverse z-index
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: 0,
                width: '100%',
                height: '400px',
                borderRadius: '16px',
                overflow: 'hidden',
                zIndex: items.length - index,
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Spacer at bottom */}
      <div style={{ height: '20vh' }} />
    </div>
  );
}
