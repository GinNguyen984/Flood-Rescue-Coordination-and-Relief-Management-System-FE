import "./Banner.css";

const Banner = () => {
  return (
    <section className="hero-banner">
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot" />
          TRỰC TUYẾN 24/7 · SẴN SÀNG ỨNG CỨU
        </div>

        <h1 className="hero-title">
          MỌI NẺO ĐƯỜNG <br />
          <span>CHÚNG TÔI CÓ MẶT</span>
        </h1>

        <p className="hero-desc">
          Hệ thống điều phối cứu hộ thông minh đầu tiên tại Việt Nam.
          Kết nối đội cứu trợ gần nhất trong vòng 15 phút.
        </p>

        <div className="hero-actions">
          <button className="btn-emergency">
            ❗ GỬI YÊU CẦU CỨU TRỢ KHẨN CẤP
          </button>

          <button className="btn-outline">
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </section>
  );
};


export { Banner as default };

