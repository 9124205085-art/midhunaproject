export const validateRegister = (form) => {
  const errors = {};
  if (!form.fullName?.trim()) errors.fullName = 'Full name is required.';
  if (!form.age || isNaN(Number(form.age)) || Number(form.age) < 5 || Number(form.age) > 25) {
    errors.age = 'Enter a valid age (5-25).';
  }
  if (!form.classGrade?.trim()) errors.classGrade = 'Class is required.';
  if (!form.school?.trim()) errors.school = 'School is required.';
  if (!form.location?.trim()) errors.location = 'Location is required.';
  if (!form.preferredLanguage?.trim()) errors.preferredLanguage = 'Preferred language is required.';
  if (!form.parentContact?.trim()) errors.parentContact = 'Parent/Guardian contact is required.';
  if (!form.username?.trim() || form.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters.';
  }
  if (!form.password || form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }
  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  return errors;
};

export const validateLogin = (form) => {
  const errors = {};
  if (!form.username?.trim()) errors.username = 'Username is required.';
  if (!form.password) errors.password = 'Password is required.';
  return errors;
};
