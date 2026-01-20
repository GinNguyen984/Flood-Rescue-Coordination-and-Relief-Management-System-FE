import { Button, Tag } from "antd";
import {
  FilterOutlined,
  DownloadOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  CoffeeOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./RescueTeamManagement.css";

export default function RescueTeamManagement() {
  return (
    <div className="rescue-page">
      {/* ================= HEADER ================= */}
      <div className="page-header">
        <div>
          <h2>Quản lý Đội cứu hộ</h2>
          <p>
            Giám sát và sắp xếp nhân sự cho các đội cứu hộ dưới quyền
            (UC-M08, UC-M18)
          </p>
        </div>

        <div className="header-actions">
          <Button icon={<FilterOutlined />}>Lọc</Button>
          <Button icon={<DownloadOutlined />}>Xuất báo cáo</Button>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="stat-grid">
        <StatCard title="TỔNG SỐ ĐỘI" value="12" icon={<TeamOutlined />} />
        <StatCard
          title="ĐANG LÀM NHIỆM VỤ"
          value="08"
          icon={<ThunderboltOutlined />}
          green
        />
        <StatCard
          title="ĐANG NGHỈ / DỰ PHÒNG"
          value="04"
          icon={<CoffeeOutlined />}
          gray
        />
        <StatCard
          title="NHÂN SỰ SẴN SÀNG"
          value="156"
          icon={<UserOutlined />}
        />
      </div>

      {/* ================= TEAM LIST ================= */}
      <div className="card">
        <div className="card-tabs">
          <span className="active">📋 Danh sách đội cứu hộ (UC-M08)</span>
          <span>📆 Lịch trình hoạt động (UC-M18)</span>
        </div>

        <div className="table-head">
          <span>TÊN ĐỘI</span>
          <span>CHUYÊN MÔN CHÍNH</span>
          <span>THÀNH VIÊN</span>
          <span>TRẠNG THÁI</span>
          <span>NHIỆM VỤ HIỆN TẠI</span>
          <span>HÀNH ĐỘNG</span>
        </div>

        <TeamRow
          name="ALPHA TEAM"
          id="TEAM-01"
          skill="Cứu hộ đường thủy"
          members={12}
          status="active"
          mission="Sơ tán dân cư vùng B4"
        />

        <TeamRow
          name="MED-RESPONSE DELTA"
          id="TEAM-04"
          skill="Y tế hiện trường"
          members={8}
          status="rest"
          mission="-"
        />

        <TeamRow
          name="TECH-RESCUE K9"
          id="TEAM-07"
          skill="Tìm kiếm & Cứu nạn"
          members={15}
          status="active"
          mission="Quét radar khu vực sạt lở"
        />
      </div>

      {/* ================= SCHEDULE ================= */}
      <div className="card">
        <div className="schedule-header">
          <div>
            <h3>Lịch trực Đội cứu hộ (UC-M18)</h3>
            <p>Sắp xếp ca trực tuần hiện tại: 15/05 - 21/05</p>
          </div>

          <div className="week-control">
            <Button>‹</Button>
            <Button>Tuần này</Button>
            <Button>›</Button>
          </div>
        </div>

        <div className="schedule-grid">
          <div className="schedule-head">
            <span>ĐỘI</span>
            <span>THỨ 2</span>
            <span>THỨ 3</span>
            <span>THỨ 4</span>
            <span>THỨ 5</span>
            <span>THỨ 6</span>
            <span>THỨ 7</span>
            <span>CHỦ NHẬT</span>
          </div>

          <ScheduleRow
            team="Alpha Team"
            data={["Ca sáng", "Ca sáng", "", "Ca đêm", "Ca đêm", "", "Trực ban"]}
            color="green"
          />

          <ScheduleRow
            team="Delta Med"
            data={["", "Trực viện", "Trực viện", "", "Ca sáng", "Ca chiều", ""]}
            color="blue"
          />

          <ScheduleRow
            team="K9 Rescue"
            data={[
              "Dự phòng",
              "",
              "Dự phòng",
              "Huấn luyện",
              "",
              "Tuần tra",
              "Tuần tra",
            ]}
            color="orange"
          />
        </div>
      </div>
    </div>
  );
}

/* ================= SUB ================= */

function StatCard({ title, value, icon, green, gray }) {
  return (
    <div className={`stat-card ${green ? "green" : ""} ${gray ? "gray" : ""}`}>
      <div className="stat-icon">{icon}</div>
      <span>{title}</span>
      <h2>{value}</h2>
    </div>
  );
}

function TeamRow({ name, id, skill, members, status, mission }) {
  return (
    <div className="table-row">
      <div>
        <strong>{name}</strong>
        <p>ID: {id}</p>
      </div>

      <div>{skill}</div>

      <div>{members} nhân viên</div>

      <div>
        {status === "active" ? (
          <Tag color="green">ĐANG LÀM NHIỆM VỤ</Tag>
        ) : (
          <Tag>ĐANG NGHỈ</Tag>
        )}
      </div>

      <div className="mission">{mission}</div>

      <div className="actions">
        <Button size="small">Điều động</Button>
        <SettingOutlined />
      </div>
    </div>
  );
}

function ScheduleRow({ team, data, color }) {
  return (
    <div className="schedule-row">
      <strong>{team}</strong>
      {data.map((d, i) => (
        <div key={i} className={`shift ${color}`}>
          {d}
        </div>
      ))}
    </div>
  );
}
