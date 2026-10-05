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
      console.log("========== IMPORT START ==========");
      console.log("API URL:", API_URL);
      console.log("IMPORT URL:", `${API_URL}/api/import/orders`);
      console.log("FILE:", excelFile);
      console.log("FILE NAME:", excelFile.name);
      console.log("FILE TYPE:", excelFile.type);
      console.log("=================================");

      const response = await axios.post(
        `${API_URL}/api/import/orders`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("========== IMPORT RESPONSE ==========");
      console.log(response.data);
      console.log("=====================================");

      alert(
        `Import completed!\n\n` +
          `Platform: ${response.data.platform}\n` +
          `Total: ${response.data.totalRows}\n` +
          `Created: ${response.data.created}\n` +
          `Updated: ${response.data.updated}\n` +
          `Skipped: ${response.data.skipped}\n` +
          `Errors: ${response.data.errors?.length || 0}`,
      );

      fetchOrders();
    } catch (error) {
      console.error("========== IMPORT ERROR ==========");
      console.error(error);
      console.error(error.response);
      console.error("=================================");
    }
  };
  // await axios.post(
  //   // "http://localhost:5000/api/import/orders",
  //   `${API_URL}/api/import/orders`,

  //   formData,

  //   {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   },
  // );

  // alert("Excel Imported");

  // fetchOrders();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
    <div className="min-h-screen bg-[#F7F6F3] text-[#172033]">
      {/* =========================
    MOBILE HEADER
========================= */}
      {/* =========================
    PREMIUM ORDERS HEADER
========================= */}

      <div className="mb-6">
        <div
          className="
  grid
  grid-cols-[280px_1fr]
  items-center
  gap-5
  px-1
"
        >
          {/* TITLE */}
          <div className="flex items-center gap-3 w-[280px] shrink-0">
            <div
              className="
    w-[3px]
    h-10
    rounded-full
    bg-[#A51E27]
    shrink-0
  "
            />

            <div>
              <h1
                className="
      text-[28px]
      sm:text-[32px]
      font-semibold
      tracking-[-0.035em]
      text-[#172033]
      leading-none
      whitespace-nowrap
    "
              >
                {platform ? `${platform} Orders` : "Orders Management"}
              </h1>

              <p
                className="
      mt-1.5
      text-[10px]
      uppercase
      tracking-[0.18em]
      text-[#9A948A]
    "
              >
                Order Management
              </p>
            </div>
          </div>

          {/* CONTROLS */}
          <div
            className="
      flex
      flex-wrap
      items-center
      gap-2.5
      flex-1
    "
          >
            {/* DATE FILTER */}
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="
            h-11
            min-w-[145px]
            appearance-none
            rounded-[11px]
            border
            border-[#DED9D0]
            bg-[#FFFDFC]
            pl-4
            pr-10
            text-[13px]
            font-medium
            text-[#475569]
            outline-none
            
            cursor-pointer
            transition
            hover:border-[#B8A16B]
            focus:border-[#A51E27]
            focus:ring-2
            focus:ring-[#A51E27]/10
          "
              >
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last Year">Last Year</option>
                <option value="All Orders">All Orders</option>
              </select>

              <span
                className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-[#8C867D]
          text-xs
        "
              >
                ▾
              </span>
            </div>

            {/* ADD ORDER */}
            {currentUser?.role === "admin" && (
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="
            h-11
            px-5
            rounded-[11px]
            bg-[#172033]
            text-white
            text-[13px]
            font-medium
            tracking-wide
            transition-all
            duration-200
            shadow-[0_4px_12px_rgba(23,32,51,0.14)]
            hover:bg-[#27344B]
            hover:-translate-y-[1px]
            active:translate-y-0
          "
              >
                <span className="text-[#D6B56D] mr-1.5">+</span>
                Add Order
              </button>
            )}

            {/* EXPORT */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setExportMenuOpen((prev) => !prev)}
                className="
            h-11
            px-5
            rounded-[11px]
            bg-[#A51E27]
            text-white
            text-[13px]
            font-medium
            tracking-wide
            flex
            items-center
            gap-2
            shadow-[0_5px_14px_rgba(165,30,39,0.18)]
            transition-all
            hover:bg-[#8F1821]
            hover:-translate-y-[1px]
          "
              >
                <FileSpreadsheet size={16} strokeWidth={1.8} />
                Export
                <span className="text-[#D6B56D] text-xs">▾</span>
              </button>

              {exportMenuOpen && (
                <div
                  className="
            absolute
            left-0
            top-full
            mt-2
            w-56
            bg-[#FFFDFC]
            border
            border-[#E4DED5]
            rounded-xl
            shadow-[0_18px_45px_rgba(20,25,35,0.14)]
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
                py-3.5
                text-left
                text-[13px]
                text-[#334155]
                hover:bg-[#F7F3ED]
                disabled:opacity-40
              "
                  >
                    Export Selected
                    {selectedOrderIds.length > 0 &&
                      ` (${selectedOrderIds.length})`}
                  </button>

                  <div className="h-px bg-[#ECE7DF]" />

                  <button
                    type="button"
                    onClick={handleExportAll}
                    className="
                w-full
                px-4
                py-3.5
                text-left
                text-[13px]
                text-[#334155]
                hover:bg-[#F7F3ED]
              "
                  >
                    Export All Orders
                  </button>
                </div>
              )}
            </div>

            {/* EXCEL IMPORT */}
            {currentUser?.role === "admin" && (
              <div
                className="
          flex
          items-center
          h-11
          rounded-[11px]
          border
          border-[#DED9D0]
          bg-[#FFFDFC]
          overflow-hidden
          shadow-[0_2px_8px_rgba(30,35,45,0.03)]
        "
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
                  className="
              min-w-0
              w-[200px]
              text-xs
              text-[#7A8494]

              file:mr-2
              file:border-0
              file:border-r
              file:border-[#E5DFD6]
              file:bg-[#F7F3ED]
              file:px-4
              file:py-3
              file:text-xs
              file:font-medium
              file:text-[#475569]

              hover:file:bg-[#F0EBE2]
            "
                />

                <button
                  type="button"
                  onClick={handleImport}
                  disabled={!excelFile || isImporting}
                  className="
              h-full
              px-4
              text-[12px]
              font-semibold
              text-[#687386]
              border-l
              border-[#E5DFD6]
              hover:bg-[#F7F3ED]
              disabled:opacity-40
            "
                >
                  {isImporting ? "Importing..." : "Import"}
                </button>
              </div>
            )}

            {/* SEARCH */}
            <div
              className="
        w-full
        sm:w-[260px]
        xl:ml-auto
      "
            >
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search Orders..."
              />
            </div>
          </div>
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
