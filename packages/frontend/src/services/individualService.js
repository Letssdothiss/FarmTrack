import API_URL from '../config/api';

/**
 * Service for handling individual-related API calls
 */
const individualService = {
  /**
   * Get all individuals of a specific type
   * @param {string} animalType - The type of animal
   * @returns {Promise<Array>} Array of individuals
   */
  getIndividuals: async (animalType) => {
    try {
      const response = await fetch(`${API_URL}/individuals/${animalType}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch individuals');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching individuals:', error);
      throw error;
    }
  },

  /**
   * Get a specific individual
   * @param {string} animalType - The type of animal
   * @param {string} name - The name of the individual
   * @returns {Promise<Object>} The individual
   */
  getIndividual: async (animalType, name) => {
    try {
      const response = await fetch(`${API_URL}/individuals/${animalType}/${name}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch individual');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching individual:', error);
      throw error;
    }
  },

  /**
   * Create a new individual
   * @param {Object} individual - The individual data
   * @param {string} individual.name - The name of the individual
   * @param {string} individual.idNumber - The ID number of the individual
   * @param {string} individual.animalType - The type of animal
   * @returns {Promise<Object>} The created individual
   */
  createIndividual: async (individual) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/individuals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(individual)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create individual');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating individual:', error);
      throw error;
    }
  },

  /**
   * Add a note to an individual
   * @param {string} animalType - The type of animal
   * @param {string} name - The name of the individual
   * @param {string} content - The content of the note
   * @returns {Promise<Object>} The updated individual
   */
  addNote: async (animalType, name, content) => {
    try {
      const response = await fetch(`${API_URL}/individuals/${animalType}/${name}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add note');
      }

      return response.json();
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  },

  /**
   * Update an existing individual
   * @param {string} individualId - The ID of the individual to update
   * @param {Object} updates - The updates to apply
   * @returns {Promise<Object>} The updated individual
   */
  updateIndividual: async (individualId, updates) => {
    try {
      const response = await fetch(`${API_URL}/individuals/${individualId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update individual');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating individual:', error);
      throw error;
    }
  },

  /**
   * Delete an individual
   * @param {string} individualId - The ID of the individual to delete
   * @returns {Promise<void>}
   */
  deleteIndividual: async (individualId) => {
    try {
      const response = await fetch(`${API_URL}/individuals/${individualId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete individual');
      }
    } catch (error) {
      console.error('Error deleting individual:', error);
      throw error;
    }
  }
};

export default individualService; 