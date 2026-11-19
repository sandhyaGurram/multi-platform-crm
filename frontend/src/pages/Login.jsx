import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import logo from "../assets/ARM_logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, formData);

      localStorage.setItem("crmUser", JSON.stringify(data));

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);

      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "ARM - Login";
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

          <h1 className="text-5xl font-bold">CRM Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="username"
            disabled={isLoading}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            disabled={isLoading}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
          />

          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-3 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 ${
              isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { API_URL } from "../config/api";
// import logo from "../assets/ARM_logo.png";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,

//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post(
//         // "http://localhost:5000/api/auth/login",
//         `${API_URL}/api/auth/login`,

//         formData,
//       );
//       console.log("Login Response:", data);

//       localStorage.setItem("crmUser", JSON.stringify(data));

//       navigate("/");
//     } catch (error) {
//       console.log(error);

//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     document.title = "ARM - Login";
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
//         {/* <h1 className="text-3xl font-bold mb-8 text-center">CRM Login</h1> */}
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src={logo}
//             alt="ARM Logo"
//             className="w-24 h-24 object-contain mb-3"
//           />

//           <h1 className="text-5xl font-bold">CRM Login</h1>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             className="w-full border p-3 rounded-lg"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             className="w-full border p-3 rounded-lg"
//           />

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-3 rounded-lg"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
