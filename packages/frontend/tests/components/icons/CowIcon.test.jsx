import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import { it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import { CowIcon } from '../../../src/components/icons/CowIcon.jsx';

describe('CowIcon', () => {
  it('renders correctly', () => {
    render(<CowIcon />)
    const icon = screen.getByTestId('cow-icon')
    expect(icon).toBeInTheDocument()
  })
});