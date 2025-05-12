const API_URL = import.meta.env.PROD 
  ? 'https://farmtrack.lnu.se/api'  // Production
  : 'http://localhost:5000/api';     // Development

export default API_URL; 