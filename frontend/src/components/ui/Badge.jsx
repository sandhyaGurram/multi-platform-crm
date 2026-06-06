const Badge = ({ status }) => {
  const colors = {
    Delivered: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Cancelled: "bg-red-100 text-red-600",
    Returned: "bg-blue-100 text-blue-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-bold ${colors[status]}`}
    >
      {status}
    </span>
  );
};

export default Badge;
