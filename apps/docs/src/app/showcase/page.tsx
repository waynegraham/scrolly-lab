"use client";

import { ParallaxHero, ImageMaskReveal, CardParallaxReveal } from "@wsgrah/scrolly";
// Note: CinematicScroll is in scrolly-three, need to import from there or ensure it's exported if moved.
// Based on previous work, CinematicScroll is in @wsgrah/scrolly-three.
import { CinematicScroll } from "@wsgrah/scrolly-three";

export default function ShowcasePage() {
    return (
        <main>
            {/* 1. Parallax Hero */}
            <section style={{ height: '100vh', position: 'relative' }}>
                <ParallaxHero
                    backgroundImage="/images/1.jpg"
                    speed={0.5}
                >
                    <div style={{ textAlign: 'center', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', margin: 0, fontWeight: 800 }}>Scrolly Showcase</h1>
                        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', opacity: 0.9 }}>Interactive Component Gallery</p>
                    </div>
                </ParallaxHero>
            </section>

            {/* 2. Intro Text */}
            <div style={{ padding: '4rem 2rem', background: '#111', color: '#fff', textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Explore the Interactions</h2>
                <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.25rem', opacity: 0.8 }}>
                    Scroll down to experience the pinned reveals, 3D carousels, and stacked card effects built with GSAP and React Three Fiber.
                </p>
            </div>

            {/* 3. Image Mask Reveal (Architecture Demo) */}
            <section style={{ minHeight: '100vh' }}>
                <ImageMaskReveal
                    items={[
                        {
                            id: '1',
                            title: 'Modern Structure',
                            description: 'Clean lines and geometric harmony define this architectural masterpiece.',
                            image: '/images/1.jpg',
                            backgroundColor: '#2F4858'
                        },
                        {
                            id: '2',
                            title: 'Urban Flow',
                            description: 'Integrating nature within the density of the city.',
                            image: '/images/2.jpg',
                            backgroundColor: '#33658A'
                        },
                        {
                            id: '3',
                            title: 'Light and Shadow',
                            description: 'Playing with natural light to create dynamic interior spaces.',
                            image: '/images/3.jpg',
                            backgroundColor: '#86BBD8'
                        }
                    ]}
                />
            </section>

            {/* Spacer */}
            <div style={{ height: '20vh', background: '#000' }}></div>

            {/* 4. Cinematic 3D Scroll */}
            <section style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10, color: '#fff' }}>
                    <h2 style={{ fontSize: '2rem' }}>3D Carousel</h2>
                    <p>Scroll to rotate</p>
                </div>
                <CinematicScroll
                    images={[
                        '/images/1.jpg',
                        '/images/2.jpg',
                        '/images/3.jpg',
                        '/images/1.jpg',
                        '/images/2.jpg',
                        '/images/3.jpg'
                    ]}
                />
            </section>

            {/* Spacer */}
            <div style={{ height: '20vh', background: '#000' }}></div>

            {/* 5. Card Parallax Reveal */}
            <section>
                <CardParallaxReveal
                    items={[
                        {
                            id: 'c1',
                            title: 'Neon Nights',
                            description: 'Vibrant cityscapes that come alive after dark.',
                            image: '/images/1.jpg',
                            metadata: [{ label: 'Year', value: '2024' }]
                        },
                        {
                            id: 'c2',
                            title: 'Tranquil Waters',
                            description: 'The calming power of the ocean depths.',
                            image: '/images/2.jpg',
                            metadata: [{ label: 'Year', value: '2023' }]
                        },
                        {
                            id: 'c3',
                            title: 'Urban Exploration',
                            description: 'Discovering hidden gems in the concrete jungle.',
                            image: '/images/3.jpg',
                            metadata: [{ label: 'Year', value: '2025' }]
                        }
                    ]}
                />
            </section>

            <div style={{ height: '50vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <h2>End of Showcase</h2>
            </div>
        </main>
    );
}
