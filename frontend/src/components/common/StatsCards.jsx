const StatCard = ({ title, value, active, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        relative
        w-full
        h-[76px]

        flex
        items-center
        justify-between

        px-5

        rounded-[14px]

        border

        text-left

        overflow-hidden

        transition-all
        duration-300

        ${
          active
            ? `
              bg-[#8F1729]
              border-[#8F1729]
              shadow-[0_8px_24px_rgba(143,23,41,0.18)]
            `
            : `
              bg-[#FFFDFC]
              border-[#E6E1D9]
              shadow-[0_3px_12px_rgba(20,25,35,0.045)]
              hover:border-[#CDB77E]
              hover:shadow-[0_8px_22px_rgba(20,25,35,0.08)]
              hover:-translate-y-[1px]
            `
        }
      `}
    >
      {/* Champagne line */}
      <span
        className={`
          absolute
          top-0
          left-5
          right-5
          h-[2px]
          rounded-full

          ${active ? "bg-[#D6B56D]" : "bg-transparent group-hover:bg-[#D6B56D]"}
        `}
      />

      {/* TITLE */}
      <span
        className={`
          text-[12px]
          sm:text-[13px]
          font-medium
          tracking-[0.01em]

          ${active ? "text-[#F7EDE5]" : "text-[#687386]"}
        `}
      >
        {title}
      </span>

      {/* NUMBER */}
      <span
        className={`
          text-[25px]
          font-semibold
          tracking-[-0.03em]
          tabular-nums

          ${active ? "text-white" : "text-[#172033]"}
        `}
      >
        {Number(value || 0).toLocaleString("en-IN")}
      </span>
    </button>
  );
};

const StatsCards = ({ stats = [], activeTab, onTabChange }) => {
  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-7
        gap-3
        mb-5
      "
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.key || stat.title}
          title={stat.title}
          value={stat.value}
          active={activeTab === stat.key}
          onClick={() => onTabChange(stat.key)}
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
