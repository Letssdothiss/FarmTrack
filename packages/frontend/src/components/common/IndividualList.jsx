import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { fetchWithAuth } from '../../utils/api';
import IndividualModal from './IndividualModal';
import IndividualCard from './IndividualCard';

/**
 * IndividualList component for displaying and managing individuals
 * 
 * @param {Object} props - Component props
 * @param {string} props.species - The species to show individuals for
 * @returns {React.ReactElement} The IndividualList component
 */
const IndividualList = ({ species }) => {
  // State management for individuals and UI
  const [individuals, setIndividuals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndividual, setSelectedIndividual] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches individuals for the specified species
   * Updates the individuals state with the fetched data
   * Handles loading states and errors
   */
  const fetchIndividuals = async () => {
    try {
      setIsLoading(true);
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/individuals/${species}`
      );
      if (!response.ok) {
        throw new Error('Kunde inte hämta individer');
      }

      const data = await response.json();
      setIndividuals(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch individuals when species changes
  useEffect(() => {
    fetchIndividuals();
    // Defined within the component, so ignoring the lint warning is ok.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [species]);

  /**
   * Handles individual creation/update
   * If selectedIndividual exists, updates the existing individual
   * Otherwise adds the new individual to the beginning of the list
   * Resets the selectedIndividual state after operation
   */
  const handleIndividualCreated = (individual) => {
    if (selectedIndividual) {
      setIndividuals(individuals.map(i => i._id === individual._id ? individual : i));
    } else {
      setIndividuals([individual, ...individuals]);
    }
    setSelectedIndividual(null);
  };

  const handleUpdate = (updatedIndividual) => {
    setIndividuals(individuals.map(individual =>
      individual._id === updatedIndividual._id ? updatedIndividual : individual
    ));
  };

  const handleDelete = async (individual) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/individuals/${species}/${individual._id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Kunde inte ta bort individen');
      }

      setIndividuals(individuals.filter(i => i._id !== individual._id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <Typography color="white">Laddar individer...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h6" color="white">Individer</Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setSelectedIndividual(null);
            setIsModalOpen(true);
          }}
        >
          Lägg till individ
        </Button>
      </Box>

      {individuals.length === 0 ? (
        <Typography color="white">Inga individer än</Typography>
      ) : (
        <Box>
          {individuals.map((individual) => (
            <IndividualCard
              key={individual._id}
              individual={individual}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              species={species}
            />
          ))}
        </Box>
      )}

      <IndividualModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedIndividual(null);
        }}
        onIndividualCreated={handleIndividualCreated}
        species={species}
        individual={selectedIndividual}
      />
    </Box>
  );
};

export default IndividualList; 