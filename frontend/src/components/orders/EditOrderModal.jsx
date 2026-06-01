import { useState, useEffect } from "react";
import axios from "axios";

const EditOrderModal = ({
  isOpen,
  onClose,
  order,
  refreshOrders,
}) => {

  const [formData, setFormData] = useState({

    customer: "",
    amount: "",
    status: "",
    platform: "",

  });

  useEffect(() => {

    if (order) {

      setFormData({

        customer: order.customerName || "",
        amount: order.amount || "",
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

      const user = JSON.parse(
  localStorage.getItem("crmUser")
);

await axios.put(

  `http://localhost:5000/api/orders/${order._id}`,

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

  if (!isOpen || !order) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-8 rounded-xl w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6">
          Edit Order
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
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