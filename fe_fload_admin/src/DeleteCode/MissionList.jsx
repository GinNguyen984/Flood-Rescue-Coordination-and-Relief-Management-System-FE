import { Button } from "antd";
import "./MissionList.css";

export default function MissionList() {
  return (
    <aside className="mission-list">
      {/* HEADER */}
      <div className="mission-header">
        <h2>Nhiệm vụ mới</h2>
        <span className="count">2 active</span>
      </div>

      {/* TABS */}
      <div className="mission-tabs">
        <button className="tab active">Chưa nhận</button>
        <button className="tab">Đã nhận</button>
      </div>

      {/* ===== CARD 1: ƯU TIÊN CAO ===== */}
      <div className="mission-card urgent">
        <div className="mission-top">
          <span className="priority high">ƯU TIÊN: CAO</span>
          <span className="time">5 phút trước</span>
        </div>

        <h3>Cấp cứu Y tế - Quận 1</h3>

        <p className="location">
          📍 123 Lê Lợi, P. Bến Thành
        </p>

        <div className="mission-footer">
          <span className="id">ID: MS-2023-082</span>

          <div className="actions">
            <Button size="small" className="btn-secondary">
              Chi tiết
            </Button>
            <Button size="small" type="primary">
              Chấp nhận
            </Button>
          </div>
        </div>
      </div>

      {/* ===== CARD 2: ĐANG XỬ LÝ ===== */}
      <div className="mission-card processing selected">
        <div className="mission-top">
          <span className="priority processing">ĐANG XỬ LÝ</span>
          <span className="time">12 phút trước</span>
        </div>

        <h3>Tai nạn giao thông - Q.3</h3>

        <p className="location">
          📍 45 Võ Văn Tần, P.6
        </p>

        <div className="mission-footer">
          <span className="id">ID: MS-2023-079</span>
          <span className="status">Đang chọn</span>
        </div>
      </div>

      {/* ===== CARD 3: TRUNG BÌNH ===== */}
      <div className="mission-card muted">
        <div className="mission-top">
          <span className="priority medium">ƯU TIÊN: TRUNG BÌNH</span>
          <span className="time">45 phút trước</span>
        </div>

        <h3>Hỗ trợ ngập lụt - Q.8</h3>

        <p className="location">
          📍 KDC Bình Điền
        </p>

        <div className="mission-footer">
          <span className="id">ID: MS-2023-071</span>
          <span className="status muted">Chờ xử lý</span>
        </div>
      </div>
    </aside>
  );
}
