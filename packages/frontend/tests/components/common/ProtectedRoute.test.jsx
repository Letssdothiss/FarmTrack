import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import ProtectedRoute from '../../../src/components/common/ProtectedRoute.jsx';

// Mock Navigate component
const MockNavigate = vi.fn(() => null);
vi.mock('react-router-dom', () => ({
  Navigate: (props) => {
    MockNavigate(props);
    return null;
  }
}));

describe('ProtectedRoute', () => {
  const mockLocalStorage = {
    getItem: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
  });

  it('renders children when user is authenticated', () => {
    mockLocalStorage.getItem.mockReturnValue('valid-token');

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(MockNavigate).not.toHaveBeenCalled();
  });

  it('redirects to login when user is not authenticated', () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(MockNavigate).toHaveBeenCalledWith({ to: '/login', replace: true });
  });

  it('checks localStorage for token on mount', () => {
    mockLocalStorage.getItem.mockReturnValue('valid-token');

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('token');
  });
});
