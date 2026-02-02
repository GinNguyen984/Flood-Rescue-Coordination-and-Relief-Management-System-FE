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
  Divider,
} from "antd";
import {
  DownloadOutlined,
  PlusOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
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
      address: "123 Đường Láng, Hà Nội",
      role: "RESCUE TEAM",
      roleColor: "blue",
      department: "Đội Cứu Hộ 1",
      area: "Hà Nội - Đội 1",
      status: "Hoạt động",
      statusColor: "green",
      last: "Vừa xong",
      joinDate: "15/01/2024",
      notes: "",
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

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (isEdit) {
        setUsers(
          users.map((u) =>
            u.id === selectedUser.id
              ? {
                  ...u,
                  ...values,
                  roleColor: roleColorMap[values.role],
                  statusColor: statusColorMap[values.status],
                }
              : u
          )
        );
      } else {
        setUsers([
          {
            id: Date.now(),
            ...values,
            roleColor: roleColorMap[values.role],
            statusColor: statusColorMap[values.status],
            last: "Vừa xong",
            joinDate: new Date().toLocaleDateString(),
          },
          ...users,
        ]);
      }

      setOpen(false);
      setIsEdit(false);
      form.resetFields();
    });
  };

  return (
    <div className="user-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h2>Danh sách người dùng</h2>
          <p>Quản lý thành viên hệ thống cứu hộ</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsEdit(false);
            form.resetFields();
            setOpen(true);
          }}
        >
          Tạo người dùng
        </Button>
      </div>

      {/* STAT */}
      <div className="stat-cards">
        <StatCard title="TỔNG NGƯỜI DÙNG" value={users.length} icon={<TeamOutlined />} />
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
      </div>

      {/* TABLE */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Người dùng</th>
              <th>Vai trò</th>
              <th>Khu vực</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                onClick={() => {
                  setSelectedUser(u);
                  setDrawerVisible(true);
                }}
              >
                <td>
                  <Checkbox />
                </td>
                <td>
                  <b>{u.name}</b>
                  <div>{u.email}</div>
                </td>
                <td>
                  <Tag color={u.roleColor}>{u.role}</Tag>
                </td>
                <td>{u.area}</td>
                <td>
                  <span className={`status ${u.statusColor}`}>{u.status}</span>
                </td>
                <td>
                  <EditOutlined />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DRAWER DETAIL */}
      <Drawer
        open={drawerVisible}
        width={520}
        onClose={() => setDrawerVisible(false)}
        title="Chi tiết người dùng"
        extra={
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              form.setFieldsValue(selectedUser);
              setIsEdit(true);
              setDrawerVisible(false);
              setOpen(true);
            }}
          >
            Chỉnh sửa
          </Button>
        }
      >
        {selectedUser && <UserDetail user={selectedUser} />}
      </Drawer>

      {/* MODAL FORM */}
      <Modal
  open={open}
  onCancel={() => setOpen(false)}
  onOk={handleSubmit}
  width={720}
  title={isEdit ? "Chỉnh sửa người dùng" : "Tạo người dùng mới"}
  okText={isEdit ? "Lưu thay đổi" : "Tạo người dùng"}
>
  <Form layout="vertical" form={form}>
    {/* ===== Thông tin cơ bản ===== */}
    <Divider orientation="left">📋 Thông tin cơ bản</Divider>

    <div className="form-grid">
      <Form.Item
        label="Họ và tên"
        name="name"
        rules={[{ required: true, message: "Nhập họ tên" }]}
      >
        <Input placeholder="Nguyễn Văn A" />
      </Form.Item>


      <Form.Item
        label="Điện thoại"
        name="phone"
        rules={[
          { required: true, message: "Nhập SĐT" },
          { pattern: /^0\d{9}$/, message: "SĐT phải 10 số, bắt đầu bằng 0" },
        ]}
      >
        <Input placeholder="0912345678" />
      </Form.Item>

      <Form.Item label="Địa chỉ" name="address">
        <Input placeholder="123 Đường Láng, Hà Nội" />
      </Form.Item>
    </div>

    {/* ===== Thông tin công việc ===== */}
    <Divider orientation="left">💼 Thông tin công việc</Divider>

    <div className="form-grid">
      <Form.Item
        label="Vai trò"
        name="role"
        rules={[{ required: true, message: "Chọn vai trò" }]}
      >
        <Select placeholder="Chọn vai trò">
          <Select.Option value="RESCUE TEAM">Rescue Team</Select.Option>
          <Select.Option value="COORDINATOR">Coordinator</Select.Option>
          <Select.Option value="MANAGER">Manager</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Bộ phận"
        name="department"
        rules={[{ required: true, message: "Chọn đội" }]}
      >
        <Select placeholder="Chọn đội cứu hộ">
          <Select.Option value="Đội Cứu Hộ 1">Đội Cứu Hộ 1</Select.Option>
          <Select.Option value="Đội Cứu Hộ 2">Đội Cứu Hộ 2</Select.Option>
          <Select.Option value="Phòng Điều Phối">Phòng Điều Phối</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Khu vực"
        name="area"
        rules={[{ required: true, message: "Nhập khu vực" }]}
      >
        <Input placeholder="Hà Nội - Đội 1" />
      </Form.Item>

      <Form.Item label="Trạng thái" name="status" initialValue="Hoạt động">
        <Select>
          <Select.Option value="Hoạt động">Hoạt động</Select.Option>
          <Select.Option value="Khóa">Khóa</Select.Option>
        </Select>
      </Form.Item>
    </div>

    {/* ===== Bảo mật ===== */}
    <Divider orientation="left">🔐 Bảo mật & Truy cập</Divider>

    <Form.Item
      label="Mật khẩu"
      name="password"
      rules={[
        { required: true, message: "Nhập mật khẩu" },
        { min: 6, message: "Tối thiểu 6 ký tự" },
      ]}
    >
      <Input placeholder="Tối thiểu 6 ký tự" />
    </Form.Item>

    <Form.Item label="Ghi chú" name="notes">
      <Input.TextArea rows={3} placeholder="Ghi chú thêm về người dùng..." />
    </Form.Item>
  </Form>
</Modal>

    </div>
  );
}

/* ================= SUB ================= */

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      {icon}
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  );
}

function UserDetail({ user }) {
  return (
    <div className="user-detail-box">
      <Section title="Thông tin liên hệ">
        <Item label="Họ tên" value={user.name} />
        <Item label="Email" value={user.email} />
        <Item label="Điện thoại" value={user.phone} />
        <Item label="Địa chỉ" value={user.address} />
      </Section>

      <Section title="Thông tin công việc">
        <Item label="Vai trò" value={user.role} />
        <Item label="Bộ phận" value={user.department} />
        <Item label="Khu vực" value={user.area} />
        <Item label="Trạng thái" value={user.status} />
        <Item label="Ngày tham gia" value={user.joinDate} />
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <>
      <h4 style={{ marginTop: 16 }}>{title}</h4>
      {children}
    </>
  );
}

function Item({ label, value }) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}
