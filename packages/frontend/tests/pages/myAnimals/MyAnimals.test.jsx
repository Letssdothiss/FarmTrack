import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import MyAnimals from '../../../src/pages/myAnimals/MyAnimals';

// Mock the MyAnimalsPage component
vi.mock('../../../src/components/layout/MyAnimalsPage', () => ({
  default: () => (
    <div data-testid="my-animals-page">
      <h1>Mina djur</h1>
    </div>
  )
}));

describe('MyAnimals', () => {
  it('renders correctly', () => {
    render(<MyAnimals />);

    // Check if MyAnimalsPage is rendered
    const myAnimalsPage = screen.getByTestId('my-animals-page');
    expect(myAnimalsPage).toBeInTheDocument();

    // Check if title is rendered
    expect(screen.getByText('Mina djur')).toBeInTheDocument();
  });
}); 