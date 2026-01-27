import "./MissionQuickNotify.css";

const data = [
  {
    text:
      "Điều phối viên A: Đã điều thêm xe chữa cháy đến Quận 1",
    time: "10:45 AM",
    type: "warn",
  },
  {
    text:
      "Hệ thống: Thời tiết xấu đang di chuyển về phía Tây Bắc",
    time: "10:30 AM",
    type: "info",
  },
  {
    text:
      "Team B: Đã hoàn thành nhiệm vụ #REQ-9915",
    time: "10:15 AM",
    type: "success",
  },
];

export default function MissionQuickNotify() {
  return (
    <section className="rm-notify">
      <h4>Thông báo nhanh</h4>

      {data.map((n, i) => (
        <div
          key={i}
          className={`rm-notify-item ${n.type}`}
        >
          <p>{n.text}</p>
          <span>{n.time}</span>
        </div>
      ))}

      <div className="rm-notify-more">
        Xem tất cả thông báo →
      </div>
    </section>
  );
}
