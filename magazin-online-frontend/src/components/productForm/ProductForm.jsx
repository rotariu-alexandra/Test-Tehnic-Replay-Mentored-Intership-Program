import { useEffect, useState } from "react";
import { useProductValidation } from "../../hooks/formValidation/useProductValidation";
import "./ProductForm.css";

const empty = {
  name: "",
  description: "",
  category: "",
  subcategory: "",
  sellerName: "",
  price: "",
  quantity: "",
};

const ProductForm = ({
  onSubmit,
  submitting,
  initialValues,
  buttonLabel = "Save",
  onCancel,
}) => {
  const [form, setForm] = useState(initialValues || empty);
  const { errors, validateForm, validateField, clearErrors } =
    useProductValidation();

  useEffect(() => {
    setForm(initialValues || empty);
    clearErrors();
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFieldValidation = (e) => {
    const { name, value } = e.target;
    validateField(name, value, form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm(form);
    if (!isValid) return;

    onSubmit({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        onBlur={handleFieldValidation}
      />
      {errors.name && <p className="field-error">{errors.name}</p>}

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        onBlur={handleFieldValidation}
      />
      {errors.description && (
        <p className="field-error">{errors.description}</p>
      )}

      <label htmlFor="category">Category</label>
      <input
        id="category"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        onBlur={handleFieldValidation}
      />
      {errors.category && <p className="field-error">{errors.category}</p>}

      <label htmlFor="subcategory">Subcategory</label>
      <input
        id="subcategory"
        name="subcategory"
        placeholder="Subcategory"
        value={form.subcategory}
        onChange={handleChange}
        onBlur={handleFieldValidation}
      />
      {errors.subcategory && (
        <p className="field-error">{errors.subcategory}</p>
      )}

      <label htmlFor="sellerName">Seller Name</label>
      <input
        id="sellerName"
        name="sellerName"
        placeholder="Seller name"
        value={form.sellerName}
        onChange={handleChange}
        onBlur={handleFieldValidation}
      />
      {errors.sellerName && (
        <p className="field-error">{errors.sellerName}</p>
      )}

      <label htmlFor="price">Price</label>
      <input
        id="price"
        name="price"
        type="number"
        min="0"
        step="0.01"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        onBlur={handleFieldValidation}
      />
      {errors.price && <p className="field-error">{errors.price}</p>}

      <label htmlFor="quantity">Quantity</label>
      <input
        id="quantity"
        name="quantity"
        type="number"
        min="0"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        onBlur={handleFieldValidation}
      />
      {errors.quantity && (
        <p className="field-error">{errors.quantity}</p>
      )}

      <div style={{ marginTop: "0.4rem" }}>
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : buttonLabel}
        </button>

        {onCancel && (
          <button type="button" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
