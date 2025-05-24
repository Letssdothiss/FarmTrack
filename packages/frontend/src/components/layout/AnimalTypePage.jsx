import React from 'react';
import Background from './Background';
import LogoutButton from '../common/LogoutButton';

/**
 * AnimalTypePage component for displaying animal type specific pages
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the page
 * @param {React.ReactNode} props.leftColumn - Content for the left column
 * @param {React.ReactNode} props.rightColumn - Content for the right column
 * @returns {React.ReactElement} The AnimalTypePage component
 */
const AnimalTypePage = ({ title, leftColumn, rightColumn }) => {
  return (
    <Background showBackButton={true} backTo="/my-animals">
      <LogoutButton />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        {/* Left column for notes */}
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
            width: '80%',
            color: 'white',
            margin: '0',
            borderBottom: '2px solid white'
          }}>
            {title} - Anteckningar
          </h1>
          {leftColumn}
        </div>

        {/* Right column for individuals */}
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
            width: '80%',
            color: 'white',
            margin: '0',
            borderBottom: '2px solid white'
          }}>
            {title} - Individer
          </h1>
          {rightColumn}
        </div>
      </div>
    </Background>
  );
};

export default AnimalTypePage; 