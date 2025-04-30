import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/**
 * A button component that navigates back to the previous page.
 * 
 * @param {Object} props - The props for the component.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {string} props.to - The link to the page to navigate to when the button is clicked.
 * @returns {React.ReactNode} The button component.
 */
const GoBackButton = ({
    onClick,
    to,
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
      width: '35px',
      height: '24px',
    };
  
    // If the to prop is used with a link to a page, use the Link component.
    if (to) {
      return (
        <Link to={to} style={buttonStyle} onClick={onClick}>
          <ArrowBackIcon />
        </Link>
      )
    }
  
    // If the to prop is not used the onClick prop is defaulted.
    return (
      <button style={buttonStyle} onClick={onClick}>
        <ArrowBackIcon />
      </button>
    )
  }
  
  export default GoBackButton;
  