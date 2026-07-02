import { useState } from "react";
import DataTable from "react-data-table-component";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { FaEdit, FaTrash } from "react-icons/fa";

const OrdersTable = ({ orders, onView, onDelete }) => {
  // const filteredOrders = orders.filter((order) => {
  //   const searchValue = search.toLowerCase();

  //   const searchableText = `
  //     ${order.orderId}
  //     ${order.customerName || order.customer}
  //     ${order.productName}
  //     ${order.customerPhone}
  //     ${order.customerAddress}
  //     ${order.paymentMethod}
  //     ${order.trackingId}
  //     ${order.amount}
  //     ${order.platform}
  //     ${order.status}
  //   `.toLowerCase();

  //   return searchableText.includes(searchValue);
  // });

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.orderId || "-",

      width: "130px",
      wrap: false,
    },
    {
      name: "Customer",
      selector: (row) => row.customerName || row.customer || "-",

      width: "170px",
    },
    {
      name: "Product",
      selector: (row) => row.productName || "-",
      width: "170px",
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
      width: "130px",
    },
    {
      name: "Order Date",
      selector: (row) =>
        row.orderDate ? new Date(row.orderDate).toLocaleDateString() : "-",
      width: "100px",
    },
    {
      name: "Amount",
      selector: (row) => row.amount || "-",
      right: true,
      width: "80px",
    },
    {
      name: "Payment",
      selector: (row) => row.paymentMethod || "-",
      width: "120px",
    },
    {
      name: "Tracking ID",
      selector: (row) => row.trackingId || "-",
      width: "130px",
    },
    {
      name: "Status",
      cell: (row) => <Badge status={row.status} />,
      center: true,
      width: "140px",
    },
    {
      name: "Platform",
      center: true,
      width: "130px",
      cell: (row) => {
        const color =
          row.platform === "Shopify"
            ? "bg-green-100 text-green-700"
            : row.platform === "Amazon"
              ? "bg-yellow-100 text-yellow-700"
              : row.platform === "Flipkart"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700";

        return (
          <span
            className={`inline-block whitespace-nowrap px-3 py-1 rounded-full text-sm font-semibold ${color}`}
          >
            {row.platform}
          </span>
        );
      },
    },
    {
      name: "Action",
      center: true,
      width: "160px",
      cell: (row) => (
        <div className=" gap-2 items-center">
          <button
            onClick={() => onView(row)}
            className="bg-black text-white p-2 rounded-lg hover:bg-gray-800"
            title="View"
          >
            <FaEdit size={18} />
          </button>

          <button
            onClick={() => onDelete(row._id)}
            className="bg-red-500 text-white p-2 ms-2 rounded-lg hover:bg-red-600"
            title="Delete"
          >
            <FaTrash size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <DataTable
        columns={columns}
        data={orders}
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

export default OrdersTable;

// =========================================================================================================

// import Badge from "../ui/Badge";
// import Button from "../ui/Button";
// import { useState } from "react";

// import DataTable from "react-data-table-component";

// const OrdersTable = ({ orders, onView, onDelete }) => {
//   const [search, setSearch] = useState("");

//   const filteredOrders = orders.filter((order) => {
//     const searchValue = search.toLowerCase();

//     const searchableText = `
//     ${order.orderId}
//     ${order.customerName || order.customer}
//     ${order.productName}
//     ${order.customerPhone}
//     ${order.customerAddress}
//     ${order.paymentMethod}
//     ${order.trackingId}
//     ${order.amount}
//     ${order.platform}
//   `.toLowerCase();

//     return searchableText.includes(searchValue);
//   });

//   const columns = [
//     {
//       name: "Order ID",
//       selector: (row) => row.orderId,
//
//     },
//     {
//       name: "Customer",
//       selector: (row) => row.customerName || row.customer,
//
//     },
//     {
//       name: "Product",
//       selector: (row) => row.productName,
//     },
//     {
//       name: "Phone",
//       selector: (row) => row.customerPhone,
//     },
//     {
//       name: "Address",
//       selector: (row) => row.customerAddress,
//       grow: 2,
//     },
//     {
//       name: "Order Date",
//       selector: (row) =>
//         row.orderDate ? new Date(row.orderDate).toLocaleDateString() : "-",
//
//     },
//     {
//       name: "Amount",
//       selector: (row) => row.amount,
//
//     },
//     {
//       name: "Payment",
//       selector: (row) => row.paymentMethod || "-",
//     },
//     {
//       name: "Tracking ID",
//       selector: (row) => row.trackingId || "-",
//     },
//     {
//       name: "Status",
//       cell: (row) => <Badge status={row.status} />,
//     },
//     {
//       name: "Platform",
//       cell: (row) => (
//         <span
//           className={`px-3 py-1 rounded-full text-sm font-bold
//       ${row.platform === "Shopify" ? "bg-green-100 text-green-700" : ""}
//       ${row.platform === "Amazon" ? "bg-yellow-100 text-yellow-700" : ""}
//       ${row.platform === "Flipkart" ? "bg-blue-100 text-blue-700" : ""}
//       `}
//         >
//           {row.platform}
//         </span>
//       ),
//     },
//     {
//       name: "Action",
//       width: "150px",
//       cell: (row) => (
//         <div className="flex flex-col gap-2">
//           <div className="py-1" onClick={() => onView(row)}>
//             <Button text="View" />
//           </div>

//           <button
//             onClick={() => onDelete(row._id)}
//             className="bg-red-500 text-white px-4 py-1 rounded-lg"
//           >
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
//       <input
//         type="text"
//         placeholder="Search..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="border p-2 rounded mb-4"
//       />

//       <DataTable
//         columns={columns}
//         data={filteredOrders}
//         pagination
//         highlightOnHover
//         striped
//         responsive
//         fixedHeader
//         fixedHeaderScrollHeight="500px"
//         paginationPerPage={10}
//         paginationRowsPerPageOptions={[10, 25, 50, 100]}
//       />

//       {/* <table className="display w-full min-w-[700px]">
//         <thead>
//           <tr className="border-b">
//             <th className="text-left p-1">Order ID</th>

//             <th className="text-left p-1">Customer Name</th>
//             <th className="p-1">Product</th>
//             <th className="text-left p-1">Phone</th>
//             <th className="text-left p-1">Address</th>
//             <th className="text-left p-1">Order Date</th>

//             <th className="text-left p-1">Payment</th>

//             <th className="text-left p-1">Tracking ID</th>

//             <th className="text-left p-1">Amount</th>

//             <th className="text-left p-1">Status</th>
//             <th className="text-left p-1">Platform</th>

//             <th className="text-left p-1">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.map((order, index) => (
//             <tr key={index} className="border-b hover:bg-gray-50 transition">
//               <td className="p-1">{order.orderId}</td>

//               <td className="p-1">{order.customerName || order.customer}</td>
//               <td className="p-1">{order.productName}</td>
//               <td className="p-1">{order.customerPhone}</td>
//               <td className="p-1">{order.customerAddress}</td>

//               <td className="p-1">
//                 {order.orderDate
//                   ? new Date(order.orderDate).toLocaleDateString()
//                   : "-"}
//               </td>

//               <td className="p-1">{order.paymentMethod || "-"}</td>

//               <td className="p-1">{order.trackingId || "-"}</td>

//               <td className="p-1">{order.amount}</td>

//               <td className="p-1">
//                 <Badge status={order.status} />
//               </td>
//               <td className="p-1">
//                 <span
//                   className={`
//       px-3 py-1 rounded-full text-sm font-bold

//       ${order.platform === "Shopify" && "bg-green-100 text-green-700"}

//       ${order.platform === "Amazon" && "bg-yellow-100 text-yellow-700"}

//       ${order.platform === "Flipkart" && "bg-blue-100 text-blue-700"}
//     `}
//                 >
//                   {order.platform}
//                 </span>
//               </td>

//               <td className="p-1">
//                 <div className="flex gap-3">
//                   <div onClick={() => onView(order)}>
//                     <Button text="View" />
//                   </div>

//                   <button
//                     onClick={() => onDelete(order._id)}
//                     className="bg-red-500 text-white px-4 py-1 rounded-lg"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table> */}
//     </div>
//   );
// };

// export default OrdersTable;
