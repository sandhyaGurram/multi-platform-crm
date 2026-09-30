import OrdersTable from "../components/orders/OrdersTable";
import OrderDrawer from "../components/orders/OrderDrawer";

// import orders from "../data/orders";
import { useEffect, useRef, useState } from "react";
import { FileSpreadsheet, Upload, X } from "lucide-react";
import * as XLSX from "xlsx";
import axios from "axios";
import AddOrderModal from "../components/orders/AddOrderModal";
import EditOrderModal from "../components/orders/EditOrderModal";
import SearchBar from "../components/common/SearchBar";
import { API_URL } from "../config/api";
import { searchFilter } from "../utils/searchFilter";
import StatsCards from "../components/common/StatsCards";

const Orders = ({ platform }) => {
  const [orders, setOrders] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  const [selectedOrderIds, setSelectedOrderIds] = useState([]);

  const [paymentFilter, setPaymentFilter] = useState("All");

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
    console.log("FETCH ORDERS STARTED");

    try {
      const currentUser = JSON.parse(localStorage.getItem("crmUser"));

      console.log("CURRENT USER:", currentUser);
      console.log("API URL:", API_URL);
      console.log("TOKEN:", currentUser?.token);

      const response = await axios.get(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });

      console.log("API RESPONSE:", response);
      console.log("ORDERS FROM API:", response.data);
      console.log("TOTAL ORDERS FROM API:", response.data.length);

      setOrders(response.data);
    } catch (error) {
      console.error("FETCH ORDERS ERROR:", error);
      console.error("ERROR RESPONSE:", error.response);
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

  const handleSelectOrder = (orderId) => {
    setSelectedOrderIds((prev) => {
      if (prev.includes(orderId)) {
        return prev.filter((id) => id !== orderId);
      }

      return [...prev, orderId];
    });
  };

  const handleSelectAll = () => {
    if (selectedOrderIds.length === searchFilteredOrders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(searchFilteredOrders.map((order) => order._id));
    }
  };

  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedOrderIds(selectedRows.map((order) => order._id));
  };

  const handleExportSelected = () => {
    if (selectedOrderIds.length === 0) {
      alert("Please select at least one order.");
      return;
    }

    const selectedOrders = searchFilteredOrders.filter((order) =>
      selectedOrderIds.includes(order._id),
    );

    const exportData = selectedOrders.map((order) => ({
      "Order ID": order.orderId || "",
      Platform: order.platform || "",

      "Order Date": order.orderDate
        ? new Date(order.orderDate).toLocaleString("en-IN")
        : "",

      "Customer Name": order.customerName || "",
      "Customer Phone": order.customerPhone || "",
      "Customer Email": order.customerEmail || "",

      Address: order.customerAddress || "",
      City: order.city || "",
      State: order.state || "",
      Pincode: order.pincode || "",

      Product: order.productName || "",
      SKU: order.sku || "",
      Variant: order.variant || "",

      Quantity: order.quantity || 0,
      "Unit Price": order.unitPrice || 0,
      Amount: order.amount || 0,

      "Payment Method": order.paymentMethod || "",
      "Payment Status": order.paymentStatus || "",

      "Order Status": order.orderStatus || "",
      "Fulfillment Status": order.fulfillmentStatus || "",
      "Delivery Status": order.deliveryStatus || "",

      Courier: order.courierPartner || "",
      "AWB Number": order.awbNumber || "",
      "Tracking ID": order.trackingId || "",
      "Tracking URL": order.trackingUrl || "",

      Tax: order.taxAmount || 0,
      "Shipping Charge": order.shippingCharge || 0,
      Discount: order.discountAmount || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    XLSX.writeFile(
      workbook,
      `selected-orders-${new Date().toISOString().split("T")[0]}.xlsx`,
    );

    // Clear selection after export
    setSelectedOrderIds([]);
  };

  const handleExport = () => {
    if (!searchFilteredOrders.length) {
      alert("No orders available to export.");
      return;
    }

    const exportData = searchFilteredOrders.map((order) => ({
      "Order ID": order.orderId || "",
      Platform: order.platform || "",

      "Order Date": order.orderDate
        ? new Date(order.orderDate).toLocaleString("en-IN")
        : "",

      "Customer Name": order.customerName || "",
      "Customer Phone": order.customerPhone || "",
      "Customer Email": order.customerEmail || "",

      Address: order.customerAddress || "",
      City: order.city || "",
      State: order.state || "",
      Pincode: order.pincode || "",
      Country: order.country || "",

      Product: order.productName || "",
      SKU: order.sku || "",
      Variant: order.variant || "",

      Quantity: order.quantity || 0,
      "Unit Price": order.unitPrice || 0,
      Amount: order.amount || 0,

      "Payment Method": order.paymentMethod || "",
      "Payment Status": order.paymentStatus || "",

      "Order Status": order.orderStatus || "",
      "Fulfillment Status": order.fulfillmentStatus || "",
      "Delivery Status": order.deliveryStatus || "",

      Courier: order.courierPartner || "",
      "AWB Number": order.awbNumber || "",
      "Tracking ID": order.trackingId || "",
      "Tracking URL": order.trackingUrl || "",

      Tax: order.taxAmount || 0,
      "Shipping Charge": order.shippingCharge || 0,
      Discount: order.discountAmount || 0,

      "Delivery Date": order.deliveryDate
        ? new Date(order.deliveryDate).toLocaleString("en-IN")
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const today = new Date().toISOString().split("T")[0];

    XLSX.writeFile(workbook, `orders-${today}.xlsx`);
  };

  const handleExportAll = () => {
    if (!searchFilteredOrders.length) {
      alert("No orders available to export.");
      return;
    }

    const exportData = searchFilteredOrders.map((order) => ({
      "Order ID": order.orderId || "",
      Platform: order.platform || "",
      "Order Date": order.orderDate
        ? new Date(order.orderDate).toLocaleString("en-IN")
        : "",
      "Customer Name": order.customerName || "",
      "Customer Phone": order.customerPhone || "",
      "Customer Email": order.customerEmail || "",
      Address: order.customerAddress || "",
      City: order.city || "",
      State: order.state || "",
      Pincode: order.pincode || "",
      Product: order.productName || "",
      SKU: order.sku || "",
      Variant: order.variant || "",
      Quantity: order.quantity || 0,
      "Unit Price": order.unitPrice || 0,
      Amount: order.amount || 0,
      "Payment Method": order.paymentMethod || "",
      "Payment Status": order.paymentStatus || "",
      "Order Status": order.orderStatus || "",
      "Fulfillment Status": order.fulfillmentStatus || "",
      "Delivery Status": order.deliveryStatus || "",
      Courier: order.courierPartner || "",
      "AWB Number": order.awbNumber || "",
      "Tracking ID": order.trackingId || "",
      "Tracking URL": order.trackingUrl || "",
      Tax: order.taxAmount || 0,
      "Shipping Charge": order.shippingCharge || 0,
      Discount: order.discountAmount || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    XLSX.writeFile(
      workbook,
      `all-orders-${new Date().toISOString().split("T")[0]}.xlsx`,
    );

    setExportMenuOpen(false);
  };

  // ===============================
  // ORDER STATUS NORMALIZER
  // ===============================

  const getOrderStatus = (order) => {
    return String(
      order.deliveryStatus ||
        order.fulfillmentStatus ||
        order.orderStatus ||
        "",
    )
      .trim()
      .toLowerCase()
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ");
  };

  // ===============================
  // ORDER STATISTICS
  // Uses the same filtered orders
  // that are displayed in the table
  // ===============================

  const orderStats = [
    {
      title: "Total Orders",
      value: platformFilteredOrders.length,
    },

    {
      title: "Delivered",
      value: platformFilteredOrders.filter(
        (order) => getOrderStatus(order) === "delivered",
      ).length,
    },

    {
      title: "Cancelled",
      value: platformFilteredOrders.filter((order) => {
        const status = getOrderStatus(order);

        return status === "cancelled" || status === "canceled";
      }).length,
    },

    {
      title: "In Transit + Out for Delivery",
      value: platformFilteredOrders.filter((order) => {
        const status = getOrderStatus(order);

        return status === "in transit" || status === "out for delivery";
      }).length,
    },

    {
      title: "Unfulfilled",
      value: platformFilteredOrders.filter(
        (order) => getOrderStatus(order) === "unfulfilled",
      ).length,
    },

    {
      title: "COD Orders",
      value: platformFilteredOrders.filter((order) => {
        const paymentMethod = (order.paymentMethod || "").toLowerCase();

        return (
          paymentMethod.includes("cod") ||
          paymentMethod.includes("cash on delivery") ||
          paymentMethod.includes("cash_on_delivery")
        );
      }).length,

      onClick: () => {
        setPaymentFilter(paymentFilter === "COD" ? "All" : "COD");
      },
    },

    {
      title: "Paid Orders",
      value: platformFilteredOrders.filter((order) => {
        return (order.paymentStatus || "").toLowerCase() === "paid";
      }).length,

      onClick: () => {
        setPaymentFilter(paymentFilter === "Paid" ? "All" : "Paid");
      },
    },
  ];

  return (
    <div>
      {/* =========================
    MOBILE HEADER
========================= */}
      <div className="sm:hidden mb-5 space-y-3">
        {/* ROW 1 — TITLE + SEARCH */}
        <div className="flex items-center gap-3">
          <h1
            className="
      text-[25px]
      font-semibold
      tracking-tight
      text-[#172033]
      whitespace-nowrap
    "
          >
            {platform ? `${platform} Orders` : "Orders"}
          </h1>

          <div className="flex-1 min-w-0">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search Orders..."
            />
          </div>
        </div>

        {/* ROW 2 — FILTER + ADD + EXPORT */}
        <div className="flex items-center gap-2">
          {/* DATE FILTER */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="
        h-10
        flex-1
        min-w-0
        px-3
        rounded-xl
        border border-[#E2E8F0]
        bg-white
        text-sm
        font-medium
        text-[#64748B]
        outline-none
        shadow-[0_2px_8px_rgba(15,23,42,0.04)]
      "
          >
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last Year">Last Year</option>
            <option value="All Orders">All Orders</option>
          </select>

          {/* ADD ORDER */}
          {currentUser?.role === "admin" && (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="
          h-10
          px-3.5
          rounded-xl
          bg-[#111827]
          text-white
          text-sm
          font-medium
          whitespace-nowrap
          transition
          active:scale-95
        "
            >
              Add Order
            </button>
          )}

          {/* EXPORT */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setExportMenuOpen((prev) => !prev)}
              className="
          h-10
          px-4
          rounded-xl
          bg-[#0F9D58]
          text-white
          text-sm
          font-medium
          flex
          items-center
          gap-1.5
          whitespace-nowrap
          transition
          active:scale-95
        "
            >
              <FileSpreadsheet size={16} />
              Export
            </button>

            {exportMenuOpen && (
              <div
                className="
          absolute
          right-0
          top-full
          mt-2
          w-52
          bg-white
          rounded-xl
          border border-[#E5E7EB]
          shadow-[0_12px_30px_rgba(15,23,42,0.12)]
          overflow-hidden
          z-50
        "
              >
                <button
                  type="button"
                  onClick={handleExportSelected}
                  disabled={selectedOrderIds.length === 0}
                  className="
              w-full
              px-4
              py-3
              text-left
              text-sm
              text-[#334155]
              hover:bg-[#F8FAFC]
              disabled:opacity-40
            "
                >
                  Export Selected
                  {selectedOrderIds.length > 0 &&
                    ` (${selectedOrderIds.length})`}
                </button>

                <div className="h-px bg-[#F1F5F9]" />

                <button
                  type="button"
                  onClick={handleExportAll}
                  className="
              w-full
              px-4
              py-3
              text-left
              text-sm
              text-[#334155]
              hover:bg-[#F8FAFC]
            "
                >
                  Export All Orders
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ROW 3 — EXCEL IMPORT */}
        {currentUser?.role === "admin" && (
          <div
            className="
      flex
      items-center
      h-10
      w-full
      rounded-xl
      border border-[#E2E8F0]
      bg-white
      overflow-hidden
    "
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
              className="
          min-w-0
          flex-1
          w-full
          text-xs
          text-[#64748B]

          file:mr-2
          file:border-0
          file:border-r
          file:border-[#E2E8F0]
          file:bg-[#F8FAFC]
          file:px-3
          file:py-2.5
          file:text-xs
          file:text-[#475569]

          hover:file:bg-[#F1F5F9]
        "
            />

            <button
              type="button"
              onClick={handleImport}
              disabled={!excelFile || isImporting}
              className="
          h-full
          px-4
          whitespace-nowrap
          border-l
          border-[#E2E8F0]
          text-sm
          font-medium
          text-[#64748B]
          hover:bg-[#F8FAFC]
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
            >
              {isImporting ? "Importing..." : "Import"}
            </button>
          </div>
        )}
      </div>

      {/* desktop Header */}

      <div className="hidden sm:flex flex-wrap items-center gap-3 mb-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold whitespace-nowrap">
          {platform ? `${platform} Orders` : "Orders Management"}
        </h1>

        {/* Date Filter */}
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

        {/* Add Order */}
        {currentUser?.role === "admin" && (
          <button
            onClick={() => setModalOpen(true)}
            className="bg-black text-white px-2 py-3 rounded-lg whitespace-nowrap"
          >
            Add Order
          </button>
        )}

        {/* Export Orders */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setExportMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
          >
            <FileSpreadsheet size={18} />
            Export
          </button>

          {exportMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <button
                type="button"
                onClick={handleExportSelected}
                disabled={selectedOrderIds.length === 0}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Export Selected
                {selectedOrderIds.length > 0 && ` (${selectedOrderIds.length})`}
              </button>

              <button
                type="button"
                onClick={handleExportAll}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                Export All Orders
              </button>
            </div>
          )}
        </div>

        {/* Excel Upload */}
        {currentUser?.role === "admin" && (
          <div className="flex min-w-0">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
              className="
          block min-w-0
          rounded-l-lg
          border border-r-0 border-gray-300
          bg-white text-sm text-gray-600

          file:mr-3
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

        {/* Search */}
        <div className="ml-auto">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search Orders..."
          />
        </div>
      </div>
      {/* <button
        onClick={handleImport}
        className="bg-green-600 text-white px-5 py-3 rounded-lg"
      >
        Import Excel
      </button> */}

      <StatsCards stats={orderStats} />

      {/* Table */}

      <OrdersTable
        orders={searchFilteredOrders}
        onView={handleView}
        onDelete={handleDelete}
        onSelectedRowsChange={handleSelectedRowsChange}
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
