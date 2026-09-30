const StatCard = ({ title, value, index }) => {
  const isTotal = title === "Total Orders";

  return (
    <div
      className={`
        relative group
        flex flex-col justify-between
        min-h-[100px] sm:min-h-[115px] lg:min-h-[125px]
        rounded-2xl
        border
        px-4 py-4 sm:px-5 sm:py-5
        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-lg

        ${
          isTotal
            ? `
              col-span-2 sm:col-span-1
              bg-[#172B4D]
              border-[#172B4D]
              shadow-md
            `
            : `
              bg-white
              border-[#E8ECF2]
              shadow-[0_2px_8px_rgba(15,23,42,0.04)]
              hover:border-[#CBD5E1]
            `
        }
      `}
    >
      {/* Decorative top accent */}
      <div
        className={`
          absolute top-0 left-5 right-5
          h-[2px] rounded-full
          ${isTotal ? "bg-[#C9A86A]" : "bg-transparent"}
        `}
      />

      {/* Title */}
      <p
        className={`
          text-[12px] sm:text-[13px]
          font-medium tracking-wide
          leading-relaxed
          ${isTotal ? "text-[#CBD5E1]" : "text-[#64748B]"}
        `}
      >
        {title}
      </p>

      {/* Value */}
      <div className="flex items-end justify-between mt-3">
        <p
          className={`
            text-[26px] sm:text-[30px]
            font-bold tracking-tight
            leading-none tabular-nums
            ${isTotal ? "text-white" : "text-[#1E293B]"}
          `}
        >
          {Number(value || 0).toLocaleString("en-IN")}
        </p>

        <span
          className={`
            text-[10px] font-medium
            ${isTotal ? "text-[#C9A86A]" : "text-[#CBD5E1]"}
          `}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

const StatsCards = ({ stats = [] }) => {
  return (
    <div
      className="
        grid
        grid-cols-4
        sm:grid-cols-4
        lg:grid-cols-8
        xl:grid-cols-8
        gap-3 sm:gap-4
        mb-5
        w-full
      "
    >
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          index={index}
        />
      ))}
    </div>
  );
};

export default StatsCards;

// const StatCard = ({ title, value }) => {
//   return (
//     <div
//       className="
//         bg-white
//         rounded-xl
//         border border-gray-100
//         shadow-sm
//         px-3 sm:px-1
//         flex flex-col
//         justify-center
//         items-center
//         text-center
//         transition-all
//         duration-200
//         hover:shadow-md
//       "
//     >
//       <p className="text-sm sm:text-base text-[#64748b] font-small">{title}</p>

//       <p className="text-xl sm:text-xl font-bold text-[#475569] mt-1">
//         {value}
//       </p>
//     </div>
//   );
// };

// const StatsCards = ({ stats }) => {
//   return (
//     <div
//       className="
//         grid
//         grid-cols-4
//         sm:grid-cols-4
//         lg:grid-cols-8
//         gap-2
//         mb-3
//       "
//     >
//       {stats.map((stat, index) => (
//         <StatCard key={index} title={stat.title} value={stat.value} />
//       ))}
//     </div>
//   );
// };

// export default StatsCards;
