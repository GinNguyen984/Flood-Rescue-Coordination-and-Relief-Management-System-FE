import { useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Input, message, Space } from "antd";
import "./Permissions.css";

const ROLES = ["admin", "manager", "coordinator", "rescue"];

const FEATURES = [
  { id: "dispatch", name: "Điều phối / Phân công", actions: ["view", "assign", "update", "delete"] },
  { id: "reports", name: "Báo cáo", actions: ["view", "export"] },
  { id: "inventory", name: "Kho hàng", actions: ["view", "update", "deduct"] },
  { id: "requests", name: "Yêu cầu cứu hộ", actions: ["create", "view", "update", "close"] },
  { id: "settings", name: "Cấu hình hệ thống", actions: ["view", "update"] },
  { id: "logs", name: "Logs hệ thống", actions: ["view", "clear"] },
];

function readRoleMatrix() {
  try {
    const raw = localStorage.getItem("system_configs");
    const parsed = raw ? JSON.parse(raw) : [];
    const item = (parsed || []).find((c) => c.key === "ROLE_PERMISSION_MATRIX");
    if (item && typeof item.value === "object") return item.value;
  } catch (e) {
    // ignore
  }
  // default empty matrix
  const mat = {};
  ROLES.forEach((r) => {
    mat[r] = {};
    FEATURES.forEach((f) => (mat[r][f.id] = []));
  });
  return mat;
}

function saveRoleMatrix(matrix) {
  try {
    const raw = localStorage.getItem("system_configs");
    const configs = raw ? JSON.parse(raw) : [];
    const idx = configs.findIndex((c) => c.key === "ROLE_PERMISSION_MATRIX");
    if (idx >= 0) configs[idx].value = matrix;
    else configs.push({ key: "ROLE_PERMISSION_MATRIX", name: "ROLE_PERMISSION_MATRIX – Ma trận quyền", type: "json", value: matrix, group: "permission" });
    localStorage.setItem("system_configs", JSON.stringify(configs));
  } catch (e) {
    throw e;
  }
}

function pushLog(entry) {
  try {
    const raw = localStorage.getItem("system_logs");
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(entry);
    localStorage.setItem("system_logs", JSON.stringify(arr));
  } catch (e) {
    // ignore
  }
}

export default function Permissions() {
  const [matrix, setMatrix] = useState(() => readRoleMatrix());
  const [username, setUsername] = useState("");
  const [userOverrides, setUserOverrides] = useState(() => {
    try {
      const raw = localStorage.getItem("user_permissions");
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    // ensure matrix is loaded
    setMatrix(readRoleMatrix());
  }, []);

  const handleToggle = (role, featureId, action, checked) => {
    setMatrix((prev) => {
      const copy = { ...prev };
      copy[role] = { ...copy[role] };
      const arr = new Set(copy[role][featureId] || []);
      if (checked) arr.add(action);
      else arr.delete(action);
      copy[role][featureId] = Array.from(arr);
      return copy;
    });
  };

  const handleSaveMatrix = () => {
    try {
      saveRoleMatrix(matrix);
      const actor = localStorage.getItem("role") || "system";
      pushLog({ id: Date.now(), time: new Date().toISOString(), level: "INFO", user: actor, message: `Cập nhật ma trận quyền` });
      message.success("Lưu ma trận quyền thành công");
    } catch (e) {
      message.error("Lưu thất bại");
    }
  };

  const handleSaveUserOverride = () => {
    if (!username) return message.error("Nhập username để lưu override");
    const newOverrides = { ...userOverrides, [username]: matrix };
    setUserOverrides(newOverrides);
    localStorage.setItem("user_permissions", JSON.stringify(newOverrides));
    const actor = localStorage.getItem("role") || "system";
    pushLog({ id: Date.now(), time: new Date().toISOString(), level: "INFO", user: actor, message: `Gán quyền đặc biệt cho user=${username}` });
    message.success("Lưu override cho user thành công");
  };

  const handleLoadUser = () => {
    if (!username) return message.error("Nhập username để load override");
    const u = userOverrides[username];
    if (u) setMatrix(u);
    else message.info("Không tìm thấy override cho user này");
  };

  const featureRows = useMemo(() => FEATURES, []);

  return (
    <div className="permissions-page">
      <div className="page-header">
        <div>
          <h2>Phân quyền nâng cao</h2>
          <p>Quản lý chi tiết quyền theo role, chức năng và hành động. Hỗ trợ override cho user cụ thể.</p>
        </div>

        <div className="page-actions">
          <Space>
            <Input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: 160 }} />
            <Button onClick={handleLoadUser}>Load user</Button>
            <Button onClick={handleSaveUserOverride}>Save override</Button>
            <Button type="primary" onClick={handleSaveMatrix}>
              Lưu ma trận
            </Button>
          </Space>
        </div>
      </div>

      <div className="matrix-box">
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Chức năng / Hành động</th>
              {ROLES.map((r) => (
                <th key={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureRows.map((f) => (
              <tr key={f.id}>
                <td>
                  <strong>{f.name}</strong>
                  <div className="param-desc">{f.id}</div>
                </td>
                {ROLES.map((role) => (
                  <td key={role}>
                    <div className="actions-row">
                      {f.actions.map((act) => {
                        const checked = (matrix[role] && matrix[role][f.id] || []).includes(act);
                        return (
                          <label className="action-item" key={act}>
                            <Checkbox checked={checked} onChange={(e) => handleToggle(role, f.id, act, e.target.checked)} />
                            <span className="action-label">{act}</span>
                          </label>
                        );
                      })}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
