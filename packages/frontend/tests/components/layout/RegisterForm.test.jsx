import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import RegisterForm from '../../../src/components/layout/RegisterForm.jsx';

// Mock the required components
vi.mock('../../../src/components/layout/Background', () => ({
  default: ({ children }) => <div data-testid="background">{children}</div>
}));

vi.mock('../../../src/components/common/LargeRectangleButton', () => ({
  default: ({ text, type, to }) => (
    <button 
      data-testid={`button-${text}`}
      type={type}
      data-to={to}
    >
      {text}
    </button>
  )
}));

// Mock the validation hook
let mockFormData = { email: '', password: '', confirmPassword: '' };
let mockErrors = {};
let mockTouched = { email: false, password: false, confirmPassword: false };

const mockHandleChange = vi.fn((e) => {
  const { name, value } = e.target;
  mockFormData = {
    ...mockFormData,
    [name]: value
  };
});

// eslint-disable-next-line no-unused-vars
const mockHandleBlur = vi.fn((e) => {
  const { name } = e.target;
  mockTouched = {
    ...mockTouched,
    [name]: true
  };
});

const mockValidate = vi.fn(() => {
  // Basic validation
  const errors = {};
  let isValid = true;

  if (!mockFormData.email) {
    errors.email = 'E-post krävs';
    isValid = false;
  }
  if (!mockFormData.password) {
    errors.password = 'Lösenord krävs';
    isValid = false;
  }
  if (mockFormData.password !== mockFormData.confirmPassword) {
    errors.confirmPassword = 'Lösenorden matchar inte';
    isValid = false;
  }

  mockErrors = errors;
  return isValid;
});

const mockResetForm = vi.fn(() => {
  mockFormData = { email: '', password: '', confirmPassword: '' };
  mockErrors = {};
  mockTouched = { email: false, password: false, confirmPassword: false };
});

vi.mock('../../../src/hooks/useFormValidation', () => ({
  useFormValidation: () => ({
    formData: mockFormData,
    errors: mockErrors,
    handleChange: mockHandleChange,
    validate: mockValidate,
    resetForm: mockResetForm
  })
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock window.location
const mockLocation = { href: '' };
Object.defineProperty(window, 'location', { value: mockLocation });

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.setItem.mockClear();
    mockLocation.href = '';
    mockFormData = { email: '', password: '', confirmPassword: '' };
    mockErrors = {};
    mockTouched = { email: false, password: false, confirmPassword: false };
  });

  it('renders basic components', () => {
    render(<RegisterForm />);
    
    expect(screen.getByTestId('background')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Registrera nytt konto' })).toBeInTheDocument();
    expect(screen.getByLabelText('E-post')).toBeInTheDocument();
    expect(screen.getByLabelText('Lösenord')).toBeInTheDocument();
    expect(screen.getByLabelText('Bekräfta lösenord')).toBeInTheDocument();
    expect(screen.getByTestId('button-Registrera')).toBeInTheDocument();
    expect(screen.getByTestId('button-Avbryt')).toBeInTheDocument();
  });

  it('handles successful registration', async () => {
    const mockToken = 'test-token';
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ token: mockToken })
    });

    render(<RegisterForm />);
    
    const emailInput = screen.getByLabelText('E-post');
    const passwordInput = screen.getByLabelText('Lösenord');
    const confirmPasswordInput = screen.getByLabelText('Bekräfta lösenord');
    
    // Update form data and trigger blur events
    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'Password123!' } });
    fireEvent.blur(passwordInput);
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'Password123!' } });
    fireEvent.blur(confirmPasswordInput);
    
    // Verify form data was updated
    expect(mockFormData).toEqual({
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!'
    });
    
    mockValidate.mockReturnValueOnce(true);
    
    const submitButton = screen.getByTestId('button-Registrera');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/auth/register',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'Password123!',
            confirmPassword: 'Password123!'
          })
        })
      );
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', mockToken);
    expect(window.location.href).toBe('/my-animals');
  });

  it('handles registration failure', async () => {
    const mockError = 'Email already exists';
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: mockError })
    });

    mockValidate.mockReturnValueOnce(true);
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<RegisterForm />);
    
    const emailInput = screen.getByLabelText('E-post');
    const passwordInput = screen.getByLabelText('Lösenord');
    const confirmPasswordInput = screen.getByLabelText('Bekräfta lösenord');
    
    fireEvent.change(emailInput, { target: { name: 'email', value: 'existing@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'Password123!' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'Password123!' } });
    
    const submitButton = screen.getByTestId('button-Registrera');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Register error:', expect.any(Error));
    });
  });
});
