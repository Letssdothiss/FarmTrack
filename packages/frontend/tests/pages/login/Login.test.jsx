import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import Login from '../../../src/pages/login/Login';

// Mock the LoginForm component
vi.mock('../../../src/components/layout/LoginForm', () => ({
  default: () => (
    <div data-testid="login-form">
      <h1>Logga in</h1>
    </div>
  )
}));

describe('Login', () => {
  it('renders correctly', () => {
    render(<Login />);

    // Check if LoginForm is rendered
    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();

    // Check if title is rendered
    expect(screen.getByText('Logga in')).toBeInTheDocument();
  });
});
