import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import Register from '../../../src/pages/register/Register';

// Mock the RegisterForm component
vi.mock('../../../src/components/layout/RegisterForm', () => ({
  default: () => (
    <div data-testid="register-form">
      <h1>Registrera dig</h1>
    </div>
  )
}));

describe('Register', () => {
  it('renders correctly', () => {
    render(<Register />);

    // Check if RegisterForm is rendered
    const registerForm = screen.getByTestId('register-form');
    expect(registerForm).toBeInTheDocument();

    // Check if title is rendered
    expect(screen.getByText('Registrera dig')).toBeInTheDocument();
  });
});
