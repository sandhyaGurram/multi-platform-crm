const SearchBar = ({
  value,
  onChange,
  placeholder = "Search..."
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-white px-4 py-3 rounded-lg shadow outline-none w-80"
    />
  );
};

export default SearchBar;
