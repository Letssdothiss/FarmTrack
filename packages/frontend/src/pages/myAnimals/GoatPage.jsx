import React from 'react';
import AnimalTypePage from '../../components/layout/AnimalTypePage';
import NotesList from '../../components/common/NotesList';

/**
 * GoatPage component
 * 
 * @returns {React.ReactElement} The GoatPage component
 */
const GoatPage = () => {
  return (
    <AnimalTypePage
      title="Get"
      type="goat"
      leftColumn={
        <NotesList species="goat" />
      }
      rightColumn={
        <div style={{ color: 'white' }}>
          {/* Här kommer individer */}
        </div>
      }
    />
  );
};

export default GoatPage; 