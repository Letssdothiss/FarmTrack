import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import NotesList from '../../../src/components/common/NotesList.jsx';
import { fetchWithAuth } from '../../../src/utils/api';

// Mock the API utilities
vi.mock('../../../src/utils/api', () => ({
  fetchWithAuth: vi.fn()
}));

// Mock the NoteModal component
vi.mock('../../../src/components/common/NoteModal', () => ({
  default: ({ isOpen, onClose, onNoteCreated }) => (
    isOpen ? (
      <div data-testid="note-modal">
        <button onClick={() => onNoteCreated({ 
          _id: '1', 
          title: 'Test Note', 
          content: 'Test Content',
          createdAt: new Date().toISOString()
        })}>
          Create Note
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  )
}));

describe('IndividualNotesList', () => {
  const mockNotes = [
    {
      _id: '1',
      title: 'Test Note 1',
      content: 'Test Content 1',
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      title: 'Test Note 2',
      content: 'Test Content 2',
      createdAt: new Date().toISOString()
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    fetchWithAuth.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockNotes)
    });
  });

  it('renders notes list for individual correctly', async () => {
    render(<NotesList individualId="123" species="cattle" />);
    
    // Check if loading state is shown initially
    expect(screen.getByText('Laddar anteckningar...')).toBeInTheDocument();
    
    // Wait for notes to load
    await waitFor(() => {
      expect(screen.getByText('Test Note 1')).toBeInTheDocument();
      expect(screen.getByText('Test Note 2')).toBeInTheDocument();
    });

    // Check if "Add Note" button is present
    expect(screen.getByText('Lägg till anteckning')).toBeInTheDocument();
  });

  it('fetches notes for individual correctly', async () => {
    render(<NotesList individualId="123" species="cattle" />);
    
    await waitFor(() => {
      expect(fetchWithAuth).toHaveBeenCalledWith(
        expect.stringContaining('/notes/individual/123')
      );
    });
  });

  it('handles note creation for individual', async () => {
    render(<NotesList individualId="123" species="cattle" />);
    
    // Wait for initial notes to load
    await waitFor(() => {
      expect(screen.getByText('Test Note 1')).toBeInTheDocument();
    });

    // Click "Add Note" button
    fireEvent.click(screen.getByText('Lägg till anteckning'));
    
    // Check if modal is opened
    expect(screen.getByTestId('note-modal')).toBeInTheDocument();
    
    // Create a new note
    fireEvent.click(screen.getByText('Create Note'));
    
    // Check if the new note appears in the list
    await waitFor(() => {
      expect(screen.getByText('Test Note')).toBeInTheDocument();
    });
  });

  it('handles note deletion for individual', async () => {
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockNotes)
    }).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({})
    });

    // Mock window.confirm
    window.confirm = vi.fn(() => true);

    render(<NotesList individualId="123" species="cattle" />);
    
    // Wait for notes to load
    await waitFor(() => {
      expect(screen.getByText('Test Note 1')).toBeInTheDocument();
    });

    // Click delete button for first note
    const deleteButtons = screen.getAllByText('Ta bort');
    fireEvent.click(deleteButtons[0]);

    // Check if delete request was made
    await waitFor(() => {
      expect(fetchWithAuth).toHaveBeenCalledWith(
        expect.stringContaining('/notes/1'),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });
}); 