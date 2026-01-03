# @wsgrah/scrolly-three

React Three Fiber scroll-driven 3D animation components.

## Install

```bash
pnpm add @wsgrah/scrolly-three three @react-three/fiber @react-three/drei gsap @gsap/react react react-dom
```

## Usage

```tsx
import { CinematicScroll } from '@wsgrah/scrolly-three';

export function Gallery() {
  return <CinematicScroll images={['/img/one.jpg', '/img/two.jpg', '/img/three.jpg']} />;
}
```

## Components

- `CinematicScroll` - rotating image carousel synced to scroll progress.

## Hooks

- `useScrollProgress` - helper for reading scroll progress.

## Notes

- Uses WebGL; ensure the component runs on the client.
- Provide your own layout styles around the canvas container.

## License

MIT
