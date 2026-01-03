import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PinnedStage, SplitTextLite } from '@wsgrah/scrolly';

const meta: Meta<typeof PinnedStage> = {
  title: 'Scrolly/PinnedStage',
  component: PinnedStage,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof PinnedStage>;

export const Basic: Story = {
  render: () => (
    <div style={{ height: '300vh', padding: 40 }}>
      <PinnedStage className="pinned" stageClassName="stage">
        <h1 style={{ fontSize: 48 }}>
          <SplitTextLite text="Scroll-driven drama" mode="chars" />
        </h1>
        <p>Pin + scrub demo</p>
      </PinnedStage>
      <div style={{ marginTop: 1200 }}>Keep scrolling</div>
    </div>
  ),
};
