import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../tests/utils/testSetup';
import { vi, it, expect, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import NoteModal from '../../../src/components/common/NoteModal.jsx';
import { fetchWithAuth } from '../../../src/utils/api';

// Mock the API utilities
vi.mock('../../../src/utils/api', () => ({
  fetchWithAuth: vi.fn()
}));

describe('NoteModal', () => {
  const mockOnClose = vi.fn();
  const mockOnNoteCreated = vi.fn();
  const mockNote = {
    _id: '1',
    title: 'Existing Note',
    content: 'Existing Content',
    createdAt: new Date().toISOString()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    fetchWithAuth.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockNote)
    });
  });

  it('renders create note modal correctly', () => {
    render(
      <NoteModal
        isOpen={true}
        onClose={mockOnClose}
        onNoteCreated={mockOnNoteCreated}
        species="cattle"
      />
    );

    expect(screen.getByText('Ny anteckning')).toBeInTheDocument();
    expect(screen.getByLabelText('Titel')).toBeInTheDocument();
    expect(screen.getByLabelText('Innehåll')).toBeInTheDocument();
    expect(screen.getByText('Skapa')).toBeInTheDocument();
    expect(screen.getByText('Avbryt')).toBeInTheDocument();
  });

  it('renders edit note modal correctly', () => {
    render(
      <NoteModal
        isOpen={true}
        onClose={mockOnClose}
        onNoteCreated={mockOnNoteCreated}
        species="cattle"
        note={mockNote}
      />
    );

    expect(screen.getByText('Redigera anteckning')).toBeInTheDocument();
    expect(screen.getByLabelText('Titel')).toHaveValue('Existing Note');
    expect(screen.getByLabelText('Innehåll')).toHaveValue('Existing Content');
    expect(screen.getByText('Uppdatera')).toBeInTheDocument();
  });

  it('handles note creation', async () => {
    render(
      <NoteModal
        isOpen={true}
        onClose={mockOnClose}
        onNoteCreated={mockOnNoteCreated}
        species="cattle"
      />
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText('Titel'), {
      target: { value: 'New Note' }
    });
    fireEvent.change(screen.getByLabelText('Innehåll'), {
      target: { value: 'New Content' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('Skapa'));

    // Check if the API was called correctly
    await waitFor(() => {
      expect(fetchWithAuth).toHaveBeenCalledWith(
        expect.stringContaining('/notes'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('New Note')
        })
      );
    });

    // Check if onNoteCreated was called
    expect(mockOnNoteCreated).toHaveBeenCalled();
  });

  it('handles note editing', async () => {
    render(
      <NoteModal
        isOpen={true}
        onClose={mockOnClose}
        onNoteCreated={mockOnNoteCreated}
        species="cattle"
        note={mockNote}
      />
    );

    // Update the form
    fireEvent.change(screen.getByLabelText('Titel'), {
      target: { value: 'Updated Note' }
    });
    fireEvent.change(screen.getByLabelText('Innehåll'), {
      target: { value: 'Updated Content' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('Uppdatera'));

    // Check if the API was called correctly
    await waitFor(() => {
      expect(fetchWithAuth).toHaveBeenCalledWith(
        expect.stringContaining('/notes/1'),
        expect.objectContaining({
          method: 'PUT',
          body: expect.stringContaining('Updated Note')
        })
      );
    });

    // Check if onNoteCreated was called
    expect(mockOnNoteCreated).toHaveBeenCalled();
  });

  it('handles API errors', async () => {
    fetchWithAuth.mockRejectedValueOnce(new Error('API Error'));

    render(
      <NoteModal
        isOpen={true}
        onClose={mockOnClose}
        onNoteCreated={mockOnNoteCreated}
        species="cattle"
      />
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText('Titel'), {
      target: { value: 'New Note' }
    });
    fireEvent.change(screen.getByLabelText('Innehåll'), {
      target: { value: 'New Content' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('Skapa'));

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });

  it('calls onClose when cancel button is clicked', () => {
    render(
      <NoteModal
        isOpen={true}
        onClose={mockOnClose}
        onNoteCreated={mockOnNoteCreated}
        species="cattle"
      />
    );

    fireEvent.click(screen.getByText('Avbryt'));
    expect(mockOnClose).toHaveBeenCalled();
  });
}); 