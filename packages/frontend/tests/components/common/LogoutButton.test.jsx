import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import userEvent from '@testing-library/user-event';
import { vi, it, expect, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import LogoutButton from '../../../src/components/common/LogoutButton.jsx';
import { useNavigate } from 'react-router-dom';

// Mock react-router-dom before any tests run
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('LogoutButton', () => {
  let mockRemoveItem;

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Setup localStorage mock
    mockRemoveItem = vi.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        removeItem: mockRemoveItem
      }
    });
  });

  it('renders correctly with correct text', () => {
    render(<LogoutButton />);
    const button = screen.getByRole('button', { name: 'Logga ut' });
    expect(button).toBeInTheDocument();
  });

  it('correctly calls handleLogout when clicked', async () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(<LogoutButton />);
    const button = screen.getByRole('button', { name: 'Logga ut' });
    await userEvent.click(button);
    
    expect(mockRemoveItem).toHaveBeenCalledWith('token');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('correctly removes token from localStorage', async () => {
    render(<LogoutButton />);
    const button = screen.getByRole('button', { name: 'Logga ut' });
    await userEvent.click(button);
    
    expect(mockRemoveItem).toHaveBeenCalledWith('token');
  });

  it('correctly navigates to home page', async () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(<LogoutButton />);
    const button = screen.getByRole('button', { name: 'Logga ut' });
    await userEvent.click(button);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});