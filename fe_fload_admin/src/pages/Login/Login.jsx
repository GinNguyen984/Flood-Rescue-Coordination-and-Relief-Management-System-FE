import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment } from "@mui/material";
import {
  MailOutline,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Button, Checkbox } from "antd";
import "./login.css";

export default function Login() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const accounts = [
    { username: "admin", password: "123456", role: "admin" },
    { username: "manager", password: "123456", role: "manager" },
    { username: "coordinator", password: "123456", role: "coordinator" },
    { username: "rescue", password: "123456", role: "rescue" },
  ];

  const handleLogin = () => {
    let newErrors = {};

    if (!username) newErrors.username = "Vui lòng nhập tài khoản";
    if (!password) newErrors.password = "Vui lòng nhập mật khẩu";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const user = accounts.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      setErrors({ password: "Tài khoản hoặc mật khẩu không đúng" });
      return;
    }

    localStorage.setItem("isAuth", "true");
    localStorage.setItem("role", user.role);

    navigate(`/${user.role}`);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 >Đăng nhập</h1>
        <div className="login-line" />

        <p className="login-desc">
          Truy cập hệ thống quản trị vận hành cao cấp
        </p>

        <label className="login-label">TÀI KHOẢN NỘI BỘ</label>
        <TextField
          fullWidth
          variant="filled"
          placeholder="Email hoặc ID nhân sự"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutline />
              </InputAdornment>
            ),
          }}
        />
        {errors.username && (
          <span className="error-text">{errors.username}</span>
        )}

        <label className="login-label">MẬT KHẨU HỆ THỐNG</label>
        <TextField
          fullWidth
          variant="filled"
          type={show ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                className="eye"
                onClick={() => setShow(!show)}
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            ),
          }}
        />
        {errors.password && (
          <span className="error-text">{errors.password}</span>
        )}

        <div className="remember">
          <Checkbox /> <span>Ghi nhớ phiên làm việc</span>
        </div>

        <Button
          type="primary"
          size="large"
          block
          className="login-btn"
          onClick={handleLogin}
        >
          TRUY CẬP QUẢN TRỊ →
        </Button>
      </div>
    </div>
  );
}
