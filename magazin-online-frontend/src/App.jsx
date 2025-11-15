import { Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import NewProductPage from "./pages/NewProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Overview</Link>
       <Link to="/new">New product</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/new" element={<NewProductPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
