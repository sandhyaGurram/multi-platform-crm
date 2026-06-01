import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";

const Navbar = ({ setSidebarOpen }) => {

  const user = JSON.parse(
  localStorage.getItem("crmUser")
);

  return (
    <div className="bg-white shadow-md px-4 md:px-6 py-4 flex items-center justify-between">

      {/* Left */}

      <div className="flex items-center gap-4">

        {/* Mobile Menu */}

        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars size={22} />
        </button>

        {/* Search */}

        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-lg w-96">

          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-3 w-full"
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4 md:gap-6">

        <div className="relative">

          <FaBell className="text-2xl" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>

        </div>

        <div className="flex items-center gap-2">

          <FaUserCircle className="text-3xl" />

          <div className="hidden md:block">

            <p className="font-bold">
  {user?.name}
</p>

<p className="text-sm text-gray-500">
  {user?.email}
</p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Navbar;