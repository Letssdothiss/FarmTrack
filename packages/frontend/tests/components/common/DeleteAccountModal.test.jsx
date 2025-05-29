import React from 'react';
import { render, screen, waitFor } from '../../../tests/utils/testSetup';
import userEvent from '@testing-library/user-event';
import { vi, it, expect, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import DeleteAccountModal from '../../../src/components/common/DeleteAccountModal.jsx';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

// Mock the API module
vi.mock('../../../src/utils/api', () => ({
  fetchWithAuth: vi.fn()
}));

// Import the mocked fetchWithAuth
import { fetchWithAuth } from '../../../src/utils/api';

describe('DeleteAccountModal', () => {
  const mockNavigate = vi.fn();
  const mockLocalStorage = {
    removeItem: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <DeleteAccountModal isOpen={false} onClose={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders modal with form when isOpen is true', () => {
    render(<DeleteAccountModal isOpen={true} onClose={() => {}} />);
    
    expect(screen.getByRole('heading', { name: 'Radera konto' })).toBeInTheDocument();
    expect(screen.getByText(/Detta kommer att permanent radera ditt konto/)).toBeInTheDocument();
    expect(screen.getByLabelText('Bekräfta med ditt lösenord')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Radera konto' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Avbryt' })).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', async () => {
    const handleClose = vi.fn();
    render(<DeleteAccountModal isOpen={true} onClose={handleClose} />);
    
    const cancelButton = screen.getByRole('button', { name: 'Avbryt' });
    await userEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('shows error message when deletion fails', async () => {
    const errorMessage = 'Felaktigt lösenord';
    fetchWithAuth.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: errorMessage })
    });
    
    render(<DeleteAccountModal isOpen={true} onClose={() => {}} />);
    
    const passwordInput = screen.getByLabelText('Bekräfta med ditt lösenord');
    const submitButton = screen.getByRole('button', { name: 'Radera konto' });

    await userEvent.type(passwordInput, 'wrongpassword');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('shows loading state during deletion', async () => {
    fetchWithAuth.mockImplementationOnce(() => 
      new Promise(resolve => 
        setTimeout(() => 
          resolve({
            ok: true,
            json: () => Promise.resolve({ message: 'Konto raderat' })
          }), 
          100
        )
      )
    );
    
    render(<DeleteAccountModal isOpen={true} onClose={() => {}} />);
    
    const passwordInput = screen.getByLabelText('Bekräfta med ditt lösenord');
    const submitButton = screen.getByRole('button', { name: 'Radera konto' });

    await userEvent.type(passwordInput, 'correctpassword');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toHaveTextContent('Raderar...');
      expect(submitButton).toBeDisabled();
    });
  });

  it('clears localStorage and navigates to login on successful deletion', async () => {
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Konto raderat' })
    });
    
    render(<DeleteAccountModal isOpen={true} onClose={() => {}} />);
    
    const passwordInput = screen.getByLabelText('Bekräfta med ditt lösenord');
    const submitButton = screen.getByRole('button', { name: 'Radera konto' });

    await userEvent.type(passwordInput, 'correctpassword');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('renders with correct styling', () => {
    render(<DeleteAccountModal isOpen={true} onClose={() => {}} />);
    
    const modal = screen.getByRole('heading', { name: 'Radera konto' }).parentElement;
    const styles = window.getComputedStyle(modal);
    
    expect(styles.backgroundColor).toBe('rgba(119, 87, 43, 0.95)');
    expect(styles.padding).toBe('20px');
    expect(styles.borderRadius).toBe('8px');
    expect(styles.width).toBe('400px');
    expect(styles.maxWidth).toBe('90%');
  });
});
