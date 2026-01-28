import { useState } from "react";
import { Button, Tag, Drawer, Progress } from "antd";
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
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const teamsData = [
    {
      id: "TEAM-01",
      name: "ALPHA TEAM",
      skill: "Cứu hộ đường thủy",
      members: 12,
      status: "active",
      mission: "Sơ tán dân cư vùng B4",
      teamMembers: [
        { id: "MB-001", name: "Trần Minh Quân", role: "Đội trưởng", skill: "Lái cano", status: "active" },
        { id: "MB-002", name: "Phạm Văn Hùng", role: "Phó đội trưởng", skill: "Cứu hộ", status: "active" },
        { id: "MB-003", name: "Nguyễn Thị Hoa", role: "Y tá", skill: "Y tế cấp cứu", status: "active" },
        { id: "MB-004", name: "Lê Văn Sơn", role: "Nhân viên", skill: "Cứu hộ", status: "rest" },
        { id: "MB-005", name: "Võ Minh Tuấn", role: "Nhân viên", skill: "Lái cano", status: "active" },
        { id: "MB-006", name: "Đặng Thị Linh", role: "Nhân viên", skill: "Hỗ trợ", status: "active" },
        { id: "MB-007", name: "Hoàng Văn Khánh", role: "Kỹ sư", skill: "Thiết bị", status: "active" },
        { id: "MB-008", name: "Bùi Thị Ngọc", role: "Nhân viên", skill: "Cứu hộ", status: "active" },
        { id: "MB-009", name: "Tạ Văn Hải", role: "Nhân viên", skill: "Lái cano", status: "active" },
        { id: "MB-010", name: "Phan Thị Anh", role: "Y tá", skill: "Y tế cấp cứu", status: "active" },
        { id: "MB-011", name: "Ngô Văn Duy", role: "Nhân viên", skill: "Cứu hộ", status: "active" },
        { id: "MB-012", name: "Trương Thị Thu", role: "Nhân viên", skill: "Hỗ trợ", status: "active" },
      ],
    },
    {
      id: "TEAM-04",
      name: "MED-RESPONSE DELTA",
      skill: "Y tế hiện trường",
      members: 8,
      status: "rest",
      mission: "-",
      teamMembers: [
        { id: "MB-101", name: "Nguyễn Hữu Long", role: "Đội trưởng", skill: "Bác sĩ", status: "rest" },
        { id: "MB-102", name: "Trần Thị Liên", role: "Phó đội trưởng", skill: "Điều dưỡng trưởng", status: "rest" },
        { id: "MB-103", name: "Phạm Văn Thuận", role: "Bác sĩ", skill: "Y tế cấp cứu", status: "rest" },
        { id: "MB-104", name: "Bùi Thị Hương", role: "Điều dưỡng", skill: "Điều dưỡng", status: "rest" },
        { id: "MB-105", name: "Lý Văn Hạo", role: "Điều dưỡng", skill: "Điều dưỡng", status: "rest" },
        { id: "MB-106", name: "Nguyễn Thị Hạnh", role: "Y tá", skill: "Y tế", status: "rest" },
        { id: "MB-107", name: "Võ Quang Minh", role: "Nhân viên", skill: "Hỗ trợ y tế", status: "rest" },
        { id: "MB-108", name: "Trương Minh Nhật", role: "Nhân viên", skill: "Vận chuyển", status: "rest" },
      ],
    },
    {
      id: "TEAM-07",
      name: "TECH-RESCUE K9",
      skill: "Tìm kiếm & Cứu nạn",
      members: 15,
      status: "active",
      mission: "Quét radar khu vực sạt lở",
      teamMembers: [
        { id: "MB-201", name: "Đỗ Minh Trúc", role: "Đội trưởng", skill: "Chỉ huy", status: "active" },
        { id: "MB-202", name: "Ngô Văn Toàn", role: "Phó đội trưởng", skill: "Tìm kiếm", status: "active" },
        { id: "MB-203", name: "Phan Thị Loan", role: "Kỹ sư", skill: "Drone", status: "active" },
        { id: "MB-204", name: "Tạ Minh Châu", role: "Kỹ sư", skill: "Radar", status: "active" },
        { id: "MB-205", name: "Hồ Văn Hạnh", role: "Nhân viên", skill: "Tìm kiếm", status: "active" },
        { id: "MB-206", name: "Trần Ngọc Hà", role: "Nhân viên", skill: "Cứu hộ", status: "active" },
        { id: "MB-207", name: "Bùi Văn Lâm", role: "Nhân viên", skill: "Tìm kiếm", status: "active" },
        { id: "MB-208", name: "Nguyễn Thị Tuyến", role: "Nhân viên", skill: "Cứu hộ", status: "active" },
        { id: "MB-209", name: "Lê Quang Sáng", role: "Nhân viên", skill: "Tìm kiếm", status: "rest" },
        { id: "MB-210", name: "Phạm Thị Hương", role: "Nhân viên", skill: "Hỗ trợ", status: "active" },
        { id: "MB-211", name: "Võ Văn Tú", role: "Nhân viên", skill: "Tìm kiếm", status: "active" },
        { id: "MB-212", name: "Trương Ngọc Anh", role: "Nhân viên", skill: "Hỗ trợ", status: "active" },
        { id: "MB-213", name: "Đặng Văn Cường", role: "Nhân viên", skill: "Kỹ thuật", status: "active" },
        { id: "MB-214", name: "Ngô Thị Thu Thảo", role: "Nhân viên", skill: "Cứu hộ", status: "active" },
        { id: "MB-215", name: "Hoàng Minh Quốc", role: "Nhân viên", skill: "Cứu hộ", status: "active" },
      ],
    },
  ];

  const handleStatClick = (status) => {
    setFilterStatus(status);
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    setDrawerVisible(true);
  };

  const getTeamsByStatus = (status) => {
    if (status === "all") return teamsData;
    return teamsData.filter((t) => t.status === status);
  };

  const getStatValue = (status) => {
    if (status === "all") return teamsData.length;
    if (status === "active") return teamsData.filter((t) => t.status === "active").length;
    if (status === "rest") return teamsData.filter((t) => t.status === "rest").length;
    return 0;
  };

  const totalMembers = teamsData.reduce((sum, team) => sum + team.members, 0);

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
        <div onClick={() => handleStatClick("all")} style={{ cursor: "pointer" }}>
          <StatCard
            title="TỔNG SỐ ĐỘI"
            value={getStatValue("all")}
            icon={<TeamOutlined />}
            active={filterStatus === "all"}
          />
        </div>
        <div onClick={() => handleStatClick("active")} style={{ cursor: "pointer" }}>
          <StatCard
            title="ĐANG LÀM NHIỆM VỤ"
            value={getStatValue("active")}
            icon={<ThunderboltOutlined />}
            green
            active={filterStatus === "active"}
          />
        </div>
        <div onClick={() => handleStatClick("rest")} style={{ cursor: "pointer" }}>
          <StatCard
            title="ĐANG NGHỈ / DỰ PHÒNG"
            value={getStatValue("rest")}
            icon={<CoffeeOutlined />}
            gray
            active={filterStatus === "rest"}
          />
        </div>
        <StatCard
          title="NHÂN SỰ SẴN SÀNG"
          value={totalMembers}
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

        {getTeamsByStatus(filterStatus).map((team) => (
          <TeamRow
            key={team.id}
            {...team}
            onTeamClick={handleTeamClick}
          />
        ))}
      </div>

      {/* ================= DRAWER ================= */}
      <Drawer
        title={selectedTeam ? `👥 Chi tiết đội ${selectedTeam.name}` : "Chi tiết đội"}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={600}
      >
        {selectedTeam && <TeamDetailContent team={selectedTeam} />}
      </Drawer>

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

