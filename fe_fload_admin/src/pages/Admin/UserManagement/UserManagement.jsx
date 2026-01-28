import { useState } from "react";
import {
  Button,
  Tag,
  Checkbox,
  Pagination,
  Tooltip,
  Modal,
  Form,
  Input,
  Select,
  Drawer,
} from "antd";
import {
  DownloadOutlined,
  PlusOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LockOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./userManagement.css";

export default function UserManagement() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn An",
      email: "an.nguyen@rescue.vn",
      phone: "0912345678",
      role: "RESCUE TEAM",
      roleColor: "blue",
      area: "Hà Nội - Đội 1",
      status: "Hoạt động",
      statusColor: "green",
      last: "Vừa xong",
      joinDate: "15/01/2024",
      department: "Đội Cứu Hộ 1",
      experience: "5 năm",
      skills: ["Cứu hộ nước", "Cấp cứu", "Tìm kiếm"],
      certification: "Chứng chỉ Cứu hộ Quốc Tế",
      address: "123 Đường Láng, Hà Nội",
    },
    {
      id: 2,
      name: "Trần Thị Bích",
      email: "bich.tran@rescue.vn",
      phone: "0987654321",
      role: "COORDINATOR",
      roleColor: "purple",
      area: "TP.HCM - TTĐP",
      status: "Nghỉ phép",
      statusColor: "orange",
      last: "2 giờ trước",
      joinDate: "20/03/2023",
      department: "Phòng Điều Phối",
      experience: "8 năm",
      skills: ["Điều phối", "Quản lý dự án", "Báo cáo"],
      certification: "Chứng chỉ Quản lý Khủng Hoảng",
      address: "456 Nguyễn Hữu Cảnh, TP.HCM",
    },
  ]);

  const roleColorMap = {
    "RESCUE TEAM": "blue",
    COORDINATOR: "purple",
    MANAGER: "gold",
    ADMIN: "red",
  };

  const statusColorMap = {
    "Hoạt động": "green",
    "Nghỉ phép": "orange",
    Khóa: "red",
  };

  const handleCreateUser = () => {
    form.validateFields().then((values) => {
      const newUser = {
        id: Date.now(),
        ...values,
        roleColor: roleColorMap[values.role],
        statusColor: statusColorMap[values.status],
        last: "Vừa xong",
      };

      setUsers([newUser, ...users]);
      setOpen(false);
      form.resetFields();
    });
  };

  return (
    <div className="user-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h2>Danh sách người dùng</h2>
          <p>Quản lý thành viên, phân quyền và bảo mật hệ thống cứu hộ tập trung.</p>
        </div>

        <div className="page-actions">
          <Button icon={<DownloadOutlined />}>Xuất dữ liệu</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            Tạo người dùng mới
          </Button>
        </div>
      </div>

      {/* STATISTIC */}
      <div className="stat-cards">
        <StatCard
          title="TỔNG NGƯỜI DÙNG"
          value={users.length}
          note="Tổng hệ thống"
          icon={<TeamOutlined />}
          color="teal"
        />
        <StatCard
          title="RESCUE TEAM"
          value={users.filter((u) => u.role === "RESCUE TEAM").length}
          note="Nhân sự thực địa"
          icon={<ThunderboltOutlined />}
          color="orange"
        />
        <StatCard
          title="ĐANG HOẠT ĐỘNG"
          value={users.filter((u) => u.status === "Hoạt động").length}
          note="Online"
          icon={<CheckCircleOutlined />}
          color="green"
        />
        <StatCard
          title="ĐANG CHỜ DUYỆT"
          value="0"
          note="Không có"
          icon={<ClockCircleOutlined />}
          color="yellow"
        />
      </div>

      {/* TABLE */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th className="col-checkbox">
                <Checkbox />
              </th>
              <th>NGƯỜI DÙNG</th>
              <th>VAI TRÒ</th>
              <th>KHU VỰC</th>
              <th>TRẠNG THÁI</th>
              <th>LẦN CUỐI</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <UserRow 
                key={u.id} 
                {...u} 
                onSelect={() => {
                  setSelectedUser(u);
                  setDrawerVisible(true);
                }}
              />
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>Hiển thị {users.length} người dùng</span>
          <Pagination total={users.length} />
        </div>
      </div>

      {/* DRAWER - USER DETAIL */}
      <Drawer
        title={selectedUser ? `👤 ${selectedUser.name}` : "Chi tiết người dùng"}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={600}
      >
        {selectedUser && <UserDetail user={selectedUser} />}
      </Drawer>

      {/* MODAL CREATE USER */}
      <Modal
        title="Tạo người dùng mới"
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        onOk={handleCreateUser}
        okText="Tạo người dùng"
        cancelText="Hủy"
        width={700}
      >
        <Form form={form} layout="vertical">
          {/* THÔNG TIN CƠ BẢN */}
          <div style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #f0f0f0" }}>
            <h4 style={{ fontWeight: 600, marginBottom: "12px", color: "#1a7c5a" }}>📋 Thông tin cơ bản</h4>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: "Nhập tên" }]}
            >
              <Input placeholder="Nguyễn Văn A" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="user@rescue.vn" type="email" />
            </Form.Item>

            <Form.Item
              label="Điện thoại"
              name="phone"
              rules={[{ required: true, message: "Nhập số điện thoại" }]}
            >
              <Input placeholder="0912345678" />
            </Form.Item>

            <Form.Item label="Địa chỉ" name="address">
              <Input placeholder="123 Đường Láng, Hà Nội" />
            </Form.Item>
          </div>

          {/* THÔNG TIN CÔNG VIỆC */}
          <div style={{ marginBottom: "16px", marginTop: "20px", paddingBottom: "12px", borderBottom: "1px solid #f0f0f0" }}>
            <h4 style={{ fontWeight: 600, marginBottom: "12px", color: "#1a7c5a" }}>💼 Thông tin công việc</h4>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Form.Item label="Vai trò" name="role" rules={[{ required: true, message: "Chọn vai trò" }]}>
              <Select placeholder="Chọn vai trò">
                <Select.Option value="RESCUE TEAM">Rescue Team</Select.Option>
                <Select.Option value="COORDINATOR">Coordinator</Select.Option>
                <Select.Option value="MANAGER">Manager</Select.Option>
                <Select.Option value="ADMIN">Admin</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Bộ phận" name="department">
              <Input placeholder="Đội Cứu Hộ 1" />
            </Form.Item>

            <Form.Item label="Khu vực" name="area" rules={[{ required: true, message: "Nhập khu vực" }]}>
              <Input placeholder="Hà Nội - Đội 1" />
            </Form.Item>

            <Form.Item label="Trạng thái" name="status" initialValue="Hoạt động">
              <Select>
                <Select.Option value="Hoạt động">Hoạt động</Select.Option>
                <Select.Option value="Nghỉ phép">Nghỉ phép</Select.Option>
                <Select.Option value="Khóa">Khóa</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Kinh nghiệm" name="experience">
              <Input placeholder="5 năm" />
            </Form.Item>
          </div>

          {/* BẢO MẬT & TRUY CẬP */}
          <div style={{ marginBottom: "16px", marginTop: "20px", paddingBottom: "12px", borderBottom: "1px solid #f0f0f0" }}>
            <h4 style={{ fontWeight: 600, marginBottom: "12px", color: "#1a7c5a" }}>🔐 Bảo mật & Truy cập</h4>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Nhập mật khẩu" },
                { min: 6, message: "Mật khẩu ít nhất 6 ký tự" },
              ]}
            >
              <Input.Password placeholder="Tối thiểu 6 ký tự" />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              rules={[
                { required: true, message: "Xác nhận mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Xác nhận mật khẩu" />
            </Form.Item>
          </div>

          {/* GHI CHÚ */}
          <Form.Item label="Ghi chú" name="notes">
            <Input.TextArea rows={3} placeholder="Ghi chú thêm về người dùng..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

/* ================= COMPONENT ================= */

function StatCard({ title, value, note, icon, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>{icon}</div>
      <p>{title}</p>
      <h3>{value}</h3>
      <span>{note}</span>
    </div>
  );
}

function UserRow({
  name,
  email,
  role,
  roleColor,
  area,
  status,
  statusColor,
  last,
  onSelect,
}) {
  return (
    <tr onClick={onSelect} style={{ cursor: "pointer" }}>
      <td>
        <Checkbox />
      </td>

      <td>
        <div className="user-cell">
          <div className="avatar">{name[0]}</div>
          <div>
            <strong>{name}</strong>
            <p>{email}</p>
          </div>
        </div>
      </td>

      <td>
        <Tag color={roleColor}>{role}</Tag>
      </td>

      <td>{area}</td>

      <td>
        <span className={`status ${statusColor}`}>{status}</span>
      </td>

      <td>{last}</td>

      <td className="col-action">
        <Tooltip title="Khóa">
          <LockOutlined />
        </Tooltip>
        <Tooltip title="Chỉnh sửa">
          <EditOutlined />
        </Tooltip>
        <Tooltip title="Xóa">
          <DeleteOutlined />
        </Tooltip>
      </td>
    </tr>
  );
}

function UserDetail({ user }) {
  return (
    <div className="user-detail">
      {/* Avatar and Name */}
      <div className="user-detail-header">
        <div className="user-detail-avatar">{user.name[0]}</div>
        <div>
          <h3>{user.name}</h3>
          <Tag color={user.roleColor}>{user.role}</Tag>
        </div>
      </div>

      {/* Contact Info */}
      <div className="detail-section">
        <h4>📞 Thông tin liên hệ</h4>
        <div className="detail-row">
          <span className="label">Email:</span>
          <span className="value">{user.email}</span>
        </div>
        <div className="detail-row">
          <span className="label">Điện thoại:</span>
          <span className="value">{user.phone}</span>
        </div>
        <div className="detail-row">
          <span className="label">Địa chỉ:</span>
          <span className="value">{user.address}</span>
        </div>
      </div>

      {/* Work Info */}
      <div className="detail-section">
        <h4>💼 Thông tin công việc</h4>
        <div className="detail-row">
          <span className="label">Vị trí:</span>
          <span className="value">{user.role}</span>
        </div>
        <div className="detail-row">
          <span className="label">Bộ phận:</span>
          <span className="value">{user.department}</span>
        </div>
        <div className="detail-row">
          <span className="label">Khu vực:</span>
          <span className="value">{user.area}</span>
        </div>
        <div className="detail-row">
          <span className="label">Kinh nghiệm:</span>
          <span className="value">{user.experience}</span>
        </div>
        <div className="detail-row">
          <span className="label">Ngày tham gia:</span>
          <span className="value">{user.joinDate}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="detail-section">
        <h4>🎯 Kỹ năng</h4>
        <div className="skills-list">
          {user.skills.map((skill, idx) => (
            <Tag key={idx} color="blue">
              {skill}
            </Tag>
          ))}
        </div>
      </div>

      {/* Certification */}
      <div className="detail-section">
        <h4>🏅 Chứng chỉ</h4>
        <div className="detail-row">
          <span className="value">{user.certification}</span>
        </div>
      </div>

      {/* Status */}
      <div className="detail-section">
        <h4>⚡ Trạng thái</h4>
        <div className="detail-row">
          <span className="label">Trạng thái hiện tại:</span>
          <span className={`status ${user.statusColor}`}>{user.status}</span>
        </div>
        <div className="detail-row">
          <span className="label">Lần cuối hoạt động:</span>
          <span className="value">{user.last}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="detail-actions">
        <Button type="primary" block>
          Chỉnh sửa thông tin
        </Button>
        <Button danger block>
          Khóa tài khoản
        </Button>
      </div>
    </div>
  );
}
