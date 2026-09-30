const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-white px-1 py-1 rounded-lg shadow outline-none w-50"
    />
  );
};

export default SearchBar;
