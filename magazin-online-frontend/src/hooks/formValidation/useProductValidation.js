import { useState } from "react";
import { validateProduct } from "./validators/productValidators";

export const useProductValidation = () => {
  const [errors, setErrors] = useState({});

  const validateForm = (form) => {
    const newErrors = validateProduct(form);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (fieldName, value, form) => {
    const newErrors = validateProduct({ ...form, [fieldName]: value });
    setErrors(newErrors);
  };

  const clearErrors = () => setErrors({});

  return {
    errors,
    validateForm,
    validateField,
    clearErrors,
  };
};
