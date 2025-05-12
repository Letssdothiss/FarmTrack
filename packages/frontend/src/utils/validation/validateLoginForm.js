export function validateLoginForm(formData) {
  const errors = {};
  let isValid = true;

  if (!formData.email) {
    errors.email = 'E-post krävs';
    isValid = false;
  }
  if (!formData.password) {
    errors.password = 'Lösenord krävs';
    isValid = false;
  }

  return { isValid, errors };
} 