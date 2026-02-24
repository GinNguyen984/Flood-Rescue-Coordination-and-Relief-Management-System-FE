import { useState } from "react";
import { Button, Tag, Progress, Select, Drawer, InputNumber } from "antd";
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
  ShoppingCartOutlined,
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
    price: 25000,
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
    price: 15000,
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
    price: 350000,
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
    price: 45000,
  },
  {
    code: "#VT-B001",
    name: "Băng gạc y tế",
    category: "Y tế",
    warehouse: "Quận 1",
    quantity: 250,
    unit: "cuộn",
    status: "ok",
    icon: "🩹",
    price: 35000,
  },
  {
    code: "#VT-F002",
    name: "Cơm hộp cứu trợ",
    category: "Lương thực",
    warehouse: "Quận 7",
    quantity: 200,
    unit: "suất",
    status: "low",
    icon: "🍜",
    price: 50000,
  },
  {
    code: "#VT-C001",
    name: "Chăn cứu hộ",
    category: "Thiết bị",
    warehouse: "Quận 12",
    quantity: 80,
    unit: "chiếc",
    status: "ok",
    icon: "🛏️",
    price: 120000,
  },
  {
    code: "#VT-L001",
    name: "Lều tạm cứu trợ",
    category: "Thiết bị",
    warehouse: "Quận 1",
    quantity: 15,
    unit: "cái",
    status: "low",
    icon: "⛺",
    price: 2500000,
  },
];

