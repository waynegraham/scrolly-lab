import type { Meta, StoryObj } from '@storybook/react';
import { ImageMaskReveal } from '@waynegraham/scrolly';

const meta: Meta<typeof ImageMaskReveal> = {
    title: 'Scrolly/ImageMaskReveal',
    component: ImageMaskReveal,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImageMaskReveal>;

const ITEMS = [
    {
        id: 'green',
        title: 'Green Cityscape',
        description: 'Vibrant streets with vertical gardens and solar buildings. This oasis thrives on renewable energy, smart transport, and green spaces for biodiversity.',
        image: 'https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/cu8978xjlsjjpjk52ta0.webp',
        backgroundColor: '#EDF9FF',
        accentColor: '#D5FF37',
        linkText: 'Learn More',
    },
    {
        id: 'blue',
        title: 'Blue Urban Oasis',
        description: 'Avenues with azure facades and eco-structures. This hub uses clean energy, smart transit, and parks for urban wildlife.',
        image: 'https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/trh7c8ufv1dqfrofdytd.webp',
        backgroundColor: '#FFECF2',
        accentColor: '#7DD6FF',
        linkText: 'Discover',
    },
    {
        id: 'pink',
        title: 'Fluid Architecture',
        description: 'Desert refuge with fluid architecture and glowing interiors. This sanctuary harnesses solar power, sustainable design, and natural harmony.',
        image: 'https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/aw6qwur0pggp5r03whjq.webp',
        backgroundColor: '#FFE8DB',
        accentColor: '#FFA0B0',
        linkText: 'Explore',
    },
    {
        id: 'orange',
        title: 'Martian Arches',
        description: 'Ethereal structures arc over tranquil waters, bathed in the glow of a setting Martian sun. This desolate beauty showcases the stark landscapes.',
        image: 'https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/sqwn8u84zd1besgl0zpd.webp',
        backgroundColor: '#F0F0F0',
        accentColor: '#FFA17B',
        linkText: 'Visit Mars',
    },
];

export const Architecture: Story = {
    args: {
        items: ITEMS,
    },
};

export const RTL_Example: Story = {
    args: {
        dir: 'rtl',
        items: [
            {
                id: '1',
                title: 'واحة خضراء',
                description: 'شوارع نابضة بالحياة مع حدائق عمودية ومباني شمسية. تزدهر هذه الواحة بالطاقة المتجددة والنقل الذكي.',
                image: ITEMS[0].image,
                backgroundColor: '#EDF9FF',
                accentColor: '#D5FF37',
                linkText: 'اقرأ المزيد',
            },
            {
                id: '2',
                title: 'العمارة السائلة',
                description: 'ملاذ صحراوي يتميز بهندسة معمارية سائلة وتصميمات داخلية متوهجة. يستغل هذا الملاذ الطاقة الشمسية والتصميم المستدام.',
                image: ITEMS[2].image,
                backgroundColor: '#FFECF2',
                accentColor: '#FFA0B0',
                linkText: 'اكتشف',
            },
        ],
    },
};
