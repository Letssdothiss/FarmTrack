import React from 'react';

/**
 * HenIcon component for displaying a hen icon
 * 
 * @param {Object} props - Component props
 * @param {Object} props.style - Style object for the SVG
 * @returns {React.ReactElement} The HenIcon component
 */
export const HenIcon = ({ style }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M12 6c0-2-2-3-3-2s1 2-1 3c-2 .5-4 2-4 5s3 6 8 6 8-3 8-6c0-2-1-3-2-4l-1-2" />
    <circle cx="14" cy="10" r="1" />
    <path d="M17 5l2-2" />
    <path d="M17 5l-2-2" />
  </svg>
);