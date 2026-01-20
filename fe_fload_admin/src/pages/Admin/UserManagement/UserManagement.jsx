import {
  Button,
  Tag,
  Checkbox,
  Pagination,
  Tooltip,
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
  return (
    <div className="user-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h2>Danh sách người dùng</h2>
          <p>
            Quản lý thành viên, phân quyền và bảo mật hệ thống cứu hộ tập trung.
          </p>
        </div>

        <div className="page-actions">
          <Button icon={<DownloadOutlined />}>Xuất dữ liệu</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="btn-create-user"
          >
            Tạo người dùng mới
          </Button>
        </div>
      </div>

      {/* STATISTIC CARDS */}
      <div className="stat-cards">
        <StatCard
          title="TỔNG NGƯỜI DÙNG"
          value="1,284"
          note="+12% tháng này"
          icon={<TeamOutlined />}
          color="teal"
        />
        <StatCard
          title="RESCUE TEAM"
          value="852"
          note="66% nhân sự thực địa"
          icon={<ThunderboltOutlined />}
          color="orange"
        />
        <StatCard
          title="ĐANG HOẠT ĐỘNG"
          value="142"
          note="Trong 5 phút qua"
          icon={<CheckCircleOutlined />}
          color="green"
        />
        <StatCard
          title="ĐANG CHỜ DUYỆT"
          value="18"
          note="Cần xử lý ngay"
          icon={<ClockCircleOutlined />}
          color="yellow"
          danger
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
              <th className="col-user">NGƯỜI DÙNG</th>
              <th className="col-role">VAI TRÒ</th>
              <th className="col-area">KHU VỰC</th>
              <th className="col-status">TRẠNG THÁI</th>
              <th className="col-last">LẦN CUỐI</th>
              <th className="col-action">THAO TÁC</th>
            </tr>
          </thead>

          <tbody>
            <UserRow
              name="Nguyễn Văn An"
              email="an.nguyen@rescue.vn"
              role="RESCUE TEAM"
              roleColor="blue"
              area="Hà Nội - Đội 1"
              status="Hoạt động"
              statusColor="green"
              last="Vừa xong"
            />

            <UserRow
              name="Trần Thị Bích"
              email="bich.tran@rescue.vn"
              role="COORDINATOR"
              roleColor="purple"
              area="TP.HCM - TTĐP"
              status="Nghỉ phép"
              statusColor="orange"
              last="2 giờ trước"
            />
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="table-footer">
          <span>Hiển thị 1–4 của 1,284 người dùng</span>
          <Pagination defaultCurrent={1} total={1284} showSizeChanger />
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function StatCard({ title, value, note, icon, color, danger }) {
  return (
    <div className={`stat-card ${danger ? "danger" : ""}`}>
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
      <td className="col-checkbox">
        <Checkbox />
      </td>

      <td className="col-user">
        <div className="user-cell">
          <div className="avatar">{name[0]}</div>
          <div>
            <strong>{name}</strong>
            <p>{email}</p>
          </div>
        </div>
      </td>

      <td className="col-role">
        <Tag color={roleColor}>{role}</Tag>
      </td>

      <td className="col-area">{area}</td>

      <td className="col-status">
        <span className={`status ${statusColor}`}>{status}</span>
      </td>

      <td className="col-last">{last}</td>

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
