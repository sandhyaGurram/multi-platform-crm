import { useState, useEffect } from "react";

import CustomersTable from "../components/customers/CustomersTable";

import CustomerDrawer from "../components/customers/CustomerDrawer";

import customers from "../data/customers";

const Customers = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // View Button Handler

  const handleView = (customer) => {
    setSelectedCustomer(customer);

    setDrawerOpen(true);
  };

  useEffect(() => {
    document.title = "ARM - Customers";
  }, []);

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Customers Management</h1>

        <input
          type="text"
          placeholder="Search Customers..."
          className="bg-white px-4 py-3 rounded-lg shadow outline-none"
        />
      </div>

      {/* Customers Table */}

      <CustomersTable customers={customers} onView={handleView} />

      {/* Drawer */}

      <CustomerDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default Customers;
