import axios from "axios";

import OrderFormModal from "./OrderFormModal";
import { useState } from "react";
import { API_URL } from "../../config/api";

const AddOrderModal = ({ isOpen, onClose, refreshOrders }) => {
  const handleAddOrder = async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem("crmUser"));

      await axios.post(`${API_URL}/api/orders`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      await refreshOrders();

      onClose();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to add order");
    }
  };

  return (
    <OrderFormModal
      isOpen={isOpen}
      onClose={onClose}
      mode="add"
      onSubmit={handleAddOrder}
    />
  );
};

export default AddOrderModal;

// =======================================================================

// import { useState } from "react";
// import axios from "axios";
// import { API_URL } from "../../config/api";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const AddOrderModal = ({ isOpen, onClose, refreshOrders }) => {
//   const [formData, setFormData] = useState({
//     orderId: "",
//     customerName: "",

//     status: "Pending",
//     platform: "Shopify",
//     productName: "",
//     sku: "",
//     variant: "",
//     quantity: "",
//     unitPrice: "",
//     category: "",
//     brand: "",
//     customerPhone: "",
//     customerEmail: "",
//     paymentMethod: "",
//     trackingId: "",
//     amount: "",
//   });

//   // Input Change

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,

//       [e.target.name]: e.target.value,
//     });
//   };

//   // Submit Form

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const user = JSON.parse(localStorage.getItem("crmUser"));

//       await axios.post(
//         `${API_URL}/api/orders`,

//         formData,

//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         },
//       );

//       refreshOrders();

//       onClose();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6">Add Order</h2>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-4"
//         >
//           {/* Order ID */}

//           <input
//             type="text"
//             name="orderId"
//             placeholder="Order ID"
//             onChange={handleChange}
//             className="w-full border p-2 rounded-lg"
//           />

//           <input
//             type="text"
//             placeholder="Product Name"
//             name="productName"
//             className="w-full border p-2 rounded-lg"
//             onChange={handleChange}
//           />

//           <input
//             type="number"
//             placeholder="Quantity"
//             name="quantity"
//             className="w-full border p-2 rounded-lg"
//             onChange={handleChange}
//           />

//           <input
//             type="number"
//             placeholder="Unit Price"
//             name="unitPrice"
//             className="w-full border p-2 rounded-lg"
//             onChange={handleChange}
//           />

//           <input
//             type="number"
//             name="amount"
//             placeholder="Order Amount"
//             className="w-full border p-2 rounded-lg"
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="paymentMethod"
//             placeholder="Payment Method"
//             className="w-full border p-2 rounded-lg"
//             onChange={handleChange}
//           />

//           {/* Customer */}

//           <input
//             type="text"
//             name="customerName"
//             placeholder="Customer Name"
//             onChange={handleChange}
//             className="w-full border p-2 rounded-lg"
//           />

//           {/* Amount */}

//           <input
//             type="text"
//             name="customerPhone"
//             placeholder="Customer Phone"
//             className="w-full border p-2 rounded-lg"
//             onChange={handleChange}
//           />

//           <input
//             type="email"
//             name="customerAddress"
//             placeholder="customer Address"
//             className="w-full border p-2 rounded-lg"
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="trackingId"
//             placeholder="Tracking ID"
//             className="w-full border p-2 rounded-lg"
//             onChange={handleChange}
//           />

//           {/* Status */}

//           <select
//             name="status"
//             onChange={handleChange}
//             className="w-full border p-2 rounded-lg "
//           >
//             <option>Pending</option>

//             <option>Delivered</option>

//             <option>Cancelled</option>
//           </select>

//           <textarea
//             type="text"
//             name="customerAddress"
//             value={formData.customerAddress}
//             onChange={handleChange}
//             placeholder="customerAddress"
//             className="w-full border p-2 rounded-lg md:col-span-2"
//           />

//           {/* Platform */}

//           <select
//             name="platform"
//             onChange={handleChange}
//             className="w-full border p-2 rounded-lg md:col-span-2"
//           >
//             <option>Shopify</option>

//             <option>Amazon</option>

//             <option>Flipkart</option>

//             <option>Meesho</option>

//             <option>Deposite</option>
//           </select>

//           {/* Buttons */}

//           <div className="flex justify-end gap-4 pt-4 ">
//             <button
//               type="button"
//               onClick={onClose}
//               className=" w-full p-2 bg-gray-200 rounded-lg"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="w-full p-2  bg-black text-white rounded-lg whitespace-nowrap"
//             >
//               Save Order
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddOrderModal;
