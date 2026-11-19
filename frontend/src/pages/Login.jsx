import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import logo from "../assets/ARM_logo.png";
import { Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const { data } = await axios.post(`${API_URL}/api/auth/login`, formData);

      localStorage.setItem("crmUser", JSON.stringify(data));

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);

      setErrorMessage(
        error.response?.data?.message || "Unable to sign in. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "ARM Pearl Beauty | CRM Login";
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F3ED] flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-[1200px] min-h-[680px] bg-white rounded-[28px] overflow-hidden shadow-[0_25px_80px_rgba(42,25,30,0.10)] grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT - LOGIN SECTION */}

        <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-16 xl:px-20">
          {/* LOGO */}

          <div className="mb-12">
            <img
              src={logo}
              alt="ARM Pearl Beauty"
              className="w-[115px] h-[115px] object-contain"
            />

            <div className="mt-3 flex items-center gap-2">
              <div className="w-8 h-[1px] bg-[#C9A45C]" />

              <span className="text-[10px] tracking-[0.3em] uppercase text-[#A28B67] font-medium">
                Beauty & Excellence
              </span>
            </div>
          </div>

          {/* HEADING */}

          <div className="mb-9">
            <p className="text-[#A78652] text-[11px] tracking-[0.25em] uppercase font-semibold mb-4">
              Welcome Back
            </p>

            <h1 className="text-[38px] sm:text-[44px] font-serif text-[#28202A] leading-tight">
              Welcome to
              <br />
              <span className="text-[#781D32] italic">ARM Pearl CRM.</span>
            </h1>

            <p className="text-[#8B8582] text-sm mt-4 leading-6 max-w-[350px]">
              Sign in to access your business operations, orders and marketplace
              insights.
            </p>
          </div>

          {/* LOGIN FORM */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] tracking-[0.16em] uppercase font-semibold text-[#5F5558] mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                autoComplete="username"
                required
                disabled={isLoading}
                className="w-full h-[54px] px-4 rounded-xl border border-[#E8E0D8] bg-[#FCFAF7] text-[#302831] text-sm outline-none transition-all duration-300 focus:border-[#B89456] focus:ring-4 focus:ring-[#C9A45C]/10 placeholder:text-[#B7AFA8] disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.16em] uppercase font-semibold text-[#5F5558] mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  className="w-full h-[54px] px-4 pr-12 rounded-xl border border-[#E8E0D8] bg-[#FCFAF7] text-[#302831] text-sm outline-none transition-all duration-300 focus:border-[#B89456] focus:ring-4 focus:ring-[#C9A45C]/10 placeholder:text-[#B7AFA8] disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#968A85] hover:text-[#781D32]"
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

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[56px] rounded-xl bg-[#781D32] hover:bg-[#601628] text-white font-medium text-sm tracking-wide flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_8px_20px_rgba(120,29,50,0.18)] hover:shadow-[0_12px_25px_rgba(120,29,50,0.25)] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* SECURITY */}

          <div className="mt-9 flex items-center gap-3">
            <ShieldCheck size={19} className="text-[#B18B4F]" />

            <p className="text-[11px] text-[#9B918B]">
              Secure access to your business dashboard
            </p>
          </div>

          {/* FOOTER */}

          <div className="mt-12 pt-6 border-t border-[#F0EBE5]">
            <p className="text-[10px] tracking-[0.12em] text-[#A69B94] uppercase">
              © {new Date().getFullYear()} ARM Pearl Beauty. All rights
              reserved.
            </p>
          </div>
        </div>

        {/* RIGHT - PREMIUM BRAND PANEL */}

        <div className="hidden lg:flex relative flex-col justify-between overflow-hidden bg-[#481522] p-12 xl:p-16 text-white">
          {/* DECORATIVE BACKGROUND */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(201,164,92,0.20),transparent_45%),linear-gradient(145deg,#541A2A,#32101D)]" />

          <div className="absolute w-[480px] h-[480px] border border-[#C9A45C]/20 rounded-full -right-40 top-20" />

          <div className="absolute w-[380px] h-[380px] border border-[#C9A45C]/20 rounded-full -right-20 top-32" />

          <div className="absolute w-[260px] h-[260px] border border-[#C9A45C]/20 rounded-full right-10 top-48" />

          {/* TOP CONTENT */}

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#E5C98E]">
              ARM Pearl Beauty
            </span>

            <Sparkles size={20} className="text-[#D7B775]" />
          </div>

          {/* CENTER CONTENT */}

          <div className="relative z-10 my-12">
            <div className="w-12 h-[1px] bg-[#D7B775] mb-8" />

            <p className="text-[#D7B775] uppercase tracking-[0.3em] text-[11px] mb-5">
              Your Business. One Platform.
            </p>

            <h2 className="font-serif text-[48px] xl:text-[58px] leading-[1.15]">
              Manage
              <br />
              <span className="italic text-[#D7B775]">Smarter.</span>
              <br />
              Grow Better.
            </h2>

            <p className="mt-7 text-[#E4D3D2]/75 text-sm leading-7 max-w-[340px]">
              A centralized workspace for managing marketplace orders,
              monitoring business performance and bringing every channel
              together.
            </p>

            {/* FEATURE DETAILS */}

            <div className="mt-12 space-y-5">
              {[
                "Unified Marketplace Management",
                "Real-time Order Visibility",
                "Business Performance Insights",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full border border-[#D7B775]/50 flex items-center justify-center text-[#D7B775] text-xs">
                    0{index + 1}
                  </div>

                  <span className="text-sm text-[#F0E4DF]/90 tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM */}

          <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#D7B775]">
              Elegance in Every Detail
            </span>

            <span className="text-xs text-white/50">CRM Portal</span>
          </div>
        </div>
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

//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//     setErrorMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isLoading) return;

//     setIsLoading(true);
//     setErrorMessage("");

//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/login`, formData);

//       localStorage.setItem("crmUser", JSON.stringify(data));

//       navigate("/");
//     } catch (error) {
//       console.error("Login Error:", error);

//       setErrorMessage(
//         error.response?.data?.message || "Login failed. Please try again.",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     document.title = "ARM - Login";
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

//           <h1 className="text-5xl font-bold">CRM Login</h1>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             autoComplete="username"
//             disabled={isLoading}
//             className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             autoComplete="current-password"
//             disabled={isLoading}
//             className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
//           />

//           {errorMessage && (
//             <p className="text-red-600 text-sm text-center">{errorMessage}</p>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full text-white py-3 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 ${
//               isLoading
//                 ? "bg-gray-600 cursor-not-allowed"
//                 : "bg-black hover:bg-gray-800"
//             }`}
//           >
//             {isLoading ? (
//               <>
//                 <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

//                 <span>Logging in...</span>
//               </>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
