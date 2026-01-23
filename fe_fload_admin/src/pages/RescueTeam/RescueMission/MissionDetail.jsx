import { Button, Upload } from "antd";
import { UploadOutlined, CameraOutlined } from "@ant-design/icons";
import "./MissionDetail.css";

export default function MissionDetail() {
  return (
    <div className="mission-detail">
      {/* ===== STATUS ===== */}
      <div className="detail-card">
        <h4>CẬP NHẬT TRẠNG THÁI</h4>

        <Button type="primary" size="large" block>
          📍 Xác nhận đã đến hiện trường
        </Button>

        <div className="detail-actions">
          <Button>Yêu cầu hỗ trợ</Button>
          <Button danger>Hủy nhiệm vụ</Button>
        </div>
      </div>

      {/* ===== INFO ===== */}
      <div className="detail-card">
        <h4>THÔNG TIN CHI TIẾT</h4>

        <p>
          <strong>Người liên hệ:</strong> Nguyễn Văn A – 0901xxxxxx
        </p>
        <p>
          <strong>Loại tai nạn:</strong> Va chạm xe máy
        </p>
        <p className="note">
          “Hiện trường đông người, nạn nhân bị thương ở chân. Cần sơ cứu nhanh
          trước khi xe cứu thương đến.”
        </p>
      </div>
      {/* ===== REPORT ===== */}
      <div className="detail-card">
        <h4>BÁO CÁO KẾT QUẢ</h4>

        <div className="upload-box">
          <Upload listType="picture-card">
            <div className="upload-placeholder">
              <CameraOutlined />
              <span>Tải lên</span>
            </div>
          </Upload>
        </div>

        <textarea
          className="report-text"
          placeholder="Nhập tóm tắt quá trình cứu hộ và tình trạng nạn nhân..."
        />

        <Button className="success-btn" block>
          ▶ Hoàn thành & Gửi báo cáo
        </Button>
      </div>


    </div>
  );
}