/* ================= SUB COMPONENTS ================= */

function StatCard({ title, value, icon, green, gray, active }) {
  return (
    <div className={`stat-card ${green ? "green" : ""} ${gray ? "gray" : ""} ${active ? "active" : ""}`}>
      <div className="stat-icon">{icon}</div>
      <span>{title}</span>
      <h2>{value}</h2>
    </div>
  );
}

function TeamRow({ id, name, skill, members, status, mission, teamMembers, onTeamClick }) {
  return (
    <div className="table-row" onClick={() => onTeamClick({ id, name, skill, members, status, mission, teamMembers })}>
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

function TeamDetailContent({ team }) {
  const activeMembers = team.teamMembers.filter((m) => m.status === "active").length;
  const restMembers = team.teamMembers.filter((m) => m.status === "rest").length;

  const roleGroups = {};
  team.teamMembers.forEach((member) => {
    if (!roleGroups[member.role]) {
      roleGroups[member.role] = [];
    }
    roleGroups[member.role].push(member);
  });

  return (
    <div className="team-detail">
      {/* ===== TEAM OVERVIEW ===== */}
      <div className="team-overview">
        <div className="overview-stat">
          <div className="stat-label">Chuyên môn</div>
          <div className="stat-value">{team.skill}</div>
        </div>
        <div className="overview-stat">
          <div className="stat-label">Tổng nhân viên</div>
          <div className="stat-value">{team.members}</div>
        </div>
        <div className="overview-stat">
          <div className="stat-label">Đang hoạt động</div>
          <div className="stat-value green">{activeMembers}</div>
        </div>
        <div className="overview-stat">
          <div className="stat-label">Đang nghỉ</div>
          <div className="stat-value orange">{restMembers}</div>
        </div>
      </div>

      {/* ===== MEMBER STATS ===== */}
      <div className="member-stats">
        <div className="stat-progress">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>
              Nhân sự sẵn sàng
            </span>
            <span style={{ fontSize: "12px", color: "#059669", fontWeight: "600" }}>
              {activeMembers}/{team.members}
            </span>
          </div>
          <Progress
            percent={(activeMembers / team.members) * 100}
            showInfo={false}
            strokeColor="#059669"
          />
        </div>
      </div>

      {/* ===== MEMBERS BY ROLE ===== */}
      <div className="members-section">
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: "600" }}>
          Danh sách thành viên ({team.members})
        </h3>

        {Object.entries(roleGroups).map(([role, members]) => (
          <div key={role} style={{ marginBottom: "20px" }}>
            <div
              style={{
                padding: "10px 12px",
                backgroundColor: "#f1f5f9",
                borderRadius: "8px",
                marginBottom: "12px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#475569",
              }}
            >
              {role} ({members.length})
            </div>

            {members.map((member) => (
              <div
                key={member.id}
                style={{
                  padding: "12px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: member.status === "active" ? "#f0fdf4" : "#fef2f2",
                }}
              >
                <div>
                  <strong style={{ fontSize: "13px" }}>{member.name}</strong>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "11px",
                      color: "#64748b",
                    }}
                  >
                    {member.skill} • {member.id}
                  </p>
                </div>
                <Tag color={member.status === "active" ? "green" : "orange"}>
                  {member.status === "active" ? "SẴN SÀNG" : "NGHỈ"}
                </Tag>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ===== TEAM MISSION ===== */}
      {team.mission !== "-" && (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "8px",
            marginTop: "16px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#0284c7", fontWeight: "600", marginBottom: "6px" }}>
            🎯 Nhiệm vụ hiện tại
          </div>
          <div style={{ fontSize: "13px", color: "#1e40af" }}>{team.mission}</div>
        </div>
      )}
    </div>
  );
}
