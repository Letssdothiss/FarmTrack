import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import { it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import { GoatIcon } from '../../../src/components/icons/GoatIcon.jsx';

describe('GoatIcon', () => {
  it('renders correctly', () => {
    render(<GoatIcon />)
    const icon = screen.getByTestId('goat-icon')
    expect(icon).toBeInTheDocument()
  })
});
