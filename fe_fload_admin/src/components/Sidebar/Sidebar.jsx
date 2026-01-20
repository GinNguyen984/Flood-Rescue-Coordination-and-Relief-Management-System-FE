import { NavLink, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,

  /* ADMIN */
  TeamOutlined,
  SettingOutlined,
  SafetyOutlined,
  FileTextOutlined,

  /* MANAGER */
  AppstoreOutlined,
  InfoCircleOutlined,
  InboxOutlined,
  CheckSquareOutlined,
  UsergroupAddOutlined,
  CarOutlined,

  /* RESCUE */
  CarryOutOutlined,
  HistoryOutlined,
  MessageOutlined,
  UserOutlined,

  /* COORDINATOR */
  DeploymentUnitOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";

const menuByRole = {
  /* ================= ADMIN ================= */
  admin: [
    {
      label: "Quản lý người dùng",
      icon: <TeamOutlined />,
      path: "/admin/user",
      end: true,
    },
    {
      label: "Cấu hình tham số",
      icon: <SettingOutlined />,
      path: "/admin/settings",
    },
    {
      label: "Logs hệ thống",
      icon: <FileTextOutlined />,
      path: "/admin/logs",
    },
    {
      label: "Phân quyền nâng cao",
      icon: <SafetyOutlined />,
      path: "/admin/permissions",
    },
  ],

  /* ================= MANAGER ================= */
  manager: [
    {
      label: "Tổng quan",
      icon: <AppstoreOutlined />,
      path: "/manager",
      end: true,
    },
    {
        label: "Phương tiện",
        icon: <CarOutlined />,
        path: "/manager/vehicles",
      },
      
    {
      label: "Thông tin",
      icon: <InfoCircleOutlined />,
      path: "/manager/info",
    },
    {
      label: "Kho hàng",
      icon: <InboxOutlined />,
      path: "/manager/inventory",
    },
    {
      label: "Phê duyệt",
      icon: <CheckSquareOutlined />,
      path: "/manager/approve",
    },
    {
      label: "Đội cứu hộ",
      icon: <UsergroupAddOutlined />,
      path: "/manager/rescue-team",
    },
  ],

  /* ================= COORDINATOR ================= */
  coordinator: [
    {
      label: "Điều phối",
      icon: <DeploymentUnitOutlined />,
      path: "/coordinator",
      end: true,
    },
    {
      label: "Giám sát bản đồ",
      icon: <GlobalOutlined />,
      path: "/coordinator/map",
    },
    {
      label: "Tài nguyên",
      icon: <DatabaseOutlined />,
      path: "/coordinator/resources",
    },
    {
      label: "Báo cáo",
      icon: <BarChartOutlined />,
      path: "/coordinator/reports",
    },
  ],

  /* ================= RESCUE TEAM ================= */
  rescue: [
    {
      label: "Nhiệm vụ",
      icon: <CarryOutOutlined />,
      path: "/rescue",
      end: true,
    },
    {
      label: "Lịch sử",
      icon: <HistoryOutlined />,
      path: "/rescue/history",
    },
    {
      label: "Tin nhắn",
      icon: <MessageOutlined />,
      path: "/rescue/messages",
      badge: 3,
    },
    {
      label: "Cá nhân",
      icon: <UserOutlined />,
      path: "/rescue/profile",
    },
  ],
};

export default function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "admin";
  const menus = menuByRole[role] || [];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      {/* MENU */}
      <nav className="sidebar-menu">
        {menus.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>

            {item.badge && (
              <span className="menu-badge">{item.badge}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="avatar">
            {role === "admin" && "AD"}
            {role === "manager" && "MG"}
            {role === "coordinator" && "CO"}
            {role === "rescue" && "RT"}
          </div>
          <div>
            <strong>
              {role === "admin" && "Hoàng Admin"}
              {role === "manager" && "Manager"}
              {role === "coordinator" && "Coordinator"}
              {role === "rescue" && "Rescue Member"}
            </strong>
            <p>
              {role === "admin" && "Super Administrator"}
              {role === "manager" && "System Manager"}
              {role === "coordinator" && "Operation Coordinator"}
              {role === "rescue" && "Rescue Team"}
            </p>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogoutOutlined />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
