const Badge = ({ status }) => {
  const colors = {
    Delivered: "bg-green-100 text-green-600",
    Fulfilled: "bg-green-100 text-green-600",

    "In Transit": "bg-blue-100 text-blue-600",
    "Partially Fulfilled": "bg-blue-100 text-blue-600",

    Unfulfilled: "bg-yellow-100 text-yellow-600",
    Pending: "bg-yellow-100 text-yellow-600",

    Cancelled: "bg-red-100 text-red-600",

    Returned: "bg-purple-100 text-purple-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-bold ${
        colors[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

export default Badge;








// const Badge = ({ status }) => {
//   const colors = {
//     Delivered: "bg-green-100 text-green-600",
//     Pending: "bg-yellow-100 text-yellow-600",
//     Cancelled: "bg-red-100 text-red-600",
//     Returned: "bg-blue-100 text-blue-600",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-sm font-bold ${colors[status]}`}
//     >
//       {status}
//     </span>
//   );
// };

// export default Badge;
