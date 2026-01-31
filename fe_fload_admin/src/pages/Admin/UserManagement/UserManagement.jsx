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
  const [editingUser, setEditingUser] = useState(null);
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
      status: "Hoạt động",
      statusColor: "green",
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
  };

  const statusColorMap = {
    "Hoạt động": "green",
    Khóa: "red",
  };

  /* ================= HANDLERS ================= */

  const handleCreateUser = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        const updatedUsers = users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                ...values,
                roleColor: roleColorMap[values.role],
                statusColor: statusColorMap[values.status],
                last: "Vừa cập nhật",
              }
            : u
        );
        setUsers(updatedUsers);
      } else {
        const newUser = {
          id: Date.now(),
          ...values,
          roleColor: roleColorMap[values.role],
          statusColor: statusColorMap[values.status],
          last: "Vừa xong",
          joinDate: new Date().toLocaleDateString("vi-VN"),
        };
        setUsers([newUser, ...users]);
      }

      setOpen(false);
      setEditingUser(null);
      form.resetFields();
    });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setOpen(true);
    form.setFieldsValue(user);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleLockUser = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: "Khóa", statusColor: "red" }
          : u
      )
    );
  };

  /* ================= UI ================= */

  return (
    <div className="user-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h2>Danh sách người dùng</h2>
          <p>Quản lý thành viên và phân quyền hệ thống cứu hộ.</p>
        </div>

        <div className="page-actions">
          <Button icon={<DownloadOutlined />}>Xuất dữ liệu</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingUser(null);
              form.resetFields();
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
          icon={<TeamOutlined />}
        />
        <StatCard
          title="RESCUE TEAM"
          value={users.filter((u) => u.role === "RESCUE TEAM").length}
          icon={<ThunderboltOutlined />}
        />
        <StatCard
          title="ĐANG HOẠT ĐỘNG"
          value={users.filter((u) => u.status === "Hoạt động").length}
          icon={<CheckCircleOutlined />}
        />
        <StatCard
          title="ĐANG CHỜ DUYỆT"
          value={0}
          icon={<ClockCircleOutlined />}
        />
      </div>

      {/* TABLE */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th><Checkbox /></th>
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
                onEdit={() => handleEditUser(u)}
                onDelete={() => handleDeleteUser(u.id)}
                onLock={() => handleLockUser(u.id)}
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
        title={selectedUser?.name}
        open={drawerVisible}
        width={600}
        onClose={() => setDrawerVisible(false)}
      >
        {selectedUser && (
          <UserDetail
            user={selectedUser}
            onEdit={() => {
              setDrawerVisible(false);
              handleEditUser(selectedUser);
            }}
          />
        )}
      </Drawer>

      {/* MODAL */}
      <Modal
        title={editingUser ? "Chỉnh sửa người dùng" : "Tạo người dùng mới"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleCreateUser}
        okText={editingUser ? "Cập nhật" : "Tạo"}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Họ tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="phone" label="Điện thoại">
            <Input />
          </Form.Item>

          <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="RESCUE TEAM">Rescue Team</Select.Option>
              <Select.Option value="COORDINATOR">Coordinator</Select.Option>
              <Select.Option value="MANAGER">Manager</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="area" label="Khu vực">
            <Input />
          </Form.Item>

          <Form.Item name="status" label="Trạng thái">
            <Select>
              <Select.Option value="Hoạt động">Hoạt động</Select.Option>
              <Select.Option value="Khóa">Khóa</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <p>{title}</p>
      <h3>{value}</h3>
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
  onEdit,
  onDelete,
  onLock,
}) {
  return (
    <tr onClick={onSelect}>
      <td><Checkbox /></td>
      <td>
        <strong>{name}</strong>
        <p>{email}</p>
      </td>
      <td><Tag color={roleColor}>{role}</Tag></td>
      <td>{area}</td>
      <td><span className={`status ${statusColor}`}>{status}</span></td>
      <td>{last}</td>
      <td onClick={(e) => e.stopPropagation()}>
        <LockOutlined onClick={onLock} />
        <EditOutlined onClick={onEdit} />
        <DeleteOutlined onClick={onDelete} />
      </td>
    </tr>
  );
}

function UserDetail({ user, onEdit }) {
  return (
    <>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Điện thoại:</b> {user.phone}</p>
      <p><b>Khu vực:</b> {user.area}</p>
      <Button type="primary" block onClick={onEdit}>
        Chỉnh sửa thông tin
      </Button>
    </>
  );
}
