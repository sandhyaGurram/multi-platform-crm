import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import logo from "../assets/ARM_logo.png";
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen bg-[#F7F3ED] flex items-center justify-center px-4 py-3">
      {/* LOGIN CARD */}

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
            Secure Admin Access
          </p>

          <h1 className="text-[32px] sm:text-[36px] font-semibold text-[#30212A] leading-tight">
            CRM Login
          </h1>

          <p className="text-[#8B8582] text-sm mt-2 leading-5">
            Sign in to manage your business operations,
            <br className="hidden sm:block" />
            orders and marketplace insights.
          </p>
        </div>

        {/* LOGIN FORM */}

        <form onSubmit={handleSubmit} className="space-y-3.5">
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
              autoComplete="username"
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
                placeholder="Enter your password"
                autoComplete="current-password"
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

          {/* LOGIN BUTTON */}

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
                Logging in...
              </>
            ) : (
              <>
                Sign In to Dashboard
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* SECURITY */}

        <div className="mt-5 flex items-center justify-center gap-3">
          <ShieldCheck size={17} className="text-[#B18B4F]" />

          <p className="text-[11px] text-[#9B918B]">
            Secure access to your business dashboard
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

export default Login;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { API_URL } from "../config/api";
// import logo from "../assets/ARM_logo.png";
// import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
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
//         error.response?.data?.message || "Unable to sign in. Please try again.",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     document.title = "ARM Pearl Beauty | CRM Login";
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#F7F3ED] flex items-center justify-center px-4 py-10">
//       {/* LOGIN CARD */}

//       <div className="w-full max-w-[490px] bg-white rounded-[24px] px-7 py-10 sm:px-12 sm:py-12 shadow-[0_20px_60px_rgba(42,25,30,0.10)] border border-[#EEE8E0]">
//         {/* BRAND LOGO */}

//         <div className="flex flex-col items-center mb-10">
//           <img
//             src={logo}
//             alt="ARM Pearl Beauty"
//             className="w-[120px] h-[120px] object-contain mb-3"
//           />

//           <div className="flex items-center gap-2">
//             <div className="w-9 h-[1px] bg-[#C9A45C]" />

//             <span className="text-[10px] tracking-[0.3em] uppercase text-[#A28B67] font-medium">
//               Beauty & Excellence
//             </span>

//             <div className="w-9 h-[1px] bg-[#C9A45C]" />
//           </div>
//         </div>

//         {/* HEADING */}

//         <div className="text-center mb-8">
//           <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-[#30212A]">
//             CRM Login
//           </h1>

//           <p className="text-[#8B8582] text-sm mt-3">
//             Sign in to manage your business operations, orders and marketplace
//             insights.
//           </p>
//         </div>

//         {/* LOGIN FORM */}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* EMAIL */}

//           <div>
//             <label className="block text-[11px] tracking-[0.16em] uppercase font-semibold text-[#5F5558] mb-2">
//               Email Address
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email address"
//               autoComplete="username"
//               required
//               disabled={isLoading}
//               className="w-full h-[54px] px-4 rounded-xl border border-[#E8E0D8] bg-[#FCFAF7] text-[#302831] text-sm outline-none transition-all duration-300 focus:border-[#B89456] focus:ring-4 focus:ring-[#C9A45C]/10 placeholder:text-[#B7AFA8] disabled:opacity-60"
//             />
//           </div>

//           {/* PASSWORD */}

//           <div>
//             <label className="block text-[11px] tracking-[0.16em] uppercase font-semibold text-[#5F5558] mb-2">
//               Password
//             </label>

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 autoComplete="current-password"
//                 required
//                 disabled={isLoading}
//                 className="w-full h-[54px] px-4 pr-12 rounded-xl border border-[#E8E0D8] bg-[#FCFAF7] text-[#302831] text-sm outline-none transition-all duration-300 focus:border-[#B89456] focus:ring-4 focus:ring-[#C9A45C]/10 placeholder:text-[#B7AFA8] disabled:opacity-60"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-[#968A85] hover:text-[#781D32]"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>

//           {/* ERROR MESSAGE */}

//           {errorMessage && (
//             <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-700">
//               {errorMessage}
//             </div>
//           )}

//           {/* LOGIN BUTTON */}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full h-[56px] rounded-xl text-white font-medium text-sm tracking-wide flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_8px_20px_rgba(120,29,50,0.18)] ${
//               isLoading
//                 ? "bg-[#9B5265] cursor-not-allowed"
//                 : "bg-[#781D32] hover:bg-[#601628] hover:shadow-[0_12px_25px_rgba(120,29,50,0.25)]"
//             }`}
//           >
//             {isLoading ? (
//               <>
//                 <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
//                 Logging in...
//               </>
//             ) : (
//               <>
//                 Sign In to Dashboard
//                 <ArrowRight size={18} />
//               </>
//             )}
//           </button>
//         </form>

//         {/* SECURITY */}

//         <div className="mt-9 flex items-center justify-center gap-3">
//           <ShieldCheck size={18} className="text-[#B18B4F]" />

//           <p className="text-[11px] text-[#9B918B]">
//             Secure access to your business dashboard
//           </p>
//         </div>

//         {/* FOOTER */}

//         <div className="mt-9 pt-6 border-t border-[#F0EBE5] text-center">
//           <p className="text-[10px] tracking-[0.12em] text-[#A69B94] uppercase">
//             © {new Date().getFullYear()} ARM Pearl Beauty. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

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
