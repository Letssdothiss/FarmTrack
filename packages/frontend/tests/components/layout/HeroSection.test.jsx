import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import HeroSection from '../../../src/components/layout/HeroSection.jsx';

// Mock the LargeRectangleButton component
vi.mock('../../../src/components/common/LargeRectangleButton', () => ({
  default: ({ text, to }) => <button data-testid={`button-${text}`} data-to={to}>{text}</button>
}));

// Mock the background image
vi.mock('../../../src/assets/FarmTrackLogo.png', () => ({
  default: 'mocked-logo-image.png'
}));

describe('HeroSection', () => {
  it('renders with background image', () => {
    render(<HeroSection />);
    
    const container = screen.getByTestId('hero-section');
    expect(container).toHaveStyle({
      backgroundImage: 'url(mocked-logo-image.png)',
      backgroundSize: 'cover',
      minHeight: '100vh',
      minWidth: '100vw'
    });
  });

  it('renders welcome text', () => {
    render(<HeroSection />);
    
    const welcomeText = screen.getByText(/Välkommen till din digitala gårdsjournal/i);
    expect(welcomeText).toBeInTheDocument();
    expect(welcomeText).toHaveTextContent('Logga in eller registrera dig för att komma igång');
  });

  it('renders login button with correct text and path', () => {
    render(<HeroSection />);
    
    const loginButton = screen.getByTestId('button-Logga in');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('data-to', '/login');
  });

  it('renders register button with correct text and path', () => {
    render(<HeroSection />);
    
    const registerButton = screen.getByTestId('button-Registrera nytt konto');
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toHaveAttribute('data-to', '/register');
  });
});
