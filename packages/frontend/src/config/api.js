const API_URL = import.meta.env.PROD 
  ? 'https://farmtrack.lnu.se/api'  // Production
  : 'http://localhost:5000/api';     // Development

// Log API URL for debugging
console.log('API URL:', API_URL);

export default API_URL; 