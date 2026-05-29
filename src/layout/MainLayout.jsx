import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { Outlet } from "react-router-dom";

const MainLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}

      <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default MainLayout;



// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import { Outlet } from "react-router-dom";

// const MainLayout = () => {
//   return (
//     <div className="flex h-screen bg-gray-100">

//       {/* Sidebar */}
//       <Sidebar />

//       {/* Right Section */}
//       <div className="flex-1 flex flex-col">

//         {/* Navbar */}
//         <Navbar />

//         {/* Main Content */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           <Outlet />
//         </main>

//       </div>

//     </div>
//   );
// };

// export default MainLayout;