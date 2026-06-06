

import OrdersTable from "../components/orders/OrdersTable";
import OrderDrawer from "../components/orders/OrderDrawer";

// import orders from "../data/orders";
import { useEffect, useState } from "react";
import axios from "axios";
import AddOrderModal from "../components/orders/AddOrderModal";
import EditOrderModal from "../components/orders/EditOrderModal";
import SearchBar from "../components/common/SearchBar";

import { searchFilter } from "../utils/searchFilter";


const Orders = ({ platform }) => {

  const [orders, setOrders] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [dateFilter, setDateFilter] = useState("All Orders");

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [excelFile, setExcelFile] = useState(null);

  

const ordersPerPage = 5;

  const handleView = (order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const today = new Date();



  

const filteredOrders = orders.filter((order) => {

  // DATE FILTER

  const orderDate = new Date(order.date);

  const diffTime = today - orderDate;

  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  let matchesDate = true;

  if (dateFilter === "Today") {

    matchesDate =
      orderDate.toDateString() === today.toDateString();

  }

  else if (dateFilter === "Yesterday") {

    matchesDate =
      diffDays >= 1 && diffDays < 2;

  }

  else if (dateFilter === "Last 7 Days") {

    matchesDate = diffDays <= 7;

  }

  else if (dateFilter === "Last 30 Days") {

    matchesDate = diffDays <= 30;

  }

  else if (dateFilter === "Last Year") {

    matchesDate = diffDays <= 365;

  }

  // SEARCH FILTER



  return matchesDate;

});
  
  

  
  
  // page indexing

  const platformFilteredOrders = platform

  ? filteredOrders.filter(
      (order) =>
        order.platform === platform
    )

    : filteredOrders;
  
  
  const searchFilteredOrders = searchFilter(

  platformFilteredOrders,

  searchTerm,

  [
    "orderId",
    "customer",
    "amount",
    "status",
    "customerName",
    "customerPhone",
    "customerEmail",
    "platform",
    "trackingId"
  ]

);

  const lastOrderIndex =
  currentPage * ordersPerPage;

const firstOrderIndex =
  lastOrderIndex - ordersPerPage;



  console.log("Search:", searchTerm);

console.log(
  "Platform Orders:",
  platformFilteredOrders
);

console.log(
  "Search Results:",
  searchFilteredOrders
  );
  


const currentOrders =
  searchFilteredOrders.slice(
    firstOrderIndex,
    lastOrderIndex
  );

const totalPages = Math.ceil(
  searchFilteredOrders.length /
  ordersPerPage
);
  

  

  const user = JSON.parse(
  localStorage.getItem("crmUser")
  );
  
  
  const fetchOrders = async () => {

  try {

    const { data } = await axios.get(

  "http://localhost:5000/api/orders",

  {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

);

    setOrders(data);

  } catch (error) {

    console.log(error);

  }

};

useEffect(() => {

  fetchOrders();

}, []);
  
  
  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this order?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(

  `http://localhost:5000/api/orders/${id}`,

  {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

);

    fetchOrders();

  } catch (error) {

    console.log(error);

  }

  };
  


const handleImport = async () => {

  if (!excelFile) return;

  const formData = new FormData();

  formData.append(
    "file",
    excelFile
  );

  try {

    await axios.post(

      "http://localhost:5000/api/import/orders",

      formData,

      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }

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

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <h1 className="text-3xl font-bold">
          {platform
  ? `${platform} Orders`
  : "Orders Management"}
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


      <button
  onClick={() => setModalOpen(true)}
  className="bg-black text-white px-5 py-3 rounded-lg"
>
  Add Order
      </button>
      </div>


      
      {/* upload excell file */}
      <input

  type="file"

  accept=".xlsx,.xls,.csv"

  onChange={(e) =>
    setExcelFile(e.target.files[0])
  }

      />

      <button

  onClick={handleImport}

  className="bg-green-600 text-white px-5 py-3 rounded-lg"

>

  Import Excel

</button>
      

      {/* Table */}

      <OrdersTable
  orders={currentOrders}
  onView={handleView}
  onDelete={handleDelete}
/>

      
      {/* pagination */}
      <div className="flex justify-center items-center gap-3 mt-8">

  <button

    disabled={currentPage === 1}

    onClick={() =>
      setCurrentPage(currentPage - 1)
    }

    className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"

  >
    Previous
  </button>

  <span className="font-bold">

    Page {currentPage} of {totalPages}

  </span>

  <button

    disabled={currentPage === totalPages}

    onClick={() =>
      setCurrentPage(currentPage + 1)
    }

    className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"

  >
    Next
  </button>

      </div>
      


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