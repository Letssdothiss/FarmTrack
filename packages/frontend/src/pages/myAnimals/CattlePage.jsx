import React from 'react';
import AnimalTypePage from '../../components/layout/AnimalTypePage';

/**
 * CattlePage component
 * 
 * @returns {React.ReactElement} The CattlePage component
 */
const CattlePage = () => {
  return (
    <AnimalTypePage
      title="Nötkreatur"
      type="cattle"
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

export default CattlePage; 