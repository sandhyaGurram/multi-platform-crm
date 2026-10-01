import { FaBell, FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const Navbar = ({ setSidebarOpen }) => {
  const user = JSON.parse(localStorage.getItem("crmUser"));

  return (
    <header
      className="
        sticky
        top-0
        z-40
        h-[78px]

        bg-[#FFFDFC]/95
        backdrop-blur-xl

        border-b
        border-[#E8E2D9]

        shadow-[0_4px_20px_rgba(23,32,51,0.04)]

        px-4
        md:px-6
        lg:px-8

        flex
        items-center
        justify-between
      "
    >
      {/* =================================================
          LEFT SECTION
      ================================================= */}

      <div className="flex items-center gap-4 flex-1">
        {/* MOBILE MENU */}
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="
            md:hidden

            w-10
            h-10

            flex
            items-center
            justify-center

            rounded-xl

            text-[#172033]

            hover:bg-[#F7F3ED]
            hover:text-[#A51E27]

            transition
          "
        >
          <FaBars size={20} />
        </button>

        {/* SEARCH */}
        <div
          className="
            hidden
            md:flex

            relative

            items-center

            w-[300px]
            lg:w-[400px]

            h-[44px]

            rounded-[13px]

            bg-[#F7F5F1]

            border
            border-[#E7E1D8]

            transition-all
            duration-200

            focus-within:bg-white
            focus-within:border-[#C9A86A]
            focus-within:shadow-[0_4px_16px_rgba(201,168,106,0.10)]
          "
        >
          {/* SEARCH ICON */}
          <FaSearch
            className="
              absolute
              left-4
              text-[#7D8490]
            "
            size={15}
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="
              w-full
              h-full

              bg-transparent

              pl-11
              pr-14

              outline-none

              text-[13px]
              text-[#172033]

              placeholder:text-[#9CA3AF]
            "
          />

          {/* SHORTCUT */}
          <span
            className="
              absolute
              right-3

              hidden
              lg:flex

              items-center
              justify-center

              h-6
              px-2

              rounded-md

              bg-white

              border
              border-[#E3DED6]

              text-[10px]
              font-medium
              text-[#9A948A]

              shadow-sm
            "
          >
            Ctrl K
          </span>
        </div>
      </div>

      {/* =================================================
          RIGHT SECTION
      ================================================= */}

      <div
        className="
          flex
          items-center

          gap-2
          md:gap-4
        "
      >
        {/* NOTIFICATIONS */}
        <button
          type="button"
          className="
            relative

            w-10
            h-10

            flex
            items-center
            justify-center

            rounded-xl

            text-[#626B79]

            hover:bg-[#F7F3ED]
            hover:text-[#A51E27]

            transition
          "
        >
          <FaBell size={19} />

          {/* Notification count */}
          <span
            className="
              absolute

              top-[3px]
              right-[2px]

              min-w-[17px]
              h-[17px]

              px-1

              flex
              items-center
              justify-center

              rounded-full

              bg-[#A51E27]

              text-white
              text-[9px]
              font-bold

              border-2
              border-[#FFFDFC]
            "
          >
            3
          </span>
        </button>

        {/* DIVIDER */}
        <div
          className="
            hidden
            sm:block

            h-8
            w-px

            bg-[#E8E2D9]
          "
        />

        {/* USER PROFILE */}
        <button
          type="button"
          className="
            flex
            items-center
            gap-2.5

            rounded-xl

            px-2
            py-1.5

            hover:bg-[#F8F5EF]

            transition
          "
        >
          {/* USER ICON */}
          <div
            className="
              w-10
              h-10

              rounded-full

              bg-[#172033]

              flex
              items-center
              justify-center

              text-white

              shadow-[0_3px_10px_rgba(23,32,51,0.15)]
            "
          >
            <FaUserCircle size={25} className="text-white" />
          </div>

          {/* USER DETAILS */}
          <div className="hidden md:block text-left">
            <p
              className="
                text-[13px]
                font-semibold
                text-[#172033]
                leading-tight
              "
            >
              {user?.name || "User"}
            </p>

            <p
              className="
                text-[11px]
                text-[#8A929E]
                mt-1
              "
            >
              {user?.email || ""}
            </p>
          </div>

          {/* DROPDOWN */}
          <FaChevronDown
            className="
              hidden
              md:block

              text-[#8A929E]

              ml-1
            "
            size={11}
          />
        </button>
      </div>
    </header>
  );
};

export default Navbar;

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
