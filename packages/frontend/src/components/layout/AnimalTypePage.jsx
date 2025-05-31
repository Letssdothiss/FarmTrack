import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from './Background';
import LogoutButton from '../common/LogoutButton';
import AddIndividualModal from '../common/AddIndividualModal';
import individualService from '../../services/individualService';
import { fetchWithAuth } from '../../utils/api';

/**
 * AnimalTypePage component for displaying animal type specific pages
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the page
 * @param {string} props.type - The type of animal (cattle, goat, poultry)
 * @param {React.ReactNode} props.leftColumn - Content for the left column
 * @returns {React.ReactElement} The AnimalTypePage component
 */
const AnimalTypePage = ({ title, type, leftColumn }) => {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [individuals, setIndividuals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadIndividuals();
  },/* [type]*/);

  const loadIndividuals = async () => {
    try {
      const data = await individualService.getIndividuals(type);
      setIndividuals(data);
      setError(null);
    } catch (err) {
      setError('Kunde inte ladda individer');
      console.error('Error loading individuals:', err);
    }
  };

  const handleAddIndividual = async (individual) => {
    try {
      const newIndividual = await individualService.createIndividual({
        name: individual.name,
        idNumber: individual.idNumber || '',  // Sätt tom sträng om idNumber är undefined
        animalType: type
      });

      setIndividuals([...individuals, newIndividual]);
      setError(null);
    } catch (err) {
      console.error('Error details:', err);
      setError('Kunde inte lägga till individ');
    }
  };

  const handleIndividualClick = (individual) => {
    navigate(`/my-animals/${type}/${individual.name}`, {
      state: {
        animalType: type,
        animalName: individual.name,
        animalId: individual.idNumber
      }
    });
  };

  // TODO: Implementera redigering av individer
  // - Lägg till en redigera-knapp bredvid ta bort-knappen
  // - Implementera en modal för redigering med formulär
  // - Använd PUT /individuals/:animalType/:id för att uppdatera individen
  // - Uppdatera UI:t med den nya informationen

  const handleDeleteIndividual = async (individual) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/individuals/${type}/${individual._id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Kunde inte ta bort individen');
      }

      setIndividuals(individuals.filter(i => i._id !== individual._id));
    } catch (error) {
      setError('Kunde inte ta bort individen');
      console.error('Error deleting individual:', error);
    }
  };

  return (
    <Background showBackButton={true} backTo="/my-animals">
      <LogoutButton />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        {/* Left column for notes */}
        <div style={{
          backgroundColor: 'rgb(119, 87, 43, 0.95)',
          width: '40vw',
          height: '75vw',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
          gap: '20px',
          borderRadius: '8px',
          overflowY: 'auto'
        }}>
          <h1 style={{
            fontSize: '2rem',
            width: '80%',
            color: 'white',
            margin: '0',
            borderBottom: '2px solid white'
          }}>
            {title} - Anteckningar
          </h1>
          {leftColumn}
        </div>

        {/* Right column for individuals */}
        <div style={{
          backgroundColor: 'rgb(119, 87, 43, 0.95)',
          width: '40vw',
          height: '75vw',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
          gap: '20px',
          borderRadius: '8px',
          overflowY: 'auto'
        }}>
          <h1 style={{
            fontSize: '2rem',
            width: '80%',
            color: 'white',
            margin: '0',
            borderBottom: '2px solid white'
          }}>
            {title} - Individer
          </h1>
          {error && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              {error}
            </div>
          )}
          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              width: '80%',
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
            Lägg till individ
          </button>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '80%',
            color: 'white'
          }}>
            {individuals.map((individual) => (
              <div
                key={individual._id}
                style={{
                  backgroundColor: 'rgb(69, 49, 22)',
                  padding: '10px',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div
                  onClick={() => handleIndividualClick(individual)}
                  style={{
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{individual.name}</div>
                  {individual.idNumber && (
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                      ID: {individual.idNumber}
                    </div>
                  )}
                </div>
                <div style={{ 
                  display: 'flex', 
                  gap: '10px'
                }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Är du säker på att du vill ta bort denna individ?')) {
                        handleDeleteIndividual(individual);
                      }
                    }}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: 'rgb(220, 53, 69)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Ta bort
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddIndividualModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddIndividual}
      />
    </Background>
  );
};

export default AnimalTypePage; 