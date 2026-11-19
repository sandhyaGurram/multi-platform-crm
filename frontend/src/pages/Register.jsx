import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config/api";
import logo from "../assets/ARM_logo.png";
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      const { data } = await axios.post(
        `${API_URL}/api/auth/register`,
        formData,
      );

      alert(data.message || "Registration successful!");

      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "Unable to register. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "ARM Pearl Beauty | Register";
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F3ED] flex items-center justify-center px-4 py-3">
      {/* REGISTER CARD */}

      <div className="w-full max-w-[560px] bg-white rounded-[22px] px-7 py-7 sm:px-12 sm:py-7 shadow-[0_20px_60px_rgba(42,25,30,0.10)] border border-[#EEE8E0]">
        {/* BRAND LOGO */}

        <div className="flex flex-col items-center mb-5">
          <img
            src={logo}
            alt="ARM Pearl Beauty"
            className="w-[75px] h-[75px] object-contain mb-1"
          />

          <div className="flex items-center gap-2">
            <div className="w-9 h-[1px] bg-[#C9A45C]" />

            <span className="text-[10px] tracking-[0.3em] uppercase text-[#A28B67] font-medium">
              Beauty & Excellence
            </span>

            <div className="w-9 h-[1px] bg-[#C9A45C]" />
          </div>
        </div>

        {/* HEADING */}

        <div className="text-center mb-6">
          <p className="text-[#A78652] text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">
            Create Your Account
          </p>

          <h1 className="text-[32px] sm:text-[36px] font-semibold text-[#30212A] leading-tight">
            Register
          </h1>

          <p className="text-[#8B8582] text-sm mt-2 leading-5">
            Create your account to access the ARM
            <br className="hidden sm:block" />
            business management portal.
          </p>
        </div>

        {/* REGISTER FORM */}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* FULL NAME */}

          <div className="w-full">
            <label className="block text-[12px] font-semibold text-[#393039] mb-2 tracking-wide text-left">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              disabled={isLoading}
              className="w-full h-[48px] px-4 rounded-lg border border-[#DDD5CC] bg-white text-[#302831] text-[14px] placeholder:text-[#AAA19A] outline-none transition-all duration-200 hover:border-[#BDAE9D] focus:border-[#8B3048] focus:ring-[3px] focus:ring-[#8B3048]/10 disabled:bg-gray-100"
            />
          </div>

          {/* EMAIL */}

          <div className="w-full">
            <label className="block text-[12px] font-semibold text-[#393039] mb-2 tracking-wide text-left">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              autoComplete="email"
              required
              disabled={isLoading}
              className="w-full h-[48px] px-4 rounded-lg border border-[#DDD5CC] bg-white text-[#302831] text-[14px] placeholder:text-[#AAA19A] outline-none transition-all duration-200 hover:border-[#BDAE9D] focus:border-[#8B3048] focus:ring-[3px] focus:ring-[#8B3048]/10 disabled:bg-gray-100"
            />
          </div>

          {/* PASSWORD */}

          <div className="w-full">
            <label className="block text-[12px] font-semibold text-[#393039] mb-2 tracking-wide text-left">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create your password"
                autoComplete="new-password"
                required
                disabled={isLoading}
                className="w-full h-[48px] px-4 pr-12 rounded-lg border border-[#DDD5CC] bg-white text-[#302831] text-[14px] placeholder:text-[#AAA19A] outline-none transition-all duration-200 hover:border-[#BDAE9D] focus:border-[#8B3048] focus:ring-[3px] focus:ring-[#8B3048]/10 disabled:bg-gray-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94877F] hover:text-[#781D32] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* ERROR MESSAGE */}

          {errorMessage && (
            <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {/* REGISTER BUTTON */}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-[50px] rounded-lg text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_8px_20px_rgba(120,29,50,0.16)] ${
              isLoading
                ? "bg-[#9B5265] cursor-not-allowed"
                : "bg-[#781D32] hover:bg-[#601628] hover:shadow-[0_12px_25px_rgba(120,29,50,0.22)]"
            }`}
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* LOGIN LINK */}

        <div className="mt-4 text-center">
          <p className="text-sm text-[#8B8582]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#781D32] hover:text-[#A78652] transition-colors"
            >
              Login
            </Link>
          </p>
        </div>

        {/* SECURITY */}

        <div className="mt-5 flex items-center justify-center gap-3">
          <ShieldCheck size={17} className="text-[#B18B4F]" />

          <p className="text-[11px] text-[#9B918B]">
            Secure access to ARM business portal
          </p>
        </div>

        {/* FOOTER */}

        <div className="mt-5 pt-4 border-t border-[#F0EBE5] text-center">
          <p className="text-[10px] tracking-[0.12em] text-[#A69B94] uppercase">
            © {new Date().getFullYear()} ARM Pearl Beauty. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { API_URL } from "../config/api";
// import logo from "../assets/ARM_logo.png";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
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
//         // "http://localhost:5000/api/auth/register",
//         `${API_URL}/api/auth/register`,

//         formData,
//       );

//       alert(data.message);

//       navigate("/login");
//     } catch (error) {
//       console.log(error);

//       alert(error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     document.title = "ARM - Register";
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src={logo}
//             alt="ARM Logo"
//             className="w-24 h-24 object-contain mb-3"
//           />

//           <h1 className="text-5xl font-bold">Register</h1>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             onChange={handleChange}
//             className="w-full border p-3 rounded-lg"
//           />

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
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
