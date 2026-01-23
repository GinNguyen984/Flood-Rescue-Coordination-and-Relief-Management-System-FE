import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmergencyHeader from "../../components/EmergencyHeader/EmergencyHeader";
import EmergencyFooter from "../../components/EmergencyFooter/EmergencyFooter";

import {
  Input,
  Select,
  Checkbox,
  Button,
  Upload,
  message,
} from "antd";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  UploadOutlined,
  WarningOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./EmergencyRequest.css";

const { TextArea } = Input;
const { Option } = Select;

const EmergencyRequest = () => {
  const [gps, setGps] = useState(null);
  const [address, setAddress] = useState("");
  const [loadingGPS, setLoadingGPS] = useState(false);
  const navigate = useNavigate();

  

  const GOOGLE_API_KEY = "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao";

  const handleGetGPS = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ GPS");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
  
        setGps({ lat: latitude, lng: longitude });
  
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=vi`
          );
          const data = await res.json();
  
          if (data.display_name) {
            setAddress(data.display_name);
          } else {
            setAddress("Không xác định được địa chỉ");
          }
        } catch (err) {
          setAddress("Không thể lấy địa chỉ từ GPS");
        }
      },
      () => alert("Không thể lấy vị trí hiện tại"),
      { enableHighAccuracy: true }
    );
  };
  
  

  return (
    <>
      <EmergencyHeader />

      <main className="emergency-page">
        <div className="emergency-container">
          {/* ================= LEFT FORM ================= */}
          <section className="emergency-form">
            {/* <div className="emergency-badge">
              🔴 MẶC ĐỊNH: CHẾ ĐỘ KHẨN CẤP CAO
            </div> */}

            <h2>BIỂU MẪU CỨU TRỢ CHI TIẾT</h2>
            <p className="sub">
              Hệ thống tiếp nhận thông tin trực tiếp cho đội cứu hộ hiện trường.
            </p>

            {/* ===== 1 ===== */}
            <div className="form-section section-1">
              <h4>
                <UserOutlined /> 1. THÔNG TIN NGƯỜI GỬI YÊU CẦU
              </h4>

              <label>HỌ VÀ TÊN NGƯỜI GỬI *</label>
              <Input placeholder="Nhập đầy đủ họ tên để đội cứu hộ dễ xưng hô" />

              <div className="form-row">
                <div>
                  <label>SỐ ĐIỆN THOẠI CHÍNH *</label>
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="09xx xxx xxx"
                  />
                </div>
                <div>
                  <label>SỐ ĐIỆN THOẠI DỰ PHÒNG</label>
                  <Input placeholder="Người thân hoặc người đi cùng" />
                </div>
              </div>
            </div>

            {/* ===== 2 ===== */}
           {/* ===== 2. LOẠI SỰ CỐ & TÌNH TRẠNG HIỆN TRƯỜNG ===== */}
<div className="form-section section-2">
  <h4 className="section-title">
    ⚠️ 2. LOẠI SỰ CỐ & TÌNH TRẠNG HIỆN TRƯỜNG
  </h4>

  {/* Loại sự cố */}
  <label className="field-label">
    LOẠI SỰ CỐ CHÍNH *
  </label>
  <Select
    className="full-width"
    placeholder="Chọn loại sự cố"
  >
    <Option value="medical">Y tế khẩn cấp</Option>
    <Option value="fire">Cháy nổ</Option>
    <Option value="accident">Tai nạn giao thông</Option>
    <Option value="flood">Thiên tai / Ngập lụt</Option>
  </Select>

  {/* Tình trạng cụ thể */}
  <label className="field-label mt">
    TÌNH TRẠNG CỤ THỂ (CHỌN NHANH CÁC MỤC ÁP DỤNG) *
  </label>

  <div className="checkbox-grid">
    <Checkbox>Ngập lụt nặng</Checkbox>
    <Checkbox>Cháy nổ</Checkbox>
    <Checkbox>Sạt lở</Checkbox>

    <Checkbox>Có người bị thương</Checkbox>
    <Checkbox>Có người già / trẻ nhỏ</Checkbox>
    <Checkbox>Mất điện / liên lạc</Checkbox>
  </div>
</div>


           {/* ===== 3. VỊ TRÍ CHÍNH XÁC ===== */}
{/* ===== 3. VỊ TRÍ CHÍNH XÁC ===== */}
<div className="form-section section-3">
  <h4>📍 3. VỊ TRÍ CHÍNH XÁC</h4>

  <div className="location-grid">
    {/* LEFT */}
    <div className="location-left">
      <label>ĐỊA CHỈ HIỆN TẠI *</label>
      <Input
        placeholder="Địa chỉ sẽ tự động điền theo GPS"
        value={address}
        readOnly
      />

      <label>GHI CHÚ ĐIỂM NHẬN DẠNG</label>
      <Input placeholder="Gần cây đa, đối diện tiệm thuốc..." />

      <Button
  type="primary"
  className="gps-locate-btn"
  loading={loadingGPS}
  onClick={handleGetGPS}
>
  🎯 LẤY TỌA ĐỘ GPS HIỆN TẠI
</Button>

    </div>

    {/* RIGHT MAP */}
    <div className="location-map">
      <iframe
        title="google-map"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
        src={
          gps
            ? `https://www.google.com/maps?q=${gps.lat},${gps.lng}&z=16&output=embed`
            : `https://www.google.com/maps?q=10.8231,106.6297&z=12&output=embed`
        }
        allowFullScreen
      />
    </div>
  </div>
