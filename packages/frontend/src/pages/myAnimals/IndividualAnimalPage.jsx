import React, { useState, useEffect } from 'react';
import { useParams /*useLocation*/ } from 'react-router-dom';
import Background from '../../components/layout/Background';
import LogoutButton from '../../components/common/LogoutButton';
import individualService from '../../services/individualService';
import NotesList from '../../components/common/NotesList';

/**
 * IndividualAnimalPage component for displaying individual animal details
 * 
 * @returns {React.ReactElement} The IndividualAnimalPage component
 */
const IndividualAnimalPage = () => {
  const { type, name } = useParams();
  // const location = useLocation();
  const [individual, setIndividual] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadIndividual();
  }/*, [type, name]*/);

  const loadIndividual = async () => {
    try {
      const data = await individualService.getIndividual(type, name);
      setIndividual(data);
      setError(null);
    } catch (err) {
      setError('Kunde inte ladda individdata');
      console.error('Error loading individual:', err);
    }
  };

  if (!individual && !error) {
    return (
      <Background showBackButton={true} backTo={`/my-animals/${type}`}>
        <LogoutButton />
        <div style={{ color: 'white', textAlign: 'center' }}>
          Laddar...
        </div>
      </Background>
    );
  }

  return (
    <Background showBackButton={true} backTo={`/my-animals/${type}`}>
      <LogoutButton />
      {error ? (
        <div style={{ color: 'red', textAlign: 'center' }}>
          {error}
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
          {/* Left column for animal details */}
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
            borderRadius: '8px'
          }}>
            <h1 style={{
              fontSize: '2rem',
              width: '80%',
              color: 'white',
              margin: '0',
              borderBottom: '2px solid white'
            }}>
              {individual.name}
              {individual.idNumber && (
                <div style={{ fontSize: '1rem', opacity: 0.8 }}>
                  ID: {individual.idNumber}
                </div>
              )}
            </h1>
            {/* Här kommer detaljer om individen */}
          </div>

          {/* Right column for notes */}
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
            borderRadius: '8px'
          }}>
            <NotesList individualId={individual._id} />
          </div>
        </div>
      )}
    </Background>
  );
};

export default IndividualAnimalPage; 