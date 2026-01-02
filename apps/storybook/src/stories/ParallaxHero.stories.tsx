import type { Meta, StoryObj } from '@storybook/react';
import { ParallaxHero } from '@waynegraham/scrolly';

const meta: Meta<typeof ParallaxHero> = {
    title: 'Scrolly/ParallaxHero',
    component: ParallaxHero,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        speed: {
            control: { type: 'range', min: -1, max: 2, step: 0.1 },
            description: 'Parallax speed factor (0 = no movement, 1 = fixed, < 1 = slower than scroll)',
            table: {
                defaultValue: { summary: '0.5' },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof ParallaxHero>;

const SampleContent = ({ title, text }: { title: string; text: string }) => (
    <div style={{
        color: 'white',
        textAlign: 'center',
        padding: '2rem',
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '1rem',
        maxWidth: '800px',
        margin: '0 auto'
    }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>{title}</h1>
        <p style={{ fontSize: '1.5rem', lineHeight: 1.6 }}>{text}</p>
    </div>
);

export const English: Story = {
    args: {
        backgroundImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        height: '100vh',
        dir: 'ltr',
        children: (
            <SampleContent
                title="Parallax Scrolling"
                text="Experience the depth of the web with smooth parallax effects. As you scroll, the background moves at a different speed, creating a stunning 3D feel."
            />
        ),
    },
    decorators: [
        (Story) => (
            <div style={{ height: '200vh' }}>
                <Story />
                <div style={{ padding: '4rem', background: '#fff', color: '#333' }}>
                    <h2>Scroll down to see the effect</h2>
                    <p>This content is below the fold.</p>
                </div>
            </div>
        ),
    ],
};

export const Arabic: Story = {
    args: {
        // Desert landscape
        backgroundImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80',

        height: '100vh',
        dir: 'rtl',

        children: (
            <SampleContent
                title="التمرير المتوازي"
                text="جرب عمق الويب مع تأثيرات التمرير المتوازي السلسة. أثناء التمرير، تتحرك الخلفية بسرعة مختلفة، مما يخلق شعوراً ثلاثي الأبعاد مذهلاً."
            />
        ),

        speed: 0.9
    },
    decorators: [
        (Story) => (
            <div style={{ height: '200vh', direction: 'rtl', fontFamily: 'Tahoma, sans-serif' }}>
                <Story />
                <div style={{ padding: '4rem', background: '#fff', color: '#333' }}>
                    <h2>قم بالتمرير لرؤية التأثير</h2>
                    <p>هذا المحتوى أسفل الجزء المرئي.</p>
                </div>
            </div>
        ),
    ],
};
