import React from 'react';
import backgroundImage from '../../assets/FarmTrackBcg.png';
import GoBackButton from '../common/GoBackButton';

/**
 * A background component that provides a consistent background image and back button
 * for all pages in the application.
 * 
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be displayed on top of the background.
 * @param {string} [props.backTo] - The path to navigate to when the back button is clicked.
 * @returns {React.ReactNode} The background component with content and back button.
 */
const Background = ({ children, backTo = '/' }) => {
  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
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
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px'
      }}>
        <GoBackButton to={backTo} />
      </div>
      {children}
    </div>
  );
};

export default Background; 