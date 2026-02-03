import { useState } from "react";
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
import bg from "../../../src/assets/LoginImage/images.jpeg";
import shield from "../../../src/assets/LoginImage/shield.svg";
import AuthNotify from "../../components/Common/AuthNotify";

import "./login.css";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const redirectByRole = {
    admin: "/admin",
    manager: "/manager",
    coordinator: "/coordinator",
    rescue: "/rescue",
  };

  const handleLogin = async () => {
    const e = {};
    if (!phone) e.phone = "Nhập số điện thoại";
    if (!password) e.password = "Nhập mật khẩu";
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      const res = await loginApi({ phone, password });
      const { token, user } = res.data;
      const role = user.roleName.toLowerCase();

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuth", "true");

       // ✅ THÔNG BÁO THÀNH CÔNG
       AuthNotify.success(
        "Đăng nhập thành công",
        `Chào mừng ${user.fullName}`
      );

    // delay nhẹ để thấy notify
    setTimeout(() => {
      navigate(redirectByRole[role], { replace: true });
    }, 300);

      navigate(redirectByRole[role], { replace: true });
    } catch {
      AuthNotify.error("Sai số điện thoại hoặc mật khẩu");
      setErrors({ password: "Sai số điện thoại hoặc mật khẩu" });
    }
  };

  return (
    <div className="login-page">
      {/* LEFT */}
      <div
        className="login-hero"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="hero-overlay">
          <div className="hero-top">
            <img src={shield} alt="" />
            <span>PREMIUM COMMAND</span>
          </div>

          <h1>
            QUẢN TRỊ <br />
            CAO CẤP & <span>BẢO MẬT</span>
          </h1>

          <p>
            Giao diện điều hành thế hệ mới dành cho cán bộ
            vận hành cứu hộ quốc gia.
          </p>

          <div className="hero-metrics">
            <span>24/7 VẬN HÀNH</span>
            <span>AES-256</span>
            <span>REALTIME</span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-card">
        <h2>Đăng nhập</h2>
        <div className="login-line" />
        <p className="login-desc">
          Truy cập hệ thống quản trị vận hành cao cấp
        </p>

        <div className="login-form">
          <div className="form-group">
            <label className="login-label">TÀI KHOẢN NỘI BỘ</label>
            <TextField
              fullWidth
              variant="filled"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroid />
                  </InputAdornment>
                ),
              }}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
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
          </div>

          <Button
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
