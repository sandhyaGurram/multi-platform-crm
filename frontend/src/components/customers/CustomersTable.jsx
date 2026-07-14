import DataTable from "react-data-table-component";

const currentUser = JSON.parse(localStorage.getItem("crmUser"));

const CustomersTable = ({ customers, onView }) => {
  const columns = [
    {
      name: "Customer ID",
      selector: (row) => row._id || "-",
      width: "200px",
    },
    {
      name: "Name",
      selector: (row) => row.customerName || "-",
      width: "180px",
    },
    {
      name: "Email",
      selector: (row) => row.customerEmail || "-",
      width: "220px",
    },
    {
      name: "Phone",
      selector: (row) => row.customerPhone || "-",
      width: "150px",
    },
    {
      name: "Address",
      cell: (row) => (
        <div className="truncate max-w-[250px]" title={row.customerAddress}>
          {row.customerAddress || "-"}
        </div>
      ),
      grow: 2,
    },
    {
      name: "Orders",
      selector: (row) => row.totalOrders,
      center: true,
      width: "100px",
    },
    {
      name: "Spent",
      selector: (row) => `₹${row.totalSpent || 0}`,
      right: true,
      width: "120px",
    },
    {
      name: "Platform",
      selector: (row) => row.platforms?.join(", ") || "-",
      width: "180px",
    },
    {
      name: "Action",
      center: true,
      width: "150px",
      cell: (row) => (
        <button
          onClick={() => onView(row)}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <DataTable
        columns={columns}
        data={customers}
        pagination
        highlightOnHover
        striped
        responsive
        fixedHeader
        fixedHeaderScrollHeight="500px"
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        persistTableHead
      />
    </div>
  );
};

export default CustomersTable;

// const CustomersTable = ({ customers, onView }) => {
//   return (
//     <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
//       <table className="w-full min-w-[1000px]">
//         {/* Header */}

//         <thead>
//           <tr className="border-b">
//             <th className="text-left p-4">Customer ID</th>

//             <th className="text-left p-4">Name</th>

//             <th className="text-left p-4">Email</th>

//             <th className="text-left p-4">Phone</th>

//             <th className="text-left p-4">Address</th>

//             <th className="text-left p-4">Orders</th>

//             <th className="text-left p-4">Spent</th>

//             <th className="text-left p-4">Status</th>

//             <th className="text-left p-4">Platform</th>

//             <th className="text-left p-4">Action</th>
//           </tr>
//         </thead>

//         {/* Body */}

//         <tbody>
//           {customers.map((customer, index) => (
//             <tr key={index} className="border-b hover:bg-gray-50 transition">
//               <td className="p-4">{customer.orderId}</td>

//               <td className="p-4 font-semibold">{customer.customerName}</td>

//               <td className="p-4">{customer.customerEmail}</td>

//               <td className="p-4">{customer.customerPhone}</td>

//               <td className="p-4">{customer.customerAddress}</td>

//               <td className="p-4">{customer.totalOrders}</td>

//               <td className="p-4">₹{customer.totalSpent?.toLocaleString()}</td>

//               {/* Status */}

//               <td className="p-4">
//                 <span
//                   className={`
//                     px-3 py-1 rounded-full text-sm font-bold

//                     ${customer.status === "Active" && "bg-green-100 text-green-600"}

//                     ${customer.status === "Inactive" && "bg-red-100 text-red-600"}
//                   `}
//                 >
//                   {customer.status}
//                 </span>
//               </td>

//               {/* Platform */}

//               <td className="p-4">{customer.platforms?.join(", ")}</td>

//               {/* Button */}

//               <td className="p-4">
//                 <button
//                   onClick={() => onView(customer)}
//                   className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CustomersTable;
