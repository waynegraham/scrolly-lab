import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

//@see https://codepen.io/moussamamadou/pen/XJWrMEx

gsap.registerPlugin(ScrollTrigger);

type LineAlign = 'left' | 'center' | 'right';

/** Per-line text model with optional alignment and color overrides. */
export interface GentlyScrollLine {
  text: string;
  align?: LineAlign;
  color?: string;
}

/** Props for the fixed reference button rendered in the corner. */
export interface GentlyScrollReferenceLink {
  href: string;
  label: string;
  highlight?: string;
  target?: string;
  rel?: string;
}

/** Simple nav link model for the fixed top bar. */
export interface GentlyScrollNavLink {
  href: string;
  label: string;
}

/** Content model for each scroll-driven work item. */
export interface GentlyScrollItem {
  id: string;
  title: Array<string | GentlyScrollLine>;
  backgroundColor: string;
  backgroundImage: string;
  images: string[];
  accentColor?: string;
}

/** Props for the GentlyScroll component layout and content. */
export interface GentlyScrollProps {
  heroImage: string;
  heroTitle: Array<string | GentlyScrollLine>;
  items: GentlyScrollItem[];
  footerImage?: string;
  footerTitle?: Array<string | GentlyScrollLine>;
  referenceLink?: GentlyScrollReferenceLink;
  navLinks?: GentlyScrollNavLink[];
  navLabel?: string;
}

/**
 * Scroll-driven hero/work/footer layout inspired by the CodePen demo.
 * Uses fixed layers, ghost spacers, and GSAP ScrollTrigger for timing.
 */
