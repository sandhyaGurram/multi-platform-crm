import OrdersTable from "../components/orders/OrdersTable";
import OrderDrawer from "../components/orders/OrderDrawer";

// import orders from "../data/orders";
import { useEffect, useRef, useState } from "react";
import { FileSpreadsheet, Upload, X } from "lucide-react";
import axios from "axios";
import AddOrderModal from "../components/orders/AddOrderModal";
import EditOrderModal from "../components/orders/EditOrderModal";
import SearchBar from "../components/common/SearchBar";
import { API_URL } from "../config/api";
import { searchFilter } from "../utils/searchFilter";

const Orders = ({ platform }) => {
  const [orders, setOrders] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [dateFilter, setDateFilter] = useState("All Orders");

  const [searchTerm, setSearchTerm] = useState("");

  const [excelFile, setExcelFile] = useState(null);

  const [isImporting, setIsImporting] = useState(false);

  const fileInputRef = useRef(null);

  const handleView = (order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const today = new Date();

  const filteredOrders = orders.filter((order) => {
    // DATE FILTER

    // const orderDate = new Date(order.date);

    const orderDate = new Date(order.orderDate);

    const diffTime = today - orderDate;

    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    let matchesDate = true;

    if (dateFilter === "Today") {
      matchesDate = orderDate.toDateString() === today.toDateString();
    } else if (dateFilter === "Yesterday") {
      matchesDate = diffDays >= 1 && diffDays < 2;
    } else if (dateFilter === "Last 7 Days") {
      matchesDate = diffDays <= 7;
    } else if (dateFilter === "Last 30 Days") {
      matchesDate = diffDays <= 30;
    } else if (dateFilter === "Last Year") {
      matchesDate = diffDays <= 365;
    }

    // SEARCH FILTER

    return matchesDate;
  });

  // page indexing

  const platformFilteredOrders = platform
    ? filteredOrders.filter((order) => order.platform === platform)
    : filteredOrders;

  const searchFilteredOrders = searchFilter(
    platformFilteredOrders,

    searchTerm,

    [
      "orderId",
      "customer",
      "customerName",
      "customerPhone",
      "customerEmail",
      "paymentMethod",
      "platform",
      "trackingId",
      "status",
      "productName",
      "sku",
      "category",
      "brand",
    ],
  );

  console.log("Search:", searchTerm);

  console.log("Platform Orders:", platformFilteredOrders);

  console.log("Search Results:", searchFilteredOrders);

  const currentUser = JSON.parse(localStorage.getItem("crmUser"));

  // const fetchOrders = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       // "http://localhost:5000/api/orders",
  //       `${API_URL}/api/orders`,

  //       {
  //         headers: {
  //           Authorization: `Bearer ${currentUser.token}`,
  //         },
  //       },
  //     );

  //     setOrders(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchOrders = async () => {
  try {
    const { data } = await axios.get(
      `${API_URL}/api/orders`,
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    console.log("ORDERS FROM API:", data);
    console.log("TOTAL ORDERS FROM API:", data.length);

    setOrders(data);

  } catch (error) {
    console.log("FETCH ORDERS ERROR:", error);
  }
};




  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    document.title = platform ? `ARM - ${platform} Orders` : "ARM - Orders";
  }, [platform]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        // `http://localhost:5000/api/orders/${id}`,
        `${API_URL}/api/orders/${id}`,

        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImport = async () => {
    if (!excelFile) return;

    const formData = new FormData();

    formData.append("file", excelFile);

    try {
      await axios.post(
        // "http://localhost:5000/api/import/orders",
        `${API_URL}/api/import/orders`,

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Excel Imported");

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-4">
        <h1 className="font-bold">
          {platform ? `${platform} Orders` : "Orders Management"}
        </h1>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search Orders..."
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

        {currentUser?.role === "admin" && (
          <button
            onClick={() => setModalOpen(true)}
            className="bg-black text-white px-5 py-3 rounded-lg"
          >
            Add Order
          </button>
        )}
      </div>

      {/* upload excell file */}
      {/* <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={(e) => setExcelFile(e.target.files[0])}
      /> */}

      {/* FILE IMPORT */}

      {currentUser?.role === "admin" && (
        <div className="mb-6 flex w-full max-w-2xl">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
            className="
      block min-w-0 flex-1
      rounded-l-lg
      border border-r-0 border-gray-300
      bg-white text-sm text-gray-600

      file:mr-4
      file:border-0
      file:border-r
      file:border-gray-300
      file:bg-gray-100
      file:px-4
      file:py-3
      file:text-sm
      file:text-gray-700

      hover:file:bg-gray-200
      focus:outline-none
    "
          />

          <button
            type="button"
            onClick={handleImport}
            disabled={!excelFile || isImporting}
            className="
      whitespace-nowrap
      rounded-r-lg
      border border-gray-300
      bg-white
      px-5
      text-sm font-medium text-gray-700

      hover:bg-gray-100

      disabled:cursor-not-allowed
      disabled:opacity-50
    "
          >
            {isImporting ? "Importing..." : "Import Excel"}
          </button>
        </div>
      )}
      {/* <button
        onClick={handleImport}
        className="bg-green-600 text-white px-5 py-3 rounded-lg"
      >
        Import Excel
      </button> */}

      {/* Table */}

      <OrdersTable
        orders={searchFilteredOrders}
        onView={handleView}
        onDelete={handleDelete}
      />

      {/* pagination */}
      {/* <div className="flex justify-center items-center gap-3 mt-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-bold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div> */}

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
