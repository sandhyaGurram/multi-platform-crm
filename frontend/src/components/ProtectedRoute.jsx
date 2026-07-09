import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("crmUser"));

  if (!user || !user.token) {
    toast.warning("Please login first to access the dashboard.", {
      style: {
        background: "#a51e27",
        color: "#fff",
      },
    });
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
