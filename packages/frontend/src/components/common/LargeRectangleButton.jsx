import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A large rectangle button component.
 * 
 * @param {Object} props - The props for the component.
 * @param {string} props.text - The text for the button.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {string} props.to - The link to the page to navigate to when the button is clicked.
 * @param {string} props.variant - The variant of the button.
 * @returns {React.ReactNode} The button component.
 */
const LargeRectangleButton = ({
  text,
  onClick,
  to,
  variant = 'short'
}) => {
  // The default style for the button.
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
    // If the variant prop is set to short, the following style is applied.
    ...(variant === 'short' ? {
      width: '100px'
      // Any other values for the variant prop will default to the following style. Wide for example.
    } : {
      width: '500px'
    })
  };

  // If the to prop is used with a link to a page, use the Link component.
  if (to) {
    return (
      <Link to={to} style={buttonStyle} onClick={onClick}>
        {text}
      </Link>
    )
  }

  // If the to prop is not used the onClick prop is defaulted.
  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  )
}

export default LargeRectangleButton;
