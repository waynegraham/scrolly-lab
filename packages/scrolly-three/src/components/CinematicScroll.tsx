import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// @see https://tympanus.net/Tutorials/Cinematic3DScroll/

gsap.registerPlugin(ScrollTrigger);

// --- Vertex Shader ---
// Calculates the position of vertices and passes UVs to the fragment shader.
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// --- Fragment Shader ---
// Maps the texture and applies a darkening effect based on rotation/depth.
// This gives the "cinematic" fade as items rotate away.
const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Simple vignette or fade logic could go here.
    // For now, we rely on the texture itself being loaded properly.
    // To make it truly cinematic, we'd need to pass in rotation uniforms 
    // to darken pixels based on world position, but for MVP we'll stick to 
    // basic texture mapping with lighting in the scene or simple opacity.
    
    gl_FragColor = texColor;
  }
`;


function ImagePlane({ src, index, total, radius }: { src: string, index: number, total: number, radius: number }) {
    const angle = (index / total) * Math.PI * 2;

    // Position on circle
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    // Rotate to face center (or outward)
    const rotationY = angle;

    return (
        <group position={[x, 0, z]} rotation={[0, rotationY, 0]}>
            {/* 
                Drei Image component creates a textured plane.
                - scale: [width, height, 1] or similar
                - url: source
                - transparent: defaults to false unless specified
                - toneMapped: defaults to false (preserves colors)
             */}
            <Image
                url={src}
                scale={[3, 2]}
                side={THREE.DoubleSide}
                transparent
            />
        </group>
    );
}


// --- Main Scene Component ---
export function CinematicScroll({ images }: { images: string[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // We need to access the Three.js scene rotation here.
        // Since the Canvas is isolated, we can't easily scrub it from outside 
        // without forwarding a ref or using a store.
        // 
        // STRATEGY: Use a proxy object for GSAP to animate, and update the scene inside useFrame.
        // However, for this MVP component, we will rely on internal controls + scroll sync.

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            onUpdate: (self) => {
                // Dispatch event or update global/context state for rotation
                // For direct access, we'll move the Logic Wrapper inside Canvas.
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} style={{ height: '300vh', background: '#000' }}>
            <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%' }}>
                <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
                    <Suspense fallback={null}>
                        <SceneController images={images} />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}

function SceneController({ images }: { images: string[] }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!groupRef.current) return;
        // Sync rotation with scroll
        // In a real app we'd use useScroll from @react-three/drei or pass the scroll progress
        const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const targetRotation = progress * Math.PI * 2; // Full rotation

        // Simple lerp for smoothness
        groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.05;
    });

    const radius = 5;

    return (
        <group ref={groupRef}>
            {images.map((src, i) => (
                <ImagePlane
                    key={i}
                    src={src}
                    index={i}
                    total={images.length}
                    radius={radius}
                />
            ))}
        </group>
    );
}
