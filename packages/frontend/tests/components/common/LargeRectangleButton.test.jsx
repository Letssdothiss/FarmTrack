import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import userEvent from '@testing-library/user-event';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import LargeRectangleButton from '../../../src/components/common/LargeRectangleButton.jsx';

describe('LargeRectangleButton', () => {
  it('renders button with text', () => {
    const buttonText = 'Test Button';
    render(<LargeRectangleButton text={buttonText} onClick={() => {}} />);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(buttonText);
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const buttonText = 'Test Button';
    render(<LargeRectangleButton text={buttonText} onClick={handleClick} />);
    const button = screen.getByRole('button', { name: buttonText });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as Link when to prop is provided', () => {
    const linkText = 'Test Link';
    const linkPath = '/test';
    render(<LargeRectangleButton text={linkText} to={linkPath} onClick={() => {}} />);
    const link = screen.getByRole('link', { name: linkText });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', linkPath);
  });

  it('applies correct styles based on variant', () => {
    const buttonText = 'Test Button';
    render(<LargeRectangleButton text={buttonText} onClick={() => {}} variant="short" />);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toHaveStyle({ width: '100px' });
  });
});