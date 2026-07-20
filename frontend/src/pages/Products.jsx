import ProductsTable from "../components/products/ProductsTable";

import products from "../data/products";
import { useState, useEffect } from "react";
import ProductDrawer from "../components/products/ProductDrawer";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

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

  const stats = {
  total: products.length,

  inStock: products.filter((p) => p.stock > 10).length,

  lowStock: products.filter((p) => p.stock > 0 && p.stock <= 10).length,

  outStock: products.filter((p) => p.stock === 0).length,
};

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

  <div>
    <h1 className="text-4xl font-bold">
      Products
    </h1>

    <p className="text-gray-500 mt-1">
      Manage your product catalog and inventory
    </p>
  </div>

  <div className="flex flex-wrap gap-3">

    <input
      type="text"
      placeholder="Search Products..."
      className="bg-white px-4 py-3 rounded-lg border outline-none w-64"
    />

    <select className="bg-white px-4 py-3 rounded-lg border outline-none">

      <option>All Categories</option>

      <option>Skin Care</option>

      <option>Hair Care</option>

      <option>Beauty</option>

    </select>

    <select className="bg-white px-4 py-3 rounded-lg border outline-none">

      <option>All Status</option>

      <option>In Stock</option>

      <option>Low Stock</option>

      <option>Out Of Stock</option>

    </select>

    <button className="bg-[#a51e27] text-white px-5 rounded-lg">
      + Add Product
    </button>

  </div>

</div>


      {/* Dashboard Cards */}

<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

  <div className="bg-white rounded-xl shadow p-5">

    <FaBoxOpen className="text-3xl text-[#a51e27]" />

    <p className="text-gray-500 mt-2">
      Total Products
    </p>

    <h2 className="text-3xl font-bold">
      {stats.total}
    </h2>

  </div>

  <div className="bg-white rounded-xl shadow p-5">

    <FaCheckCircle className="text-3xl text-green-600" />

    <p className="text-gray-500 mt-2">
      In Stock
    </p>

    <h2 className="text-3xl font-bold">
      {stats.inStock}
    </h2>

  </div>

  <div className="bg-white rounded-xl shadow p-5">

    <FaExclamationTriangle className="text-3xl text-yellow-500" />

    <p className="text-gray-500 mt-2">
      Low Stock
    </p>

    <h2 className="text-3xl font-bold">
      {stats.lowStock}
    </h2>

  </div>

  <div className="bg-white rounded-xl shadow p-5">

    <FaTimesCircle className="text-3xl text-red-500" />

    <p className="text-gray-500 mt-2">
      Out Of Stock
    </p>

    <h2 className="text-3xl font-bold">
      {stats.outStock}
    </h2>

  </div>

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
