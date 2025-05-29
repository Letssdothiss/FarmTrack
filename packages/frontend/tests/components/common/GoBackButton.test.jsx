import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import userEvent from '@testing-library/user-event';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import GoBackButton from '../../../src/components/common/GoBackButton.jsx';

describe('GoBackButton', () => {
  it('renders correctly with ArrowBackIcon', () => {
    render(<GoBackButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument(); // ArrowBackIcon is rendered as an SVG
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<GoBackButton onClick={handleClick} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as Link when to prop is provided', () => {
    render(<GoBackButton to="/previous-page" />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/previous-page');
  });

  it('calls onClick when Link is clicked', async () => {
    const handleClick = vi.fn();
    render(<GoBackButton to="/previous-page" onClick={handleClick} />);
    const link = screen.getByRole('link');
    await userEvent.click(link);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
