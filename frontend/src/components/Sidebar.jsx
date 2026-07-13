import {
  FaTachometerAlt,
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import axios from "axios";

import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("crmUser"));

  const handleLogout = async () => {
    const currentUser = JSON.parse(localStorage.getItem("crmUser"));

    // Logout immediately
    localStorage.removeItem("crmUser");
    navigate("/login");

    // Update logout time in background
    try {
      await axios.post(`${API_URL}/api/auth/logout/${currentUser._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // const currentUser = JSON.parse(localStorage.getItem("crmUser"));

  // const handleLogout = async () => {
  //   const user = JSON.parse(localStorage.getItem("crmUser"));

  //   try {
  //     await axios.post(
  //       `https://multi-platform-crm.onrender.com/api/auth/logout/${user._id}`,
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   localStorage.removeItem("crmUser");

  //   navigate("/login");
  // };

  return (
    <>
      {/* Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <div
        className={`
          fixed md:static top-0 left-0 z-50
          w-64 h-full bg-black text-white p-4
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close Button Mobile */}

        <button
          className="md:hidden mb-6"
          onClick={() => setSidebarOpen(false)}
        >
          <FaTimes size={22} />
        </button>

        {/* <h1 className="text-3xl font-bold mb-10">CRM PANEL</h1> */}

        <div className="flex flex-col gap-2">
          {/* Dashboard */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
      ${
        isActive
          ? "bg-white text-black font-bold"
          : "hover:bg-gray-800 text-gray-300"
      }`
            }
          >
            <FaTachometerAlt />
            Dashboard
          </NavLink>
          {/* Orders Section */}
          <div className="mt-2">
            <div className="flex items-center gap-3 px-4 py-3 text-white font-semibold">
              <FaShoppingCart />

              <span>Orders</span>
            </div>

            <div className="ml-6 flex flex-col gap-1 border-l border-gray-700 pl-4">
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition
          ${
            isActive
              ? "bg-white text-black font-bold"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`
                }
              >
                All Orders
              </NavLink>

              <NavLink
                to="/orders/shopify"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition
          ${
            isActive
              ? "bg-green-500 text-white font-bold"
              : "text-gray-400 hover:text-green-400 hover:bg-gray-800"
          }`
                }
              >
                Shopify Orders
              </NavLink>

              <NavLink
                to="/orders/amazon"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition
          ${
            isActive
              ? "bg-yellow-500 text-black font-bold"
              : "text-gray-400 hover:text-yellow-400 hover:bg-gray-800"
          }`
                }
              >
                Amazon Orders
              </NavLink>

              <NavLink
                to="/orders/flipkart"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition
          ${
            isActive
              ? "bg-blue-500 text-white font-bold"
              : "text-gray-400 hover:text-blue-400 hover:bg-gray-800"
          }`
                }
              >
                Flipkart Orders
              </NavLink>

              <NavLink
                to="/orders/meesho"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition
          ${
            isActive
              ? "bg-pink-500 text-white font-bold"
              : "text-gray-400 hover:text-pink-400 hover:bg-gray-800"
          }`
                }
              >
                Meesho Orders
              </NavLink>

              <NavLink
                to="/orders/deposite"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition
          ${
            isActive
              ? "bg-red-500 text-white font-bold"
              : "text-gray-400 hover:text-red-400 hover:bg-gray-800"
          }`
                }
              >
                Deposite Orders
              </NavLink>
            </div>
          </div>
          {/* Products */}
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
      ${
        isActive
          ? "bg-white text-black font-bold"
          : "hover:bg-gray-800 text-gray-300"
      }`
            }
          >
            <FaBoxOpen />
            Products
          </NavLink>
          {/* Customers */}
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
      ${
        isActive
          ? "bg-white text-black font-bold"
          : "hover:bg-gray-800 text-gray-300"
      }`
            }
          >
            <FaUsers />
            Customers
          </NavLink>
          {/* Analytics */}
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
      ${
        isActive
          ? "bg-white text-black font-bold"
          : "hover:bg-gray-800 text-gray-300"
      }`
            }
          >
            <FaChartBar />
            Analytics
          </NavLink>
          {/* Settings */}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
      ${
        isActive
          ? "bg-white text-black font-bold"
          : "hover:bg-gray-800 text-gray-300"
      }`
            }
          >
            <FaCog />
            Settings
          </NavLink>
          {/* Users */}
          {currentUser?.role === "admin" && (
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
      ${
        isActive
          ? "bg-white text-black font-bold"
          : "hover:bg-gray-800 text-gray-300"
      }`
              }
            >
              <FaUsers />
              Users
            </NavLink>
          )}
        </div>

        {/* <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all"
        >
          <FaSignOutAlt />
          Logout
        </button> */}

        {currentUser ? (
          <button
            onClick={handleLogout}
            className="mt-10 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all"
          >
            <FaSignOutAlt />
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="mt-10 flex items-center gap-3 px-4 py-3 rounded-xl text-green-400 hover:bg-green-500 hover:text-white transition-all"
          >
            <FaSignOutAlt />
            Login
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
