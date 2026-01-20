import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const isAuth = localStorage.getItem("isAuth");
  const userRole = localStorage.getItem("role");

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
