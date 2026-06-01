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

import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

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
          w-64 h-full bg-black text-white p-5
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

        <h1 className="text-3xl font-bold mb-10">
          CRM PANEL
        </h1>

        <div className="flex flex-col gap-4">

          <NavLink to="/" className="flex items-center gap-3 hover:text-yellow-400">
            <FaTachometerAlt />
            Dashboard
          </NavLink>

          <NavLink to="/orders" className="flex items-center gap-3 hover:text-yellow-400">
            <FaShoppingCart />
            Orders
          </NavLink>

          <NavLink to="/products" className="flex items-center gap-3 hover:text-yellow-400">
            <FaBoxOpen />
            Products
          </NavLink>

          <NavLink to="/customers" className="flex items-center gap-3 hover:text-yellow-400">
            <FaUsers />
            Customers
          </NavLink>

          <NavLink to="/analytics" className="flex items-center gap-3 hover:text-yellow-400">
            <FaChartBar />
            Analytics
          </NavLink>

          <NavLink to="/settings" className="flex items-center gap-3 hover:text-yellow-400">
            <FaCog />
            Settings
          </NavLink>

        </div>

        <button className="mt-auto flex items-center gap-3 hover:text-red-400">
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </>
  );
};

export default Sidebar;