import React, { useState } from 'react';
import { fetchWithAuth } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

/**
 * DeleteAccountModal component
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @returns {React.ReactElement} The DeleteAccountModal component
 */
const DeleteAccountModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsDeleting(true);

    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/auth/delete-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Ett fel uppstod vid radering av kontot');
      }

      // Rensa localStorage och redirecta till login
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      setError(error.message);
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'rgb(119, 87, 43, 0.95)',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90%'
      }}>
        <h2 style={{ color: 'white', margin: '0 0 20px 0' }}>Radera konto</h2>
        <p style={{ color: 'white', marginBottom: '20px' }}>
          Detta kommer att permanent radera ditt konto och all data associerad med det. 
          Detta kan inte ångras.
        </p>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <div>
            <label
              htmlFor="password"
              style={{ color: 'white', display: 'block', marginBottom: '5px' }}
            >
              Bekräfta med ditt lösenord
            </label>
            <input
              id="password"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'rgb(69, 49, 22)',
                color: 'white'
              }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {error}
            </div>
          )}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '20px'
          }}>
            <button
              type="submit"
              disabled={isDeleting}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: 'rgb(220, 53, 69)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                opacity: isDeleting ? 0.7 : 1
              }}
            >
              {isDeleting ? 'Raderar...' : 'Radera konto'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: 'rgb(108, 117, 125)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                opacity: isDeleting ? 0.7 : 1
              }}
            >
              Avbryt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountModal; 