import type { Meta, StoryObj } from '@storybook/react';
import { CinematicScroll } from '@waynegraham/scrolly-three';

const meta: Meta<typeof CinematicScroll> = {
    title: 'Scrolly Three/CinematicScroll',
    component: CinematicScroll,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CinematicScroll>;

const IMAGES = [
    '/images/abdulrhman-alkhnaifer-kUANvJwGN4M-unsplash.jpg',
    '/images/jeff-jewiss-XqGQCsiAjaI-unsplash.jpg',
    '/images/the-cleveland-museum-of-art-Hsyhjjr4mKo-unsplash.jpg',
    '/images/koushik-chowdavarapu-aWBPk_GBaCk-unsplash.jpg',
    '/images/m-k-R1gC_gJaJ14-unsplash.jpg',
    '/images/datingscout-ObX4P3nBKSM-unsplash.jpg',
];

export const Default: Story = {
    args: {
        images: IMAGES,
    },
};
