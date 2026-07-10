import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import logo from "../assets/ARM_logo.png";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        // "http://localhost:5000/api/auth/register",
        `${API_URL}/api/auth/register`,

        formData,
      );

      alert(data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    document.title = "ARM - Register";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="ARM Logo"
            className="w-24 h-24 object-contain mb-3"
          />

          <h1 className="text-5xl font-bold">Register</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
