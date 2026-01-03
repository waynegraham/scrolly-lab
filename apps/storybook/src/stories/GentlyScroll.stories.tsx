import type { Meta, StoryObj } from '@storybook/react';
import { GentlyScroll } from '@wsgrah/scrolly';

const meta: Meta<typeof GentlyScroll> = {
  title: 'Scrolly/GentlyScroll',
  component: GentlyScroll,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GentlyScroll>;

export const Default: Story = {
  args: {
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop',
    heroTitle: ['Gently', 'SCROLL', 'DOWN'],
    items: [
      {
        id: '1',
        title: ['Heart', 'SCARLET'],
        backgroundColor: '#8B0000',
        backgroundImage:
          'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1600&h=900&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop',
        ],
        accentColor: '#ffa6a6',
      },
      {
        id: '2',
        title: ['DREAM', 'Purple'],
        backgroundColor: '#4B0082',
        backgroundImage:
          'https://images.unsplash.com/photo-1557672199-6ab6caa0c3f7?w=1600&h=900&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop',
        ],
        accentColor: '#b3d3ff',
      },
      {
        id: '3',
        title: ['SHINE', 'Yellow'],
        backgroundColor: '#FFD700',
        backgroundImage:
          'https://images.unsplash.com/photo-1557672184-c8e149e9c4c0?w=1600&h=900&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop',
        ],
        accentColor: '#fff2b3',
      },
    ],
    footerImage:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&h=900&fit=crop',
    footerTitle: ['SCROLL', 'MISSION', 'COMPLETE'],
  },
};

export const TwoItems: Story = {
  args: {
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=900&fit=crop',
    heroTitle: ['Explore', 'THE', 'JOURNEY'],
    items: [
      {
        id: '1',
        title: ['Ocean', 'BLUE'],
        backgroundColor: '#000080',
        backgroundImage:
          'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&h=900&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
        ],
        accentColor: '#87CEEB',
      },
      {
        id: '2',
        title: ['Forest', 'GREEN'],
        backgroundColor: '#006400',
        backgroundImage:
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&h=900&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop',
        ],
        accentColor: '#90EE90',
      },
    ],
    footerImage:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop',
    footerTitle: ['END', 'OF', 'STORY'],
  },
};
