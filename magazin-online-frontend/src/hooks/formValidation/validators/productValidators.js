import { isNotEmpty, maxLength } from "./stringValidators";
import { isNumber, isPositive, minValue } from "./numberValidators";

export const validateProduct = (form) => {
  const errors = {};

  if (!isNotEmpty(form.name)) {
    errors.name = "Name is required";
  } else {
    const msg = maxLength(255)(form.name);
    if (msg) errors.name = msg;
  }

  if (!isNotEmpty(form.description)) {
    errors.description = "Description is required";
  } else {
    const msg = maxLength(2000)(form.description);
    if (msg) errors.description = msg;
  }

  if (!isNotEmpty(form.category)) {
    errors.category = "Category is required";
  } else {
    const msg = maxLength(100)(form.description);
    if (msg) errors.description = msg;
  }

  if (!isNotEmpty(form.subcategory)) {
    errors.subcategory = "Subcategory is required";
  } else {
    const msg = maxLength(100)(form.description);
    if (msg) errors.description = msg;
  }

  if (!isNotEmpty(form.sellerName)) {
    errors.sellerName = "Seller name is required";
  } else {
    const msg = maxLength(150)(form.sellerName);
    if (msg) errors.sellerName = msg;
  }

  {
    const msgNum = isNumber(form.price);
    const msgPos = msgNum
      ? null
      : isPositive(form.price) || minValue(0.01)(form.price);
    if (msgNum || msgPos) {
      errors.price = msgNum || msgPos;
    }
  }

  {
    const msgNum = isNumber(form.quantity);
    const msgMin = msgNum ? null : minValue(0)(form.quantity);
    if (msgNum || msgMin) {
      errors.quantity = msgNum || msgMin;
    }
  }

  return errors;
};
