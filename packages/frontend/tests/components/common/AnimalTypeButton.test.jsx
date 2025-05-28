import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import userEvent from '@testing-library/user-event';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import AnimalTypeButton from '../../../src/components/common/AnimalTypeButton.jsx';

describe('AnimalTypeButton', () => {
  it('renders cattle button correctly with correct text, icon and link', () => {
    render(<AnimalTypeButton type="cattle" to="/cattle" />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/cattle');
    expect(screen.getByText('Nötkreatur')).toBeInTheDocument();
    expect(link.querySelector('svg')).toBeInTheDocument(); // CowIcon
  });

  it('renders goat button correctly with correct text, icon and link', () => {
    render(<AnimalTypeButton type="goat" to="/goat" />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/goat');
    expect(screen.getByText('Get')).toBeInTheDocument();
    expect(link.querySelector('svg')).toBeInTheDocument(); // GoatIcon
  });

    it('renders poultry button correctly with correct text, icon and link', () => {
    render(<AnimalTypeButton type="poultry" to="/poultry" />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/poultry');
    expect(screen.getByText('Fjäderfä')).toBeInTheDocument();
    expect(link.querySelector('svg')).toBeInTheDocument(); // HenIcon
  });

  it('renders with correct styling', () => {
    render(<AnimalTypeButton type="cattle" to="/cattle" />);
    const link = screen.getByRole('link');
    const styles = window.getComputedStyle(link);
    
    expect(styles.backgroundColor).toBe('rgba(119, 87, 43, 0.95)');
    expect(styles.color).toBe('rgb(255, 255, 255)');
    expect(styles.padding).toBe('15px 20px');
    expect(styles.borderRadius).toBe('8px');
    expect(styles.textDecoration).toBe('none');
    expect(styles.display).toBe('flex');
    expect(styles.alignItems).toBe('center');
    expect(styles.gap).toBe('15px');
    expect(styles.height).toBe('60px');
  });

  it('handles invalid animal type gracefully', () => {
    render(<AnimalTypeButton type="invalid" to="/invalid" />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/invalid');
    expect(link.textContent).toBe(''); // Should be empty for invalid type
    expect(link.querySelector('svg')).not.toBeInTheDocument(); // No icon for invalid type
  });
});
