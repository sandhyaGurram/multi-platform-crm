import { useEffect, useState } from "react";
import WarehouseInventoryTable from "../components/products/WarehouseInventoryTable";
import { getProducts } from "../services/productService";
import { getTotalStock, getProductStatus } from "../utils/productUtils";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "ARM - Inventory";
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalUnits = products.reduce(
    (total, product) => total + getTotalStock(product),
    0,
  );

  const lowStock = products.filter(
    (product) => getProductStatus(product) === "Low Stock",
  ).length;

  const outOfStock = products.filter(
    (product) => getProductStatus(product) === "Out of Stock",
  ).length;

  const stats = [
    {
      title: "Products Tracked",
      value: products.length,
      icon: <FaBoxOpen className="text-2xl text-[#a51e27]" />,
    },
    {
      title: "Total Units",
      value: totalUnits,
      icon: <FaCheckCircle className="text-2xl text-green-600" />,
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: <FaExclamationTriangle className="text-2xl text-yellow-500" />,
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      icon: <FaTimesCircle className="text-2xl text-red-500" />,
    },
  ];

  if (loading) {
    return <div className="p-6">Loading inventory...</div>;
  }

  return (
    <div className="min-w-0 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="mt-1 text-gray-500">
          Monitor and update stock across your warehouses.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm"
          >
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="mt-1 text-2xl font-bold">{stat.value}</p>
            </div>
            {stat.icon}
          </div>
        ))}
      </div>

      <WarehouseInventoryTable products={products} setProducts={setProducts} />
    </div>
  );
};

export default Inventory;
