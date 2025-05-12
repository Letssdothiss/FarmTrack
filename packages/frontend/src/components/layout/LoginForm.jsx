import React, { useState } from 'react';
import Background from './Background';
import LargeRectangleButton from '../common/LargeRectangleButton';
import { useLoginFormValidation } from '../../hooks/useLoginFormValidation';

/**
 * LoginForm component
 *
 * @returns {React.ReactElement} The LoginForm component
 */
const LoginForm = () => {
  const {
    formData,
    errors,
    handleChange,
    validate,
    resetForm
  } = useLoginFormValidation({
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  // Handle blur event.
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Handle submit event.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form.
    if (validate()) {
      try {
        // Send data to backend.
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Ett fel uppstod vid inloggning');
        }

        // Save token to localStorage
        localStorage.setItem('token', data.token);
        
        // Reset form
        resetForm();
        
        // Redirect to my-animals page
        window.location.href = '/my-animals';
      } catch (error) {
        console.error('Login error:', error);
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
          Logga in
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
              onChange={handleChange}
              onBlur={handleBlur}
              style={getInputStyle('password')}
            />
            {touched.password && errors.password && (
              <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.password}</span>
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
              text='Logga in'
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

export default LoginForm;

