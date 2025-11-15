export const isNumber = (value) =>
  value === "" || value === null || value === undefined
    ? "Must be a valid number"
    : isNaN(Number(value))
    ? "Must be a valid number"
    : null;

export const isPositive = (value) =>
  Number(value) < 0 ? "Cannot be negative" : null;

export const minValue = (min) => (value) =>
  Number(value) < min ? `Must be at least ${min}` : null;
