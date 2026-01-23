import { Input, Badge } from "antd";
import { BellOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import "./Header.css";

export default function Header() {
  const role = localStorage.getItem("role") || "admin";

  const roleInfo = {
    admin: {
      title: "Rescue Admin",
      subtitle: "System Management",
      icon: "🛡️",
    },
    manager: {
      title: "Rescue Manager",
      subtitle: "Operation Management",
      icon: "📊",
    },
    coordinator: {
      title: "Rescue Coordinator",
      subtitle: "Dispatch & Monitoring",
      icon: "🗺️",
    },
    rescue: {
      title: "Rescue Team",
      subtitle: "Field Operations",
      icon: "🚑",
    },
  };

  const currentRole = roleInfo[role] || roleInfo.admin;

  return (
    <header className="header">
      {/* LEFT: Logo + Title */}
      <div className="header-left">
        <div className="logo-icon">{currentRole.icon}</div>
        <div className="logo-text">
          <h3>{currentRole.title}</h3>
          <span>{currentRole.subtitle}</span>
        </div>
      </div>

      {/* CENTER: Search */}
      <Input.Search
        placeholder="Tìm kiếm người dùng theo tên, email, ID..."
        className="header-search"
      />

      {/* RIGHT: Actions */}
      <div className="header-actions">
        <Badge dot>
          <BellOutlined className="header-icon" />
        </Badge>
        <QuestionCircleOutlined className="header-icon" />
        <span className="lang">LANGUAGE: VN</span>
      </div>
    </header>
  );
}
