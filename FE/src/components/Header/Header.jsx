import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* LEFT - LOGO */}
        <div className="header-logo">
          <img
            src="/logo.png"
            alt="Cứu hộ Việt Nam"
          />
        </div>

        {/* CENTER - MENU */}
        <nav className="header-menu">
          <a href="#">TRA CỨU</a>
          <a href="#">CẨM NANG</a>
          <a href="#">LIÊN HỆ</a>
          <a href="#">BẢN ĐỒ</a>
        </nav>

        {/* RIGHT - SEARCH + HOTLINE + BUTTON */}
        <div className="header-actions">
          <div className="search-box">
            <input placeholder="Tìm kiếm cứu trợ..." />
          </div>

          <div className="hotline">
            <span>HOTLINE 24/7</span>
            <strong>1900 8888</strong>
          </div>

          <button className="call-btn">
            📞 GỌI NGAY
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
