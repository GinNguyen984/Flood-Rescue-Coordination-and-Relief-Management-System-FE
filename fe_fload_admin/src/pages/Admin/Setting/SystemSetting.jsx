import { useEffect, useMemo, useState } from "react";
import { Button, Input, Switch, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import "./SystemSetting.css";

const GROUPS = [
  { id: "rescue", title: "1. Điều phối & Đội cứu hộ" },
  { id: "emergency", title: "2. Mức độ khẩn cấp & Ưu tiên" },
  { id: "request", title: "3. Yêu cầu cứu hộ / cứu trợ" },
  { id: "stock", title: "4. Kho & Cứu trợ" },
  { id: "donation", title: "5. Tiền & Quyên góp" },
  { id: "media", title: "6. Media & Dữ liệu" },
  { id: "map", title: "7. Bản đồ & Hiển thị" },
  { id: "security", title: "8. Bảo mật & Hệ thống" },
  { id: "permission", title: "9. Phân quyền" },
];

const DEFAULT_CONFIGS = [
  /* 1. Điều phối & Đội cứu hộ */
  { key: "AUTO_ASSIGN", name: "AUTO_ASSIGN – Tự động phân đội", type: "boolean", value: true, group: "rescue" },
  { key: "MAX_TASK", name: "MAX_TASK – Số nhiệm vụ tối đa / đội", type: "number", value: 5, group: "rescue" },
  { key: "MAX_TEAM_PER_REQUEST", name: "MAX_TEAM_PER_REQUEST – Số đội tối đa / yêu cầu", type: "number", value: 3, group: "rescue" },
  { key: "ASSIGN_TIMEOUT", name: "ASSIGN_TIMEOUT – Thời gian đội xác nhận nhiệm vụ (s)", type: "number", value: 300, group: "rescue" },
  { key: "REASSIGN_ENABLE", name: "REASSIGN_ENABLE – Cho phép tái phân công", type: "boolean", value: true, group: "rescue" },
  { key: "RESCUE_RADIUS_KM", name: "RESCUE_RADIUS_KM – Bán kính cứu hộ tối đa (km)", type: "number", value: 10, group: "rescue" },

  /* 2. Mức độ khẩn cấp & Ưu tiên */
  { key: "EMERGENCY_LEVELS", name: "EMERGENCY_LEVELS – Số cấp độ khẩn cấp", type: "number", value: 4, group: "emergency" },
  { key: "PRIORITY_CHILD", name: "PRIORITY_CHILD – Trọng số trẻ em", type: "number", value: 2, group: "emergency" },
  { key: "PRIORITY_ELDERLY", name: "PRIORITY_ELDERLY – Trọng số người già", type: "number", value: 2, group: "emergency" },
  { key: "PRIORITY_DISABLED", name: "PRIORITY_DISABLED – Trọng số người khuyết tật", type: "number", value: 2, group: "emergency" },
  { key: "SLA_RESPONSE_TIMES", name: "SLA_LEVELS – Thời gian phản hồi theo cấp (phút)", type: "list", value: [10, 20, 30, 60], group: "emergency" },

  /* 3. Yêu cầu cứu hộ / cứu trợ */
  { key: "MAX_REQUEST_PER_USER", name: "MAX_REQUEST_PER_USER – Số yêu cầu/người/ngày", type: "number", value: 3, group: "request" },
  { key: "REQUEST_EXPIRE_TIME", name: "REQUEST_EXPIRE_TIME – Thời gian hết hiệu lực yêu cầu (phút)", type: "number", value: 1440, group: "request" },
  { key: "ALLOW_CANCEL_STATUS", name: "ALLOW_CANCEL_STATUS – Trạng thái cho phép hủy", type: "list", value: ["pending", "assigned"], group: "request" },
  { key: "AUTO_CLOSE_TIME", name: "AUTO_CLOSE_TIME – Tự động đóng yêu cầu (ngày)", type: "number", value: 7, group: "request" },
  { key: "REQUIRE_LOCATION", name: "REQUIRE_LOCATION – Bắt buộc GPS", type: "boolean", value: true, group: "request" },

  /* 4. Kho & Cứu trợ */
  { key: "STOCK_DEDUCT_MODE", name: "STOCK_DEDUCT_MODE – Thời điểm trừ kho", type: "string", value: "on_dispatch", group: "stock" },
  { key: "LOW_STOCK_THRESHOLD", name: "LOW_STOCK_THRESHOLD – Ngưỡng cảnh báo thiếu hàng", type: "number", value: 10, group: "stock" },
  { key: "MAX_GOODS_PER_TRIP", name: "MAX_GOODS_PER_TRIP – Hạn mức hàng/chuyến", type: "number", value: 100, group: "stock" },
  { key: "FIFO_ENABLE", name: "FIFO_ENABLE – Áp dụng FIFO", type: "boolean", value: true, group: "stock" },
  { key: "ESSENTIAL_GOODS_LIST", name: "ESSENTIAL_GOODS_LIST – Danh mục hàng thiết yếu", type: "list", value: ["water", "food", "medicine"], group: "stock" },

  /* 5. Tiền & Quyên góp */
  { key: "MAX_DONATION_AMOUNT", name: "MAX_DONATION_AMOUNT – Hạn mức quyên góp", type: "number", value: 100000000, group: "donation" },
  { key: "REQUIRE_MANAGER_APPROVAL", name: "REQUIRE_MANAGER_APPROVAL – Duyệt chi tiền", type: "boolean", value: true, group: "donation" },
  { key: "CURRENCY", name: "CURRENCY – Đơn vị tiền tệ", type: "string", value: "VND", group: "donation" },
  { key: "PAYMENT_METHODS", name: "PAYMENT_METHODS – Phương thức thanh toán", type: "list", value: ["cash", "bank_transfer"], group: "donation" },
  { key: "DONATION_CLOSE_TIME", name: "DONATION_CLOSE_TIME – Thời gian đóng nhận quyên góp (ngày)", type: "number", value: 30, group: "donation" },

  /* 6. Media & Dữ liệu */
  { key: "MAX_IMAGE_SIZE_MB", name: "MAX_IMAGE_SIZE_MB – Dung lượng ảnh (MB)", type: "number", value: 5, group: "media" },
  { key: "MAX_VIDEO_SIZE_MB", name: "MAX_VIDEO_SIZE_MB – Dung lượng video (MB)", type: "number", value: 50, group: "media" },
  { key: "MAX_FILES_PER_REQUEST", name: "MAX_FILES_PER_REQUEST – Số file tối đa", type: "number", value: 10, group: "media" },
  { key: "ALLOWED_FILE_TYPES", name: "ALLOWED_FILE_TYPES – Định dạng cho phép", type: "list", value: ["jpg", "png", "mp4", "pdf"], group: "media" },
  { key: "GPS_UPDATE_INTERVAL", name: "GPS_UPDATE_INTERVAL – Chu kỳ cập nhật vị trí (s)", type: "number", value: 30, group: "media" },

  /* 7. Bản đồ & Hiển thị */
  { key: "MAP_DEFAULT_ZOOM", name: "MAP_DEFAULT_ZOOM – Zoom mặc định", type: "number", value: 12, group: "map" },
  { key: "MAP_REFRESH_INTERVAL", name: "MAP_REFRESH_INTERVAL – Thời gian refresh (s)", type: "number", value: 60, group: "map" },
  { key: "SHOW_ALL_REQUESTS", name: "SHOW_ALL_REQUESTS – Hiển thị tất cả yêu cầu", type: "boolean", value: false, group: "map" },
  { key: "CLUSTER_MARKERS", name: "CLUSTER_MARKERS – Gộp marker", type: "boolean", value: true, group: "map" },
  { key: "HEATMAP_ENABLE", name: "HEATMAP_ENABLE – Bật heatmap", type: "boolean", value: false, group: "map" },

  /* 8. Bảo mật & Hệ thống */
  { key: "SYSTEM_MODE", name: "SYSTEM_MODE – Chế độ hệ thống", type: "string", value: "Normal", group: "security" },
  { key: "DATA_RETENTION_DAYS", name: "DATA_RETENTION_DAYS – Thời gian lưu dữ liệu (ngày)", type: "number", value: 365, group: "security" },
  { key: "AUDIT_LOG_ENABLE", name: "AUDIT_LOG_ENABLE – Bật log hệ thống", type: "boolean", value: true, group: "security" },
  { key: "MAX_LOGIN_FAIL", name: "MAX_LOGIN_FAIL – Số lần đăng nhập sai", type: "number", value: 5, group: "security" },
  { key: "FORCE_LOGOUT_ON_ROLE_CHANGE", name: "FORCE_LOGOUT_ON_ROLE_CHANGE – Đăng xuất khi đổi quyền", type: "boolean", value: true, group: "security" },

  /* 9. Phân quyền */
  { key: "ROLE_PERMISSION_MATRIX", name: "ROLE_PERMISSION_MATRIX – Ma trận quyền (JSON)", type: "json", value: { admin: ["*"], manager: ["view","edit"], coordinator: ["view"], rescue: ["view"] }, group: "permission" },
  { key: "ALLOW_COORD_OVERRIDE", name: "ALLOW_COORD_OVERRIDE – Quyền override điều phối", type: "boolean", value: false, group: "permission" },
  { key: "VIEW_LIMIT_BY_ROLE", name: "VIEW_LIMIT_BY_ROLE – Giới hạn dữ liệu theo role (JSON)", type: "json", value: { admin: null, manager: 100, coordinator: 50, rescue: 10 }, group: "permission" },
];

export default function SystemSetting() {
  const [configs, setConfigs] = useState(() => {
    try {
      const raw = localStorage.getItem("system_configs");
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && Array.isArray(parsed)) return parsed;
    } catch (e) {
      // ignore
    }
    return DEFAULT_CONFIGS.map((c) => ({ ...c }));
  });

  useEffect(() => {
    // nothing else on mount for now
  }, []);

  const handleToggle = (key, checked) => {
    setConfigs((prev) => prev.map((c) => (c.key === key ? { ...c, value: checked } : c)));
  };

  const handleChange = (key, val) => {
    setConfigs((prev) => prev.map((c) => (c.key === key ? { ...c, value: val } : c)));
  };

  const handleSave = () => {
    try {
      localStorage.setItem("system_configs", JSON.stringify(configs));
      message.success("Lưu cấu hình thành công");
    } catch (e) {
      message.error("Lưu cấu hình thất bại");
    }
  };

  const grouped = useMemo(() => {
    const map = {};
    GROUPS.forEach((g) => (map[g.id] = []));
    (configs || []).forEach((c) => {
      (map[c.group] || []).push(c);
    });
    return map;
  }, [configs]);

  return (
    <div className="system-setting-page">
      <div className="page-header">
        <div>
          <h2>Cấu hình tham số</h2>
          <p>Thiết lập các thông số vận hành hệ thống</p>
        </div>

        <div className="page-actions">
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <div className="table-box">
        {GROUPS.map((g) => (
          <section key={g.id} className="config-group">
            <h3>{g.title}</h3>
            <div className="group-table">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: 320 }}>Key / Tên</th>
                    <th>Giá trị</th>
                  </tr>
                </thead>
                <tbody>
                  {(grouped[g.id] || []).map((c) => (
                    <tr key={c.key}>
                      <td>
                        <strong>{c.key}</strong>
                        <div className="param-desc">{c.name.replace(/^.*?–\s*/, "")}</div>
                      </td>
                      <td>
                        {c.type === "boolean" && (
                          <Switch checked={!!c.value} onChange={(v) => handleToggle(c.key, v)} />
                        )}

                        {c.type === "number" && (
                          <Input type="number" style={{ width: 160 }} value={c.value} onChange={(e) => handleChange(c.key, Number(e.target.value || 0))} />
                        )}

                        {c.type === "string" && (
                          <Input style={{ width: 240 }} value={c.value} onChange={(e) => handleChange(c.key, e.target.value)} />
                        )}

                        {c.type === "list" && (
                          <Input
                            style={{ width: 360 }}
                            value={Array.isArray(c.value) ? c.value.join(", ") : (c.value || "")}
                            onChange={(e) => handleChange(c.key, e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                          />
                        )}

                        {c.type === "json" && (
                          <Input.TextArea
                            rows={4}
                            value={typeof c.value === "string" ? c.value : JSON.stringify(c.value, null, 2)}
                            onChange={(e) => {
                              const v = e.target.value;
                              try {
                                const parsed = JSON.parse(v);
                                handleChange(c.key, parsed);
                              } catch (err) {
                                handleChange(c.key, v);
                              }
                            }}
                            style={{ width: "100%" }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
