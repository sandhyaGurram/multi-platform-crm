import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaBars,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("crmUser") || "null");

  const handleLogout = () => {
    localStorage.removeItem("crmUser");
    // Keep this if your application stores a separate token.
    localStorage.removeItem("token");

    navigate("/login");
  };

  const mobile = user?.mobile || user?.phone || user?.phoneNumber || "";

  return (
    <header className="sticky top-0 z-40 h-[78px] bg-[#FFFDFC]/95 backdrop-blur-xl border-b border-[#E8E2D9] shadow-[0_4px_20px_rgba(23,32,51,0.04)] px-4 md:px-6 lg:px-8 flex items-center justify-between">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4 flex-1">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#172033] hover:bg-[#F7F3ED] transition"
          aria-label="Open sidebar"
        >
          <FaBars size={20} />
        </button>

        {/* SEARCH */}
        <div className="hidden md:flex relative items-center w-[300px] lg:w-[400px] h-[44px] rounded-[13px] bg-[#F7F5F1] border border-[#E7E1D8] transition-all duration-200 focus-within:bg-white focus-within:border-[#C9A86A] focus-within:shadow-[0_4px_16px_rgba(201,168,106,0.10)]">
          <FaSearch className="absolute left-4 text-[#7D8490]" size={15} />

          <input
            type="text"
            placeholder="Search anything..."
            className="w-full h-full bg-transparent pl-11 pr-14 outline-none text-[13px] text-[#172033] placeholder:text-[#9CA3AF]"
          />

          <span className="absolute right-3 hidden lg:flex items-center justify-center h-6 px-2 rounded-md bg-white border border-[#E3DED6] text-[10px] font-medium text-[#9A948A] shadow-sm">
            Ctrl K
          </span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* NOTIFICATIONS */}
        <button
          type="button"
          className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[#626B79] hover:bg-[#F7F3ED] hover:text-[#A51E27] transition"
          aria-label="Notifications"
        >
          <FaBell size={19} />

          <span className="absolute top-[3px] right-[2px] min-w-[17px] h-[17px] px-1 flex items-center justify-center rounded-full bg-[#A51E27] text-white text-[9px] font-bold border-2 border-[#FFFDFC]">
            3
          </span>
        </button>

        <div className="hidden sm:block h-8 w-px bg-[#E8E2D9]" />

        {/* USER PROFILE */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            aria-expanded={profileOpen}
            aria-label="Toggle user profile"
            className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 hover:bg-[#F8F5EF] transition"
          >
            <div className="w-10 h-10 rounded-full bg-[#172033] flex items-center justify-center text-white shadow-[0_3px_10px_rgba(23,32,51,0.15)]">
              <FaUserCircle size={25} />
            </div>

            {/* Only the name appears in the navbar */}
            <div className="hidden md:block text-left max-w-[160px]">
              <p className="text-[13px] font-semibold text-[#172033] leading-tight truncate">
                {user?.name || "User"}
              </p>
            </div>

            <FaChevronDown
              className={`hidden md:block text-[#8A929E] ml-1 transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
              size={11}
            />
          </button>

          {/* DROPDOWN */}
          {profileOpen && (
            <>
              {/* Close dropdown when clicking outside */}
              <button
                type="button"
                aria-label="Close profile menu"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setProfileOpen(false)}
              />

              <div className="absolute right-0 top-full z-50 mt-3 w-[340px] max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-[#EAE3D9] bg-white shadow-[0_18px_55px_rgba(23,32,51,0.16)]">
                {/* Premium profile header — no user icon */}
                <div className="relative overflow-hidden border-b border-[#F0EBE4] bg-gradient-to-br from-[#FFFDFC] via-white to-[#F9F3F0] px-5 py-5">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#A51E27]/[0.04] blur-2xl" />

                  <div className="relative flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold tracking-[-0.3px] text-[#172033]">
                        {user?.name || "User"}
                      </p>
                      <p className="mt-1 text-[11px] tracking-wide text-[#96918A]">
                        YOUR ACCOUNT
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-[#A51E27]/15 bg-[#A51E27]/[0.07] px-3 py-1.5 text-[11px] font-semibold capitalize tracking-wide text-[#A51E27]">
                      {user?.role || "user"}
                    </span>
                  </div>
                </div>

                {/* Account details */}
                <div className="px-5 py-2">
                  {/* Email row */}
                  <div className="flex items-start justify-between gap-4 border-b border-[#F1EDE7] py-4">
                    <span className="shrink-0 text-[12px] font-medium text-[#918B83]">
                      Email
                    </span>

                    <span className="max-w-[195px] break-all text-right text-[12px] font-medium leading-5 text-[#303747]">
                      {user?.email || "---"}
                    </span>
                  </div>

                  {/* Mobile row */}
                  <div className="flex items-center justify-between gap-4 py-4">
                    <span className="shrink-0 text-[12px] font-medium text-[#918B83]">
                      Mobile
                    </span>

                    <span className="text-right text-[12px] font-medium text-[#303747]">
                      {user?.mobile ||
                        user?.phone ||
                        user?.phoneNumber ||
                        "---"}
                    </span>
                  </div>
                </div>

                {/* Logout */}
                <div className="border-t border-[#EAE3D9] bg-[#FFFDFC] p-3">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="group flex w-full items-center justify-between rounded-xl px-3 py-3 transition duration-200 hover:bg-[#A51E27]/[0.06]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#A51E27]/[0.08] text-[#A51E27] transition group-hover:bg-[#A51E27] group-hover:text-white">
                        <FaSignOutAlt size={15} />
                      </span>

                      <span className="text-[13px] font-semibold text-[#A51E27]">
                        Sign out
                      </span>
                    </span>

                    <span className="text-lg text-[#B9B1A7] transition group-hover:translate-x-1 group-hover:text-[#A51E27]">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// import { FaBell, FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
// import { FaChevronDown } from "react-icons/fa";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUserCircle, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
// import { API_URL } from "../config/api";

// const Navbar = ({ setSidebarOpen }) => {
//   const user = JSON.parse(localStorage.getItem("crmUser"));

//   const navigate = useNavigate();
//   const [profileOpen, setProfileOpen] = useState(false);

//   const user = JSON.parse(localStorage.getItem("crmUser") || "null");

//   const handleLogout = async () => {
//     try {
//       if (user?._id) {
//         await axios.post(`${API_URL}/api/auth/logout/${user._id}`);
//       }
//     } catch (error) {
//       console.error("Logout API error:", error);
//     } finally {
//       localStorage.removeItem("crmUser");
//       navigate("/login");
//     }
//   };

//   return (
//     <header className="  sticky  top-0  z-40  h-[78px]  bg-[#FFFDFC]/95  backdrop-blur-xl  border-b  border-[#E8E2D9]  shadow-[0_4px_20px_rgba(23,32,51,0.04)]  px-4  md:px-6  lg:px-8  flex  items-center justify-between ">
//       {/* =================================================
//           LEFT SECTION
//       ================================================= */}

//       <div className="flex items-center gap-4 flex-1">
//         {/* MOBILE MENU */}
//         <button
//           type="button"
//           onClick={() => setSidebarOpen(true)}
//           className=" md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#172033]  hover:bg-[#F7F3ED]  transition "
//         >
//           <FaBars size={20} />
//         </button>

//         {/* SEARCH */}
//         <div className=" hidden md:flex  relative items-center  w-[300px] lg:w-[400px] h-[44px] rounded-[13px]  bg-[#F7F5F1]   border  border-[#E7E1D8]  transition-all duration-200  focus-within:bg-white  focus-within:border-[#C9A86A]  focus-within:shadow-[0_4px_16px_rgba(201,168,106,0.10)] ">
//           {/* SEARCH ICON */}
//           <FaSearch
//             className="  absolute  left-4  text-[#7D8490]  "
//             size={15}
//           />

//           <input
//             type="text"
//             placeholder="Search anything..."
//             className="  w-full  h-full bg-transparent  pl-11  pr-14  outline-none text-[13px]  text-[#172033]  placeholder:text-[#9CA3AF] "
//           />

//           {/* SHORTCUT */}
//           <span className="  absolute right-3  hidden  lg:flex  items-center justify-center  h-6  px-2  rounded-md  bg-white  border  border-[#E3DED6]   text-[10px]  font-medium  text-[#9A948A] shadow-sm  ">
//             Ctrl K
//           </span>
//         </div>
//       </div>

//       {/* =================================================
//           RIGHT SECTION
//       ================================================= */}

//       <div className="  flex  items-center  gap-2  md:gap-4  ">
//         {/* NOTIFICATIONS */}
//         <button
//           type="button"
//           className="  relative   w-10  h-10  flex  items-center  justify-center   rounded-xl  text-[#626B79]  hover:bg-[#F7F3ED]  hover:text-[#A51E27]  transition "
//         >
//           <FaBell size={19} />

//           {/* Notification count */}
//           <span className="absolute  top-[3px]  right-[2px]  min-w-[17px]   h-[17px]  px-1  flex   items-center  justify-center  rounded-full  bg-[#A51E27]  text-white  text-[9px]  font-bold  border-2   border-[#FFFDFC]  ">
//             {" "}
//             3{" "}
//           </span>
//         </button>

//         {/* DIVIDER */}
//         <div className="  hidden  sm:block  h-8  w-px  bg-[#E8E2D9]  " />

//         {/* USER PROFILE */}
//         <button
//           type="button"
//           className="  flex  items-center   gap-2.5  rounded-xl  px-2  py-1.5  hover:bg-[#F8F5EF]  transition  "
//         >
//           {/* USER ICON */}
//           <div className="  w-10  h-10  rounded-full  bg-[#172033]  flex  items-center  justify-center  text-white  shadow-[0_3px_10px_rgba(23,32,51,0.15)]  ">
//             <FaUserCircle size={25} className="text-white" />
//           </div>

//           {/* USER DETAILS */}
//           <div className="hidden md:block text-left">
//             <p className="  text-[13px]  font-semibold  text-[#172033]  leading-tight">
//               {" "}
//               {user?.name || "User"}{" "}
//             </p>

//             <p className="  text-[11px]  text-[#8A929E]  mt-1  ">
//               {" "}
//               {user?.email || ""}{" "}
//             </p>
//           </div>

//           {/* DROPDOWN */}
//           <FaChevronDown
//             className="  hidden   md:block  text-[#8A929E]   ml-1   "
//             size={11}
//           />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// import { FaBell, FaSearch, FaUserCircle, FaBars } from "react-icons/fa";

// const Navbar = ({ setSidebarOpen }) => {
//   const user = JSON.parse(localStorage.getItem("crmUser"));

//   return (
//     <div className="bg-white shadow-md px-4 md:px-6 py-4 flex items-center justify-between">
//       {/* Left */}

//       <div className="flex items-center gap-4">
//         {/* Mobile Menu */}

//         <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
//           <FaBars size={22} />
//         </button>

//         {/* Search */}

//         <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-lg w-96">
//           <FaSearch className="text-gray-500" />

//           <input
//             type="text"
//             placeholder="Search..."
//             className="bg-transparent outline-none ml-3 w-full"
//           />
//         </div>
//       </div>

//       {/* Right */}

//       <div className="flex items-center gap-4 md:gap-6">
//         <div className="relative">
//           <FaBell className="text-2xl" />

//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
//             3
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <FaUserCircle className="text-3xl" />

//           <div className="hidden md:block">
//             <p className="font-bold">{user?.name}</p>

//             <p className="text-sm text-gray-500">{user?.email}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
