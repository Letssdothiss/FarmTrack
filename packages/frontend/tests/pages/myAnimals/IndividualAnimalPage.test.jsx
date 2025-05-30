import React from 'react';
import { render, screen, waitFor } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import IndividualAnimalPage from '../../../src/pages/myAnimals/IndividualAnimalPage';

// Mock the Background component
vi.mock('../../../src/components/layout/Background', () => ({
  default: ({ children }) => (
    <div data-testid="background">
      {children}
    </div>
  )
}));

// Mock the LogoutButton component
vi.mock('../../../src/components/common/LogoutButton', () => ({
  default: () => <div data-testid="logout-button" />
}));

// Mock the NotesList component
vi.mock('../../../src/components/common/NotesList', () => ({
  default: () => <div data-testid="notes-list" />
}));

// Mock the individualService
vi.mock('../../../src/services/individualService', () => {
  const mockGetIndividual = vi.fn();
  return {
    default: {
      getIndividual: mockGetIndividual
    }
  };
});

// Mock useParams
vi.mock('react-router-dom', () => ({
  useParams: () => ({ type: 'cow', name: 'test-cow' })
}));

describe('IndividualAnimalPage', () => {
  it('renders loading state initially', () => {
    render(<IndividualAnimalPage />);
    expect(screen.getByText('Laddar...')).toBeInTheDocument();
  });

  it('renders error state when API call fails', async () => {
    const { default: individualService } = await import('../../../src/services/individualService');
    individualService.getIndividual.mockRejectedValueOnce(new Error('API Error'));

    render(<IndividualAnimalPage />);
    
    // Wait for error message to appear
    const errorMessage = await screen.findByText('Kunde inte ladda individdata');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders individual data when API call succeeds', async () => {
    const mockIndividual = {
      _id: '123',
      name: 'Test Cow',
      idNumber: 'ABC123'
    };

    const { default: individualService } = await import('../../../src/services/individualService');
    individualService.getIndividual.mockResolvedValueOnce(mockIndividual);

    render(<IndividualAnimalPage />);
    
    // Wait for individual data to appear
    await waitFor(() => {
      expect(screen.getByText('Test Cow')).toBeInTheDocument();
      expect(screen.getByText(/ID: ABC123/)).toBeInTheDocument();
    });
  });
}); 