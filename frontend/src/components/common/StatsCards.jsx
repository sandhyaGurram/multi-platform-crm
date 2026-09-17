const StatCard = ({ title, value }) => {
  return (
    <div
      className="
        bg-white
        rounded-xl
        border border-gray-100
        shadow-sm
        px-3 sm:px-3
        py-2
        min-h-[105px]
        flex flex-col
        justify-center
        items-center
        text-center
        transition-all
        duration-200
        hover:shadow-md
      "
    >
      <p className="text-sm sm:text-base text-[#64748b] font-medium">{title}</p>

      <p className="text-xl sm:text-2xl font-bold text-[#475569] mt-1">
        {value}
      </p>
    </div>
  );
};

const StatsCards = ({ stats }) => {
  return (
    <div
      className="
        grid
        grid-cols-3
        sm:grid-cols-3
        lg:grid-cols-6
        gap-4
        mb-6
      "
    >
      {stats.map((stat, index) => (
        <StatCard key={index} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
};

export default StatsCards;
