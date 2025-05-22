import React from 'react';
import Background from './Background';
import LogoutButton from '../common/LogoutButton';

/**
 * MyAnimalsPage component
 *
 * @returns {React.ReactElement} The MyAnimalsPage component
 */
const MyAnimalsPage = () => {
  return (
    <Background showBackButton={false}>
      <LogoutButton />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
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
            color: 'white',
            margin: '0'
          }}>
            Min Profil
          </h1>
          {/* Här kommer vi senare lägga till en lista med djur */}
        </div>
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
            color: 'white',
            margin: '0'
          }}>
            Mina Djur
          </h1>
        </div>
      </div>
    </Background>
  );
};

export default MyAnimalsPage;
