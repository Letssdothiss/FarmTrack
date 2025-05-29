import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import MyAnimalsPage from '../../../src/components/layout/MyAnimalsPage.jsx';
import { fetchWithAuth } from '../../../src/utils/api';
import API_URL from '../../../src/config/api';

// Mock the required components
vi.mock('../../../src/components/layout/Background', () => ({
  default: ({ children }) => <div data-testid="background">{children}</div>
}));

vi.mock('../../../src/components/common/LogoutButton', () => ({
  default: () => <div data-testid="logout-button"><button>Logout</button></div>
}));

vi.mock('../../../src/components/common/DeleteAccountModal', () => ({
  default: ({ isOpen, onClose }) => (
    isOpen ? (
      <div data-testid="delete-account-modal">
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  )
}));

// Mock the API utilities
vi.mock('../../../src/utils/api', () => ({
  fetchWithAuth: vi.fn()
}));

vi.mock('../../../src/config/api', () => ({
  default: 'http://test-api-url'
}));

describe('MyAnimalsPage', () => {
  const mockUserData = {
    email: 'test@example.com',
    seNumber: '123456-7890',
    password: 'hashedPassword'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    fetchWithAuth.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUserData)
    });
  });

  it('renders basic components', async () => {
    render(<MyAnimalsPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('background')).toBeInTheDocument();
      expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    });
  });

  it('displays loading state initially', () => {
    render(<MyAnimalsPage />);
    expect(screen.getByText('Laddar...')).toBeInTheDocument();
  });

  it('loads and displays user data', async () => {
    render(<MyAnimalsPage />);

    await waitFor(() => {
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('123456-7890')).toBeInTheDocument();
    });

    expect(fetchWithAuth).toHaveBeenCalledWith(`${API_URL}/auth/profile`);
  });

  it('displays error message when loading fails', async () => {
    fetchWithAuth.mockRejectedValue(new Error('Failed to load'));

    render(<MyAnimalsPage />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load')).toBeInTheDocument();
    });
  });

  it('handles password update button click', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<MyAnimalsPage />);

    await waitFor(() => {
      expect(screen.getByText('Ändra lösenord')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Ändra lösenord'));
    expect(consoleSpy).toHaveBeenCalledWith('Ändra lösenord');
  });

  it('opens delete account modal when delete button is clicked', async () => {
    render(<MyAnimalsPage />);

    await waitFor(() => {
      expect(screen.getByText('Radera konto')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Radera konto'));
    expect(screen.getByTestId('delete-account-modal')).toBeInTheDocument();
  });

  it('displays "Inte angivet" when SE number is not provided', async () => {
    fetchWithAuth.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ...mockUserData, seNumber: '' })
    });

    render(<MyAnimalsPage />);

    await waitFor(() => {
      expect(screen.getByText('Inte angivet')).toBeInTheDocument();
    });
  });

  it('displays animal count section', async () => {
    render(<MyAnimalsPage />);

    await waitFor(() => {
      expect(screen.getByText('Antal djur')).toBeInTheDocument();
      expect(screen.getByText('Total:')).toBeInTheDocument();
      expect(screen.getByText('Nötkreatur:')).toBeInTheDocument();
      expect(screen.getByText('Get:')).toBeInTheDocument();
      expect(screen.getByText('Fjäderfä:')).toBeInTheDocument();
    });
  });
});