</div>



            {/* ===== 4 ===== */}
            <div className="form-section section-4">
              <h4>🧰 4. NGUỒN LỰC & MÔ TẢ CHI TIẾT</h4>

              <div className="form-row">
                <div>
                  <label>SỐ LƯỢNG NGƯỜI GẶP NẠN</label>
                  <Input placeholder="Ví dụ: 3" />
                </div>
                <div>
                  <label>DỤNG CỤ CỨU HỘ HIỆN CÓ</label>
                  <Input placeholder="Gậy, dây thừng, phao..." />
                </div>
              </div>

              <label>NHU CẦU ĐẶC BIỆT</label>
              <Input placeholder="Thuốc men, thực phẩm cho trẻ nhỏ..." />

              <label>MÔ TẢ CHI TIẾT *</label>
              <TextArea rows={4} />
            </div>

            {/* ===== 5 ===== */}
            <div className="form-section section-5">
  <h4>📷 5. HÌNH ẢNH HIỆN TRƯỜNG</h4>

  <Upload
    listType="picture"
    multiple
    className="emergency-upload"
  >
    <div className="upload-dropzone">
      <UploadOutlined className="upload-icon" />
      <p className="upload-title">
        TẢI ẢNH HIỆN TRƯỜNG
      </p>
      <span className="upload-sub">
        Nhấn để chụp hoặc tải ảnh (JPG, PNG)
      </span>
    </div>
  </Upload>
</div>


<Button
  className="submit-btn"
  block
  onClick={() => navigate("/map")}
>
  GỬI YÊU CẦU CỨU TRỢ NGAY →
</Button>

          </section>

          {/* ================= RIGHT ================= */}
          <aside className="emergency-info">
            <div className="hotline-box">
              <h3>📞 HOTLINE KHẨN CẤP</h3>
              <div className="hotline red">113 – CẢNH SÁT</div>
              <div className="hotline orange">114 – CỨU HỎA</div>
              <div className="hotline green">115 – CẤP CỨU</div>
            </div>

            <div className="note-box">
              <h4>HƯỚNG DẪN AN TOÀN</h4>
              <ul>
                <li>Giữ điện thoại luôn bật.</li>
                <li>Di chuyển đến nơi an toàn.</li>
                <li>Dùng đèn pin hoặc vật sáng.</li>
              </ul>
            </div>

            <div className="status-box">
              🟢 HỆ THỐNG ĐANG HOẠT ĐỘNG
              <span>Cập nhật: 1 phút trước</span>
            </div>
          </aside>
        </div>
      </main>

      <EmergencyFooter />
    </>
  );
};

export default EmergencyRequest;
