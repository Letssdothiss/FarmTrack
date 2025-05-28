import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import Background from '../../../src/components/layout/Background.jsx';

// Mock the GoBackButton component
vi.mock('../../../src/components/common/GoBackButton', () => ({
  default: ({ to }) => <button data-testid="go-back-button" data-to={to}>Go Back</button>
}));

// Mock the background image
vi.mock('../../../src/assets/FarmTrackBcg.png', () => ({
  default: 'mocked-background-image.png'
}));

describe('Background', () => {
  it('renders with background image and default props', () => {
    render(
      <Background>
        <div>Test Content</div>
      </Background>
    );

    const container = screen.getByTestId('background-container');
    expect(container).toHaveStyle({
      backgroundImage: 'url(mocked-background-image.png)',
      backgroundSize: 'cover',
      minHeight: '100vh',
      minWidth: '100vw'
    });
  });

  it('renders back button by default', () => {
    render(
      <Background>
        <div>Test Content</div>
      </Background>
    );

    const backButton = screen.getByTestId('go-back-button');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('data-to', '/');
  });

  it('renders back button with custom path', () => {
    render(
      <Background backTo="/custom-path">
        <div>Test Content</div>
      </Background>
    );

    const backButton = screen.getByTestId('go-back-button');
    expect(backButton).toHaveAttribute('data-to', '/custom-path');
  });

  it('does not render back button when showBackButton is false', () => {
    render(
      <Background showBackButton={false}>
        <div>Test Content</div>
      </Background>
    );

    const backButton = screen.queryByTestId('go-back-button');
    expect(backButton).not.toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Background>
        <div data-testid="test-content">Test Content</div>
      </Background>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
