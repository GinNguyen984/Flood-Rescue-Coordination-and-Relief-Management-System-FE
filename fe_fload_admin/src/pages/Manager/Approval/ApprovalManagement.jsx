import {
    Button,
    Tag,
    Input,
    Progress,
    Tooltip,
  } from "antd";
  import {
    TruckOutlined,
    CloseOutlined,
    CheckOutlined,
    ExclamationCircleOutlined,
    LeftOutlined,
    RightOutlined,
    DropboxOutlined,
  } from "@ant-design/icons";
  import "./ApprovalManagement.css";
  
  export default function ApprovalDispatch() {
    return (
      <div className="dispatch-page">
        {/* ================= PROGRESS ================= */}
        <div className="dispatch-progress">
          <div className="progress-header">
            <div className="title">
              <TruckOutlined />
              <strong>Tiến độ vận chuyển vật tư đã duyệt</strong>
            </div>
            <span className="done">12/15 yêu cầu đã hoàn tất</span>
          </div>
  
          <Progress
            percent={80}
            showInfo={false}
            strokeColor={{
              "0%": "#22c55e",
              "60%": "#22c55e",
              "85%": "#3b82f6",
              "100%": "#fbbf24",
            }}
          />
  
          <div className="progress-legend">
            <span className="green">● Hoàn tất (60%)</span>
            <span className="blue">● Đang đi (25%)</span>
            <span className="yellow">● Chuẩn bị (10%)</span>
          </div>
        </div>
  
        {/* ================= TABLE ================= */}
        <div className="dispatch-table">
          <div className="table-header">
            <h3>Danh sách yêu cầu chờ xử lý</h3>
            <div className="filter">
              <Button> Tất cả </Button>
              <Button danger> Khẩn cấp (3) </Button>
            </div>
          </div>
  
          <div className="table-head">
            <span>ĐƠN VỊ YÊU CẦU</span>
            <span>VẬT TƯ & SỐ LƯỢNG</span>
            <span>ƯU TIÊN</span>
            <span>LÝ DO CẤP PHÁT</span>
            <span>GHI CHÚ MANAGER</span>
            <span>THAO TÁC</span>
          </div>
  
          {/* ROW 1 */}
          <Row
            unit="Đội Cứu hộ Quận 8"
            requester="Nguyễn Văn A"
            item="Nước uống đóng chai"
            quantity="500 Lít"
            priority="KHẨN CẤP"
            reason="Khu vực Cầu Chữ Y đang bị cô lập hoàn toàn, người dân thiếu nước sạch trầm trọng 24h qua."
            icon="💧"
          />
  
          {/* ROW 2 */}
          <Row
            unit="Trạm Y tế Phường 15"
            requester="BS. Lê Thị B"
            item="Túi sơ cứu loại A"
            quantity="20 Bộ"
            priority="CAO"
            reason="Bổ sung cơ số thuốc cho trạm dã chiến sơ cứu vết thương."
            icon="➕"
          />
  
          {/* ROW 3 */}
          <Row
            unit="Nhóm Tình nguyện Xanh"
            requester="Trần Văn C"
            item="Lương thực khô"
            quantity="100 Gói"
            priority="TRUNG BÌNH"
            reason="Dự phòng cho lực lượng tình nguyện viên đi phát quà cứu trợ vùng sâu."
            icon="🍚"
          />
  
          <div className="table-footer">
            <span>ĐANG XEM 3 TRÊN 08 YÊU CẦU CHỜ XỬ LÝ</span>
            <div>
              <Button icon={<LeftOutlined />} />
              <Button icon={<RightOutlined />} />
            </div>
          </div>
        </div>
  
        {/* ================= BOTTOM ================= */}
        <div className="dispatch-bottom">
          <div className="inventory-summary">
            <h4>TỒN KHO VẬT TƯ THIẾT YẾU HIỆN TẠI</h4>
  
            <div className="summary-cards">
              <SummaryCard title="NƯỚC UỐNG" value="12,400 L" />
              <SummaryCard title="LƯƠNG THỰC" value="2,150 Gói" warning />
              <SummaryCard title="Y TẾ (BỘ A)" value="480 Bộ" />
            </div>
          </div>
  
          <div className="urgent-box">
            <h4>CẦN PHÊ DUYỆT NGAY</h4>
            <strong>03</strong>
            <p>
              Yêu cầu mức <b>“Khẩn cấp”</b> từ các tâm điểm ngập lụt.
            </p>
            <Button block>Xem tất cả ưu tiên</Button>
          </div>
        </div>
      </div>
    );
  }
  
  /* ================= SUB ================= */
  
  function Row({
    unit,
    requester,
    item,
    quantity,
    priority,
    reason,
    icon,
  }) {
    return (
      <div className="table-row">
        <div>
          <strong>{unit}</strong>
          <p>Yêu cầu bởi: {requester}</p>
        </div>
  
        <div className="item">
          <span className="item-icon">{icon}</span>
          <div>
            <strong>{item}</strong>
            <p>{quantity}</p>
          </div>
        </div>
  
        <div>
          <Tag
            color={
              priority === "KHẨN CẤP"
                ? "red"
                : priority === "CAO"
                ? "orange"
                : "default"
            }
          >
            {priority}
          </Tag>
        </div>
  
        <Tooltip title={reason}>
          <p className="reason">"{reason}"</p>
        </Tooltip>
  
        <Input placeholder="Nhập ghi chú..." />
  
        <div className="actions">
          <CloseOutlined className="reject" />
          <Button type="primary" icon={<CheckOutlined />}>
            Phê duyệt
          </Button>
        </div>
      </div>
    );
  }
  
  function SummaryCard({ title, value, warning }) {
    return (
      <div className={`summary-card ${warning ? "warning" : ""}`}>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
    );
  }
  