import React, { useState } from 'react';
import Background from './Background';
import LargeRectangleButton from '../common/LargeRectangleButton';
import { useFormValidation } from '../../hooks/useFormValidation';

/**
 * RegisterForm component
 *
 * @returns {React.ReactElement} The RegisterForm component
 */
const RegisterForm = () => {
  const { 
    formData, 
    errors, 
    handleChange, 
    validate, 
    resetForm 
  } = useFormValidation({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false
  });

  // Password requirements.
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  // Handle blur event.
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Handle password change.
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    handleChange(e);
    
    // Update password requirements
    setPasswordRequirements({
      length: value.length >= 12,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[@$!%*?&]/.test(value)
    });
  };

  // Handle submit event.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form.
    if (validate()) {
      try {
        // Send data to backend.
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Ett fel uppstod vid registrering');
        }

        // Save token to localStorage
        localStorage.setItem('token', data.token);
        
        // Reset form
        resetForm();
        
        // Redirect to my-animals page
        window.location.href = '/my-animals';
      } catch (error) {
        console.error('Register error:', error);
        // Here you might want to show the error to the user
      }
    }
  };

  // Get input style.
  const getInputStyle = (fieldName) => ({
    fontSize: '1.2rem',
    padding: '10px',
    border: touched[fieldName] && errors[fieldName] ? '2px solid red' : 'none',
    backgroundColor: 'rgb(69, 49, 22)',
    color: 'white',
    width: '100%',
    borderRadius: '4px'
  });

  // Render the component.
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
          Registrera nytt konto
        </h1>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '100%',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            width: '80%'
          }}>
            <label htmlFor='email' style={{ color: 'white' }}>E-post</label>
            <input 
              type='email' 
              id='email' 
              name='email'
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              style={getInputStyle('email')}
            />
            {touched.email && errors.email && (
              <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.email}</span>
            )}
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            width: '80%'
          }}>
            <label htmlFor='password' style={{ color: 'white' }}>Lösenord</label>
            <input 
              type='password' 
              id='password' 
              name='password'
              value={formData.password}
              onChange={handlePasswordChange}
              onBlur={handleBlur}
              style={getInputStyle('password')}
            />
            {touched.password && errors.password && (
              <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.password}</span>
            )}
            <div style={{ 
              marginTop: '10px',
              padding: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '4px'
            }}>
              <h4 style={{ color: 'white', margin: '0 0 5px 0' }}>Lösenordskrav:</h4>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                color: 'white'
              }}>
                <li style={{ color: passwordRequirements.length ? 'lightgreen' : 'white' }}>
                  ✓ Minst 12 tecken
                </li>
                <li style={{ color: passwordRequirements.uppercase ? 'lightgreen' : 'white' }}>
                  ✓ Minst en stor bokstav
                </li>
                <li style={{ color: passwordRequirements.lowercase ? 'lightgreen' : 'white' }}>
                  ✓ Minst en liten bokstav
                </li>
                <li style={{ color: passwordRequirements.number ? 'lightgreen' : 'white' }}>
                  ✓ Minst en siffra
                </li>
                <li style={{ color: passwordRequirements.special ? 'lightgreen' : 'white' }}>
                  ✓ Minst ett specialtecken (@$!%*?&)
                </li>
              </ul>
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            width: '80%'
          }}>
            <label htmlFor='confirmPassword' style={{ color: 'white' }}>Bekräfta lösenord</label>
            <input 
              type='password' 
              id='confirmPassword' 
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              style={getInputStyle('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.confirmPassword}</span>
            )}
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            marginTop: '20px',
            width: '100%'
          }}>
            <LargeRectangleButton
              text='Registrera'
              type='submit'
              variant='wide'
            />
            <LargeRectangleButton 
              text='Avbryt' 
              to='/' 
              variant='wide'
            />
          </div>
        </form>
      </div>
    </Background>
  );
};

export default RegisterForm;
