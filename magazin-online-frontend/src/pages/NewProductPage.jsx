import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "../hooks/products/useCreateProduct";
import ProductForm from "../components/productForm/ProductForm";

const NewProductPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useCreateProduct();

  const handleSubmit = (values) => {
    mutate(values, {
      onSuccess: () => navigate("/"), 
    });
  };

 let errorMessage = "";
  if (error?.response) {
    const { status, data } = error.response;

    if (status === 409) {
      errorMessage = data?.message || "Produsul există deja.";
    } else if (status === 400) {
      errorMessage = "Date invalide. Te rugăm să verifici câmpurile.";
    } else {
      errorMessage = "A apărut o eroare la salvare.";
    }
  } else if (error) {
    errorMessage = "Nu s-a putut comunica cu serverul.";
  }

  return (
    <div className="page">
      <h1>New product</h1>

      {errorMessage && <p className="error-text">{errorMessage}</p>}

      <ProductForm onSubmit={handleSubmit} submitting={isPending} />
    </div>
  );
};

export default NewProductPage;
