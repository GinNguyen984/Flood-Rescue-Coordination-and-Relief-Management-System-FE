import { Input, Button, Tag } from "antd";
import "./RescueHistory.css";

const RescueHistory = () => {
  return (
    <div className="sidebar-top">
      <h3 className="title">⏱️ TRA CỨU LỊCH SỬ CỨU HỘ</h3>

      <div className="history-input">
        <Input placeholder="Nhập số điện thoại..." />
        <Button type="primary">Tra cứu</Button>
      </div>

      <HistoryCard
        code="#CH-9821"
        status="Hoàn thành"
        color="green"
        time="12/10/2023 14:30"
        desc="Hỗ trợ vận chuyển vật phẩm thiết yếu tại Quận 1..."
      />

      <HistoryCard
        code="#CH-9855"
        status="Đang xử lý"
        color="orange"
        time="Hôm nay, 09:15"
        desc="Cấp cứu y tế khẩn cấp, cán xe lăn tại đường Lê Lợi."
      />
    </div>
  );
};

export default RescueHistory;

/* ===== COMPONENT ===== */

function HistoryCard({ code, status, color, time, desc }) {
  return (
    <div className={`history-card ${color}`}>
      <div className="history-header">
        <span>Mã: {code}</span>
        <Tag color={color}>{status}</Tag>
      </div>
      <p className="time">{time}</p>
      <p className="desc">{desc}</p>
    </div>
  );
}
