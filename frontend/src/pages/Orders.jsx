

import OrdersTable from "../components/orders/OrdersTable";
import OrderDrawer from "../components/orders/OrderDrawer";

// import orders from "../data/orders";
import { useEffect, useState } from "react";
import axios from "axios";
import AddOrderModal from "../components/orders/AddOrderModal";
import EditOrderModal from "../components/orders/EditOrderModal";


const Orders = () => {

  const [orders, setOrders] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dateFilter, setDateFilter] = useState("All Orders");

  const handleView = (order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const today = new Date();

const filteredOrders = orders.filter((order) => {

  const orderDate = new Date(order.date);

  const diffTime = today - orderDate;

  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (dateFilter === "Today") {

    return orderDate.toDateString() === today.toDateString();

  }

  if (dateFilter === "Yesterday") {

    return diffDays >= 1 && diffDays < 2;

  }

  if (dateFilter === "Last 7 Days") {

    return diffDays <= 7;

  }

  if (dateFilter === "Last 30 Days") {

    return diffDays <= 30;

  }

  if (dateFilter === "Last Year") {

    return diffDays <= 365;

  }

  return true;

});
  
  
  const fetchOrders = async () => {

  try {

    const { data } = await axios.get(
      "http://localhost:5000/api/orders"
    );

    setOrders(data);

  } catch (error) {

    console.log(error);

  }

};

useEffect(() => {

  fetchOrders();

}, []);

  return (
    <div>

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <h1 className="text-3xl font-bold">
          Orders Management
        </h1>

        <input
          type="text"
          placeholder="Search Orders..."
          className="bg-white px-4 py-3 rounded-lg shadow outline-none"
        />

      </div>

      {/* date selection code */}

      <div className="flex flex-wrap gap-4 mb-6">
      <select
  value={dateFilter}
  onChange={(e) => setDateFilter(e.target.value)}
  className="bg-white px-4 py-3 rounded-lg shadow outline-none"
>

  <option>Today</option>

  <option>Yesterday</option>

  <option>Last 7 Days</option>

  <option>Last 30 Days</option>

  <option>Last Year</option>

  <option>All Orders</option>

      </select>
      {/* date selection code end */}


      <button
  onClick={() => setModalOpen(true)}
  className="bg-black text-white px-5 py-3 rounded-lg"
>
  Add Order
      </button>
      </div>

      {/* Table */}

      <OrdersTable
        orders={filteredOrders}
        onView={handleView}
      />

      <AddOrderModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  refreshOrders={fetchOrders}
/>

      {/* Drawer */}

      <OrderDrawer
  isOpen={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  order={selectedOrder}
  setEditOpen={setEditOpen}
/>

      
      <EditOrderModal
  isOpen={editOpen}
  onClose={() => setEditOpen(false)}
  order={selectedOrder}
  refreshOrders={fetchOrders}
      />
      

    </div>
  );
};

export default Orders;