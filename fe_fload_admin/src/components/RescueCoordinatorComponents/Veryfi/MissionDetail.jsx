import { Button, Input, Image } from "antd";
import { useState } from "react";
import { PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "./MissionDetail.css";

const IMAGE_BASE = "https://api-rescue.purintech.id.vn";

export default function MissionDetail({ mission }) {

  const [priority, setPriority] = useState(null);
  const navigate = useNavigate();

  if (!mission) {
    return (
      <div style={{ padding: 40 }}>
        Chọn yêu cầu bên trái
      </div>
    );
  }

  /* FIX IMAGE FIELD (KHÔNG ĐỔI LOGIC) */
  const images = mission.imageUrls || mission.images || [];

  return (
    <section className="rc-md">

      {/* HEADER */}
      <header className="rc-md__header">

        <div className="rc-md__header-info">

          <h2 className="request-title">
            Yêu cầu #{mission.id}

            <span className="status status-pending">
              CHỜ XÁC MINH
            </span>

          </h2>

          <p className="request-meta">
            Tiếp nhận lúc {new Date(mission.createdAt).toLocaleString()}
          </p>

        </div>

        <Button
          icon={<PhoneOutlined />}
          className="call-btn rc-md__action-call"
          href={`tel:${mission.phone}`}
        >
          GỌI XÁC MINH
        </Button>

      </header>

      <div className="divider" />

      <div className="detail-grid rc-md__content">

        {/* LEFT */}
        <div className="left-col">

          <section className="card">

            <h4 className="card-title">👤 THÔNG TIN NGƯỜI DÂN</h4>

            <div className="info-row">

              <div className="info-item">
                <label>HỌ VÀ TÊN</label>
                <strong>{mission.name}</strong>
              </div>

              <div className="info-item">
                <label>SỐ ĐIỆN THOẠI</label>
                <strong className="phone">{mission.phone}</strong>
              </div>

            </div>

            <label>ĐỊA CHỈ HIỆN TẠI</label>

            <p className="address-text">
              {mission.location}
            </p>

          </section>

          <section className="card">

            <h4 className="card-title">
              📋 TÌNH TRẠNG KHẨN CẤP
            </h4>

            <p className="quote">
              {mission.detailDescription}
            </p>

          </section>

          <section className="card">

            <h4 className="card-title">
              🧰 NGUỒN LỰC & MÔ TẢ
            </h4>

            <div className="resource-grid">

              <div className="resource-item">
                <label>SỐ NGƯỜI GẶP NẠN</label>
                <p>{mission.victimCount}</p>
              </div>

              <div className="resource-item">
                <label>DỤNG CỤ CỨU HỘ</label>
                <p>{mission.availableRescueTools}</p>
              </div>

            </div>

            <label>NHU CẦU ĐẶC BIỆT</label>
            <p>{mission.specialNeeds}</p>

          </section>

          <section className="map-card">

            <iframe
              title="map"
              src={`https://www.google.com/maps?q=${mission.lat},${mission.lng}&z=13&output=embed`}
            />

          </section>

        </div>

        {/* RIGHT */}
        <div className="right-col">

          {/* IMAGE */}
          <section className="card">

            <h4 className="card-title">
              📷 HÌNH ẢNH HIỆN TRƯỜNG
            </h4>

            <Image.PreviewGroup>

              <div className="image-grid">

                {images.length > 0 ? (

                  images.map((img, i) => (

                    <Image
                      key={i}
                      width={140}
                      src={`${IMAGE_BASE}${img}`}
                      alt={`rescue-${i}`}
                    />

                  ))

                ) : (

                  <p style={{ color: "#888" }}>
                    Không có hình ảnh
                  </p>

                )}

              </div>

            </Image.PreviewGroup>

          </section>

          {/* PRIORITY */}
          <section className="card rc-priority-card">

            <h4 className="card-title">
              ⚠️ PHÂN LOẠI ƯU TIÊN
            </h4>

            {/* P1 */}
            <div
              className={`rc-priority-item rc-p1 ${
                priority === "P1" ? "is-active" : ""
              }`}
              onClick={() => setPriority("P1")}
            >
              <span className="rc-radio" />

              <div className="rc-priority-content">
                <strong>KHẨN CẤP</strong>
                <p>Đe dọa tính mạng ngay lập tức</p>
              </div>
            </div>

            {/* P2 */}
            <div
              className={`rc-priority-item rc-p2 ${
                priority === "P2" ? "is-active" : ""
              }`}
              onClick={() => setPriority("P2")}
            >
              <span className="rc-radio" />

              <div className="rc-priority-content">
                <strong>CAO</strong>
                <p>Tình trạng nghiêm trọng, cần xử lý sớm</p>
              </div>
            </div>

            {/* P3 */}
            <div
              className={`rc-priority-item rc-p3 ${
                priority === "P3" ? "is-active" : ""
              }`}
              onClick={() => setPriority("P3")}
            >
              <span className="rc-radio" />

              <div className="rc-priority-content">
                <strong>THƯỜNG</strong>
                <p>Hỗ trợ tiếp tế hoặc cứu hộ không gấp</p>
              </div>
            </div>

          </section>

          {/* NOTE */}
          <section className="card">

            <h4 className="card-title">
              📝 GHI CHÚ XÁC MINH
            </h4>

            <Input.TextArea rows={4} />

          </section>

          {/* ACTION */}
          <Button
            className="confirm-btn"
            disabled={!priority}
            onClick={() =>
              navigate("/coordinator/dang", {
                state: { mission, priority }
              })
            }
          >
            ▶ XÁC NHẬN & CHUYỂN ĐIỀU PHỐI
          </Button>

          <p className="danger-text rc-md__action-flag">
            Đánh dấu yêu cầu giả mạo / Trùng lặp
          </p>

        </div>

      </div>

    </section>
  );
}