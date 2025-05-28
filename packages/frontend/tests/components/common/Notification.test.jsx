import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import userEvent from '@testing-library/user-event';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import Notification from '../../../src/components/common/Notification.jsx';

describe('Notification', () => {
  it('renders success notification correctly', () => {
    render(<Notification message="Success message" type="success" onClose={() => {}} />);
    const notification = screen.getByText('Success message');
    expect(notification).toBeInTheDocument();
    
    const container = notification.parentElement;
    const styles = window.getComputedStyle(container);
    expect(styles.backgroundColor).toBe('rgb(40, 167, 69)');
  });

  it('renders error notification correctly', () => {
    render(<Notification message="Error message" type="error" onClose={() => {}} />);
    const notification = screen.getByText('Error message');
    expect(notification).toBeInTheDocument();
    
    const container = notification.parentElement;
    const styles = window.getComputedStyle(container);
    expect(styles.backgroundColor).toBe('rgb(220, 53, 69)');
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    render(<Notification message="Test message" type="success" onClose={handleClose} />);
    
    const closeButton = screen.getByRole('button');
    await userEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders with correct styling', () => {
    render(<Notification message="Test message" type="success" onClose={() => {}} />);
    const container = screen.getByText('Test message').parentElement;
    const styles = window.getComputedStyle(container);
    
    expect(styles.position).toBe('fixed');
    expect(styles.top).toBe('20px');
    expect(styles.left).toBe('50%');
    expect(styles.transform).toBe('translateX(-50%)');
    expect(styles.color).toBe('rgb(255, 255, 255)');
    expect(styles.padding).toBe('15px 30px');
    expect(styles.borderRadius).toBe('4px');
    expect(styles.display).toBe('flex');
    expect(styles.alignItems).toBe('center');
    expect(styles.gap).toBe('15px');
    expect(styles.minWidth).toBe('300px');
    expect(styles.maxWidth).toBe('90%');
  });

  it('returns null when no message is provided', () => {
    const { container } = render(<Notification message="" type="success" onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders close button with correct styling', () => {
    render(<Notification message="Test message" type="success" onClose={() => {}} />);
    const closeButton = screen.getByRole('button');
    const styles = window.getComputedStyle(closeButton);
    
    expect(styles.background).toBe('none');
    expect(styles.border).toBe('2px outset ButtonFace');
    expect(styles.color).toBe('rgb(255, 255, 255)');
    expect(styles.cursor).toBe('pointer');
    expect(styles.fontSize).toBe('20px');
    expect(styles.padding).toBe('0px 5px');
  });
});
