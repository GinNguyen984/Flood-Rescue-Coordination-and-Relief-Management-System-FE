import { useState } from "react";
import {
    Button,
    Tag,
    Input,
    Progress,
    Tooltip,
    Card,
    Drawer,
    message,
  } from "antd";
  import {
    TruckOutlined,
    CloseOutlined,
    CheckOutlined,
    ExclamationCircleOutlined,
    LeftOutlined,
    RightOutlined,
    DropboxOutlined,
    CheckCircleOutlined,
    WarningOutlined,
  } from "@ant-design/icons";
  import "./ApprovalManagement.css";
  
  export default function ApprovalDispatch() {
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedModal, setSelectedModal] = useState(null);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const approvalData = [
      {
        id: 1,
        unit: "Đội Cứu hộ Quận 8",
        requester: "Nguyễn Văn A",
        phone: "0903-456-789",
        location: "Khu vực Cầu Chữ Y",
        item: "Nước uống đóng chai",
        quantity: "500 Lít",
        price: "2.500.000 VNĐ",
        priority: "KHẨN CẤP",
        reason: "Khu vực Cầu Chữ Y đang bị cô lập hoàn toàn, người dân thiếu nước sạch trầm trọng 24h qua.",
        icon: "💧",
        status: "ready",
        requestDate: "2026-01-22",
        timeNeeded: "2 giờ",
        condition: "Cấp tốc",
      },
      {
        id: 2,
        unit: "Trạm Y tế Phường 15",
        requester: "BS. Lê Thị B",
        phone: "0912-345-678",
        location: "Trạm dã chiến Phường 15",
        item: "Túi sơ cứu loại A",
        quantity: "20 Bộ",
        price: "8.000.000 VNĐ",
        priority: "CAO",
        reason: "Bổ sung cơ số thuốc cho trạm dã chiến sơ cứu vết thương.",
        icon: "➕",
        status: "ready",
        requestDate: "2026-01-22",
        timeNeeded: "3 giờ",
        condition: "Gấp",
      },
      {
        id: 3,
        unit: "Nhóm Tình nguyện Xanh",
        requester: "Trần Văn C",
        phone: "0987-654-321",
        location: "Vùng núi Thị Xã La Ngà",
        item: "Lương thực khô",
        quantity: "100 Gói",
        price: "15.000.000 VNĐ",
        priority: "TRUNG BÌNH",
        reason: "Dự phòng cho lực lượng tình nguyện viên đi phát quà cứu trợ vùng sâu.",
        icon: "🍚",
        status: "maintenance",
        requestDate: "2026-01-21",
        timeNeeded: "24 giờ",
        condition: "Bình thường",
      },
    ];

    const filteredData = filterStatus === "all" 
      ? approvalData 
      : approvalData.filter(item => {
          if (filterStatus === "ready") return item.status === "ready";
          if (filterStatus === "maintenance") return item.status === "maintenance";
          return true;
        });

    const handleStatClick = (type) => {
      setSelectedModal(type);
      setDrawerVisible(true);
    };

    const handleClose = () => {
      setDrawerVisible(false);
      setSelectedModal(null);
    };

    const getDrawerTitle = (type) => {
      const titles = {
        ready: "✅ Yêu cầu sẵn sàng",
        maintenance: "⏳ Yêu cầu chờ xử lý",
        urgent: "🔴 Yêu cầu khẩn cấp",
      };
      return titles[type] || "";
    };

    const getApprovalCount = (status) => {
      return approvalData.filter((v) => v.status === status).length;
    };
    return (
      <div className="dispatch-page">
        {/* ================= PERFORMANCE ================= */}
        <div className="performance-box">
          <div className="performance-header">
            <h3>Hiệu suất cấp phát vật tư</h3>
            <span className="percentage">85%</span>
          </div>
          <Progress percent={85} showInfo={false} strokeColor="#3b82f6" />
          <p className="performance-note">Tỷ lệ phê duyệt và cấp phát vật tư đã hoàn tất</p>
        </div>

        {/* ================= STAT CARDS ================= */}
        <div className="stat-grid">
          <div onClick={() => handleStatClick("ready")} className="stat-card-wrapper">
            <div className="stat-card-simple">
              <div className="stat-top">
                <span className="stat-label">CHỜ PHÊ DUYỆT</span>
                <CheckCircleOutlined className="stat-card-icon green" />
              </div>
              <div className="stat-number">{getApprovalCount("ready")}</div>
              <div className="stat-info-row">
                <span>📅 Hôm nay: 2</span>
                <span>✓ Hoàn thành: 40%</span>
              </div>
            </div>
          </div>

          <div onClick={() => handleStatClick("maintenance")} className="stat-card-wrapper">
            <div className="stat-card-simple">
              <div className="stat-top">
                <span className="stat-label">ĐANG CHUẨN BỊ</span>
                <TruckOutlined className="stat-card-icon orange" />
              </div>
              <div className="stat-number">{getApprovalCount("maintenance")}</div>
              <div className="stat-info-row">
                <span>📅 Hôm nay: 1</span>
                <span>✓ Hoàn thành: 60%</span>
              </div>
            </div>
          </div>

          <div onClick={() => handleStatClick("urgent")} className="stat-card-wrapper">
            <div className="stat-card-simple">
              <div className="stat-top">
                <span className="stat-label">YÊU CẦU KHẨN CẤP</span>
                <WarningOutlined className="stat-card-icon red" />
              </div>
              <div className="stat-number">03</div>
              <div className="stat-info-row">
                <span>🚨 Mức độ: Cao</span>
                <span>⏰ Cần xử lý: Ngay</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DRAWER ================= */}
        <Drawer
          title={getDrawerTitle(selectedModal)}
          placement="right"
          onClose={handleClose}
          open={drawerVisible}
          width={500}
        >
          {selectedModal === "ready" && (
            <ApprovalReadyDetail approvals={approvalData} />
          )}
          {selectedModal === "maintenance" && (
            <ApprovalPrepareDetail approvals={approvalData} />
          )}
          {selectedModal === "urgent" && (
            <ApprovalUrgentDetail approvals={approvalData} />
          )}
        </Drawer>
        <div className="dispatch-table">
          <div className="table-header">
            <h3>Danh sách yêu cầu chờ xử lý</h3>
            <div className="filter">
              <Button 
                type={filterStatus === "all" ? "primary" : "default"}
                onClick={() => setFilterStatus("all")}
              >
                Tất cả
              </Button>
              <Button 
                type={filterStatus === "ready" ? "primary" : "default"}
                onClick={() => setFilterStatus("ready")}
              >
                Chờ phê duyệt
              </Button>
              <Button 
                type={filterStatus === "maintenance" ? "primary" : "default"}
                onClick={() => setFilterStatus("maintenance")}
              >
                Đang chuẩn bị
              </Button>
            </div>
          </div>
  
          <div className="table-head">
            <div>ĐƠN VỊ YÊU CẦU</div>
            <div>VẬT TƯ & SỐ LƯỢNG</div>
            <div>ƯU TIÊN</div>
            <div>LÝ DO CẤP PHÁT</div>
            <div>GHI CHÚ MANAGER</div>
            <div>THAO TÁC</div>
          </div>
  
          {filteredData.map((item) => (
            <Row
              key={item.id}
              unit={item.unit}
              requester={item.requester}
              item={item.item}
              quantity={item.quantity}
              priority={item.priority}
              reason={item.reason}
              icon={item.icon}
              status={item.status}
              phone={item.phone}
              location={item.location}
              price={item.price}
            />
          ))}
  
          <div className="table-footer">
            <span>ĐANG XEM {filteredData.length} TRÊN {approvalData.length} YÊU CẦU CHỜ XỬ LÝ</span>
            <div>
              <Button icon={<LeftOutlined />} />
              <Button icon={<RightOutlined />} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  /* ================= SUB ================= */
  
  function StatCard({ title, value, icon, color }) {
    return (
      <Card
        className="stat-card"
        style={{
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 20px 40px rgba(15, 23, 42, 0.2)";
          e.currentTarget.style.transform = "translateY(-8px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 12px 30px rgba(15, 23, 42, 0.08)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div className="stat-content">
          <div className={`stat-icon ${color}`}>{icon}</div>
          <div className="stat-info">
            <div className="stat-title">{title}</div>
            <div className="stat-value">{value}</div>
          </div>
        </div>
      </Card>
    );
  }

  function ApprovalReadyDetail({ approvals }) {
    const readyApprovals = approvals.filter((a) => a.status === "ready");

    return (
      <div className="drawer-content">
        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "#64748b", marginBottom: "16px" }}>
            Danh sách {readyApprovals.length} yêu cầu chờ phê duyệt
          </p>
        </div>

        {readyApprovals.map((approval) => (
          <div
            key={approval.id}
            style={{
              padding: "16px",
              border: "2px solid #22c55e",
              borderRadius: "10px",
              marginBottom: "16px",
              backgroundColor: "#f0fdf4",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#1e293b" }}>{approval.unit}</h4>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: "0" }}>Yêu cầu bởi: {approval.requester}</p>
                </div>
                <Tag color="green" style={{ fontWeight: "bold" }}>CHỜ PHÊ DUYỆT</Tag>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <div style={{ fontSize: "12px" }}>
                <span style={{ color: "#94a3b8", display: "block", marginBottom: "4px" }}>📞 Liên hệ</span>
                <span style={{ color: "#1e293b", fontWeight: "bold" }}>{approval.phone}</span>
              </div>
              <div style={{ fontSize: "12px" }}>
                <span style={{ color: "#94a3b8", display: "block", marginBottom: "4px" }}>📍 Địa điểm</span>
                <span style={{ color: "#1e293b", fontWeight: "bold" }}>{approval.location}</span>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #22c55e", paddingTop: "12px", marginBottom: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "12px", display: "block", marginBottom: "4px" }}>📦 Vật tư</span>
                  <strong style={{ color: "#1e293b", display: "block" }}>{approval.item}</strong>
                  <span style={{ color: "#64748b", fontSize: "12px" }}>{approval.quantity}</span>
                </div>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "12px", display: "block", marginBottom: "4px" }}>💰 Giá dự toán</span>
                  <strong style={{ color: "#22c55e", display: "block" }}>{approval.price}</strong>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #22c55e", paddingTop: "12px", marginBottom: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "11px", display: "block", marginBottom: "2px" }}>📅 Ngày yêu cầu</span>
                  <span style={{ color: "#1e293b", fontWeight: "bold", fontSize: "12px" }}>{approval.requestDate}</span>
                </div>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "11px", display: "block", marginBottom: "2px" }}>⏱️ Thời gian cần</span>
                  <span style={{ color: "#1e293b", fontWeight: "bold", fontSize: "12px" }}>{approval.timeNeeded}</span>
                </div>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "11px", display: "block", marginBottom: "2px" }}>🚨 Mức độ</span>
                  <Tag color={approval.priority === "KHẨN CẤP" ? "red" : "orange"} style={{ fontSize: "11px" }}>
                    {approval.priority}
                  </Tag>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #22c55e", paddingTop: "12px" }}>
              <span style={{ color: "#94a3b8", fontSize: "12px", display: "block", marginBottom: "6px" }}>📋 Lý do yêu cầu</span>
              <p style={{ margin: "0", fontStyle: "italic", color: "#475569", fontSize: "12px", lineHeight: "1.5" }}>
                "{approval.reason}"
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function ApprovalPrepareDetail({ approvals }) {
    const prepareApprovals = approvals.filter((a) => a.status === "maintenance");

    return (
      <div className="drawer-content">
        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "#64748b", marginBottom: "16px" }}>
            Danh sách {prepareApprovals.length} yêu cầu đang chuẩn bị
          </p>
        </div>

        {prepareApprovals.map((approval) => (
          <div
            key={approval.id}
            style={{
              padding: "16px",
              border: "2px solid #f97316",
              borderRadius: "10px",
              marginBottom: "16px",
              backgroundColor: "#fef3c7",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#1e293b" }}>{approval.unit}</h4>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: "0" }}>Yêu cầu bởi: {approval.requester}</p>
                </div>
                <Tag color="orange" style={{ fontWeight: "bold" }}>ĐANG CHUẨN BỊ</Tag>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <div style={{ fontSize: "12px" }}>
                <span style={{ color: "#94a3b8", display: "block", marginBottom: "4px" }}>📞 Liên hệ</span>
                <span style={{ color: "#1e293b", fontWeight: "bold" }}>{approval.phone}</span>
              </div>
              <div style={{ fontSize: "12px" }}>
                <span style={{ color: "#94a3b8", display: "block", marginBottom: "4px" }}>📍 Địa điểm</span>
                <span style={{ color: "#1e293b", fontWeight: "bold" }}>{approval.location}</span>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #f97316", paddingTop: "12px", marginBottom: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "12px", display: "block", marginBottom: "4px" }}>📦 Vật tư</span>
                  <strong style={{ color: "#1e293b", display: "block" }}>{approval.item}</strong>
                  <span style={{ color: "#64748b", fontSize: "12px" }}>{approval.quantity}</span>
                </div>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "12px", display: "block", marginBottom: "4px" }}>💰 Giá dự toán</span>
                  <strong style={{ color: "#f97316", display: "block" }}>{approval.price}</strong>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #f97316", paddingTop: "12px", marginBottom: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "11px", display: "block", marginBottom: "2px" }}>📅 Ngày yêu cầu</span>
                  <span style={{ color: "#1e293b", fontWeight: "bold", fontSize: "12px" }}>{approval.requestDate}</span>
                </div>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "11px", display: "block", marginBottom: "2px" }}>⏱️ Thời gian cần</span>
                  <span style={{ color: "#1e293b", fontWeight: "bold", fontSize: "12px" }}>{approval.timeNeeded}</span>
                </div>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "11px", display: "block", marginBottom: "2px" }}>🚨 Mức độ</span>
                  <Tag color={approval.priority === "KHẨN CẤP" ? "red" : "orange"} style={{ fontSize: "11px" }}>
                    {approval.priority}
                  </Tag>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #f97316", paddingTop: "12px" }}>
              <span style={{ color: "#94a3b8", fontSize: "12px", display: "block", marginBottom: "6px" }}>📋 Lý do yêu cầu</span>
              <p style={{ margin: "0", fontStyle: "italic", color: "#475569", fontSize: "12px", lineHeight: "1.5" }}>
                "{approval.reason}"
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function ApprovalUrgentDetail({ approvals }) {
    const urgentApprovals = approvals.filter((a) => a.priority === "KHẨN CẤP");

    return (
      <div className="drawer-content">
        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "#dc2626", marginBottom: "16px", fontWeight: "bold", fontSize: "14px" }}>
            🔴 {urgentApprovals.length} yêu cầu KHẨN CẤP cần xử lý ngay
          </p>
        </div>

        {urgentApprovals.map((approval) => (
          <div
            key={approval.id}
            style={{
              padding: "16px",
              border: "3px solid #dc2626",
              borderRadius: "10px",
              marginBottom: "16px",
              backgroundColor: "#fee2e2",
              boxShadow: "0 4px 12px rgba(220, 38, 38, 0.15)",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#991b1b" }}>{approval.unit}</h4>
                  <p style={{ fontSize: "12px", color: "#7f1d1d", margin: "0" }}>Yêu cầu bởi: {approval.requester}</p>
                </div>
                <Tag color="red" style={{ fontWeight: "bold" }}>KHẨN CẤP</Tag>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <div style={{ fontSize: "12px" }}>
                <span style={{ color: "#991b1b", display: "block", marginBottom: "4px", fontWeight: "bold" }}>📞 Liên hệ</span>
                <span style={{ color: "#1e293b", fontWeight: "bold" }}>{approval.phone}</span>
              </div>
              <div style={{ fontSize: "12px" }}>
                <span style={{ color: "#991b1b", display: "block", marginBottom: "4px", fontWeight: "bold" }}>📍 Địa điểm</span>
                <span style={{ color: "#1e293b", fontWeight: "bold" }}>{approval.location}</span>
              </div>
            </div>

            <div style={{ borderTop: "2px solid #dc2626", paddingTop: "12px", marginBottom: "12px", backgroundColor: "#fff5f5", padding: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <span style={{ color: "#dc2626", fontSize: "12px", display: "block", marginBottom: "4px", fontWeight: "bold" }}>📦 Vật tư cấp tốc</span>
                  <strong style={{ color: "#991b1b", display: "block" }}>{approval.item}</strong>
                  <span style={{ color: "#7f1d1d", fontSize: "12px" }}>{approval.quantity}</span>
                </div>
                <div>
                  <span style={{ color: "#dc2626", fontSize: "12px", display: "block", marginBottom: "4px", fontWeight: "bold" }}>💰 Giá dự toán</span>
                  <strong style={{ color: "#dc2626", display: "block", fontSize: "14px" }}>{approval.price}</strong>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "2px solid #dc2626", paddingTop: "12px", marginBottom: "12px", backgroundColor: "#fff5f5", padding: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                <div>
                  <span style={{ color: "#dc2626", fontSize: "11px", display: "block", marginBottom: "2px", fontWeight: "bold" }}>📅 Ngày yêu cầu</span>
                  <span style={{ color: "#991b1b", fontWeight: "bold", fontSize: "12px" }}>{approval.requestDate}</span>
                </div>
                <div>
                  <span style={{ color: "#dc2626", fontSize: "11px", display: "block", marginBottom: "2px", fontWeight: "bold" }}>⏱️ Cần trong</span>
                  <span style={{ color: "#991b1b", fontWeight: "bold", fontSize: "12px", backgroundColor: "#fed7d7", padding: "2px 6px", borderRadius: "4px" }}>{approval.timeNeeded}</span>
                </div>
                <div>
                  <span style={{ color: "#dc2626", fontSize: "11px", display: "block", marginBottom: "2px", fontWeight: "bold" }}>🚨 Mức độ</span>
                  <Tag color="red" style={{ fontSize: "11px", fontWeight: "bold" }}>
                    {approval.priority}
                  </Tag>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "2px solid #dc2626", paddingTop: "12px", backgroundColor: "#fff5f5", padding: "12px" }}>
              <span style={{ color: "#991b1b", fontSize: "12px", display: "block", marginBottom: "6px", fontWeight: "bold" }}>📋 Lý do KHẨN CẤP</span>
              <p style={{ margin: "0", fontStyle: "italic", color: "#7f1d1d", fontSize: "12px", lineHeight: "1.6", fontWeight: "500" }}>
                "{approval.reason}"
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function Row({
    unit,
    requester,
    item,
    quantity,
    priority,
    reason,
    icon,
    status,
    phone,
    location,
    price,
  }) {
    return (
      <div className="table-row">
        <div className="row-cell">
          <strong style={{ color: "#1e293b", fontSize: "13px" }}>{unit}</strong>
          <p style={{ color: "#64748b", fontSize: "11px", margin: "4px 0 0", display: "flex", gap: "8px" }}>
            👤 {requester}
          </p>
          <p style={{ color: "#94a3b8", fontSize: "11px", margin: "2px 0 0" }}>
            📍 {location}
          </p>
        </div>
  
        <div className="row-cell item">
          <span className="item-icon" style={{ fontSize: "24px" }}>{icon}</span>
          <div>
            <strong style={{ color: "#1e293b", fontSize: "12px", display: "block" }}>{item}</strong>
            <span style={{ color: "#64748b", fontSize: "11px", display: "block", marginTop: "2px" }}>{quantity}</span>
            <span style={{ color: "#94a3b8", fontSize: "10px", display: "block", marginTop: "2px" }}>💰 {price}</span>
          </div>
        </div>
  
        <div className="row-cell">
          <Tag
            color={
              priority === "KHẨN CẤP"
                ? "red"
                : priority === "CAO"
                ? "orange"
                : "cyan"
            }
            style={{ fontWeight: "bold", fontSize: "11px" }}
          >
            {priority}
          </Tag>
        </div>
  
        <div className="row-cell">
          <Tooltip title={reason}>
            <p className="reason" style={{ fontSize: "11px", lineHeight: "1.4", color: "#475569" }}>📝 {reason.length > 40 ? reason.substring(0, 40) + "..." : reason}</p>
          </Tooltip>
        </div>
  
        <div className="row-cell">
          <Input 
            placeholder="Nhập ghi chú..." 
            size="small"
            style={{ fontSize: "11px" }}
          />
        </div>
  
        <div className="row-cell actions">
          <Button
            type="text"
            danger
            icon={<CloseOutlined />}
            size="small"
            style={{ fontSize: "12px" }}
            title="Từ chối"
          />
          <Button 
            type="primary" 
            icon={<CheckOutlined />}
            size="small"
            style={{ fontSize: "12px" }}
          >
            Duyệt
          </Button>
        </div>
      </div>
    );
  }
