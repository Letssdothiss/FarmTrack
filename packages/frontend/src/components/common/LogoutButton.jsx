import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * LogoutButton component
 * 
 * @returns {React.ReactElement} The LogoutButton component
 */
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to home page
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#ff4444',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        transition: 'background-color 0.2s',
        ':hover': {
          backgroundColor: '#ff0000'
        }
      }}
    >
      Logga ut
    </button>
  );
};

export default LogoutButton; 