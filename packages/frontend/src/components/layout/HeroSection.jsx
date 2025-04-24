import React from 'react';
import { Link } from 'react-router-dom';
import backgroundAndLogo from '../../assets/FarmTrackLogo.png';
import LargeRectangleButton from '../common/LargeRectangleButton';

/**
 * The hero section component.
 * Normally used to display landing page content.
 * 
 * @returns {React.ReactNode} The hero section component.
 */
const HeroSection = () => {
  return (
    <div className="hero-section" style={{
      backgroundImage: `url(${backgroundAndLogo})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      minWidth: '100vw',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: 'rgb(39, 38, 38)',
      overflow: 'hidden'
    }}>
      <h3 style={{
        color: 'black',
        fontWeight: 'bold',
        padding: '20px',
        backgroundSize: 'cover',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        marginBottom: '20px',
        minWidth: '100%',
        marginTop: '200px'
      }}>
        Välkommen till din digitala gårdsjournal, alla djur på ett ställe.<br />
        Logga in eller registrera dig för att komma igång.
      </h3>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        marginTop: '20px'
      }}>
        <LargeRectangleButton
          text='Logga in'
          to='/login'
          variant='wide'
        />
        <LargeRectangleButton
          text='Registrera nytt konto'
          to='/register'
          variant='wide'
        />
      </div>
    </div>
  );
};

export default HeroSection;