import { useState } from "react";

import OrdersTable from "../components/orders/OrdersTable";
import OrderDrawer from "../components/orders/OrderDrawer";

import orders from "../data/orders";

const Orders = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleView = (order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

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

      {/* Table */}

      <OrdersTable
        orders={orders}
        onView={handleView}
      />

      {/* Drawer */}

      <OrderDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        order={selectedOrder}
      />

    </div>
  );
};

export default Orders;