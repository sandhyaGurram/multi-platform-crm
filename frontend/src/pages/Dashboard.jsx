// const Dashboard = () => {
//   return (
//     <div className="text-3xl font-bold">
//       Dashboard Page
//     </div>
//   );
// };

// export default Dashboard;
import OrdersTable from "../components/orders/OrdersTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";

const Dashboard = () => {
  const [dateFilter, setDateFilter] = useState("All Orders");

  const [orders, setOrders] = useState([]);

  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    shopifyOrders: 0,
    amazonOrders: 0,
    flipkartOrders: 0,
    meeshoOrders: 0,
  });

  const user = JSON.parse(localStorage.getItem("crmUser"));

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get(
        // `http://localhost:5000/api/dashboard?filter=${dateFilter}`,
        `${API_URL}/api/dashboard?filter=${dateFilter}`,
      );

      setStats(data);
    } catch (error) {
      console.log(error);
    }

    //   try {

    //     const dashboardRes = await axios.get(
    //       "http://localhost:5000/api/dashboard"
    //     );

    //     const ordersRes = await axios.get(
    //   "http://localhost:5000/api/orders",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   }
    // );

    //     setStats(dashboardRes.data);

    //     setOrders(ordersRes.data);

    //   } catch (error) {

    //     console.log(error);

    //   }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [dateFilter]);

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

  const shopifyOrders = filteredOrders.filter(
    (order) => order.platform === "Shopify",
  ).length;

  const amazonOrders = filteredOrders.filter(
    (order) => order.platform === "Amazon",
  ).length;

  const flipkartOrders = filteredOrders.filter(
    (order) => order.platform === "Flipkart",
  ).length;

  const meeshoOrders = filteredOrders.filter(
    (order) => order.platform === "Meesho",
  ).length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="flex justify-end mb-6">
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="bg-white px-4 py-3 rounded-lg shadow outline-none"
        >
          <option>All Orders</option>

          <option>Today</option>

          <option>Yesterday</option>

          <option>Last 7 Days</option>

          <option>Last 30 Days</option>

          <option>Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Orders</h2>

          <p className="text-4xl font-bold mt-3">{stats.totalOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Revenue</h2>

          <p className="text-4xl font-bold mt-3">₹{stats.revenue}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Customers</h2>

          <p className="text-4xl font-bold mt-3">845</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Returns</h2>

          <p className="text-4xl font-bold mt-3">42</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {/* Shopify */}

        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h2 className="text-green-700 font-semibold">Shopify Orders</h2>

          <p className="text-4xl font-bold mt-3">{stats.shopifyOrders}</p>
        </div>

        {/* Amazon */}

        <div className="bg-yellow-100 p-6 rounded-xl shadow">
          <h2 className="text-yellow-700 font-semibold">Amazon Orders</h2>

          <p className="text-4xl font-bold mt-3">{stats.amazonOrders}</p>
        </div>

        {/* Flipkart */}

        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h2 className="text-blue-700 font-semibold">Flipkart Orders</h2>

          <p className="text-4xl font-bold mt-3">{stats.flipkartOrders}</p>
        </div>

        {/* Meesho */}

        <div className="bg-pink-100 p-6 rounded-xl shadow">
          <h2 className="text-pink-700 font-semibold">Meesho Orders</h2>

          <p className="text-4xl font-bold mt-3">{stats.meeshoOrders}</p>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-5">Recent Orders</h2>

        <OrdersTable orders={filteredOrders.slice(0, 5)} />
      </div>
    </div>
  );
};

export default Dashboard;
