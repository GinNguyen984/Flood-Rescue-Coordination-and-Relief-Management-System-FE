import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import MainLayout from "../pages/mainLayout";
import RequireAuth from "./PrivateRoute";

/* ================= ADMIN ================= */
import UserManagement from "../pages/Admin/UserManagement/UserManagement";

/* ================= MANAGER ================= */
import DashboardOverview from "../pages/Manager/Dashboard/DashboardOverview";
import Vehicle from "../pages/Manager/Vehicle/VehicleManagement";

// import ManagerInfo from "../pages/Manager/Info";
import Inventory from "../pages/Manager/Inventory/InventoryManagement";
// import Approve from "../pages/Manager/Approve";
// import ManagerRescueTeam from "../pages/Manager/RescueTeam";

/* ================= COORDINATOR ================= */
// import CoordinatorDispatch from "../pages/Coordinator/Dispatch";
// import CoordinatorMap from "../pages/Coordinator/Map";
// import CoordinatorResources from "../pages/Coordinator/Resources";
// import CoordinatorReports from "../pages/Coordinator/Reports";

/* ================= RESCUE ================= */
// import RescueTask from "../pages/Rescue/Task";
// import RescueHistory from "../pages/Rescue/History";
// import RescueMessages from "../pages/Rescue/Messages";
// import RescueProfile from "../pages/Rescue/Profile";

export default function AppRoutes() {
  const isAuth = localStorage.getItem("isAuth") === "true";
  const role = localStorage.getItem("role");

  const redirectByRole = {
    admin: "/admin/user",
    manager: "/manager",
    coordinator: "/coordinator",
    rescue: "/rescue",
  };

  return (
    <Routes>
      {/* ================= LOGIN ================= */}
      <Route path="/login" element={<Login />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <RequireAuth role="admin">
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="user" replace />} />
        <Route path="user" element={<UserManagement />} />
      </Route>

      {/* ================= MANAGER ================= */}
      <Route
        path="/manager"
        element={
          <RequireAuth role="manager">
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="vehicles" element={<Vehicle />} />
        <Route path="inventory" element={<Inventory />} />
        {/* <Route path="info" element={<ManagerInfo />} />
        <Route path="warehouse" element={<Warehouse />} />
        <Route path="approve" element={<Approve />} />
        <Route path="rescue-team" element={<ManagerRescueTeam />} />  */}
      </Route>

      {/* ================= COORDINATOR ================= */}
      {/* <Route
        path="/coordinator"
        element={
          <RequireAuth role="coordinator">
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<CoordinatorDispatch />} />
        <Route path="map" element={<CoordinatorMap />} />
        <Route path="resources" element={<CoordinatorResources />} />
        <Route path="reports" element={<CoordinatorReports />} />
      </Route> */}

      {/* ================= RESCUE ================= */}
      {/* <Route
        path="/rescue"
        element={
          <RequireAuth role="rescue">
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<RescueTask />} />
        <Route path="history" element={<RescueHistory />} />
        <Route path="messages" element={<RescueMessages />} />
        <Route path="profile" element={<RescueProfile />} />
      </Route> */}

      {/* ================= ROOT ================= */}
      <Route
        path="/"
        element={
          isAuth && role && redirectByRole[role] ? (
            <Navigate to={redirectByRole[role]} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
