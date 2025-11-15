import "./ProductTable.css";
import { Link } from "react-router-dom";


const ProductsTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>Nume</th>
          <th>Descriere</th>
          <th>Categorie</th>
          <th>Subcategorie</th>
          <th>Vânzător</th>
          <th>Preț</th>
          <th>Cantitate</th>
          <th>Acțiuni</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td>Nu există produse</td>
          </tr>
        ) : (
          products.map((product) => (
            <tr key={product.id}>
              <td> <Link to={`/products/${product.id}`} className="product-link">
                {product.name}
                </Link>
                </td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.subcategory}</td>
              <td>{product.sellerName}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button type="button" onClick={() => onEdit?.(product)}>
                  Editează
                </button>
                <button
                  type="button"
                  onClick={() => onDelete?.(product.id)}>
                  Șterge
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ProductsTable;
