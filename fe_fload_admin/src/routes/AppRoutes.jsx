import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import MainLayout from "../pages/mainLayout";
import UserManagement from "../pages/Admin/UserManagement/UserManagement";
import RequireAuth from "./PrivateRoute";

export default function AppRoutes() {
  const isAuth = localStorage.getItem("isAuth") === "true";

  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* ADMIN = MAIN LAYOUT */}
      <Route
        path="/admin"
        element={
          <RequireAuth role="admin">
            <MainLayout />
          </RequireAuth>
        }
      >
        {/* DEFAULT: /admin */}
        <Route index element={<Navigate to="user" replace />} />

        {/* /admin/user */}
        <Route path="user" element={<UserManagement />} />

        {/* Sau này thêm */}
        {/* <Route path="settings" element={<Settings />} /> */}
        {/* <Route path="logs" element={<Logs />} /> */}
        {/* <Route path="permissions" element={<Permissions />} /> */}
      </Route>

      {/* ROOT */}
      <Route
        path="/"
        element={
          isAuth ? (
            <Navigate to="/admin/user" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}
