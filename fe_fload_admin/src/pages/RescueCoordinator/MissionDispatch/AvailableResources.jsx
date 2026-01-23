import { Button } from "antd";

export default function AvailableResources() {
  return (
    <section className="resource-panel">
      <h4>ĐỘI CỨU HỘ & PHƯƠNG TIỆN SẴN SÀNG</h4>

      <div className="teams">
        <div className="team active">
          <strong>Rescue Team RT-01</strong>
          <p>Cứu hộ mặt nước</p>
          <span>📍 1.2km</span>
        </div>

        <div className="team">
          <strong>Rescue Team RT-04</strong>
          <p>Tìm kiếm & Sơ cứu</p>
          <span>📍 2.5km</span>
        </div>
      </div>

      <div className="vehicles">
        <div>🚤 Cano (04)</div>
        <div>🚑 Ambulance (02)</div>
        <div>🚁 Helicopter (01)</div>
        <div>🛰 Drone (06)</div>
      </div>

      <Button type="primary" size="large" block>
        ▶ TIẾN HÀNH ĐIỀU ĐỘNG
      </Button>
    </section>
  );
}
