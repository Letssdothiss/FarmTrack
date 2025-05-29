import React from 'react';

/**
 * GoatIcon component for displaying a goat icon
 * 
 * @param {Object} props - Component props
 * @param {Object} props.style - Style object for the SVG
 * @returns {React.ReactElement} The GoatIcon component
 */
export const GoatIcon = ({ style }) => (
  <svg 
    data-testid="goat-icon"
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={style}
  >
    <path d="M4 8c0-3 4-6 5-4" />
    <path d="M20 8c0-3-4-6-5-4" />
    <path d="M7 9c-1 3 1 6 5 6s6-3 5-6" />
    <circle cx="9" cy="13" r="1" />
    <circle cx="15" cy="13" r="1" />
    <path d="M12 15v4" />
    <path d="M11 19h2" />
  </svg>
);