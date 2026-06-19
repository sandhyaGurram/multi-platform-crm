import ProductsTable from "../components/products/ProductsTable";

import products from "../data/products";
import { useState, useEffect } from "react";
import ProductDrawer from "../components/products/ProductDrawer";

const Products = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleView = (product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  useEffect(() => {
    document.title = "ARM - Products";
  }, []);

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Products Management</h1>

        <input
          type="text"
          placeholder="Search Products..."
          className="bg-white px-4 py-3 rounded-lg shadow outline-none"
        />
      </div>

      {/* Table */}

      <ProductsTable products={products} onView={handleView} />
      <ProductDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
