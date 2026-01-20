import { NavLink, useNavigate } from "react-router-dom";
import {
  TeamOutlined,
  SettingOutlined,
  SafetyOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";

const menuByRole = {
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
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="avatar">HA</div>
          <div>
            <strong>Hoàng Admin</strong>
            <p>Super Administrator</p>
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
