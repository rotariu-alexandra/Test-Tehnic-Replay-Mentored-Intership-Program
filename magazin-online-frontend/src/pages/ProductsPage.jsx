import { useState } from "react";
import { useFetchProducts } from "../hooks/products/useFetchProducts.js";
import ProductsTable from "../components/productTable/ProductsTable";
import ProductFilters from "../components/productFilters/ProductFilters";
import { useDebounce } from "../hooks/utilities/useDebounce.js";
import { useUpdateProduct } from "../hooks/products/useUpdateProduct.js";
import { useDeleteProduct } from "../hooks/products/useDeleteProduct.js";
import ProductForm from "../components/productForm/ProductForm";

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
  });

  const debouncedName = useDebounce(filters.name, 500);

  const { data: products = [], isLoading } = useFetchProducts({
    name: debouncedName || undefined,
    minPrice: filters.minPrice || undefined,
    maxPrice: filters.maxPrice || undefined,
  });

  const [editingProduct, setEditingProduct] = useState(null);

  const {
    mutate: updateProduct,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateProduct();

  const {
    mutate: deleteProduct,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteProduct();

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Stergi acest produs?")) {
      deleteProduct(id);
    }
  };

  const handleEditSubmit = (values) => {
    if (!editingProduct) return;

    updateProduct(
      { id: editingProduct.id, data: values },
      {
        onSuccess: () => {
          setEditingProduct(null);
        },
      }
    );
  };

  return (
    <div className="page">
      <h1>Products overview</h1>
    <div className="filters">
      <ProductFilters filters={filters} setFilters={setFilters} />
    </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {deleteError && <p>Eroare la ștergere produs.</p>}
          <ProductsTable
            products={products}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </>
      )}

      {editingProduct && (
        <div className="edit-section">
          <h2>Editează produs</h2>
          {updateError && <p>Eroare la actualizarea produsului.</p>}
          <ProductForm
            initialValues={editingProduct}
            onSubmit={handleEditSubmit}
            submitting={isUpdating}
            buttonLabel="Salvează modificările"
            onCancel={() => setEditingProduct(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
