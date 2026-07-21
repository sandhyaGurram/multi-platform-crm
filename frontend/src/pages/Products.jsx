import ProductsTable from "../components/products/ProductsTable";

import initialProducts from "../data/products";
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

  const [drawerMode, setDrawerMode] = useState("view");

  const [editingId, setEditingId] = useState(null);
  
  const [editedProduct, setEditedProduct] = useState({});

  const [products, setProducts] = useState(initialProducts);

  const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All Categories");
const [selectedStatus, setSelectedStatus] = useState("All Status");

const [isAdding, setIsAdding] = useState(false);

const [newProduct, setNewProduct] = useState({
  name: "",
  category: "",
  sku: "",
  vendor: "",
  price: "",
  stock: "",
  status: "In Stock",
});

const handleAddProduct = () => {
  if (
    !newProduct.name ||
    !newProduct.category ||
    !newProduct.sku ||
    !newProduct.price
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const product = {
    ...newProduct,
    id: `P${1000 + products.length + 1}`,
    price: Number(newProduct.price),
    stock: Number(newProduct.stock),
  };

  setProducts([...products, product]);

  setNewProduct({
    name: "",
    category: "",
    sku: "",
    vendor: "",
    price: "",
    stock: "",
    status: "In Stock",
  });

  setIsAdding(false);
};

const handleView = (product) => {
    setSelectedProduct(product);
    setDrawerMode("view");
    setDrawerOpen(true);
};

const handleEdit = (product) => {
    setEditingId(product.id);
    setEditedProduct({...product,});
};

const handleSave = () => {
    setProducts((prevProducts) =>
        prevProducts.map((product) =>
            product.id === editedProduct.id
                ? editedProduct
                : product
        )
    );

    setEditingId(null);
};



  useEffect(() => {
    document.title = "ARM - Products";
  }, []);


  


  const filteredProducts = products.filter((product) => {
  const matchesSearch =
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All Categories" ||
    product.category === selectedCategory;

  const matchesStatus =
    selectedStatus === "All Status" ||
    product.status === selectedStatus;

  return matchesSearch && matchesCategory && matchesStatus;
});


  const stats = {
  total: filteredProducts.length,

  inStock: filteredProducts.filter((p) => p.stock > 10).length,

  lowStock: filteredProducts.filter((p) => p.stock > 0 && p.stock <= 10).length,

  outStock: filteredProducts.filter((p) => p.stock === 0).length,
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
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="bg-white px-4 py-3 rounded-lg border outline-none w-64"
/>

    <select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
  className="bg-white px-4 py-3 rounded-lg border outline-none"
>
  <option>All Categories</option>
  <option>Skincare</option>
  <option>Beauty</option>
</select>

    <select
  value={selectedStatus}
  onChange={(e) => setSelectedStatus(e.target.value)}
  className="bg-white px-4 py-3 rounded-lg border outline-none"
>
  <option>All Status</option>
  <option>In Stock</option>
  <option>Low Stock</option>
  <option>Out of Stock</option>
</select>



  </div>

</div>


      {/* Dashboard Cards */}

<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">

  <div className="bg-white rounded-lg shadow-sm border p-4 flex items-center justify-between">
  <div>
    <p className="text-xs text-gray-500 uppercase tracking-wide">
      Total Products
    </p>

    <h2 className="text-2xl font-bold text-gray-800">
      {stats.total}
    </h2>
  </div>

  <FaBoxOpen className="text-2xl text-[#a51e27]" />
</div>

  <div className="bg-white rounded-lg shadow-sm border p-4 flex items-center justify-between">
  <div>
    <p className="text-xs text-gray-500 uppercase">In Stock</p>
    <h2 className="text-2xl font-bold">{stats.inStock}</h2>
  </div>

  <FaCheckCircle className="text-2xl text-green-600" />
</div>

<div className="bg-white rounded-lg shadow-sm border p-4 flex items-center justify-between">
  <div>
    <p className="text-xs text-gray-500 uppercase">Low Stock</p>
    <h2 className="text-2xl font-bold">{stats.lowStock}</h2>
  </div>

  <FaExclamationTriangle className="text-2xl text-yellow-500" />
</div>

 <div className="bg-white rounded-lg shadow-sm border p-4 flex items-center justify-between">
  <div>
    <p className="text-xs text-gray-500 uppercase">Out of Stock</p>
    <h2 className="text-2xl font-bold">{stats.outStock}</h2>
  </div>

  <FaTimesCircle className="text-2xl text-red-500" />
</div>

</div>

      {/* Table */}

     <ProductsTable
  products={filteredProducts}
  onView={handleView}
  onEdit={handleEdit}
  editingId={editingId}
  editedProduct={editedProduct}
  setEditedProduct={setEditedProduct}
  handleSave={handleSave}
  setEditingId={setEditingId}

  isAdding={isAdding}
  newProduct={newProduct}
  setNewProduct={setNewProduct}
  handleAddProduct={handleAddProduct}
  setIsAdding={setIsAdding}
/>
      <ProductDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={selectedProduct}
        mode={drawerMode}
      />

 <div className="flex flex-wrap gap-3">
   <button
  onClick={() => setIsAdding(true)}
  className="bg-[#a51e27] text-white px-5 rounded-lg"
>
  + Add Product
</button>
 </div>
     
    </div>
  );
};

export default Products;
