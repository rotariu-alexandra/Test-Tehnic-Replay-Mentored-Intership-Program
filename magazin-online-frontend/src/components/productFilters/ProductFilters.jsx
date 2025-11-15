import "./ProductFilters.css";
const ProductFilters = ({ filters, setFilters }) => {
  return (
    <div>
      <input
        placeholder="Search by name"
        value={filters.name}
        onChange={(e) => setFilters(f => ({ ...f, name: e.target.value }))}
      />
      <input
        type="number"
        placeholder="Min price"
        value={filters.minPrice}
        onChange={(e) => setFilters(f => ({ ...f, minPrice: e.target.value }))}
      />
      <input
        type="number"
        placeholder="Max price"
        value={filters.maxPrice}
        onChange={(e) => setFilters(f => ({ ...f, maxPrice: e.target.value }))}
      />
    </div>
  );
};

export default ProductFilters;
