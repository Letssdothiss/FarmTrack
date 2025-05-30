import React, { useState } from 'react';
import { fetchWithAuth } from '../../utils/api';

/**
 * NoteModal component for creating and editing notes
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onNoteCreated - Callback when a note is created
 * @param {string} [props.species] - The species this note belongs to
 * @param {string} [props.individualId] - The individual ID this note belongs to
 * @param {Object} [props.note] - The note to edit (if editing)
 * @returns {React.ReactElement} The NoteModal component
 */
const NoteModal = ({ isOpen, onClose, onNoteCreated, species, individualId, note }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const url = note 
        ? `${import.meta.env.VITE_API_URL}/notes/${note._id}`
        : `${import.meta.env.VITE_API_URL}/notes`;
      
      const method = note ? 'PUT' : 'POST';
      
      const noteData = {
        title,
        content,
        species,
        individualId
      };
      
      const response = await fetchWithAuth(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteData)
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Error response:', data);
        throw new Error(data.message || 'Ett fel uppstod');
      }

      const savedNote = await response.json();
      onNoteCreated(savedNote);
      onClose();
    } catch (error) {
      console.error('Error saving note:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'rgb(119, 87, 43, 0.95)',
        padding: '20px',
        borderRadius: '8px',
        width: '600px',
        maxWidth: '90%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ color: 'white', margin: '0 0 20px 0' }}>
          {note ? 'Redigera anteckning' : 'Ny anteckning'}
        </h2>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <div>
            <label
              htmlFor="title"
              style={{ color: 'white', display: 'block', marginBottom: '5px' }}
            >
              Titel
            </label>
            <input
              id="title"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'rgb(69, 49, 22)',
                color: 'white'
              }}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              style={{ color: 'white', display: 'block', marginBottom: '5px' }}
            >
              Innehåll
            </label>
            <textarea
              id="content"
              style={{
                width: '100%',
                minHeight: '200px',
                padding: '8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'rgb(69, 49, 22)',
                color: 'white',
                resize: 'vertical'
              }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          {error && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {error}
            </div>
          )}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '20px'
          }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: 'rgb(40, 167, 69)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? 'Sparar...' : (note ? 'Uppdatera' : 'Skapa')}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: 'rgb(108, 117, 125)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              Avbryt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal; 