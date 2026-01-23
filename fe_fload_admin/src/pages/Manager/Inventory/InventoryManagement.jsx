import { useState } from "react";
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

/* ================= DATA ================= */
const items = [
  {
    code: "#VT-G001",
    name: "Gạo tẻ ST25",
    category: "Lương thực",
    warehouse: "Quận 1",
    quantity: 450,
    unit: "kg",
    status: "low",
    icon: "🍚",
  },
  {
    code: "#VT-M012",
    name: "Paracetamol 500mg",
    category: "Y tế",
    warehouse: "Quận 1",
    quantity: 1500,
    unit: "hộp",
    status: "ok",
    icon: "💊",
  },
  {
    code: "#VT-E005",
    name: "Áo phao cứu sinh",
    category: "Thiết bị",
    warehouse: "Quận 7",
    quantity: 120,
    unit: "chiếc",
    status: "ok",
    icon: "🦺",
  },
  {
    code: "#VT-W221",
    name: "Nước sạch đóng chai 5L",
    category: "Nhu yếu phẩm",
    warehouse: "Quận 12",
    quantity: 85,
    unit: "bình",
    status: "low",
    icon: "💧",
  },
  {
    code: "#VT-G001",
    name: "Gạo tẻ ST25",
    category: "Lương thực",
    warehouse: "Quận 1",
    quantity: 450,
    unit: "kg",
    status: "low",
    icon: "🍚",
  },
  {
    code: "#VT-G001",
    name: "Gạo tẻ ST25",
    category: "Lương thực",
    warehouse: "Quận 1",
    quantity: 450,
    unit: "kg",
    status: "low",
    icon: "🍚",
  },
  {
    code: "#VT-G001",
    name: "Gạo tẻ ST25",
    category: "Lương thực",
    warehouse: "Quận 1",
    quantity: 450,
    unit: "kg",
    status: "low",
    icon: "🍚",
  },
  {
    code: "#VT-G001",
    name: "Gạo tẻ ST25",
    category: "Lương thực",
    warehouse: "Quận 1",
    quantity: 450,
    unit: "kg",
    status: "low",
    icon: "🍚",
  },
];

/* ================= COMPONENT ================= */
export default function InventoryManagement() {
  const [activeWarehouse, setActiveWarehouse] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  /* ===== FILTER LOGIC ===== */
  const filteredItems = items.filter((item) => {
    const matchWarehouse =
      activeWarehouse === "all" ||
      item.warehouse === activeWarehouse;

    const matchStatus =
      statusFilter === "all" ||
      item.status === statusFilter;

    return matchWarehouse && matchStatus;
  });

  return (
    <div className="inventory-page">
      {/* ================= HEADER ================= */}
      <div className="inventory-header">
        <h2>Quản lý Kho & Vật tư</h2>

        <div className="header-actions">
          <Button icon={<ExportOutlined />}>
            Xuất báo cáo
          </Button>
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
          value={items.length}
        />
        <StatCard
          icon={<DollarOutlined />}
          title="TỔNG GIÁ TRỊ KHO"
          value="1.25 tỷ"
          suffix="VND"
        />
        <StatCard
          icon={<WarningOutlined />}
          title="SẮP HẾT"
          value={items.filter((i) => i.status === "low").length}
          alert
        />
        <StatCard
          icon={<SwapOutlined />}
          title="GIAO DỊCH (24H)"
          value="42"
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="inventory-table">
        {/* ===== FILTER BAR ===== */}
        <div className="table-filter">
          {/* WAREHOUSE TABS */}
          <div className="tabs">
            {["all", "Quận 1", "Quận 7", "Quận 12"].map((w) => (
              <span
                key={w}
                className={activeWarehouse === w ? "active" : ""}
                onClick={() => setActiveWarehouse(w)}
              >
                {w === "all" ? "Tất cả kho" : `Kho ${w}`}
              </span>
            ))}
          </div>

          {/* STATUS FILTER */}
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 180 }}
          >
            <Select.Option value="all">
              Trạng thái: Tất cả
            </Select.Option>
            <Select.Option value="ok">
              Còn hàng
            </Select.Option>
            <Select.Option value="low">
              Sắp hết
            </Select.Option>
          </Select>
        </div>

        {/* ===== TABLE HEAD ===== */}
        <div className="inventory-table">
  <div className="table-scroll">
    {/* HEADER */}
    <div className="table-head wide">
      <span>MÃ</span>
      <span>TÊN VẬT TƯ</span>
      <span>KHO</span>
      <span>TỒN KHO</span>
      <span>ĐƠN VỊ</span>
      <span>DANH MỤC</span>
      <span>TRẠNG THÁI</span>
      <span>THAO TÁC</span>
    </div>

    {/* ROWS */}
    {filteredItems.map((item) => (
      <div className="table-row wide" key={item.code}>
        <div>{item.code}</div>

        <div className="item-info">
          <div className="item-icon">{item.icon}</div>
          <strong>{item.name}</strong>
        </div>

        <div>
          <Tag color="blue">Kho {item.warehouse}</Tag>
        </div>

        <div className="stock">
          <span className={item.status === "low" ? "low" : ""}>
            {item.quantity}
          </span>
          <Progress
            percent={item.status === "low" ? 30 : 80}
            showInfo={false}
          />
        </div>

        <div>{item.unit}</div>
        <div>{item.category}</div>

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
  </div>
</div>




        {/* ===== FOOTER ===== */}
        <div className="table-footer">
          <span>
            Hiển thị {filteredItems.length} mặt
            hàng
          </span>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="inventory-bottom">
        <div className="history">
          <h3>Lịch sử giao dịch gần đây</h3>

          <HistoryItem
            icon={<DownloadOutlined />}
            color="green"
            text="Nhập 5,000kg Gạo ST25"
            note="Hôm nay, 14:20 · Kho Quận 1"
            value="+5,000"
          />

          <HistoryItem
            icon={<UploadOutlined />}
            color="red"
            text="Xuất 200 Áo phao"
            note="15/08 · Kho Quận 7"
            value="-200"
          />
        </div>

        <div className="quick-help">
          <h3>Hỗ trợ nhanh</h3>
          <p>
            Yêu cầu điều chuyển vật tư giữa các kho
            cứu trợ.
          </p>
          <Button type="primary">
            Yêu cầu Điều phối
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ================= SUB COMPONENT ================= */

function StatCard({ icon, title, value, suffix, alert }) {
  return (
    <div className={`stat-card ${alert ? "alert" : ""}`}>
      <div className="stat-icon">{icon}</div>
      <span>{title}</span>
      <h3>
        {value} {suffix && <small>{suffix}</small>}
      </h3>
      {alert && <Tag color="orange">Cần nhập</Tag>}
    </div>
  );
}

function HistoryItem({ icon, color, text, note, value }) {
  return (
    <div className="history-item">
      <div className={`history-icon ${color}`}>
        {icon}
      </div>
      <div>
        <strong>{text}</strong>
        <p>{note}</p>
      </div>
      <span
        className={value.startsWith("+") ? "plus" : "minus"}
      >
        {value}
      </span>
    </div>
  );
}
