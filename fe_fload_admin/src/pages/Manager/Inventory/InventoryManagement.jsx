import { Button, Tag, Progress, Select } from "antd";
import {
  PlusOutlined,
  ExportOutlined,
  EditOutlined,
  HistoryOutlined,
  DropboxOutlined,
  DollarOutlined,
  WarningOutlined,
  SwapOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./InventoryManagement.css";

const items = [
  {
    code: "#VT-G001",
    name: "Gạo tẻ ST25",
    category: "Lương thực",
    quantity: 450,
    unit: "kg",
    status: "low",
    icon: "🍚",
  },
  {
    code: "#VT-M012",
    name: "Paracetamol 500mg",
    category: "Y tế",
    quantity: 1500,
    unit: "hộp",
    status: "ok",
    icon: "💊",
  },
  {
    code: "#VT-E005",
    name: "Áo phao cứu sinh",
    category: "Thiết bị",
    quantity: 120,
    unit: "chiếc",
    status: "ok",
    icon: "🦺",
  },
  {
    code: "#VT-W221",
    name: "Nước sạch đóng chai 5L",
    category: "Nhu yếu phẩm",
    quantity: 85,
    unit: "bình",
    status: "low",
    icon: "💧",
  },
];

export default function InventoryManagement() {
  return (
    <div className="inventory-page">
      {/* ================= HEADER ================= */}
      <div className="inventory-header">
        <div>
         
          <h2>Quản lý Kho & Vật tư</h2>
        </div>

        <div className="header-actions">
          <Button icon={<ExportOutlined />}>Xuất báo cáo</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Nhập kho mới
          </Button>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="inventory-stats">
        <StatCard
          icon={<DropboxOutlined />}
          title="TỔNG MẶT HÀNG"
          value="1,248"
          note="+2.4%"
        />
        <StatCard
          icon={<DollarOutlined />}
          title="TỔNG GIÁ TRỊ KHO"
          value="1.25B"
          suffix="VND"
        />
        <StatCard
          icon={<WarningOutlined />}
          title="MẶT HÀNG SẮP HẾT"
          value="05"
          alert
        />
        <StatCard
          icon={<SwapOutlined />}
          title="GIAO DỊCH (24H)"
          value="42"
          note="+12"
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="inventory-table">
        <div className="table-filter">
          <div className="tabs">
            <span className="active">Tất cả vật tư</span>
            <span>Lương thực</span>
            <span>Y tế</span>
            <span>Thiết bị</span>
          </div>

          <Select defaultValue="all">
            <Select.Option value="all">Trạng thái: Tất cả</Select.Option>
            <Select.Option value="ok">Còn hàng</Select.Option>
            <Select.Option value="low">Sắp hết</Select.Option>
          </Select>
        </div>

        <div className="table-head">
          <span>MÃ VẬT TƯ</span>
          <span>TÊN VẬT TƯ</span>
          <span>DANH MỤC</span>
          <span>TỒN KHO</span>
          <span>ĐƠN VỊ</span>
          <span>TRẠNG THÁI</span>
          <span>THAO TÁC</span>
        </div>

        {items.map((item) => (
          <div className="table-row" key={item.code}>
            <div className="code">{item.code}</div>

            <div className="item-info">
              <div className="item-icon">{item.icon}</div>
              <strong>{item.name}</strong>
            </div>

            <div className="category">{item.category}</div>

            <div className="stock">
              <span className={item.status === "low" ? "low" : ""}>
                {item.quantity}
              </span>
              <Progress
                percent={item.status === "low" ? 30 : 80}
                showInfo={false}
                strokeColor={item.status === "low" ? "#fb923c" : "#22c55e"}
              />
            </div>

            <div>{item.unit}</div>

            <div>
              {item.status === "low" ? (
                <Tag color="orange">SẮP HẾT</Tag>
              ) : (
                <Tag color="green">CÒN HÀNG</Tag>
              )}
            </div>

            <div className="actions">
              <EditOutlined />
              <HistoryOutlined />
            </div>
          </div>
        ))}

        <div className="table-footer">
          <span>Hiển thị 1-10 trong số 124 mặt hàng</span>
          <div className="pagination">
            <Button>‹</Button>
            <Button type="primary">1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button>›</Button>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="inventory-bottom">
        <div className="history">
          <h3>Lịch sử giao dịch gần đây</h3>

          <div className="history-item">
            <div className="history-icon green">
              <DownloadOutlined />
            </div>
            <div>
              <strong>Nhập 5,000kg Gạo ST25</strong>
              <p>Hôm nay, 14:20 · Từ Kho dự trữ TW</p>
            </div>
            <span className="plus">+5,000</span>
          </div>

          <div className="history-item">
            <div className="history-icon red">
              <UploadOutlined />
            </div>
            <div>
              <strong>Xuất 200 Áo phao cứu sinh</strong>
              <p>15 Th08, 09:15 · Đến: Đội cứu hộ Quảng Bình</p>
            </div>
            <span className="minus">-200</span>
          </div>
        </div>

        <div className="quick-help">
          <h3>Hỗ trợ nhanh</h3>
          <p>
            Manager có thể yêu cầu bổ sung kho khẩn cấp hoặc điều
            chuyển vật tư giữa các điểm cứu trợ thông qua Coordinator.
          </p>
          <Button type="primary">Yêu cầu Điều phối</Button>
        </div>
      </div>
    </div>
  );
}

/* ================= SUB ================= */

function StatCard({ icon, title, value, note, suffix, alert }) {
  return (
    <div className={`stat-card ${alert ? "alert" : ""}`}>
      <div className="stat-icon">{icon}</div>
      <span>{title}</span>
      <h3>
        {value} {suffix && <small>{suffix}</small>}
      </h3>
      {note && <Tag color="green">{note}</Tag>}
      {alert && <Tag color="orange">Cần nhập</Tag>}
    </div>
  );
}
