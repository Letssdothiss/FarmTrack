import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../../src/components/common/LoginForm';
import { vi, describe, it, expect } from 'vitest';

describe('LoginForm', () => {
  it('should render login form with email and password fields', () => {
    render(<LoginForm />);
    
    // Kontrollera att formuläret finns
    expect(screen.getByRole('form')).toBeInTheDocument();
    
    // Kontrollera att email-fältet finns
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    
    // Kontrollera att lösenordsfältet finns
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    
    // Kontrollera att login-knappen finns
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const mockOnSubmit = vi.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    // Hitta input-fälten
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    // Fyll i formuläret
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    
    // Klicka på login-knappen
    await userEvent.click(submitButton);
    
    // Kontrollera att onSubmit anropades med rätt data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
}); 