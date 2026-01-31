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
  const [isEdit, setIsEdit] = useState(false);

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

  const handleSubmitUser = () => {
    form.validateFields().then((values) => {
      if (isEdit && selectedUser) {
        setUsers(
          users.map((u) =>
            u.id === selectedUser.id ? { ...u, ...values } : u
          )
        );
      } else {
        const newUser = {
          id: Date.now(),
          ...values,
          roleColor: roleColorMap[values.role],
          statusColor: statusColorMap[values.status],
          last: "Vừa xong",
        };
        setUsers([newUser, ...users]);
      }

      setOpen(false);
      setIsEdit(false);
      setSelectedUser(null);
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
            onClick={() => {
              setIsEdit(false);
              setSelectedUser(null);
              setOpen(true);
            }}
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
                onView={() => {
                  setSelectedUser(u);
                  setDrawerVisible(true);
                }}
                onEdit={() => {
                  setSelectedUser(u);
                  setIsEdit(true);
                  form.setFieldsValue(u);
                  setOpen(true);
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

      {/* DRAWER */}
      <Drawer
        title={selectedUser ? `👤 ${selectedUser.name}` : "Chi tiết người dùng"}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={600}
      >
        {selectedUser && <UserDetail user={selectedUser} />}
      </Drawer>

      {/* MODAL */}
      <Modal
        title={isEdit ? "Chỉnh sửa người dùng" : "Tạo người dùng mới"}
        open={open}
        onCancel={() => {
          setOpen(false);
          setIsEdit(false);
          form.resetFields();
        }}
        onOk={handleSubmitUser}
        okText={isEdit ? "Lưu thay đổi" : "Tạo người dùng"}
        cancelText="Hủy"
        width={700}
      >
        <Form form={form} layout="vertical">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Form.Item label="Họ và tên" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Điện thoại"
              name="phone"
              rules={[
                { required: true },
                {
                  pattern: /^0\d{9}$/,
                  message: "SĐT phải 10 số, bắt đầu bằng 0",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Địa chỉ" name="address">
              <Input />
            </Form.Item>

            <Form.Item label="Vai trò" name="role" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="RESCUE TEAM">Rescue Team</Select.Option>
                <Select.Option value="COORDINATOR">Coordinator</Select.Option>
                <Select.Option value="MANAGER">Manager</Select.Option>
                <Select.Option value="ADMIN">Admin</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Bộ phận / Đội"
              name="department"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="Đội Cứu Hộ 1">Đội Cứu Hộ 1</Select.Option>
                <Select.Option value="Đội Cứu Hộ 2">Đội Cứu Hộ 2</Select.Option>
                <Select.Option value="Phòng Điều Phối">Phòng Điều Phối</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Khu vực" name="area" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Trạng thái" name="status">
              <Select>
                <Select.Option value="Hoạt động">Hoạt động</Select.Option>
                <Select.Option value="Khóa">Khóa</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, min: 6 }]}
            >
              <Input />
            </Form.Item>
          </div>
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
  onView,
  onEdit,
}) {
  return (
    <tr onClick={onView} style={{ cursor: "pointer" }}>
      <td>
        <Checkbox />
      </td>
      <td>
        <strong>{name}</strong>
        <p>{email}</p>
      </td>
      <td>
        <Tag color={roleColor}>{role}</Tag>
      </td>
      <td>{area}</td>
      <td>
        <span className={`status ${statusColor}`}>{status}</span>
      </td>
      <td>{last}</td>
      <td>
        <EditOutlined
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        />
      </td>
    </tr>
  );
}

function UserDetail({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Điện thoại: {user.phone}</p>
      <p>Địa chỉ: {user.address}</p>
      <p>Vai trò: {user.role}</p>
      <p>Bộ phận: {user.department}</p>
      <p>Khu vực: {user.area}</p>
      <p>Trạng thái: {user.status}</p>
    </div>
  );
}
