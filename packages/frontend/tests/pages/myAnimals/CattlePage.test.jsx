import React from 'react';
import { render, screen } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import CattlePage from '../../../src/pages/myAnimals/CattlePage';

// Mock the AnimalTypePage component
vi.mock('../../../src/components/layout/AnimalTypePage', () => ({
  default: ({ title, type, leftColumn }) => (
    <div data-testid="animal-type-page">
      <div data-testid="title">{title}</div>
      <div data-testid="type">{type}</div>
      <div data-testid="left-column">{leftColumn}</div>
    </div>
  )
}));

// Mock the NotesList component
vi.mock('../../../src/components/common/NotesList', () => ({
  default: ({ species }) => (
    <div data-testid="notes-list">
      <div data-testid="species">{species}</div>
    </div>
  )
}));

describe('CattlePage', () => {
  it('renders correctly', () => {
    render(<CattlePage />);

    // Check if AnimalTypePage is rendered with correct props
    const animalTypePage = screen.getByTestId('animal-type-page');
    expect(animalTypePage).toBeInTheDocument();

    // Check title
    expect(screen.getByTestId('title')).toHaveTextContent('Nötkreatur');

    // Check type
    expect(screen.getByTestId('type')).toHaveTextContent('cattle');

    // Check if NotesList is rendered with correct species
    const notesList = screen.getByTestId('notes-list');
    expect(notesList).toBeInTheDocument();
    expect(screen.getByTestId('species')).toHaveTextContent('cattle');
  });
}); 