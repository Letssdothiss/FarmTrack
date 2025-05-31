import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import Home from '../../../src/pages/home/Home';

// Mock the HeroSection component
vi.mock('../../../src/components/layout/HeroSection', () => ({
  default: () => (
    <div data-testid="hero-section">
      <h1>Välkommen till FarmTrack</h1>
    </div>
  )
}));

describe('Home', () => {
  it('renders correctly', () => {
    render(<Home />);

    // Check if HeroSection is rendered
    const heroSection = screen.getByTestId('hero-section');
    expect(heroSection).toBeInTheDocument();

    // Check if welcome text is rendered
    expect(screen.getByText('Välkommen till FarmTrack')).toBeInTheDocument();
  });
});
