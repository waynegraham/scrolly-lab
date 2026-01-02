import type { Meta, StoryObj } from '@storybook/react';
import { CardParallaxReveal } from '@waynegraham/scrolly';

const meta: Meta<typeof CardParallaxReveal> = {
    title: 'Scrolly/CardParallaxReveal',
    component: CardParallaxReveal,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CardParallaxReveal>;

const ITEMS = [
    {
        id: '1',
        title: 'Neon Heights',
        description: 'A futuristic exploration of light and shadow in urban environments.',
        image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2000',
        video: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=600',
        metadata: [
            { label: 'Year', value: '2024' },
            { label: 'Location', value: 'Tokyo' }
        ]
    },
    {
        id: '2',
        title: 'Desert Mirage',
        description: 'Vast landscapes where silence speaks louder than words.',
        image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2000',
        video: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=600',
        metadata: [
            { label: 'Year', value: '2023' },
            { label: 'Location', value: 'Sahara' }
        ]
    },
    {
        id: '3',
        title: 'Ocean Deep',
        description: 'Diving into the unknown depths of the blue planet.',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000',
        video: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600',
        metadata: [
            { label: 'Year', value: '2022' },
            { label: 'Location', value: 'Pacific' }
        ]
    },
    {
        id: '4',
        title: 'Urban Jungle',
        description: 'Concrete structures meeting nature in unexpected ways.',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000',
        // No video test
        metadata: [
            { label: 'Year', value: '2021' },
            { label: 'Location', value: 'New York' }
        ]
    }
];

export const Construction: Story = {
    args: {
        items: ITEMS,
    },
};
