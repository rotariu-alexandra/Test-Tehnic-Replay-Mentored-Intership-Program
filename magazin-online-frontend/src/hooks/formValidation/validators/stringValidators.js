export const isNotEmpty = (value) =>
  value != null && value.toString().trim().length > 0;

export const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be at most ${max} characters` : null;

export const minLength = (min) => (value) =>
  value && value.length < min ? `Must be at least ${min} characters` : null;
