const StatCard = ({ title, value, active, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        relative
        w-full
        h-[72px]
        sm:h-[78px]

        flex
        items-center
        justify-between

        px-4
        sm:px-5

        rounded-[14px]

        border

        transition-all
        duration-300
        ease-out

        cursor-pointer
        overflow-hidden

        ${
          active
            ? `
              bg-[#8F1528]
              border-[#8F1528]
              
            `
            : `
              bg-[#FFFFFF]
              border-[#E7E5E1]
          
              hover:border-[#C9A86A]
              hover:shadow-[0_8px_22px_rgba(15,23,42,0.08)]
              hover:-translate-y-[1px]
            `
        }
      `}
    >
      {/* Champagne accent */}
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

      {/* Title */}
      <span
        className={`
          text-[11px]
          sm:text-[13px]

          font-medium
          tracking-[0.02em]

          text-left
          leading-tight

          ${active ? "text-[#F8EBDD]" : "text-[#64748B]"}
        `}
      >
        {title}
      </span>

      {/* Number */}
      <span
        className={`
          ml-3

          text-[23px]
          sm:text-[27px]

          font-semibold
          tracking-[-0.02em]

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
        lg:grid-cols-5
        xl:grid-cols-8

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
