import type { Meta, StoryObj } from '@storybook/react';
import { ScrollReveal } from '@waynegraham/scrolly';

const meta: Meta<typeof ScrollReveal> = {
    title: 'Scrolly/ScrollReveal',
    component: ScrollReveal,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        fromOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
        toOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
        overlayColor: { control: 'color' },
    },
};

export default meta;
type Story = StoryObj<typeof ScrollReveal>;

const ImageContent = () => (
    <img
        src="https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        alt="Desert Landscape"
        style={{ width: '100%', display: 'block', height: 'auto', minHeight: '600px', objectFit: 'cover' }}
    />
);

export const Default: Story = {
    args: {
        children: <ImageContent />,
        fromOpacity: 0.8,
        toOpacity: 0,
        overlayColor: 'black',
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '100vh', paddingBottom: '100vh', background: '#f0f0f0' }}>
                <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem', fontFamily: 'sans-serif' }}>
                    Scroll down to reveal the image
                </p>
                <Story />
                <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.5rem', fontFamily: 'sans-serif' }}>
                    Keep scrolling to darken it again
                </p>
            </div>
        ),
    ],
};

export const CustomColor: Story = {
    args: {
        children: <ImageContent />,
        fromOpacity: 1,
        toOpacity: 0.2,
        overlayColor: '#1a237e', // Deep Blue
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '100vh', paddingBottom: '100vh', background: '#ffffff' }}>
                <Story />
            </div>
        ),
    ],
};
