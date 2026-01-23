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

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn An",
      email: "an.nguyen@rescue.vn",
      role: "RESCUE TEAM",
      roleColor: "blue",
      area: "Hà Nội - Đội 1",
      status: "Hoạt động",
      statusColor: "green",
      last: "Vừa xong",
    },
    {
      id: 2,
      name: "Trần Thị Bích",
      email: "bich.tran@rescue.vn",
      role: "COORDINATOR",
      roleColor: "purple",
      area: "TP.HCM - TTĐP",
      status: "Nghỉ phép",
      statusColor: "orange",
      last: "2 giờ trước",
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
              <UserRow key={u.id} {...u} />
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>Hiển thị {users.length} người dùng</span>
          <Pagination total={users.length} />
        </div>
      </div>

      {/* MODAL CREATE USER */}
      <Modal
        title="Tạo người dùng mới"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleCreateUser}
        okText="Tạo người dùng"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Nhập tên" }]}
          >
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

          <Form.Item label="Vai trò" name="role" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="RESCUE TEAM">Rescue Team</Select.Option>
              <Select.Option value="COORDINATOR">Coordinator</Select.Option>
              <Select.Option value="MANAGER">Manager</Select.Option>
              <Select.Option value="ADMIN">Admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Khu vực" name="area" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            name="status"
            initialValue="Hoạt động"
          >
            <Select>
              <Select.Option value="Hoạt động">Hoạt động</Select.Option>
              <Select.Option value="Nghỉ phép">Nghỉ phép</Select.Option>
              <Select.Option value="Khóa">Khóa</Select.Option>
            </Select>
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
}) {
  return (
    <tr>
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
