import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import LoginForm from '../../../src/components/layout/LoginForm.jsx';
import API_URL from '../../../src/config/api';

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

// Mock the validation function
const mockValidateLoginForm = vi.fn((formData) => {
  const errors = {};
  let isValid = true;

  if (!formData.email) {
    errors.email = 'E-post krävs';
    isValid = false;
  }
  if (!formData.password) {
    errors.password = 'Lösenord krävs';
    isValid = false;
  }

  return { isValid, errors };
});

vi.mock('../../../src/utils/validation/validateLoginForm', () => ({
  validateLoginForm: mockValidateLoginForm
}));

// Mock the validation hook
let mockFormData = { email: '', password: '' };
let mockErrors = {};
let mockTouched = { email: false, password: false };

const mockHandleChange = vi.fn((e) => {
  const { name, value } = e.target;
  mockFormData = {
    ...mockFormData,
    [name]: value
  };
});

const mockHandleBlur = vi.fn((e) => {
  const { name } = e.target;
  mockTouched = {
    ...mockTouched,
    [name]: true
  };
});

const mockValidate = vi.fn(() => {
  const validation = mockValidateLoginForm(mockFormData);
  mockErrors = validation.errors;
  return validation.isValid;
});

const mockResetForm = vi.fn(() => {
  mockFormData = { email: '', password: '' };
  mockErrors = {};
  mockTouched = { email: false, password: false };
});

vi.mock('../../../src/hooks/useLoginFormValidation', () => ({
  useLoginFormValidation: () => ({
    formData: mockFormData,
    errors: mockErrors,
    handleChange: mockHandleChange,
    validate: mockValidate,
    resetForm: mockResetForm
  })
}));

// Mock the API URL
vi.mock('../../../src/config/api', () => ({
  default: 'http://test-api-url'
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

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.setItem.mockClear();
    mockLocation.href = '';
    mockFormData = { email: '', password: '' };
    mockErrors = {};
  });

  it('renders basic components', () => {
    render(<LoginForm />);
    
    expect(screen.getByTestId('background')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Logga in' })).toBeInTheDocument();
    expect(screen.getByLabelText('E-post')).toBeInTheDocument();
    expect(screen.getByLabelText('Lösenord')).toBeInTheDocument();
    expect(screen.getByTestId('button-Logga in')).toBeInTheDocument();
    expect(screen.getByTestId('button-Avbryt')).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const mockToken = 'test-token';
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ token: mockToken })
    });

    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('E-post');
    const passwordInput = screen.getByLabelText('Lösenord');
    
    // Update form data and trigger blur events
    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
    fireEvent.blur(passwordInput);
    
    // Verify form data was updated
    expect(mockFormData).toEqual({
      email: 'test@example.com',
      password: 'password123'
    });
    
    mockValidate.mockReturnValueOnce(true);
    
    const submitButton = screen.getByTestId('button-Logga in');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://test-api-url/auth/login',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123'
          })
        })
      );
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', mockToken);
    expect(window.location.href).toBe('/my-animals');
  });

  it('handles login failure', async () => {
    const mockError = 'Invalid credentials';
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: mockError })
    });

    mockValidate.mockReturnValueOnce(true);
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('E-post');
    const passwordInput = screen.getByLabelText('Lösenord');
    
    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'wrong-password' } });
    
    const submitButton = screen.getByTestId('button-Logga in');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Inloggningen misslyckades: ' + mockError);
    });
  });
}); 