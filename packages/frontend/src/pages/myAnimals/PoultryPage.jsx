import React from 'react';
import AnimalTypePage from '../../components/layout/AnimalTypePage';
import NotesList from '../../components/common/NotesList';

/**
 * PoultryPage component
 * 
 * @returns {React.ReactElement} The PoultryPage component
 */
const PoultryPage = () => {
  return (
    <AnimalTypePage
      title="Fjäderfä"
      type="poultry"
      leftColumn={
        <NotesList species="poultry" />
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