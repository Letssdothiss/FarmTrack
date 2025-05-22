import React from 'react';

/**
 * Notification component for displaying messages
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - The message to display
 * @param {string} props.type - The type of notification ('error' or 'success')
 * @param {Function} props.onClose - Function to close the notification
 * @returns {React.ReactElement} The Notification component
 */
const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  const backgroundColor = type === 'error' ? 'rgb(220, 53, 69)' : 'rgb(40, 167, 69)';

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor,
      color: 'white',
      padding: '15px 30px',
      borderRadius: '4px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      minWidth: '300px',
      maxWidth: '90%'
    }}>
      <div style={{ flex: 1 }}>{message}</div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '20px',
          padding: '0 5px'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Notification; 