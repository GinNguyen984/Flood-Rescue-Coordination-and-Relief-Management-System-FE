import "./EmergencyHeader.css";

const EmergencyHeader = () => {
  return (
    <header className="emergency-header">
      <div className="logo">✱ CỨU HỘ KHẨN CẤP</div>

      <nav>
        <a>TRANG CHỦ</a>
        <a>BẢN ĐỒ CỨU TRỢ</a>
        <a>HƯỚNG DẪN</a>
      </nav>

      <button className="hotline-btn">📞 HOTLINE: 1800-1111</button>
    </header>
  );
};

export default EmergencyHeader;