export function GentlyScroll({
  heroImage,
  heroTitle,
  items,
  footerImage,
  footerTitle,
  referenceLink,
  navLinks,
  navLabel = 'Primary',
}: GentlyScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLDivElement>(null);
  const workItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ghostItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const alignClassName = (align?: LineAlign) => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'left':
      default:
        return 'text-left';
    }
  };

  const normalizeLine = (line: string | GentlyScrollLine): GentlyScrollLine =>
    typeof line === 'string' ? { text: line } : line;

  useGSAP(
    () => {
      if (!workSectionRef.current) return;

      const workItems = workItemsRef.current.filter(Boolean) as HTMLDivElement[];
      const ghostItems = ghostItemsRef.current.filter(Boolean) as HTMLDivElement[];

      if (workItems.length === 0) return;

      // Initial setup for work items
      gsap.set(workItems, {
        position: 'fixed',
        top: '0',
        clipPath: 'inset(0 0% 0 100%)',
      });

      // Helper functions
      const getBaseScrollTrigger = (ghostItem: HTMLElement) => ({
        trigger: ghostItem,
        scrub: true,
        start: 'top bottom',
        end: '+200vh top',
      });

      const getImageInitialPosition = (index: number, imageIndex: number) => {
        const positions = {
          0: {
            scale: 0.8,
            y: index % 2 === 0 ? '175vh' : '-120vh',
            rotateZ: index % 2 === 0 ? '-5deg' : '5deg',
            zIndex: index % 2 === 0 ? '3' : '1',
          },
          1: {
            scale: 0.8,
            y: index % 2 === 0 ? '-225vh' : '300vh',
            zIndex: index % 2 === 0 ? '1' : '3',
            rotateZ: index % 2 === 0 ? '5deg' : '-5deg',
          },
          2: {
            scale: 0.8,
            y: index % 2 === 0 ? '300vh' : '-120vh',
            zIndex: index % 2 === 0 ? '3' : '3',
            rotateZ: index % 2 === 0 ? '5deg' : '5deg',
          },
          3: {
            scale: 0.8,
            y: index % 2 === 0 ? '-100vh' : '175vh',
            zIndex: index % 2 === 0 ? '1' : '1',
            rotateZ: index % 2 === 0 ? '-5deg' : '-5deg',
          },
        };
        return positions[imageIndex as keyof typeof positions] || positions[0];
      };

      const getImageFinalPosition = (index: number, imageIndex: number) => ({
        scale: 1,
        y:
          index % 2 === 0
            ? imageIndex % 2 === 0
              ? '2vh'
              : '-2vh'
            : imageIndex % 2 === 0
              ? '-2vh'
              : '2vh',
        rotateZ:
          index % 2 === 0
            ? imageIndex % 2 === 0
              ? '2.5deg'
              : '-2.5deg'
            : imageIndex % 2 === 0
              ? '-2.5deg'
              : '2.5deg',
      });

      // Process each work item
      workItems.forEach((element, index) => {
        const ghostItem = ghostItems[index];
        if (!ghostItem) {
          return;
        }
        const lines = element.querySelectorAll('[data-line]');
        const itemBackground = element.querySelector('[data-work="item-background"]');
        const itemContainer = element.querySelector('[data-work="item-container"]');
        const itemOverlay = element.querySelectorAll('[data-work="item-overlay"]');
        const itemImages = gsap.utils.toArray(
          element.querySelectorAll('[data-work="item-image"]')
        ) as HTMLElement[];

        // Initial states
        gsap.set(itemBackground, { scale: 1.2 });
        gsap.set(itemContainer, { xPercent: 40 });

        // Base animations
        gsap.to(element, {
          clipPath: 'inset(0 0 0 0%)',
          scrollTrigger: getBaseScrollTrigger(ghostItem),
        });
        gsap.to(itemContainer, {
          xPercent: 0,
          scrollTrigger: getBaseScrollTrigger(ghostItem),
        });
        gsap.to(itemBackground, {
          scale: 1,
          scrollTrigger: getBaseScrollTrigger(ghostItem),
        });

        // Text animations
        [0, 1].forEach((i) => {
          if (lines[i]) {
            gsap.set(lines[i], {
              zIndex: 2,
              opacity: 0.9,
            });
            gsap.from(lines[i], {
              opacity: i === 0 ? 0.95 : 0.5,
              yPercent: i === 0 ? 125 : -125,
              ease: 'power2.inOut',
              duration: 1.25,
              scrollTrigger: {
                trigger: ghostItem,
                scrub: true,
                start: '-25% top',
                end: '15% top',
                toggleActions: 'play reverse restart reverse',
              },
            });
          }
        });

        // Image animations
        itemImages.forEach((image, imageIndex) => {
          gsap.set(image, getImageInitialPosition(index, imageIndex));
          gsap.to(image, {
            ...getImageFinalPosition(index, imageIndex),
            scrollTrigger: {
              trigger: ghostItem,
              scrub: true,
              start: '5% top',
              end: '50% top',
            },
          });
        });

        // Background and final animations
        gsap.to(itemBackground, {
          filter: 'brightness(0.2) blur(7.5px)',
          scrollTrigger: {
            trigger: ghostItem,
            scrub: true,
            start: '20% top',
            end: '55% top',
          },
        });

        gsap.to(element, {
          xPercent: index === workItems.length - 1 ? 0 : -40,
          yPercent: index === workItems.length - 1 ? -40 : 0,
          scrollTrigger: {
            trigger: ghostItem,
            scrub: true,
            start: '100% bottom',
            toggleActions: 'play reverse play reverse',
          },
        });

        gsap.to(itemOverlay, {
          opacity: 0.85,
          scrollTrigger: {
            trigger: ghostItem,
            scrub: true,
            start: '100% bottom',
            toggleActions: 'play reverse play reverse',
          },
        });
      });
    },
    { scope: containerRef, dependencies: [items] }
  );

  return (
    <div ref={containerRef} className="bg-[#001] text-white overflow-x-hidden">
      {referenceLink && (
        <a
          href={referenceLink.href}
          target={referenceLink.target ?? '_blank'}
          rel={referenceLink.rel ?? 'noreferrer noopener'}
          className="fixed bottom-2 left-2 z-20 flex items-baseline gap-1 rounded border border-[#e1e1e1] bg-white/90 px-3 py-2 font-mono text-[0.8rem] leading-none text-[#252525] backdrop-blur-[12px] no-underline"
        >
          <span>{referenceLink.label}</span>
          {referenceLink.highlight && <strong>{referenceLink.highlight}</strong>}
        </a>
      )}

      {navLinks && navLinks.length > 0 && (
        <nav aria-label={navLabel} className="fixed inset-x-0 top-0 z-[9999]">
          <div className="relative flex w-full items-center justify-center px-[4vw] pb-5 pt-4">
            <div className="relative flex w-full items-center justify-between">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white font-mono text-xl no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 h-px w-[calc(100%-2rem)] -translate-x-1/2 bg-white/30"
            />
          </div>
        </nav>
      )}

      {/* Hero Section */}
      <section className="sticky top-0 bg-black">
        <div className="relative flex h-screen w-[99vw] items-end justify-between">
          <div className="absolute inset-0 h-full w-full">
            <img
              src={heroImage}
              alt=""
              className="h-full w-full object-cover brightness-[.55]"
              loading="lazy"
            />
          </div>
          <div className="relative flex h-screen w-full flex-col justify-between px-[3.5vw] pb-10 pt-20 text-[12vw] font-normal uppercase leading-none">
            {heroTitle.map((entry, index) => {
              const line = normalizeLine(entry);
              const align = line.align ?? (index === 1 ? 'center' : index === 2 ? 'right' : 'left');
              return (
                <div key={index} className="overflow-hidden">
                  <div
                    className={`${alignClassName(align)} relative`}
                    style={{ color: line.color }}
                  >
                    {line.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section ref={workSectionRef} className="relative" data-work="section">
        <div className="relative">
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                workItemsRef.current[index] = el;
              }}
              className="relative flex h-screen w-screen items-stretch overflow-hidden bg-black"
              data-work="item"
            >
              <div className="relative flex h-full w-full" data-work="item-container">
                <div
                  className="absolute inset-0 h-full w-full aspect-[16/9]"
                  data-work="item-background"
                  style={{ backgroundColor: item.backgroundColor }}
                >
                  <img
                    src={item.backgroundImage}
                    loading="lazy"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="relative flex w-full flex-1 flex-col items-stretch justify-around px-[4vw] pb-10 pt-20">
                  <div className="absolute inset-y-0 left-0 flex w-full items-center justify-center">
                    {item.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative h-full w-[21vw] max-md:w-[15vw]"
                        data-work="item-image"
                      >
                        <div className="absolute left-1/2 top-1/2 aspect-[4/5] w-[25vw] -translate-x-1/2 -translate-y-1/2 bg-white/75 p-[0.35em]">
                          <img
                            src={image}
                            loading="lazy"
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="relative flex w-full flex-1 items-center justify-between max-[479px]:flex-col max-[479px]:items-start max-[479px]:gap-8">
                    <div className="relative flex h-full flex-1 flex-col items-stretch justify-between text-[12.5vw] font-normal uppercase leading-none tracking-[0.5rem]">
                      {item.title.map((entry, titleIndex) => {
                        const line = normalizeLine(entry);
                        const align = line.align ?? (titleIndex === 1 ? 'right' : 'left');
                        const color =
                          line.color ?? (titleIndex === 1 ? item.accentColor : undefined);
                        return (
                          <div key={titleIndex} className="overflow-hidden">
                            <div
                              className={`${alignClassName(align)} relative`}
                              data-line
                              style={{ color, willChange: 'transform' }}
                            >
                              {line.text}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute inset-0 z-[99] h-[105%] w-[105%] bg-black opacity-0"
                  data-work="item-overlay"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Ghost Container */}
        <div className="relative">
          {items.map((item, index) => (
            <div
              key={`ghost-${item.id}`}
              ref={(el) => {
                ghostItemsRef.current[index] = el;
              }}
              className="h-[300vh] w-full"
            />
          ))}
        </div>
      </section>

      {/* Footer Section */}
      {footerImage && footerTitle && (
        <section className="sticky top-0 relative z-[1] bg-black">
          <div className="relative flex h-screen w-[99vw] items-end justify-between">
            <div className="absolute inset-0 h-full w-full">
              <img
                src={footerImage}
                loading="lazy"
                alt=""
                className="h-full w-full object-cover opacity-60"
              />
            </div>
            <div className="relative flex h-full w-full flex-col items-stretch justify-between px-[3.5vw] pb-10 pt-20 text-[11.5vw] font-normal uppercase leading-none tracking-[0.5rem] max-[479px]:text-[12.5vw]">
              {footerTitle.map((entry, index) => {
                const line = normalizeLine(entry);
                const align =
                  line.align ?? (index === 1 ? 'center' : index === 2 ? 'right' : 'left');
                return (
                  <div key={index} className="overflow-hidden">
                    <div
                      className={`${alignClassName(align)} relative`}
                      style={{ color: line.color }}
                    >
                      {line.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
