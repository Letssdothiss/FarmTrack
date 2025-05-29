import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import AnimalTypePage from '../../../src/components/layout/AnimalTypePage.jsx';
import individualService from '../../../src/services/individualService';

// Mock the required components and services
vi.mock('../../../src/components/layout/Background', () => ({
  default: ({ children }) => <div data-testid="background">{children}</div>
}));

vi.mock('../../../src/components/common/LogoutButton', () => ({
  default: () => <button data-testid="logout-button">Logout</button>
}));

vi.mock('../../../src/components/common/AddIndividualModal', () => ({
  default: ({ isOpen, onClose, onAdd }) => (
    isOpen ? (
      <div data-testid="add-individual-modal">
        <button onClick={() => onAdd({ name: 'Test Animal', idNumber: '123' })}>Add</button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  )
}));

vi.mock('../../../src/services/individualService', () => ({
  default: {
    getIndividuals: vi.fn(),
    createIndividual: vi.fn()
  }
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

describe('AnimalTypePage', () => {
  const mockIndividuals = [
    { _id: '1', name: 'Cow 1', idNumber: '123' },
    { _id: '2', name: 'Cow 2', idNumber: '456' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    individualService.getIndividuals.mockResolvedValue(mockIndividuals);
    individualService.createIndividual.mockResolvedValue({ _id: '3', name: 'Test Animal', idNumber: '123' });
  });

  it('renders basic components', () => {
    render(
      <AnimalTypePage 
        title="Cattle" 
        type="cattle" 
        leftColumn={<div>Test Notes</div>} 
      />
    );

    expect(screen.getByTestId('background')).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });

  it('renders titles and columns correctly', () => {
    render(
      <AnimalTypePage 
        title="Cattle" 
        type="cattle" 
        leftColumn={<div>Test Notes</div>} 
      />
    );

    expect(screen.getByText('Cattle - Anteckningar')).toBeInTheDocument();
    expect(screen.getByText('Cattle - Individer')).toBeInTheDocument();
    expect(screen.getByText('Test Notes')).toBeInTheDocument();
  });

  it('loads and displays individuals', async () => {
    render(
      <AnimalTypePage 
        title="Cattle" 
        type="cattle" 
        leftColumn={<div>Test Notes</div>} 
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Cow 1')).toBeInTheDocument();
      expect(screen.getByText('Cow 2')).toBeInTheDocument();
    });
  });

  it('handles individual click correctly', async () => {
    render(
      <AnimalTypePage 
        title="Cattle" 
        type="cattle" 
        leftColumn={<div>Test Notes</div>} 
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Cow 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Cow 1'));

    expect(mockNavigate).toHaveBeenCalledWith('/my-animals/cattle/Cow 1', {
      state: {
        animalType: 'cattle',
        animalName: 'Cow 1',
        animalId: '123'
      }
    });
  });

  it('handles adding new individual', async () => {
    render(
      <AnimalTypePage 
        title="Cattle" 
        type="cattle" 
        leftColumn={<div>Test Notes</div>} 
      />
    );

    // Open modal
    fireEvent.click(screen.getByText('Lägg till individ'));
    expect(screen.getByTestId('add-individual-modal')).toBeInTheDocument();

    // Add new individual
    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(individualService.createIndividual).toHaveBeenCalledWith({
        name: 'Test Animal',
        idNumber: '123',
        animalType: 'cattle'
      });
    });
  });

  it('displays error message when loading fails', async () => {
    individualService.getIndividuals.mockRejectedValue(new Error('Failed to load'));

    render(
      <AnimalTypePage 
        title="Cattle" 
        type="cattle" 
        leftColumn={<div>Test Notes</div>} 
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Kunde inte ladda individer')).toBeInTheDocument();
    });
  });

  it('displays error message when adding individual fails', async () => {
    individualService.createIndividual.mockRejectedValue(new Error('Failed to add'));

    render(
      <AnimalTypePage 
        title="Cattle" 
        type="cattle" 
        leftColumn={<div>Test Notes</div>} 
      />
    );

    // Open modal and try to add
    fireEvent.click(screen.getByText('Lägg till individ'));
    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(screen.getByText('Kunde inte lägga till individ')).toBeInTheDocument();
    });
  });
});
