import { Input, Badge } from "antd";
import { BellOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      {/* LEFT: Logo + Title */}
      <div className="header-left">
        <div className="logo-icon">🛡️</div>
        <div className="logo-text">
          <h3>Rescue Admin</h3>
          <span>System Management</span>
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
