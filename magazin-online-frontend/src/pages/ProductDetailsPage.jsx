import { useParams, Link } from "react-router-dom";
import { useFetchProduct } from "../hooks/products/useFetchProduct";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useFetchProduct(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !product) return <p>Product not found.</p>;

  return (
    <div className="page">
      <h1>{product.name}</h1>

      <div className="product-form">
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Subcategory:</strong> {product.subcategory}
        </p>
        <p>
          <strong>Seller:</strong> {product.sellerName}
        </p>
        <p>
          <strong>Price:</strong> {product.price} RON
        </p>
        <p>
          <strong>Quantity:</strong> {product.quantity}
        </p>

        <Link to="/">
          <button type="button">Back to list</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
