import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../utils/api';
import NoteModal from './NoteModal';

/**
 * NotesList component for displaying and managing notes
 * 
 * @param {Object} props - Component props
 * @param {string} [props.species] - The species to show notes for
 * @param {string} [props.individualId] - The individual ID to show notes for
 * @returns {React.ReactElement} The NotesList component
 */
const NotesList = ({ species, individualId }) => {
  // State management for notes and UI
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches notes based on either species or individual ID
   * If species is provided, filters out notes that have an individualId
   * This ensures species-level notes are separate from individual notes
   */
  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      let url;
      
      // Determine which endpoint to use based on props
      if (individualId) {
        url = `${import.meta.env.VITE_API_URL}/notes/individual/${individualId}`;
      } else if (species) {
        url = `${import.meta.env.VITE_API_URL}/notes/species/${species}`;
      } else {
        setNotes([]);
        setIsLoading(false);
        return;
      }

      const response = await fetchWithAuth(url);
      if (!response.ok) {
        throw new Error('Kunde inte hämta anteckningar');
      }

      const data = await response.json();
      // Filter out individual notes when viewing species notes
      const filteredData = species ? data.filter(note => !note.individualId) : data;
      setNotes(filteredData);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    // Defined within the component, so ignoring the lint warning is ok.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [species, individualId]);

  const handleNoteCreated = (note) => {
    if (selectedNote) {
      setNotes(notes.map(n => n._id === note._id ? note : n));
    } else {
      setNotes([note, ...notes]);
    }
    setSelectedNote(null);
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleView = (note) => {
    setSelectedNote(note);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (noteId) => {
    if (!window.confirm('Är du säker på att du vill ta bort denna anteckning?')) {
      return;
    }

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/notes/${noteId}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Kunde inte ta bort anteckningen');
      }

      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <div style={{ color: 'white' }}>Laddar anteckningar...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      overflowY: 'auto'
    }}>
      <div style={{
        width: '80%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={() => {
            setSelectedNote(null);
            setIsModalOpen(true);
          }}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: 'rgb(40, 167, 69)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          Lägg till anteckning
        </button>
      </div>

      {notes.length === 0 ? (
        <div style={{ color: 'white' }}>Inga anteckningar än</div>
      ) : (
        <div style={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {notes.map(note => (
            <div
              key={note._id}
              style={{
                backgroundColor: 'rgb(69, 49, 22)',
                padding: '15px',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer'
              }}
              onClick={() => handleView(note)}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <h4 style={{ margin: 0 }}>{note.title}</h4>
                  <div style={{
                    fontSize: '0.8em',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    {new Date(note.createdAt).toLocaleString()}
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  gap: '10px'
                }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(note);
                    }}
                    style={{
                      padding: '2px 8px',
                      backgroundColor: 'rgb(23, 162, 184)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9em'
                    }}
                  >
                    Redigera
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note._id);
                    }}
                    style={{
                      padding: '2px 8px',
                      backgroundColor: 'rgb(220, 53, 69)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9em'
                    }}
                  >
                    Ta bort
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNote(null);
        }}
        onNoteCreated={handleNoteCreated}
        species={species}
        individualId={individualId}
        note={selectedNote}
      />

      {/* View Modal */}
      {selectedNote && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: isViewModalOpen ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={() => setIsViewModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'rgb(119, 87, 43, 0.95)',
              padding: '20px',
              borderRadius: '8px',
              width: '600px',
              maxWidth: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{ color: 'white', margin: '0 0 20px 0' }}>
              {selectedNote.title}
            </h2>
            <div style={{ 
              whiteSpace: 'pre-wrap',
              color: 'white',
              marginBottom: '20px'
            }}>
              {selectedNote.content}
            </div>
            <div style={{
              fontSize: '0.8em',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '20px'
            }}>
              Skapad: {new Date(selectedNote.createdAt).toLocaleString()}
            </div>
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEdit(selectedNote);
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'rgb(23, 162, 184)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Redigera
              </button>
              <button
                onClick={() => setIsViewModalOpen(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'rgb(108, 117, 125)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesList; 