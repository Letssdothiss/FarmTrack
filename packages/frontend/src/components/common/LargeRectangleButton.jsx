import React from 'react';
import { Link } from 'react-router-dom';

const LargeRectangleButton = ({
  text,
  onClick,
  to,
  variant = 'short'
}) => {
  const buttonStyle = {
    color: 'white',
    padding: '15px 20px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
    backgroundColor: 'rgb(119, 87, 43, 0.95)',
    ...(variant === 'short' ? {
      width: '100px'
    } : {
      width: '500px'
    })
  };

  if (to) {
    return (
      <Link to={to} style={buttonStyle} onClick={onClick}>
        {text}
      </Link>
    )
  }

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  )
}

export default LargeRectangleButton;