/* ================= COMPONENT ================= */
export default function InventoryManagement() {
  const [activeWarehouse, setActiveWarehouse] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const [purchaseDrawer, setPurchaseDrawer] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const filteredItems = items.filter((item) => {
    const matchWarehouse = activeWarehouse === "all" || item.warehouse === activeWarehouse;
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    return matchWarehouse && matchStatus;
  });

  const lowStockItems = items.filter((i) => i.status === "low");
  const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  
  const warehouseValues = {
    "Quận 1": items
      .filter((i) => i.warehouse === "Quận 1")
      .reduce((sum, i) => sum + (i.quantity * i.price), 0),
    "Quận 7": items
      .filter((i) => i.warehouse === "Quận 7")
      .reduce((sum, i) => sum + (i.quantity * i.price), 0),
    "Quận 12": items
      .filter((i) => i.warehouse === "Quận 12")
      .reduce((sum, i) => sum + (i.quantity * i.price), 0),
  };

  const handleStatClick = (stat) => {
    setSelectedStat(stat);
    setDrawerVisible(true);
  };

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find((ci) => ci.code === item.code);
    if (existingItem) {
      setCartItems(
        cartItems.map((ci) =>
          ci.code === item.code ? { ...ci, quantity: ci.quantity + 1 } : ci
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

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
        <div onClick={() => handleStatClick("total")} style={{ cursor: "pointer" }}>
          <StatCard
            icon={<DropboxOutlined />}
            title="TỔNG MẶT HÀNG"
            value={items.length}
            clickable
          />
        </div>
        <div onClick={() => handleStatClick("value")} style={{ cursor: "pointer" }}>
          <StatCard
            icon={<DollarOutlined />}
            title="QUẢN LÍ TIỀN TỆ LIÊN KHO"
            value={(totalValue / 1e9).toFixed(2)}
            suffix="tỷ VND"
            clickable
          />
        </div>
        <div onClick={() => handleStatClick("low")} style={{ cursor: "pointer" }}>
          <StatCard
            icon={<WarningOutlined />}
            title="SẮP HẾT"
            value={lowStockItems.length}
            alert
            clickable
          />
        </div>
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

      {/* ================= DRAWER - STAT DETAIL ================= */}
      <Drawer
        title={selectedStat === "total" ? "📦 Danh sách vật tư" : selectedStat === "value" ? "💰 Quản lí tiền tệ liên kho" : "⚠️ Vật phẩm sắp hết"}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={600}
      >
        {selectedStat === "total" && <TotalItemsDetail items={items} />}
        {selectedStat === "value" && <WarehouseValueDetail warehouseValues={warehouseValues} totalValue={totalValue} />}
        {selectedStat === "low" && <LowStockDetail items={lowStockItems} />}
      </Drawer>

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
          <h3>Mua thêm vật phẩm</h3>
          <p>
            Yêu cầu mua sắm thêm vật tư cứu trợ để cập nhật kho dự trữ.
          </p>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => setPurchaseDrawer(true)}
          >
            Mua thêm vật phẩm
          </Button>
        </div>
      </div>

      {/* ================= DRAWER - PURCHASE ================= */}
      <Drawer
        title="🛒 Mua thêm vật phẩm"
        placement="right"
        onClose={() => setPurchaseDrawer(false)}
        open={purchaseDrawer}
        width={700}
      >
        <PurchaseForm items={items} cartItems={cartItems} setCartItems={setCartItems} onAddToCart={handleAddToCart} />
      </Drawer>
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

function TotalItemsDetail({ items }) {
  const categories = [...new Set(items.map(item => item.category))];
  
  return (
    <div className="drawer-detail">
      <h4>Tổng Số Vật Tư: {items.length} loại</h4>
      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Phân loại vật tư:</h4>
        {categories.map(cat => (
          <Tag key={cat} color="blue">
            {cat}: {items.filter(i => i.category === cat).length} loại
          </Tag>
        ))}
      </div>
      
      <h4 style={{ fontSize: "13px", color: "#333", marginBottom: "10px" }}>Chi tiết vật tư:</h4>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {items.map((item) => (
          <div key={item.code} style={{ 
            padding: "10px", 
            borderBottom: "1px solid #eee",
            fontSize: "12px"
          }}>
            <strong>{item.icon} {item.name}</strong>
            <div style={{ color: "#666", marginTop: "5px" }}>
              Mã: {item.code} | {item.quantity} {item.unit} | {item.category}
            </div>
            <div style={{ color: "#999", marginTop: "3px" }}>
              📍 {item.warehouse}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WarehouseValueDetail({ warehouseValues, totalValue }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const warehouseList = Object.entries(warehouseValues || {});
  
  return (
    <div className="drawer-detail">
      <div style={{ 
        textAlign: "center", 
        padding: "20px", 
        backgroundColor: "#f0f5ff",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#1890ff" }}>💰 Tổng Giá Trị Kho</h3>
        <h2 style={{ margin: "0", color: "#0050b3", fontSize: "24px" }}>
          {formatPrice(totalValue)}
        </h2>
      </div>

      <h4 style={{ fontSize: "13px", color: "#333", marginBottom: "15px" }}>Chi tiết theo kho:</h4>
      {warehouseList.map(([warehouse, value]) => {
        const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;
        
        // Sample spending history for each warehouse
        const spendingHistory = {
          "Quận 1": [
            { date: "20/01/2026", amount: "250,000,000₫", description: "Mua gạo 5,000kg" },
            { date: "18/01/2026", amount: "180,000,000₫", description: "Mua thuốc 1,000 hộp" },
            { date: "15/01/2026", amount: "95,000,000₫", description: "Mua áo phao 500 chiếc" }
          ],
          "Quận 7": [
            { date: "21/01/2026", amount: "320,000,000₫", description: "Mua nước 10,000 chai" },
            { date: "19/01/2026", amount: "140,000,000₫", description: "Mua chăn 2,000 chiếc" },
            { date: "16/01/2026", amount: "75,000,000₫", description: "Mua lều 300 cái" }
          ],
          "Quận 12": [
            { date: "22/01/2026", amount: "210,000,000₫", description: "Mua cơm hộp 3,000 hộp" },
            { date: "20/01/2026", amount: "165,000,000₫", description: "Mua băng gạc 5,000 roll" },
            { date: "17/01/2026", amount: "88,000,000₫", description: "Mua trang phục bảo hộ" }
          ]
        };

        return (
          <div key={warehouse} style={{ 
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#f8fbff",
            borderRadius: "8px",
            border: "1px solid #d4e4f7"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", fontWeight: "500" }}>📍 {warehouse}</span>
              <span style={{ fontSize: "12px", color: "#1890ff", fontWeight: "bold" }}>
                {formatPrice(value)} ({percentage.toFixed(1)}%)
              </span>
            </div>
            <Progress percent={percentage} strokeColor="#1890ff" size="small" style={{ marginBottom: "12px" }} />
            
            {/* Spending History */}
            <div style={{ marginTop: "12px" }}>
              <h5 style={{ fontSize: "11px", color: "#666", margin: "0 0 8px 0", fontWeight: "600" }}>📋 Lịch sử tiêu:</h5>
              {(spendingHistory[warehouse] || []).map((history, idx) => (
                <div key={idx} style={{ 
                  fontSize: "11px", 
                  padding: "6px 8px",
                  marginBottom: "4px",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  borderLeft: "3px solid #52c41a"
                }}>
                  <div>
                    <div style={{ fontWeight: "500", color: "#333" }}>{history.description}</div>
                    <div style={{ color: "#999", fontSize: "10px" }}>{history.date}</div>
                  </div>
                  <div style={{ color: "#ff4d4f", fontWeight: "bold" }}>-{history.amount}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LowStockDetail({ items }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="drawer-detail">
      <div style={{ 
        padding: "12px", 
        backgroundColor: "#fff7e6",
        borderLeft: "4px solid #ff7a45",
        borderRadius: "4px",
        marginBottom: "15px"
      }}>
        <strong style={{ color: "#d4380d" }}>⚠️ Vật phẩm sắp hết</strong>
        <p style={{ fontSize: "12px", color: "#d4380d", margin: "5px 0 0 0" }}>
          Cần lên kế hoạch mua sắm thêm để đủ dự trữ
        </p>
      </div>

      {items.length > 0 ? (
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {items.map((item) => (
            <div key={item.code} style={{ 
              padding: "12px", 
              borderBottom: "1px solid #eee",
              backgroundColor: "#fffbe6"
            }}>
              <strong>{item.icon} {item.name}</strong>
              <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                <div>Tồn kho: {item.quantity} {item.unit}</div>
                <div>Vị trí: {item.warehouse}</div>
                <div>Danh mục: {item.category}</div>
                <div>Đơn giá: {formatPrice(item.price)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#999", fontSize: "12px" }}>
          Không có vật phẩm nào cần nhập
        </p>
      )}
    </div>
  );
}

function PurchaseForm({ items, cartItems, setCartItems, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const categories = ["Tất cả", ...new Set(items.map(item => item.category))];
  const filteredItems = selectedCategory === "Tất cả" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const handleRemoveItem = (code) => {
    setCartItems(cartItems.filter(item => item.code !== code));
  };

  const handleQuantityChange = (code, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(code);
    } else {
      setCartItems(cartItems.map(item => 
        item.code === code ? { ...item, quantity } : item
      ));
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="purchase-form">
      {/* Warehouse Selection */}
      {!selectedWarehouse ? (
        <div style={{ 
          padding: "20px", 
          textAlign: "center",
          backgroundColor: "#f0f5ff",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <h4 style={{ marginBottom: "15px" }}>Vui lòng chọn kho để mua hàng</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
            {["Quận 1", "Quận 7", "Quận 12"].map(warehouse => (
              <Button
                key={warehouse}
                type="primary"
                size="large"
                onClick={() => setSelectedWarehouse(warehouse)}
              >
                📍 {warehouse}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <h4 style={{ margin: "0", fontSize: "14px" }}>📍 Kho đã chọn: <strong>{selectedWarehouse}</strong></h4>
            <Button size="small" onClick={() => setSelectedWarehouse("")}>Đổi kho</Button>
          </div>
        </div>
      )}
      
      {selectedWarehouse && (
        <>
      {/* Category Filter */}
      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "10px", fontSize: "13px" }}>Lọc theo danh mục:</h4>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <Button
              key={cat}
              size="small"
              type={selectedCategory === cat ? "primary" : "default"}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <h4 style={{ marginBottom: "10px", fontSize: "13px" }}>Chọn vật phẩm:</h4>
      <div className="item-grid">
        {filteredItems.map(item => {
          const inCart = cartItems.find(c => c.code === item.code);
          return (
            <div key={item.code} style={{ 
              padding: "12px",
              border: "1px solid #d9d9d9",
              borderRadius: "6px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{item.icon}</div>
              <div style={{ fontSize: "12px", fontWeight: "500", marginBottom: "4px" }}>
                {item.name}
              </div>
              <div style={{ fontSize: "11px", color: "#666", marginBottom: "8px" }}>
                {formatPrice(item.price)}
              </div>
              <Button
                type={inCart ? "primary" : "default"}
                size="small"
                icon={<ShoppingCartOutlined />}
                onClick={() => onAddToCart(item)}
                style={{ width: "100%" }}
              >
                {inCart ? "✓ Thêm" : "Thêm"}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #d9d9d9" }}>
          <h4 style={{ fontSize: "13px", marginBottom: "15px" }}>
            🛒 Giỏ hàng ({cartItems.length} loại)
          </h4>
          
          <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "15px" }}>
            {cartItems.map(item => (
              <div key={item.code} className="cart-item">
                <div>
                  <strong>{item.icon} {item.name}</strong>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    {formatPrice(item.price)} × {item.quantity} = {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(val) => handleQuantityChange(item.code, val)}
                    size="small"
                    style={{ width: "60px" }}
                  />
                  <Button 
                    size="small" 
                    danger 
                    onClick={() => handleRemoveItem(item.code)}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            padding: "12px", 
            backgroundColor: "#f0f5ff",
            borderRadius: "6px",
            marginBottom: "15px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span>Tổng cộng:</span>
              <strong style={{ color: "#1890ff", fontSize: "16px" }}>
                {formatPrice(totalPrice)}
              </strong>
            </div>
          </div>

          <Button type="primary" block size="large">
            Xác nhận mua ({cartItems.length} loại)
          </Button>
        </div>
      )}
        </>
      )}
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
