import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment } from "@mui/material";
import {
  PhoneAndroid,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Button } from "antd";
import { loginApi } from "../../../api/axios/authApi";
import "./login.css";

export default function Login() {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 👉 đảm bảo form luôn trắng khi vào trang
  useEffect(() => {
    setPhone("");
    setPassword("");
  }, []);

  const redirectByRole = {
    admin: "/admin",
    manager: "/manager",
    coordinator: "/coordinator",
    rescue: "/rescue",
  };

  const handleLogin = async () => {
    let newErrors = {};
    if (!phone) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!password) newErrors.password = "Vui lòng nhập mật khẩu";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    try {
      const res = await loginApi({ phone, password });
      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("isAuth", "true");

      navigate(redirectByRole[role] || "/", { replace: true });
    } catch (err) {
      setErrors({
        password:
          err.response?.data?.message ||
          "Số điện thoại hoặc mật khẩu không đúng",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Đăng nhập</h1>

        <div className="login-form">
          {/* PHONE */}
          <TextField
            fullWidth
            variant="filled"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={!!errors.phone}
            autoComplete="off"
            name="phone"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroid />
                </InputAdornment>
              ),
            }}
          />

          {/* PASSWORD */}
          <TextField
            fullWidth
            variant="filled"
            type={show ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            autoComplete="new-password"
            name="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setShow(!show)}
                  style={{ cursor: "pointer" }}
                >
                  {show ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }}
          />

          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}

          <Button
            type="primary"
            block
            size="large"
            className="login-btn"
            onClick={handleLogin}
          >
            TRUY CẬP QUẢN TRỊ →
          </Button>
        </div>
      </div>
    </div>
  );
}
