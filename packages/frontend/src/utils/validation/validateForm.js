import { validateEmail } from './validateEmail';
import { validatePassword } from './validatePassword';

/**
 * Validates the entire form data.
 * 
 * @param {Object} formData - The form data to validate.
 * @returns {Object} An object containing validation results and error messages.
 */
export const validateForm = (formData) => {
  // Validate each field
  const emailValid = validateEmail(formData.email);
  const passwordValid = validatePassword(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword;

  // Create error messages.
  const errors = {
    email: !emailValid ? 'Vänligen ange en giltig e-postadress' : '',
    password: !passwordValid ? 'Lösenordet måste vara minst 12 tecken långt och innehålla minst en stor bokstav, en liten bokstav, en siffra och ett specialtecken.' : '',
    confirmPassword: !passwordsMatch ? 'Lösenorden matchar inte' : ''
  };

  // Check if all validations pass.
  const isValid = emailValid && passwordValid && passwordsMatch;

  return {
    isValid,
    errors
  };
};