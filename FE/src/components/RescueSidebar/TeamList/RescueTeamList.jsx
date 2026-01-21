import { Input, Select, Button, Tag } from "antd";
import "./RescueTeamList.css";

const { Option } = Select;

const RescueTeamList = () => {
  return (
    <>
      {/* FIXED FILTER */}
      <div className="sidebar-fixed">
        <Input
          placeholder="🔍 Tìm kiếm đội cứu hộ..."
          className="search-team"
        />

        <div className="dropdowns">
          <Select defaultValue="all">
            <Option value="all">Tất cả khu vực</Option>
          </Select>
          <Select defaultValue="type">
            <Option value="type">Loại cứu hộ</Option>
          </Select>
        </div>

        <div className="chips">
          <Button type="primary" shape="round">
            Tất cả
          </Button>
          <Button shape="round">Đang rảnh</Button>
          <Button shape="round">Gần nhất</Button>
        </div>

        <h4 className="section-title">ĐỘI CỨU HỘ GẦN NHẤT (24)</h4>
      </div>

      {/* SCROLL LIST */}
      <div className="team-list-scroll">
        <TeamCard
          name="Đội Phản ứng Nhanh Sài Gòn"
          specialty="Y tế, Sơ cứu"
          distance="1.2 km"
          members="5 người"
          free
        />

        <TeamCard
          name="Cứu hộ Thủy nạn Miền Nam"
          specialty="Xuồng máy, cứu nạn"
          distance="3.5 km"
          eta="15p"
          busy
        />
      </div>
    </>
  );
};

export default RescueTeamList;

/* ===== COMPONENT ===== */

function TeamCard({
  name,
  specialty,
  distance,
  members,
  eta,
  free,
  busy,
}) {
  return (
    <div className="team-card">
      <div className="team-header">
        <h5>{name}</h5>
        {free && <Tag color="green">RẢNH</Tag>}
        {busy && <Tag color="default">ĐANG BẬN</Tag>}
      </div>

      <p className="specialty">{specialty}</p>

      <div className="team-meta">
        <span>📍 {distance}</span>
        {members && <span>👥 {members}</span>}
        {eta && <span className="eta">⏱️ {eta}</span>}
      </div>

      {free && (
        <div className="team-actions">
          <Button type="primary" block>
            Liên hệ ngay
          </Button>
        </div>
      )}
    </div>
  );
}
