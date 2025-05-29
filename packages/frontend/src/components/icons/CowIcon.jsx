import React from 'react';

/**
 * CowIcon component for displaying a cow icon
 * 
 * @param {Object} props - Component props
 * @param {Object} props.style - Style object for the SVG
 * @returns {React.ReactElement} The CowIcon component
 */
export const CowIcon = ({ style }) => (
  <svg 
    data-testid="cow-icon"
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
    <path d="M5 7C3.5 8.5 3 11 5 12c1.5 1 1-1 3-1" />
    <path d="M19 7c1.5 1.5 2 4 0 5-1.5 1-1-1-3-1" />
    <circle cx="9" cy="14" r="1" />
    <circle cx="15" cy="14" r="1" />
    <path d="M8 17c1 1 3 1 4 1s3 0 4-1" />
    <path d="M12 18v2" />
    <path d="M7 9c0-4 10-4 10 0" />
  </svg>
);