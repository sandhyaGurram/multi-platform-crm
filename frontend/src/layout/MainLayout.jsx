import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  // Mobile sidebar open/close
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Desktop sidebar expanded/collapsed
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F6F3] overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Area */}
      <div
        className={`
          min-h-screen
          flex
          flex-col
          transition-all
          duration-300
          ease-in-out
          ${sidebarCollapsed ? "md:ml-[72px]" : "md:ml-[260px]"}
        `}
      >
        {/* Navbar */}
        <Navbar setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

// import { useState } from "react";

// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// import { Outlet } from "react-router-dom";

// const MainLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-100 overflow-hidden">
//       {/* Sidebar */}

//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Main Content */}

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Navbar setSidebarOpen={setSidebarOpen} />

//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
