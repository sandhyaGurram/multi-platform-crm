const Badge = ({ status }) => {
  const statusMap = {
    delivered: {
      label: "Delivered",
      color: "bg-green-100 text-green-600",
    },

    in_transit: {
      label: "In Transit",
      color: "bg-blue-100 text-blue-600",
    },

    out_for_delivery: {
      label: "Out for Delivery",
      color: "bg-purple-100 text-purple-600",
    },

    ready_for_pickup: {
      label: "Ready for Pickup",
      color: "bg-indigo-100 text-indigo-600",
    },

    fulfilled: {
      label: "Fulfilled",
      color: "bg-green-100 text-green-600",
    },

    unfulfilled: {
      label: "Unfulfilled",
      color: "bg-yellow-100 text-yellow-600",
    },

    partial: {
      label: "Partially Fulfilled",
      color: "bg-orange-100 text-orange-600",
    },

    cancelled: {
      label: "Cancelled",
      color: "bg-red-100 text-red-600",
    },

    returned: {
      label: "Returned",
      color: "bg-gray-100 text-gray-600",
    },

    pending: {
      label: "Pending",
      color: "bg-yellow-100 text-yellow-600",
    },

    attempted_delivery: {
      label: "Attempted Delivery",
      color: "bg-orange-100 text-orange-600",
    },
  };

  const key = String(status || "")
    .toLowerCase()
    .trim();

  const current = statusMap[key] || {
    label: status || "-",
    color: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        whitespace-nowrap
        px-3
        py-2
        rounded-full
        text-sm
        font-semibold
        leading-none
        ${current.color}
      `}
    >
      {current.label}
    </span>
  );
};

export default Badge;



// const Badge = ({ status }) => {
//   const colors = {
//     Delivered: "bg-green-100 text-green-600",
//     Fulfilled: "bg-green-100 text-green-600",

//     "In Transit": "bg-blue-100 text-blue-600",
//     "Partially Fulfilled": "bg-blue-100 text-blue-600",

//     Unfulfilled: "bg-yellow-100 text-yellow-600",
//     Pending: "bg-yellow-100 text-yellow-600",

//     Cancelled: "bg-red-100 text-red-600",

//     Returned: "bg-purple-100 text-purple-600",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-sm font-bold ${
//         colors[status] || "bg-gray-100 text-gray-600"
//       }`}
//     >
//       {status}
//     </span>
//   );
// };

// export default Badge;








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
