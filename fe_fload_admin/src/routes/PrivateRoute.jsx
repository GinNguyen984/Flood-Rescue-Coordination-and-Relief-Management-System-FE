import { Navigate } from "react-router-dom";

export default function RequireAuth({ children, role }) {
  const isAuth = localStorage.getItem("isAuth") === "true";
  const userRole = localStorage.getItem("role");

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 CỰC KỲ QUAN TRỌNG
  return children;
}
