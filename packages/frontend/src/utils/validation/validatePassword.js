
/**
 * Validates a password.
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
export const validatePassword = (password) => {
  // Password regex for 12 characters minimum, at least one uppercase letter, one lowercase letter, one number, and one special character.
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
  return passwordRegex.test(password);
}

/**
 * Validates the entered confirmed password.
 *
 * @param {string} password - The password to validate.
 * @param {string} confirmPassword - The confirmed password to validate.
 * @returns {boolean} - True if the confirmed password is valid, false otherwise.
 */
export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Returns an error message for the password field if it is empty.
 *
 * @param {string} password - The password to validate.
 * @returns {string} - The error message.
 */
export const getEmptyPasswordError = (password) => {
  if (!password) return 'Lösenord krävs';
};

/**
 * Returns an error message for the confirm   password field if it is empty.
 *
 * @param {string} confirmPassword - The confirmed password to validate.
 * @returns {string} - The error message.
 */
export const getEmptyConfirmPasswordError = (confirmPassword) => {
  if (!confirmPassword) return 'Bekräfta lösenord krävs';
};

/**
 * Returns an error message for the password field if it is invalid.
 *
 * @param {string} password - The password to validate.
 * @returns {string} - The error message.
 */
export const getInvalidPasswordError = (password) => {
  if (!validatePassword(password)) return 'Lösenord måste vara minst 12 tecken långt och innehålla minst en stor bokstav, en liten bokstav, en siffra och ett specialtecken.';
};

/**
 * Returns an error message for the confirm password field if it is invalid.
 *
 * @param {string} password - The password to validate.
 * @param {string} confirmPassword - The confirmed password to validate.
 * @returns {string} - The error message.
 */
export const getInvalidConfirmPasswordError = (password, confirmPassword) => {
  if (!validateConfirmPassword(password, confirmPassword)) return 'Lösenorden matchar inte';
};
