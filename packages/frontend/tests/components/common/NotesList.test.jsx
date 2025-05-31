import React from 'react';
import { render, screen, waitFor } from '../../../tests/utils/testSetup';
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
  default: ({ isOpen, onClose, onNoteCreated, note }) => (
    isOpen ? (
      <div data-testid="note-modal">
        <button onClick={() => onNoteCreated({ 
          _id: note?._id || '1', 
          title: note?.title || 'Test Note', 
          content: note?.content || 'Test Content',
          createdAt: new Date().toISOString()
        })}>
          {note ? 'Update Note' : 'Create Note'}
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  )
}));

describe('NotesList', () => {
  const mockNotes = [
    {
      _id: '1',
      title: 'Test Note 1',
      content: 'Test Content 1',
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

  it('renders loading state initially', () => {
    render(<NotesList species="cattle" />);
    expect(screen.getByText('Laddar anteckningar...')).toBeInTheDocument();
  });

  it('renders notes after loading', async () => {
    render(<NotesList species="cattle" />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Note 1')).toBeInTheDocument();
    });
  });

  it('shows empty state when no notes exist', async () => {
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([])
    });

    render(<NotesList species="cattle" />);
    
    await waitFor(() => {
      expect(screen.getByText('Inga anteckningar än')).toBeInTheDocument();
    });
  });

  it('shows error message when API fails', async () => {
    fetchWithAuth.mockRejectedValueOnce(new Error('Kunde inte ladda anteckningar'));

    render(<NotesList species="cattle" />);
    
    await waitFor(() => {
      expect(screen.getByText('Kunde inte ladda anteckningar')).toBeInTheDocument();
    });
  });
}); 