import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../../config/api"

const EditOrderModal = ({ isOpen, onClose, order, refreshOrders }) => {
  const [formData, setFormData] = useState({
     orderId: "",
  customerName: "",
  productName: "",
  sku: "",
  variant: "",
  quantity: "",
  unitPrice: "",
    category: "",
  customerPhone: "",
    customerEmail: "",
  brand: "",
  status: "",
  platform: "",
  });

  useEffect(() => {
    if (order) {
      setFormData({
        orderId: order.orderId || "",
  customerName: order.customerName || "",
  productName: order.productName || "",
  sku: order.sku || "",
  variant: order.variant || "",
  quantity: order.quantity || "",
  unitPrice: order.unitPrice || "",
        category: order.category || "",
        customerPhone: order.customerPhone || "",
  customerEmail:order.customerEmail||"",
  brand: order.brand || "",
  status: order.status || "",
  platform: order.platform || "",
      });
    }
  }, [order]);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("crmUser"));

      await axios.put(
        `${API_URL}/api/orders/${order._id}`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      refreshOrders();

      onClose();
    } catch (error) {
      console.error(error);

alert(
  error.response?.data?.message ||
  "Failed to update order"
);
    }
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Order</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
  type="text"
  name="orderId"
  value={formData.orderId}
  onChange={handleChange}
  placeholder="Order ID"
  className="w-full border p-3 rounded-lg"
/>

          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="customer name"
            className="w-full border p-3 rounded-lg"
          />

          <input
  type="text"
  className="w-full border p-3 rounded-lg"
            name="productName"
            placeholder="Product Name"
  value={formData.productName}
  onChange={handleChange}
/>

<input
  type="text"
  className="w-full border p-3 rounded-lg"
            name="sku"
            placeholder="SKU"
  value={formData.sku}
  onChange={handleChange}
/>

<input
  type="text"
  className="w-full border p-3 rounded-lg"
            name="variant"
            placeholder="Variant"
  value={formData.variant}
  onChange={handleChange}
/>

<input
  type="number"
            className="w-full border p-3 rounded-lg"
            placeholder="quantity"
  name="quantity"
  value={formData.quantity}
  onChange={handleChange}
/>

<input
  type="number"
            className="w-full border p-3 rounded-lg"
            placeholder="unit price"
  name="unitPrice"
  value={formData.unitPrice}
  onChange={handleChange}
/>
<input
  type="text"
  name="category"
  value={formData.category}
  onChange={handleChange}
  placeholder="Category"
  className="w-full border p-3 rounded-lg"
/>

          <input
  type="text"
  name="customerPhone"
  value={formData.customerPhone}
  onChange={handleChange}
  placeholder="customerPhone"
  className="w-full border p-3 rounded-lg"
          />
          <input
  type="text"
  name="customerEmail"
  value={formData.customerEmail}
  onChange={handleChange}
  placeholder="customerEmail"
  className="w-full border p-3 rounded-lg"
/>
<input
  type="text"
  name="brand"
  value={formData.brand}
  onChange={handleChange}
  placeholder="Brand"
  className="w-full border p-3 rounded-lg"
/>
         

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            placeholder="Status"
          >
            <option>Pending</option>

            <option>Delivered</option>

            <option>Cancelled</option>
          </select>

          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            placeholder="platform"
          >
            <option>Shopify</option>

            <option>Amazon</option>

            <option>Flipkart</option>

            <option>Meesho</option>
          </select>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-5 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white px-5 py-3 rounded-lg"
            >
              Update Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderModal;
