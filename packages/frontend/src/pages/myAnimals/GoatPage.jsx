import React from 'react';
import AnimalTypePage from '../../components/layout/AnimalTypePage';

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
        <div style={{ color: 'white' }}>
          {/* Här kommer anteckningar */}
        </div>
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