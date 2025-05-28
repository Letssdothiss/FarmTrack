import React, { useState } from 'react';

/**
 * AddIndividualModal component for adding new individuals
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onAdd - Function to add a new individual
 * @returns {React.ReactElement} The AddIndividualModal component
 */
const AddIndividualModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, idNumber });
    setName('');
    setIdNumber('');
    onClose();
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
        backgroundColor: 'rgba(119, 87, 43, 0.95)',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90%'
      }}>
        <h2 style={{ color: 'white', margin: '0 0 20px 0' }}>Lägg till individ</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label htmlFor="name" style={{ color: 'white', display: 'block', marginBottom: '5px' }}>
              Namn
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: 'rgb(69, 49, 22)',
                color: 'white'
              }}
            />
          </div>
          <div>
            <label htmlFor="idNumber" style={{ color: 'white', display: 'block', marginBottom: '5px' }}>
              ID-nummer (valfritt)
            </label>
            <input
              id="idNumber"
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: 'rgb(69, 49, 22)',
                color: 'white'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: 'rgb(40, 167, 69)',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Lägg till
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: 'rgb(108, 117, 125)',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer'
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

export default AddIndividualModal; 