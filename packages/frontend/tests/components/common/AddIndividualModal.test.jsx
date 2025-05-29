import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import userEvent from '@testing-library/user-event';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import AddIndividualModal from '../../../src/components/common/AddIndividualModal.jsx';

describe('AddIndividualModal', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <AddIndividualModal isOpen={false} onClose={() => {}} onAdd={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders modal with form when isOpen is true', () => {
    render(<AddIndividualModal isOpen={true} onClose={() => {}} onAdd={() => {}} />);
    
    expect(screen.getByText('Lägg till individ')).toBeInTheDocument();
    expect(screen.getByLabelText('Namn')).toBeInTheDocument();
    expect(screen.getByLabelText('ID-nummer (valfritt)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Lägg till' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Avbryt' })).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', async () => {
    const handleClose = vi.fn();
    render(<AddIndividualModal isOpen={true} onClose={handleClose} onAdd={() => {}} />);
    
    const cancelButton = screen.getByRole('button', { name: 'Avbryt' });
    await userEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onAdd with form data when submitted', async () => {
    const handleAdd = vi.fn();
    render(<AddIndividualModal isOpen={true} onClose={() => {}} onAdd={handleAdd} />);
    
    const nameInput = screen.getByLabelText('Namn');
    const idNumberInput = screen.getByLabelText('ID-nummer (valfritt)');
    const submitButton = screen.getByRole('button', { name: 'Lägg till' });

    await userEvent.type(nameInput, 'Test Animal');
    await userEvent.type(idNumberInput, '12345');
    await userEvent.click(submitButton);

    expect(handleAdd).toHaveBeenCalledWith({
      name: 'Test Animal',
      idNumber: '12345'
    });
  });

  it('clears form and calls onClose after successful submission', async () => {
    const handleClose = vi.fn();
    render(<AddIndividualModal isOpen={true} onClose={handleClose} onAdd={() => {}} />);
    
    const nameInput = screen.getByLabelText('Namn');
    const idNumberInput = screen.getByLabelText('ID-nummer (valfritt)');
    const submitButton = screen.getByRole('button', { name: 'Lägg till' });

    await userEvent.type(nameInput, 'Test Animal');
    await userEvent.type(idNumberInput, '12345');
    await userEvent.click(submitButton);

    expect(nameInput.value).toBe('');
    expect(idNumberInput.value).toBe('');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders with correct styling', () => {
    render(<AddIndividualModal isOpen={true} onClose={() => {}} onAdd={() => {}} />);
    
    const modal = screen.getByText('Lägg till individ').parentElement;
    const styles = window.getComputedStyle(modal);
    
    expect(styles.backgroundColor).toBe('rgba(119, 87, 43, 0.95)');
    expect(styles.padding).toBe('20px');
    expect(styles.borderRadius).toBe('8px');
    expect(styles.width).toBe('400px');
    expect(styles.maxWidth).toBe('90%');
  });

  it('requires name field to be filled', async () => {
    render(<AddIndividualModal isOpen={true} onClose={() => {}} onAdd={() => {}} />);
    
    const nameInput = screen.getByLabelText('Namn');
    const submitButton = screen.getByRole('button', { name: 'Lägg till' });

    expect(nameInput).toBeRequired();
    await userEvent.click(submitButton);
    expect(nameInput.validity.valid).toBe(false);
  });
});
