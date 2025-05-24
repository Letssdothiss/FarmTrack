import React from 'react';
import AnimalTypePage from '../../components/layout/AnimalTypePage';

/**
 * PoultryPage component
 * 
 * @returns {React.ReactElement} The PoultryPage component
 */
const PoultryPage = () => {
  return (
    <AnimalTypePage
      title="Fjäderfä"
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

export default PoultryPage; 