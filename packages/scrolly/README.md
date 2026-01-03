# @wsgrah/scrolly

React scroll-driven animation components powered by GSAP.

## Install

```bash
pnpm add @wsgrah/scrolly gsap @gsap/react react react-dom
```

## Usage

```tsx
import { ParallaxHero, ScrollReveal } from '@wsgrah/scrolly';

export function Page() {
  return (
    <>
      <ParallaxHero backgroundImage="/hero.jpg" speed={0.5}>
        <h1>Welcome</h1>
      </ParallaxHero>

      <ScrollReveal fromOpacity={0.8} toOpacity={0}>
        <section style={{ minHeight: '100vh' }}>
          <h2>Scroll to reveal</h2>
        </section>
      </ScrollReveal>
    </>
  );
}
```

## Components

- `ParallaxHero` - full-width hero with scroll-synced background movement.
- `ScrollReveal` - overlay fade-in/out based on scroll position.
- `GentlyScroll` - multi-section hero/work/footer layout with animated cards.
- `ImageMaskReveal` - split layout with masked image transitions.
- `CardParallaxReveal` - stacked cards with clip-path reveals and optional video panels.
- `PinnedStage` - pinned stage driven by a shared ScrollTrigger timeline.

## Utilities

- `ensureGSAP` - registers ScrollTrigger/Flip plugins in a safe, shared spot.
- `useScrollTimeline` - hook for building ScrollTrigger-driven timelines.
- `SplitTextLite` - lightweight text splitting utility.

## Notes

- These components rely on DOM APIs and should run on the client.
- Provide your own CSS or Tailwind utilities for layout and typography.

## License

MIT
