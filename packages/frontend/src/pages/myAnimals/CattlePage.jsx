import React from 'react';
import AnimalTypePage from '../../components/layout/AnimalTypePage';
import NotesList from '../../components/common/NotesList';

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
        <NotesList species="cattle" />
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