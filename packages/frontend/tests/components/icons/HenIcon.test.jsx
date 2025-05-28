import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import { it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import { HenIcon } from '../../../src/components/icons/HenIcon.jsx';

describe('HenIcon', () => {
  it('renders correctly', () => {
    render(<HenIcon />)
    const icon = screen.getByTestId('hen-icon')
    expect(icon).toBeInTheDocument()
  })
});
