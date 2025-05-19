const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'  // Development
  : 'https://cscloud7-138.lnu.se/api';  // Production

// Log API URL for debugging
console.log('API URL:', API_URL);

export default API_URL; 