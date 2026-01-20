import EmergencyHeader from "../../components/EmergencyHeader/EmergencyHeader";
import EmergencyFooter from "../../components/EmergencyFooter/EmergencyFooter";
import "./EmergencyRequest.css";

const EmergencyRequest = () => {
  return (
    <>
      <EmergencyHeader />

      <main className="emergency-page">
        <div className="emergency-container">
          {/* LEFT FORM */}
          <section className="emergency-form">
            <h2>GỬI YÊU CẦU CỨU TRỢ</h2>
            <p className="sub">
              Thông tin của bạn sẽ được chuyển ngay đến lực lượng cứu hộ gần nhất.
            </p>

            <div className="form-row">
              <div className="form-group">
                <label>SỐ ĐIỆN THOẠI LIÊN HỆ *</label>
                <input placeholder="09xx xxx xxx" />
              </div>

              <div className="form-group">
                <label>LOẠI SỰ CỐ *</label>
                <select>
                  <option>Chọn loại sự cố</option>
                  <option>Tai nạn giao thông</option>
                  <option>Y tế khẩn cấp</option>
                  <option>Thiên tai</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>MÔ TẢ TÌNH HÌNH HIỆN TẠI</label>
              <textarea placeholder="Ví dụ: Nhà có 2 người già đang kẹt trên tầng 2..." />
            </div>

            <div className="location-box">
              <div>
                <strong>📍 VỊ TRÍ CỦA BẠN</strong>
                <p>Chúng tôi cần tọa độ để đội cứu hộ tìm thấy bạn.</p>
              </div>
              <button className="btn-yellow">LẤY VỊ TRÍ HIỆN TẠI</button>
            </div>

            <div className="upload-box">
              <p>📷 HÌNH ẢNH HIỆN TRƯỜNG (NẾU CÓ)</p>
              <span>Nhấn để chụp hoặc tải ảnh (JPG, PNG)</span>
            </div>

            <button className="submit-btn">
              GỬI YÊU CẦU CỨU TRỢ →
            </button>
          </section>

          {/* RIGHT INFO */}
          <aside className="emergency-info">
            <div className="help-box">
              <h3>🚨 CẦN HỖ TRỢ NGAY?</h3>

              <div className="hotline red">113 – CẢNH SÁT</div>
              <div className="hotline orange">114 – CỨU HỎA</div>
              <div className="hotline green">115 – CẤP CỨU</div>
            </div>

            <div className="note-box">
              <h4>LƯU Ý QUAN TRỌNG</h4>
              <ul>
                <li>Giữ điện thoại luôn bật.</li>
                <li>Nếu có thể hãy di chuyển đến nơi an toàn.</li>
                <li>Thông tin được bảo mật tuyệt đối.</li>
              </ul>
            </div>

            <div className="stat-box">
              <strong>1,248+</strong>
              <span>Yêu cầu đã được xử lý trong 24h qua</span>
            </div>
          </aside>
        </div>
      </main>

      <EmergencyFooter />
    </>
  );
};

export default EmergencyRequest;
