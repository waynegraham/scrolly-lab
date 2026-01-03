import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ParallaxHero } from '../ParallaxHero';

describe('ParallaxHero', () => {
  it('renders children', () => {
    const { getByText } = render(
      <ParallaxHero backgroundImage="/test.jpg">
        <div>Test Content</div>
      </ParallaxHero>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
