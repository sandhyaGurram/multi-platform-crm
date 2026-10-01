import {
  FaTachometerAlt,
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaBell,
  FaChevronLeft,
  FaChevronRight,
  FaStore,
  FaAmazon,
  FaShoppingBag,
  FaMoneyBillWave,
} from "react-icons/fa";

import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";

const Sidebar = ({ sidebarOpen, setSidebarOpen, collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("crmUser"));

  const handleLogout = async () => {
    const currentUser = JSON.parse(localStorage.getItem("crmUser"));

    localStorage.removeItem("crmUser");
    navigate("/login");

    try {
      await axios.post(`${API_URL}/api/auth/logout/${currentUser._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Navigation style
  |--------------------------------------------------------------------------
  */

  const navClass = ({ isActive }) => `
    group
    relative
    flex
    items-center
    ${collapsed ? "md:justify-center" : "justify-start"}
    gap-3
    h-[46px]
    px-3
    rounded-[12px]

    transition-all
    duration-200

    ${
      isActive
        ? `
          bg-gradient-to-r
          from-[#8F1729]
          to-[#A51E27]

          text-white

          shadow-[0_7px_20px_rgba(143,23,41,0.20)]
        `
        : `
          text-[#A8AFBA]

          hover:bg-[#1B222D]
          hover:text-white
        `
    }
  `;

  return (
    <>
      {/* =========================================================
          MOBILE OVERLAY
      ========================================================== */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-40

            bg-[#080B10]/65
            backdrop-blur-[2px]

            md:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =========================================================
          SIDEBAR
      ========================================================== */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50

          h-[100dvh]

          w-[270px]
          ${collapsed ? "md:w-[78px]" : "md:w-[270px]"}

          flex
          flex-col

          text-white

          border-r
          border-[#272E39]

          bg-[#11161F]

          shadow-[8px_0_35px_rgba(10,15,25,0.10)]

          transition-all
          duration-300
          ease-in-out

          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* =====================================================
            TOP BRAND
        ====================================================== */}

        <div
          className={`
            relative
            h-[82px]
            shrink-0

            flex
            items-center

            border-b
            border-[#272E39]

            ${
              collapsed
                ? "md:justify-center justify-between px-5"
                : "justify-between px-5"
            }
          `}
        >
          {/* subtle top highlight */}
          <div
            className="
              absolute
              top-0
              left-5
              right-5
              h-[1px]

              bg-gradient-to-r
              from-transparent
              via-[#C9A86A]
              to-transparent

              opacity-50
            "
          />

          {/* Brand */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div
              className="
                relative
                w-[40px]
                h-[40px]
                shrink-0

                rounded-[12px]

                flex
                items-center
                justify-center

                bg-gradient-to-br
                from-[#A51E27]
                to-[#741322]

                border
                border-[#C56C76]

                shadow-[0_6px_18px_rgba(143,23,41,0.28)]
              "
            >
              <span
                className="
                  text-[16px]
                  font-serif
                  font-bold
                  tracking-wide
                  text-[#FFF7EE]
                "
              >
                ARM
              </span>

              {/* gold shine */}
              <span
                className="
                  absolute
                  top-[5px]
                  right-[6px]

                  w-[5px]
                  h-[5px]

                  rounded-full

                  bg-[#E1C47A]

                  opacity-90
                "
              />
            </div>

            {/* Brand text */}

            <div
              className={`
                ${collapsed ? "md:hidden" : ""}
              `}
            >
              <p
                className="
                  text-[15px]
                  font-semibold
                  tracking-[0.10em]
                  text-white
                  leading-none
                  whitespace-nowrap
                "
              >
                CRM PANEL
              </p>

              <p
                className="
                  mt-[6px]

                  text-[9px]
                  uppercase
                  tracking-[0.22em]

                  text-[#7F8998]

                  whitespace-nowrap
                "
              >
                Business Suite
              </p>
            </div>
          </div>

          {/* Desktop collapse */}

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="
              hidden
              md:flex

              w-[30px]
              h-[30px]

              shrink-0

              items-center
              justify-center

              rounded-[9px]

              border
              border-[#303846]

              bg-[#181E27]

              text-[#8B94A3]

              hover:border-[#8F1729]
              hover:bg-[#24191D]
              hover:text-[#D6B56D]

              transition-all
              duration-200
            "
          >
            {collapsed ? (
              <FaChevronRight size={11} />
            ) : (
              <FaChevronLeft size={11} />
            )}
          </button>

          {/* Mobile close */}

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="
              md:hidden

              w-[34px]
              h-[34px]

              flex
              items-center
              justify-center

              rounded-[9px]

              border
              border-[#303846]

              text-[#9AA2AF]

              hover:bg-[#1C232E]
              hover:text-white

              transition
            "
          >
            <FaTimes size={17} />
          </button>
        </div>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}

        <div
          className={`
            flex-1
            min-h-0

            overflow-y-auto
            overflow-x-hidden

            py-5

            ${collapsed ? "px-3" : "px-4"}

            sidebar-scrollbar
          `}
        >
          {/* ================= OVERVIEW ================= */}

          {/* Dashboard */}

          <NavLink
            to="/"
            title={collapsed ? "Dashboard" : ""}
            className={navClass}
          >
            <span
              className={`
                w-[30px]
                h-[30px]

                flex
                items-center
                justify-center

                rounded-[9px]

                shrink-0

                ${collapsed ? "" : "bg-[#1B222D]"}
              `}
            >
              <FaTachometerAlt size={14} />
            </span>

            <span
              className={`
                text-[13px]
                font-medium

                whitespace-nowrap

                ${collapsed ? "md:hidden" : ""}
              `}
            >
              Dashboard
            </span>
          </NavLink>

          {/* ================= SALES ================= */}

          {/* Orders */}

          {/* Orders */}

          {collapsed ? (
            <button
              type="button"
              title="Orders"
              onClick={() => navigate("/orders")}
              className="
      w-full
      h-[46px]

      flex
      items-center
      justify-center

      rounded-[12px]

      text-[#A8AFBA]

      hover:bg-[#1B222D]
      hover:text-white

      transition
    "
            >
              <span
                className="
        w-[30px]
        h-[30px]

        flex
        items-center
        justify-center

        rounded-[9px]

        bg-[#1B222D]
      "
              >
                <FaShoppingCart size={14} />
              </span>
            </button>
          ) : (
            <>
              {/* Orders heading */}

              <div
                className="
        flex
        items-center
        gap-3

        px-3
        h-[46px]

        text-[#E4E7EB]
      "
              >
                <span
                  className="
          w-[30px]
          h-[30px]

          flex
          items-center
          justify-center

          rounded-[9px]

          bg-[#1B222D]

          border
          border-[#2B3440]

          text-[#D6B56D]
        "
                >
                  <FaShoppingCart size={13} />
                </span>

                <span className="text-[13px] font-medium">Orders</span>
              </div>

              {/* Orders submenu */}

              <div
                className="
        ml-[27px]
        pl-[15px]

        mt-1

        border-l
        border-[#2B3440]

        space-y-[3px]
      "
              >
                {/* All Orders */}

                <NavLink
                  to="/orders"
                  className={({ isActive }) => `
          flex
          items-center
          gap-3

          px-3
          py-[9px]

          rounded-[8px]

          text-[12px]

          transition-all

          ${
            isActive
              ? `
                bg-[#291B20]
                text-[#F3DDE0]
                border
                border-[#5A3038]
              `
              : `
                text-[#7F8998]
                hover:bg-[#1A212B]
                hover:text-[#E4E7EB]
              `
          }
        `}
                >
                  <FaStore size={12} className="shrink-0" />

                  <span>All Orders</span>
                </NavLink>

                {/* Shopify */}

                <NavLink
                  to="/orders/shopify"
                  className={({ isActive }) => `
          flex
          items-center
          gap-3

          px-3
          py-[9px]

          rounded-[8px]

          text-[12px]

          transition-all

          ${
            isActive
              ? "bg-[#1D2B23] text-[#BBDAC5]"
              : "text-[#7F8998] hover:bg-[#1A212B] hover:text-[#BBDAC5]"
          }
        `}
                >
                  <FaShoppingBag size={12} className="shrink-0" />

                  <span>Shopify Orders</span>
                </NavLink>

                {/* Amazon */}

                <NavLink
                  to="/orders/amazon"
                  className={({ isActive }) => `
          flex
          items-center
          gap-3

          px-3
          py-[9px]

          rounded-[8px]

          text-[12px]

          transition-all

          ${
            isActive
              ? "bg-[#2A251A] text-[#E7CF9B]"
              : "text-[#7F8998] hover:bg-[#1A212B] hover:text-[#E7CF9B]"
          }
        `}
                >
                  <FaAmazon size={13} className="shrink-0" />

                  <span>Amazon Orders</span>
                </NavLink>

                {/* Flipkart */}

                <NavLink
                  to="/orders/flipkart"
                  className={({ isActive }) => `
          flex
          items-center
          gap-3

          px-3
          py-[9px]

          rounded-[8px]

          text-[12px]

          transition-all

          ${
            isActive
              ? "bg-[#1B2837] text-[#BDD3EA]"
              : "text-[#7F8998] hover:bg-[#1A212B] hover:text-[#BDD3EA]"
          }
        `}
                >
                  <FaShoppingCart size={12} className="shrink-0" />

                  <span>Flipkart Orders</span>
                </NavLink>

                {/* Meesho */}

                <NavLink
                  to="/orders/meesho"
                  className={({ isActive }) => `
          flex
          items-center
          gap-3

          px-3
          py-[9px]

          rounded-[8px]

          text-[12px]

          transition-all

          ${
            isActive
              ? "bg-[#2A1E28] text-[#E3C0D5]"
              : "text-[#7F8998] hover:bg-[#1A212B] hover:text-[#E3C0D5]"
          }
        `}
                >
                  <FaShoppingBag size={12} className="shrink-0" />

                  <span>Meesho Orders</span>
                </NavLink>

                {/* Deposit */}

                <NavLink
                  to="/orders/deposite"
                  className={({ isActive }) => `
          flex
          items-center
          gap-3

          px-3
          py-[9px]

          rounded-[8px]

          text-[12px]

          transition-all

          ${
            isActive
              ? "bg-[#2B1D21] text-[#E5BBC1]"
              : "text-[#7F8998] hover:bg-[#1A212B] hover:text-[#E5BBC1]"
          }
        `}
                >
                  <FaMoneyBillWave size={12} className="shrink-0" />

                  <span>Deposit Orders</span>
                </NavLink>
              </div>
            </>
          )}

          {/* ================= MANAGEMENT ================= */}

          {/* Products */}

          <NavLink
            to="/products"
            title={collapsed ? "Products" : ""}
            className={navClass}
          >
            <span
              className={`
                w-[30px]
                h-[30px]
                flex
                items-center
                justify-center
                rounded-[9px]
                shrink-0
                ${collapsed ? "" : "bg-[#1B222D]"}
              `}
            >
              <FaBoxOpen size={14} />
            </span>

            <span
              className={`
                text-[13px]
                font-medium
                whitespace-nowrap
                ${collapsed ? "md:hidden" : ""}
              `}
            >
              Products
            </span>
          </NavLink>

          {/* Notifications */}

          <NavLink
            to="/notifications"
            title={collapsed ? "Notifications" : ""}
            className={navClass}
          >
            <span
              className={`
                w-[30px]
                h-[30px]
                flex
                items-center
                justify-center
                rounded-[9px]
                shrink-0
                ${collapsed ? "" : "bg-[#1B222D]"}
              `}
            >
              <FaBell size={14} />
            </span>

            <span
              className={`
                text-[13px]
                font-medium
                whitespace-nowrap
                ${collapsed ? "md:hidden" : ""}
              `}
            >
              Notifications
            </span>
          </NavLink>

          {/* Customers */}

          <NavLink
            to="/customers"
            title={collapsed ? "Customers" : ""}
            className={navClass}
          >
            <span
              className={`
                w-[30px]
                h-[30px]
                flex
                items-center
                justify-center
                rounded-[9px]
                shrink-0
                ${collapsed ? "" : "bg-[#1B222D]"}
              `}
            >
              <FaUsers size={14} />
            </span>

            <span
              className={`
                text-[13px]
                font-medium
                whitespace-nowrap
                ${collapsed ? "md:hidden" : ""}
              `}
            >
              Customers
            </span>
          </NavLink>

          {/* Analytics */}

          <NavLink
            to="/analytics"
            title={collapsed ? "Analytics" : ""}
            className={navClass}
          >
            <span
              className={`
                w-[30px]
                h-[30px]
                flex
                items-center
                justify-center
                rounded-[9px]
                shrink-0
                ${collapsed ? "" : "bg-[#1B222D]"}
              `}
            >
              <FaChartBar size={14} />
            </span>

            <span
              className={`
                text-[13px]
                font-medium
                whitespace-nowrap
                ${collapsed ? "md:hidden" : ""}
              `}
            >
              Analytics
            </span>
          </NavLink>

          {/* Settings */}

          <NavLink
            to="/settings"
            title={collapsed ? "Settings" : ""}
            className={navClass}
          >
            <span
              className={`
                w-[30px]
                h-[30px]
                flex
                items-center
                justify-center
                rounded-[9px]
                shrink-0
                ${collapsed ? "" : "bg-[#1B222D]"}
              `}
            >
              <FaCog size={14} />
            </span>

            <span
              className={`
                text-[13px]
                font-medium
                whitespace-nowrap
                ${collapsed ? "md:hidden" : ""}
              `}
            >
              Settings
            </span>
          </NavLink>

          {/* Users */}

          {currentUser?.role === "admin" && (
            <NavLink
              to="/users"
              title={collapsed ? "Users" : ""}
              className={navClass}
            >
              <span
                className={`
                  w-[30px]
                  h-[30px]
                  flex
                  items-center
                  justify-center
                  rounded-[9px]
                  shrink-0
                  ${collapsed ? "" : "bg-[#1B222D]"}
                `}
              >
                <FaUsers size={14} />
              </span>

              <span
                className={`
                  text-[13px]
                  font-medium
                  whitespace-nowrap
                  ${collapsed ? "md:hidden" : ""}
                `}
              >
                Users
              </span>
            </NavLink>
          )}
        </div>

        {/* =====================================================
            LOGOUT
        ====================================================== */}

        <div
          className="
            shrink-0

            border-t
            border-[#272E39]

            p-3
          "
        >
          {currentUser ? (
            <button
              onClick={handleLogout}
              title={collapsed ? "Logout" : ""}
              className={`
                w-full
                h-[44px]

                flex
                items-center

                ${collapsed ? "justify-center" : "justify-start"}

                gap-3

                px-3

                rounded-[11px]

                text-[#8E98A6]

                hover:bg-[#2A1B20]
                hover:text-[#E2AEB5]

                transition-all
              `}
            >
              <span
                className="
                  w-[30px]
                  h-[30px]

                  flex
                  items-center
                  justify-center

                  rounded-[9px]

                  bg-[#1B222D]
                "
              >
                <FaSignOutAlt size={14} />
              </span>

              <span
                className={`
                  text-[12px]
                  font-medium
                  ${collapsed ? "md:hidden" : ""}
                `}
              >
                Logout
              </span>
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              title={collapsed ? "Login" : ""}
              className={`
                w-full
                h-[44px]

                flex
                items-center

                ${collapsed ? "justify-center" : "justify-start"}

                gap-3
                px-3

                rounded-[11px]

                text-[#8E98A6]

                hover:bg-[#1D2A22]
                hover:text-[#B9DCC5]

                transition-all
              `}
            >
              <span
                className="
                  w-[30px]
                  h-[30px]

                  flex
                  items-center
                  justify-center

                  rounded-[9px]

                  bg-[#1B222D]
                "
              >
                <FaSignOutAlt size={14} />
              </span>

              <span
                className={`
                  text-[12px]
                  font-medium
                  ${collapsed ? "md:hidden" : ""}
                `}
              >
                Login
              </span>
            </button>
          )}
        </div>
      </aside>

      {/* =========================================================
          CUSTOM SCROLLBAR
      ========================================================== */}

      <style>
        {`
          .sidebar-scrollbar::-webkit-scrollbar {
            width: 4px;
          }

          .sidebar-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .sidebar-scrollbar::-webkit-scrollbar-thumb {
            background: #303846;
            border-radius: 999px;
          }

          .sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #8F1729;
          }

          .sidebar-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #303846 transparent;
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;

// import {
//   FaTachometerAlt,
//   FaShoppingCart,
//   FaBoxOpen,
//   FaUsers,
//   FaChartBar,
//   FaCog,
//   FaSignOutAlt,
//   FaTimes,
//   FaBell,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// import axios from "axios";
// import { NavLink, useNavigate } from "react-router-dom";
// import { API_URL } from "../config/api";

// const Sidebar = ({ sidebarOpen, setSidebarOpen, collapsed, setCollapsed }) => {
//   const navigate = useNavigate();

//   const currentUser = JSON.parse(localStorage.getItem("crmUser"));

//   const handleLogout = async () => {
//     const currentUser = JSON.parse(localStorage.getItem("crmUser"));

//     localStorage.removeItem("crmUser");
//     navigate("/login");

//     try {
//       await axios.post(`${API_URL}/api/auth/logout/${currentUser._id}`);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed
//           top-0
//           left-0
//           z-50
//           h-[100dvh]

//           bg-black
//           text-white

//           flex
//           flex-col

//           transition-all
//           duration-300
//           ease-in-out

//           w-64
//           ${collapsed ? "md:w-[72px]" : "md:w-64"}

//           ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//           }
//         `}
//       >
//         {/* Header */}
//         <div
//           className={`
//             h-[70px]
//             flex
//             items-center
//             border-b
//             border-gray-800

//             ${collapsed ? "justify-center" : "justify-between px-4"}
//           `}
//         >
//           {!collapsed && (
//             <h1 className="text-xl font-bold whitespace-nowrap">CRM PANEL</h1>
//           )}

//           {/* Desktop collapse button */}
//           <button
//             type="button"
//             onClick={() => setCollapsed(!collapsed)}
//             title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//             className="
//               hidden
//               md:flex
//               w-8
//               h-8
//               items-center
//               justify-center
//               text-gray-400
//               hover:text-white
//               hover:bg-gray-800
//               rounded-lg
//             "
//           >
//             {collapsed ? (
//               <FaChevronRight size={14} />
//             ) : (
//               <FaChevronLeft size={14} />
//             )}
//           </button>

//           {/* Mobile close */}
//           <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
//             <FaTimes size={22} />
//           </button>
//         </div>

//         {/* Menu */}
//         <div
//           className={`
//             flex-1
//             min-h-0
//             flex
//             flex-col
//             gap-2
//             overflow-y-auto

//             py-4

//             ${collapsed ? "px-2" : "px-4"}
//           `}
//         >
//           {/* Dashboard */}
//           <NavLink
//             to="/"
//             title={collapsed ? "Dashboard" : ""}
//             className={({ isActive }) =>
//               `
//                 flex
//                 items-center
//                 ${collapsed ? "justify-center" : "justify-start"}
//                 gap-3
//                 px-4
//                 py-3
//                 rounded-xl
//                 transition-all

//                 ${
//                   isActive
//                     ? "bg-white text-black font-bold"
//                     : "hover:bg-gray-800 text-gray-300"
//                 }
//               `
//             }
//           >
//             <FaTachometerAlt />

//             {!collapsed && <span>Dashboard</span>}
//           </NavLink>

//           {/* Orders */}
//           <div className="mt-2">
//             {collapsed ? (
//               <button
//                 type="button"
//                 title="Orders"
//                 onClick={() => navigate("/orders")}
//                 className="
//                   w-full
//                   flex
//                   items-center
//                   justify-center
//                   px-4
//                   py-3
//                   rounded-xl
//                   text-gray-300
//                   hover:bg-gray-800
//                 "
//               >
//                 <FaShoppingCart />
//               </button>
//             ) : (
//               <>
//                 <div className="flex items-center gap-3 px-4 py-3 text-white font-semibold">
//                   <FaShoppingCart />
//                   <span>Orders</span>
//                 </div>

//                 <div className="ml-6 flex flex-col gap-1 border-l border-gray-700 pl-4">
//                   <NavLink
//                     to="/orders"
//                     className={({ isActive }) =>
//                       `
//                         px-3
//                         py-2
//                         rounded-lg
//                         transition

//                         ${
//                           isActive
//                             ? "bg-white text-black font-bold"
//                             : "text-gray-400 hover:text-white hover:bg-gray-800"
//                         }
//                       `
//                     }
//                   >
//                     All Orders
//                   </NavLink>

//                   <NavLink
//                     to="/orders/shopify"
//                     className={({ isActive }) =>
//                       `
//                         px-3
//                         py-2
//                         rounded-lg
//                         transition

//                         ${
//                           isActive
//                             ? "bg-green-500 text-white font-bold"
//                             : "text-gray-400 hover:text-green-400 hover:bg-gray-800"
//                         }
//                       `
//                     }
//                   >
//                     Shopify Orders
//                   </NavLink>

//                   <NavLink
//                     to="/orders/amazon"
//                     className={({ isActive }) =>
//                       `
//                         px-3
//                         py-2
//                         rounded-lg
//                         transition

//                         ${
//                           isActive
//                             ? "bg-yellow-500 text-black font-bold"
//                             : "text-gray-400 hover:text-yellow-400 hover:bg-gray-800"
//                         }
//                       `
//                     }
//                   >
//                     Amazon Orders
//                   </NavLink>

//                   <NavLink
//                     to="/orders/flipkart"
//                     className={({ isActive }) =>
//                       `
//                         px-3
//                         py-2
//                         rounded-lg
//                         transition

//                         ${
//                           isActive
//                             ? "bg-blue-500 text-white font-bold"
//                             : "text-gray-400 hover:text-blue-400 hover:bg-gray-800"
//                         }
//                       `
//                     }
//                   >
//                     Flipkart Orders
//                   </NavLink>

//                   <NavLink
//                     to="/orders/meesho"
//                     className={({ isActive }) =>
//                       `
//                         px-3
//                         py-2
//                         rounded-lg
//                         transition

//                         ${
//                           isActive
//                             ? "bg-pink-500 text-white font-bold"
//                             : "text-gray-400 hover:text-pink-400 hover:bg-gray-800"
//                         }
//                       `
//                     }
//                   >
//                     Meesho Orders
//                   </NavLink>

//                   <NavLink
//                     to="/orders/deposite"
//                     className={({ isActive }) =>
//                       `
//                         px-3
//                         py-2
//                         rounded-lg
//                         transition

//                         ${
//                           isActive
//                             ? "bg-red-500 text-white font-bold"
//                             : "text-gray-400 hover:text-red-400 hover:bg-gray-800"
//                         }
//                       `
//                     }
//                   >
//                     Deposite Orders
//                   </NavLink>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Products */}
//           <NavLink
//             to="/products"
//             title={collapsed ? "Products" : ""}
//             className={({ isActive }) =>
//               `
//                 flex
//                 items-center
//                 ${collapsed ? "justify-center" : "justify-start"}
//                 gap-3
//                 px-4
//                 py-3
//                 rounded-xl
//                 transition-all

//                 ${
//                   isActive
//                     ? "bg-white text-black font-bold"
//                     : "hover:bg-gray-800 text-gray-300"
//                 }
//               `
//             }
//           >
//             <FaBoxOpen />

//             {!collapsed && <span>Products</span>}
//           </NavLink>

//           {/* Notifications */}
//           <NavLink
//             to="/notifications"
//             title={collapsed ? "Notifications" : ""}
//             className={({ isActive }) =>
//               `
//                 flex
//                 items-center
//                 ${collapsed ? "justify-center" : "justify-start"}
//                 gap-3
//                 px-4
//                 py-3
//                 rounded-xl
//                 transition-all

//                 ${
//                   isActive
//                     ? "bg-white text-black font-bold"
//                     : "hover:bg-gray-800 text-gray-300"
//                 }
//               `
//             }
//           >
//             <FaBell />

//             {!collapsed && <span>Notifications</span>}
//           </NavLink>

//           {/* Customers */}
//           <NavLink
//             to="/customers"
//             title={collapsed ? "Customers" : ""}
//             className={({ isActive }) =>
//               `
//                 flex
//                 items-center
//                 ${collapsed ? "justify-center" : "justify-start"}
//                 gap-3
//                 px-4
//                 py-3
//                 rounded-xl
//                 transition-all

//                 ${
//                   isActive
//                     ? "bg-white text-black font-bold"
//                     : "hover:bg-gray-800 text-gray-300"
//                 }
//               `
//             }
//           >
//             <FaUsers />

//             {!collapsed && <span>Customers</span>}
//           </NavLink>

//           {/* Analytics */}
//           <NavLink
//             to="/analytics"
//             title={collapsed ? "Analytics" : ""}
//             className={({ isActive }) =>
//               `
//                 flex
//                 items-center
//                 ${collapsed ? "justify-center" : "justify-start"}
//                 gap-3
//                 px-4
//                 py-3
//                 rounded-xl
//                 transition-all

//                 ${
//                   isActive
//                     ? "bg-white text-black font-bold"
//                     : "hover:bg-gray-800 text-gray-300"
//                 }
//               `
//             }
//           >
//             <FaChartBar />

//             {!collapsed && <span>Analytics</span>}
//           </NavLink>

//           {/* Settings */}
//           <NavLink
//             to="/settings"
//             title={collapsed ? "Settings" : ""}
//             className={({ isActive }) =>
//               `
//                 flex
//                 items-center
//                 ${collapsed ? "justify-center" : "justify-start"}
//                 gap-3
//                 px-4
//                 py-3
//                 rounded-xl
//                 transition-all

//                 ${
//                   isActive
//                     ? "bg-white text-black font-bold"
//                     : "hover:bg-gray-800 text-gray-300"
//                 }
//               `
//             }
//           >
//             <FaCog />

//             {!collapsed && <span>Settings</span>}
//           </NavLink>

//           {/* Users */}
//           {currentUser?.role === "admin" && (
//             <NavLink
//               to="/users"
//               title={collapsed ? "Users" : ""}
//               className={({ isActive }) =>
//                 `
//                   flex
//                   items-center
//                   ${collapsed ? "justify-center" : "justify-start"}
//                   gap-3
//                   px-4
//                   py-3
//                   rounded-xl
//                   transition-all

//                   ${
//                     isActive
//                       ? "bg-white text-black font-bold"
//                       : "hover:bg-gray-800 text-gray-300"
//                   }
//                 `
//               }
//             >
//               <FaUsers />

//               {!collapsed && <span>Users</span>}
//             </NavLink>
//           )}
//         </div>

//         {/* Logout */}
//         {currentUser ? (
//           <button
//             onClick={handleLogout}
//             title={collapsed ? "Logout" : ""}
//             className={`
//               mt-auto
//               flex
//               items-center
//               ${collapsed ? "justify-center" : "justify-start"}
//               gap-3
//               px-4
//               py-3
//               mx-2
//               mb-3
//               rounded-xl
//               text-red-400
//               hover:bg-red-500
//               hover:text-white
//               transition-all
//             `}
//           >
//             <FaSignOutAlt />

//             {!collapsed && <span>Logout</span>}
//           </button>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             title={collapsed ? "Login" : ""}
//             className={`
//               mt-auto
//               flex
//               items-center
//               ${collapsed ? "justify-center" : "justify-start"}
//               gap-3
//               px-4
//               py-3
//               mx-2
//               mb-3
//               rounded-xl
//               text-green-400
//               hover:bg-green-500
//               hover:text-white
//               transition-all
//             `}
//           >
//             <FaSignOutAlt />

//             {!collapsed && <span>Login</span>}
//           </button>
//         )}
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

// import {
//   FaTachometerAlt,
//   FaShoppingCart,
//   FaBoxOpen,
//   FaUsers,
//   FaChartBar,
//   FaCog,
//   FaSignOutAlt,
//   FaTimes,
//   FaBell,
// } from "react-icons/fa";

// import axios from "axios";

// import { NavLink, useNavigate } from "react-router-dom";

// const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
//   const navigate = useNavigate();

//   const currentUser = JSON.parse(localStorage.getItem("crmUser"));

//   const handleLogout = async () => {
//     const currentUser = JSON.parse(localStorage.getItem("crmUser"));

//     // Logout immediately
//     localStorage.removeItem("crmUser");
//     navigate("/login");

//     // Update logout time in background
//     try {
//       await axios.post(`${API_URL}/api/auth/logout/${currentUser._id}`);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // const currentUser = JSON.parse(localStorage.getItem("crmUser"));

//   // const handleLogout = async () => {
//   //   const user = JSON.parse(localStorage.getItem("crmUser"));

//   //   try {
//   //     await axios.post(
//   //       `https://multi-platform-crm.onrender.com/api/auth/logout/${user._id}`,
//   //     );
//   //   } catch (error) {
//   //     console.log(error);
//   //   }

//   //   localStorage.removeItem("crmUser");

//   //   navigate("/login");
//   // };

//   return (
//     <>
//       {/* Overlay */}

//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}

//       <div
//         className={`
//     fixed md:static top-0 left-0 z-50
//     w-64 h-[100dvh] bg-black text-white p-4
//     flex flex-col
//     transform transition-transform duration-300
//     ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//     md:translate-x-0
//   `}
//       >
//         {/* Close Button Mobile */}

//         <button
//           className="md:hidden mb-6"
//           onClick={() => setSidebarOpen(false)}
//         >
//           <FaTimes size={22} />
//         </button>

//         {/* <h1 className="text-3xl font-bold mb-10">CRM PANEL</h1> */}

//         <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto">
//           {/* Dashboard */}
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
//       ${
//         isActive
//           ? "bg-white text-black font-bold"
//           : "hover:bg-gray-800 text-gray-300"
//       }`
//             }
//           >
//             <FaTachometerAlt />
//             Dashboard
//           </NavLink>
//           {/* Orders Section */}
//           <div className="mt-2">
//             <div className="flex items-center gap-3 px-4 py-3 text-white font-semibold">
//               <FaShoppingCart />

//               <span>Orders</span>
//             </div>

//             <div className="ml-6 flex flex-col gap-1 border-l border-gray-700 pl-4">
//               <NavLink
//                 to="/orders"
//                 className={({ isActive }) =>
//                   `px-3 py-2 rounded-lg transition
//           ${
//             isActive
//               ? "bg-white text-black font-bold"
//               : "text-gray-400 hover:text-white hover:bg-gray-800"
//           }`
//                 }
//               >
//                 All Orders
//               </NavLink>

//               <NavLink
//                 to="/orders/shopify"
//                 className={({ isActive }) =>
//                   `px-3 py-2 rounded-lg transition
//           ${
//             isActive
//               ? "bg-green-500 text-white font-bold"
//               : "text-gray-400 hover:text-green-400 hover:bg-gray-800"
//           }`
//                 }
//               >
//                 Shopify Orders
//               </NavLink>

//               <NavLink
//                 to="/orders/amazon"
//                 className={({ isActive }) =>
//                   `px-3 py-2 rounded-lg transition
//           ${
//             isActive
//               ? "bg-yellow-500 text-black font-bold"
//               : "text-gray-400 hover:text-yellow-400 hover:bg-gray-800"
//           }`
//                 }
//               >
//                 Amazon Orders
//               </NavLink>

//               <NavLink
//                 to="/orders/flipkart"
//                 className={({ isActive }) =>
//                   `px-3 py-2 rounded-lg transition
//           ${
//             isActive
//               ? "bg-blue-500 text-white font-bold"
//               : "text-gray-400 hover:text-blue-400 hover:bg-gray-800"
//           }`
//                 }
//               >
//                 Flipkart Orders
//               </NavLink>

//               <NavLink
//                 to="/orders/meesho"
//                 className={({ isActive }) =>
//                   `px-3 py-2 rounded-lg transition
//           ${
//             isActive
//               ? "bg-pink-500 text-white font-bold"
//               : "text-gray-400 hover:text-pink-400 hover:bg-gray-800"
//           }`
//                 }
//               >
//                 Meesho Orders
//               </NavLink>

//               <NavLink
//                 to="/orders/deposite"
//                 className={({ isActive }) =>
//                   `px-3 py-2 rounded-lg transition
//           ${
//             isActive
//               ? "bg-red-500 text-white font-bold"
//               : "text-gray-400 hover:text-red-400 hover:bg-gray-800"
//           }`
//                 }
//               >
//                 Deposite Orders
//               </NavLink>
//             </div>
//           </div>
//           {/* Products */}
//           <NavLink
//             to="/products"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
//       ${
//         isActive
//           ? "bg-white text-black font-bold"
//           : "hover:bg-gray-800 text-gray-300"
//       }`
//             }
//           >
//             <FaBoxOpen />
//             Products
//           </NavLink>

//           {/* Notifications */}
//           <NavLink
//             to="/notifications"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
//     ${
//       isActive
//         ? "bg-white text-black font-bold"
//         : "hover:bg-gray-800 text-gray-300"
//     }`
//             }
//           >
//             <FaBell />
//             Notifications
//           </NavLink>

//           {/* Customers */}
//           <NavLink
//             to="/customers"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
//       ${
//         isActive
//           ? "bg-white text-black font-bold"
//           : "hover:bg-gray-800 text-gray-300"
//       }`
//             }
//           >
//             <FaUsers />
//             Customers
//           </NavLink>
//           {/* Analytics */}
//           <NavLink
//             to="/analytics"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
//       ${
//         isActive
//           ? "bg-white text-black font-bold"
//           : "hover:bg-gray-800 text-gray-300"
//       }`
//             }
//           >
//             <FaChartBar />
//             Analytics
//           </NavLink>
//           {/* Settings */}
//           <NavLink
//             to="/settings"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
//       ${
//         isActive
//           ? "bg-white text-black font-bold"
//           : "hover:bg-gray-800 text-gray-300"
//       }`
//             }
//           >
//             <FaCog />
//             Settings
//           </NavLink>
//           {/* Users */}
//           {currentUser?.role === "admin" && (
//             <NavLink
//               to="/users"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
//       ${
//         isActive
//           ? "bg-white text-black font-bold"
//           : "hover:bg-gray-800 text-gray-300"
//       }`
//               }
//             >
//               <FaUsers />
//               Users
//             </NavLink>
//           )}
//         </div>

//         {/* <button
//           onClick={handleLogout}
//           className="mt-10 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all"
//         >
//           <FaSignOutAlt />
//           Logout
//         </button> */}

//         {currentUser ? (
//           <button
//             onClick={handleLogout}
//             className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all"
//           >
//             <FaSignOutAlt />
//             Logout
//           </button>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-green-400 hover:bg-green-500 hover:text-white transition-all"
//           >
//             <FaSignOutAlt />
//             Login
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default Sidebar;
