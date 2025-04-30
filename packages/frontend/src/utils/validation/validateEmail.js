/**
 * Validates an email address.
 *
 * @param {string} email - The email to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export const validateEmail = (email) => {
  // Common email validation regex. Checks for common email formats.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (emailRegex.test(email));
};

/**
 * Returns an error message for the email field.
 *
 * @param {string} email - The email to validate.
 * @returns {string} - The error message.
 */
export const getEmailError = (email) => {
  if (!email) return 'E-postadress krävs';
  if (!validateEmail(email)) return 'Ogiltig e-postadress';
  return '';
};
