// Determine if we're in production based on the current URL
const isProduction = window.location.hostname === 'cscloud7-138.lnu.se';

const API_URL = isProduction
  ? 'https://cscloud7-138.lnu.se/api'  // Production
  : 'http://localhost:5000/api';        // Development

// Log API URL and environment for debugging
console.log('Environment:', isProduction ? 'Production' : 'Development');
console.log('API URL:', API_URL);

export default API_URL; 