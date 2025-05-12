import React, { useState, useEffect } from 'react';
import Background from '../components/layout/Background';
import LogoutButton from '../components/common/LogoutButton';
import { fetchWithAuth } from '../utils/api';
import API_URL from '../config/api';

/**
 * MyAnimalsPage component
 * 
 * @returns {React.ReactElement} The MyAnimalsPage component
 */
const MyAnimalsPage = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetchWithAuth(`${API_URL}/animals`);
        if (!response.ok) {
          throw new Error('Kunde inte hämta djur');
        }
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.error('Error fetching animals:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  if (loading) {
    return (
      <Background>
        <div style={{ color: 'white' }}>Laddar...</div>
      </Background>
    );
  }

  if (error) {
    return (
      <Background>
        <div style={{ color: 'red' }}>{error}</div>
      </Background>
    );
  }

  return (
    <Background>
      <LogoutButton />
      <div style={{
        backgroundColor: 'rgb(119, 87, 43, 0.95)',
        width: '80%',
        maxWidth: '1200px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        gap: '20px',
        borderRadius: '8px',
        minHeight: '80vh'
      }}>
        <h1 style={{
          fontSize: '2rem',
          color: 'white',
          margin: '0'
        }}>
          Mina djur
        </h1>
        {animals.length === 0 ? (
          <p style={{ color: 'white' }}>Inga djur hittades</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
            width: '100%'
          }}>
            {animals.map(animal => (
              <div key={animal._id} style={{
                backgroundColor: 'rgb(69, 49, 22)',
                padding: '15px',
                borderRadius: '8px',
                color: 'white'
              }}>
                <h3>{animal.name}</h3>
                <p>Typ: {animal.type}</p>
                <p>Ålder: {animal.age}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Background>
  );
};

export default MyAnimalsPage; 