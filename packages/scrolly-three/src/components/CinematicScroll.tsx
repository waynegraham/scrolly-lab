import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
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

interface CylinderCarouselProps {
    images: string[];
}

function CylinderCarousel({ images }: CylinderCarouselProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const textures = useTexture(images);
    const { viewport } = useThree();

    // Create a single large canvas texture from the input images
    // This mimics the OGL data-texture approach but simplifies it for Three.js
    const combinedTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const width = 1024;
        const height = 1024; // Aspect ratio per image slot
        const cols = images.length;

        canvas.width = width * cols;
        canvas.height = height;

        if (ctx) {
            images.forEach((_, i) => {
                // For now, we'll just stripe colors or assume textures load.
                // However, useTexture returns actual Texture objects.
                // Mapping multiple textures to a cylinder requires strictly mapping UVs 
                // or generating a sprite-sheet. 
                // SIMPLIFICATION: We will create multiple mesh segments instead of one giant texture for stability.
            });
        }
        return new THREE.CanvasTexture(canvas);
    }, [images]);

    // Alternative Approach: Render multiple planes arranged in a cylinder
    // This is easier to manage in Three.js than a custom single-geometry shader for simple image lists.
    const radius = 6;
    const angleStep = (Math.PI * 2) / images.length;

    return (
        <group ref={meshRef}>
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

function ImagePlane({ src, index, total, radius }: { src: string, index: number, total: number, radius: number }) {
    const texture = useTexture(src);
    const angle = (index / total) * Math.PI * 2;

    // Position on circle
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    // Rotate to face center (or outward)
    const rotationY = angle;

    return (
        <mesh position={[x, 0, z]} rotation={[0, rotationY, 0]}>
            <planeGeometry args={[3, 2]} />
            <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
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
