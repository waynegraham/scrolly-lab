import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|mdx)', '../src/**/*.mdx'],
  addons: ['@storybook/addon-docs'],
  staticDirs: ['../public'],
};

export default config;
