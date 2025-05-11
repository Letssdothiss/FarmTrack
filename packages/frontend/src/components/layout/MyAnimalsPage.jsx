import React from 'react';
import Background from './Background';

/**
 * MyAnimalsPage component
 *
 * @returns {React.ReactElement} The MyAnimalsPage component
 */
const MyAnimalsPage = () => {
  return (
    <Background>
      <div style={{
        backgroundColor: 'rgb(119, 87, 43, 0.95)',
        width: '500px',
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
          color: 'white',
          margin: '0'
        }}>
          Mina djur
        </h1>
        {/* Här kommer vi senare lägga till en lista med djur */}
      </div>
    </Background>
  );
};

export default MyAnimalsPage;
