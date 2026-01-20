import "./RescueSidebar.css";

const RescueSidebar = () => {
  return (
    <aside className="sidebar">
      <input
        className="search"
        placeholder="Tìm kiếm địa điểm, đội cứu hộ..."
      />

      <div className="filters">
        <button className="active">Tất cả</button>
        <button>Đang rảnh</button>
        <button>Khẩn cấp</button>
      </div>

      <h4>ĐỘI CỨU HỘ GẦN NHẤT</h4>

      <div className="team-card active">
        <h5>Đội Phản ứng Nhanh Sài Gòn</h5>
        <span className="status green">SẴN SÀNG</span>
        <p>Cách 1.2km · 5 thành viên</p>
        <button>Liên hệ</button>
      </div>

      <div className="alert-card">
        <h5>⚠ ĐANG CẦN CỨU TRỢ GẤP</h5>
        <p>Số 45 Lý Tự Trọng</p>
        <button>XEM CHI TIẾT</button>
      </div>
    </aside>
  );
};

export default RescueSidebar;
