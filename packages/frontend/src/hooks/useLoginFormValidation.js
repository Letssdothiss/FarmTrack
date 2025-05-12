import { useState } from 'react';
import { validateLoginForm } from '../utils/validation/validateLoginForm';

/**
 * Custom hook for login form validation.
 *
 * @param {Object} initialState - The initial state of the form.
 * @returns {Object} Form state and validation functions.
 */
export const useLoginFormValidation = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  /**
   * Handles input changes and updates form state.
   *
   * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change
    const validation = validateLoginForm({ ...formData, [name]: value });
    setErrors(prev => ({
      ...prev,
      [name]: validation.errors[name]
    }));
  };

  /**
   * Validates the form and updates error state.
   *
   * @returns {boolean} Whether the form is valid.
   */
  const validate = () => {
    const validation = validateLoginForm(formData);
    setErrors(validation.errors);
    return validation.isValid;
  };

  /**
   * Resets the form to its initial state.
   */
  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
    resetForm
  };
}; 