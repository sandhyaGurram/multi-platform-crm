import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config/api";

const AddOrderModal = ({ isOpen, onClose, refreshOrders }) => {

  const [formData, setFormData] = useState({

    orderId: "",
    customer: "",
    amount: "",
    status: "Pending",
    platform: "Shopify",

  });

  // Input Change

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  // Submit Form

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const user = JSON.parse(
  localStorage.getItem("crmUser")
);

await axios.post(

  `${API_URL}/api/orders`,

  formData,

  {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

);

      refreshOrders();

      onClose();

    } catch (error) {

      console.log(error);

    }

  };

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6">
          Add Order
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Order ID */}

          <input
            type="text"
            name="orderId"
            placeholder="Order ID"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Customer */}

          <input
            type="text"
            name="customer"
            placeholder="Customer Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Amount */}

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Status */}

          <select
            name="status"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >

            <option>Pending</option>

            <option>Delivered</option>

            <option>Cancelled</option>

          </select>

          {/* Platform */}

          <select
            name="platform"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >

            <option>Shopify</option>

            <option>Amazon</option>

            <option>Flipkart</option>

            <option>Meesho</option>

          </select>

          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 bg-black text-white rounded-lg"
            >
              Save Order
            </button>

          </div>

        </form>

      </div>

    </div>

  );
};

export default AddOrderModal;