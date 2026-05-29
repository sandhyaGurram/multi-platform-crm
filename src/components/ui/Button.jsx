const Button = ({ text }) => {
  return (
    <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
      {text}
    </button>
  );
};

export default Button;