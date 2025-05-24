import React from 'react';
import { Link } from 'react-router-dom';
import { CowIcon } from '../icons/CowIcon';
import { GoatIcon } from '../icons/GoatIcon';
import { HenIcon } from '../icons/HenIcon';

/**
 * AnimalTypeButton component for displaying animal type buttons
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - The type of animal ('cattle', 'goat', or 'poultry')
 * @param {string} props.to - The route to navigate to
 * @returns {React.ReactElement} The AnimalTypeButton component
 */
const AnimalTypeButton = ({ type, to }) => {
  const getIcon = () => {
    const iconStyle = {
      width: '32px',
      height: '32px'
    };

    switch (type) {
      case 'cattle':
        return <CowIcon style={iconStyle} />;
      case 'goat':
        return <GoatIcon style={iconStyle} />;
      case 'poultry':
        return <HenIcon style={iconStyle} />;
      default:
        return null;
    }
  };

  const getText = () => {
    switch (type) {
      case 'cattle':
        return 'Nötkreatur';
      case 'goat':
        return 'Get';
      case 'poultry':
        return 'Fjäderfä';
      default:
        return '';
    }
  };

  return (
    <Link
      to={to}
      style={{
        backgroundColor: 'rgb(119, 87, 43, 0.95)',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '8px',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        height: '60px',
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: 'rgb(139, 107, 63, 0.95)'
        }
      }}
    >
      {getIcon()}
      <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
        {getText()}
      </span>
    </Link>
  );
};

export default AnimalTypeButton; 