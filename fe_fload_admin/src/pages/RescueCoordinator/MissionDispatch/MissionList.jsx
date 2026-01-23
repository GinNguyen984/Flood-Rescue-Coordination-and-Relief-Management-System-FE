import { Tag } from "antd";

const missions = [
  {
    id: "RQ-8821",
    level: "urgent",
    title: "Tai nạn đường thủy",
    location: "Cầu Rồng, Đà Nẵng",
    lat: 16.0604,
    lng: 108.2246,
    wait: "02:45",
    sla: "02:15",
  },
  {
    id: "RQ-8825",
    level: "medium",
    title: "Hỗ trợ y tế khẩn cấp",
    location: "Biển Mỹ Khê",
    lat: 16.0596,
    lng: 108.2469,
    wait: "08:12",
    sla: "06:48",
  },
];

export default function MissionList() {
  return (
    <aside className="mission-list">
      <div className="list-header">
        <h4>YÊU CẦU MỚI (4)</h4>
        <Tag color="red">LIVE</Tag>
      </div>

      {missions.map((m) => (
        <div key={m.id} className={`mission-card ${m.level}`}>
          <div className="card-top">
            <Tag color={m.level === "urgent" ? "red" : "gold"}>
              {m.level === "urgent" ? "CẤP BÁCH" : "TRUNG BÌNH"}
            </Tag>
            <span>{m.id}</span>
          </div>

          <h5>{m.title}</h5>
          <p>📍 {m.location}</p>

          <div className="card-footer">
            <span>⏱ {m.wait} chờ</span>
            <span>SLA: {m.sla}</span>
          </div>
        </div>
      ))}
    </aside>
  );
}
