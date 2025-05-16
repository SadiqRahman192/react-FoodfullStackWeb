export const validateEmail = (email) => {
  // Simplified email validation: allows letters, numbers, and basic email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Kept as is for basic validity, but no strict domain check
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Simplified password validation: at least 6 characters, no specific character type requirements
  const passwordRegex = /^.{6,}$/;
  return passwordRegex.test(password);
};

export const validateName = (name) => {
  // Kept as is: at least 2 characters, only letters and spaces
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  return nameRegex.test(name);
};

export const getPasswordError = (password) => {
  if (password.length < 6) return 'Password must be at least 6 characters long';
  return ''; // No additional checks for uppercase, lowercase, numbers, or special characters
};