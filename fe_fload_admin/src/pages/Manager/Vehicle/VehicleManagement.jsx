import { useState } from "react";
import {
  Button,
  Tag,
  Input,
  Progress,
  Tooltip,
  Modal,
  Drawer,
  message,
  Card,
} from "antd";
import {
  CarOutlined,
  ToolOutlined,
  StopOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import "./VehicleManagement.css";

export default function VehicleManagement() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedModal, setSelectedModal] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [vehicleList, setVehicleList] = useState([
    {
      id: "VN-RSC-001",
      name: "Cano Cứu hộ Cao tốc SeaGuard",
      type: "Cano",
      status: "ready",
      location: "Bến Bạch Đằng, Q.1",
      driver: "Trần Văn Nam",
      fuel: "95%",
      condition: "Tốt",
    },
    {
      id: "VN-RSC-025",
      name: "Xe cứu thương Mercedes 4x4",
      type: "Xe cứu thương",
      status: "ready-action",
      location: "Trạm Quận 1",
      driver: "Phạm Văn Tú",
      fuel: "92%",
      condition: "Tốt",
    },
    {
      id: "VN-RSC-012",
      name: "Trực thăng Cứu nạn Eurocopter 135",
      type: "Trực thăng",
      status: "maintenance",
      location: "Hangar A, Sân bay TSN",
      driver: "Nguyễn Thị Hương",
      fuel: "45%",
      condition: "Bảo trì",
    },
    {
      id: "VN-RSC-024",
      name: "Xe lội nước đặc chủng 6x6",
      type: "Xe lội nước",
      status: "stop",
      location: "Kho xe Quận 7",
      driver: "Lê Văn Kiên",
      fuel: "30%",
      condition: "Dừng sử dụng",
    },
    {
      id: "VN-RSC-032",
      name: "Tàu cứu hộ cao tốc RescuePro 2000",
      type: "Tàu cứu hộ",
      status: "ready-action",
      location: "Bến Khó, Q.4",
      driver: "Võ Minh Đức",
      fuel: "88%",
      condition: "Tốt",
    },
    {
      id: "VN-RSC-015",
      name: "Xe không người lái Inspection",
      type: "Drone",
      status: "ready",
      location: "Trung tâm Điều hành, Q.1",
      driver: "Ngô Thị Hạnh",
      fuel: "100%",
      condition: "Tốt",
    },
    {
      id: "VN-RSC-008",
      name: "Xe cứu hộ multi-function XL200",
      type: "Xe chuyên dụng",
      status: "maintenance",
      location: "Trạm sửa chữa, Q.12",
      driver: "Đinh Văn Sáng",
      fuel: "20%",
      condition: "Bảo trì",
    },
    {
      id: "VN-RSC-041",
      name: "Cano tuần tra nhanh FastBoat",
      type: "Cano",
      status: "ready",
      location: "Bến Thị Nghè, Q.4",
      driver: "Hồ Văn Long",
      fuel: "85%",
      condition: "Tốt",
    },
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

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
      maintenance: "🔧 Phương tiện đang bảo trì",
      stop: "🛑 Phương tiện dừng sử dụng",
      "ready-action": "🚔 Phương tiện sẵn sàng hành động",
    };
    return titles[type] || "";
  };

  const getStatusCount = (status) => {
    return vehicleList.filter((v) => v.status === status).length;
  };

  const filteredData =
    filterStatus === "all"
      ? vehicleList
      : vehicleList.filter((item) => {
          if (filterStatus === "ready")
            return item.status === "ready" || item.status === "ready-action";
          if (filterStatus === "maintenance") return item.status === "maintenance";
          if (filterStatus === "stop") return item.status === "stop";
          return true;
        });

  const handleActionClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setActionModalVisible(true);
    setSelectedAction(null);
  };

  const handleConfirmAction = () => {
    if (!selectedAction || !selectedVehicle) return;

    const newStatus =
      selectedAction === "ready"
        ? "ready"
        : selectedAction === "maintenance"
        ? "maintenance"
        : "stop";

    setVehicleList(
      vehicleList.map((v) => {
        if (v.id === selectedVehicle.id) {
          return { ...v, status: newStatus };
        }
        return v;
      })
    );

    const actionMessages = {
      ready: "Đã chuyển sang sẵn sàng",
      maintenance: "Đã thêm vào danh sách bảo trì",
      stop: "Đã dừng sử dụng phương tiện",
    };

    message.success(actionMessages[selectedAction]);
    setActionModalVisible(false);
    setSelectedVehicle(null);
    setSelectedAction(null);
  };

  const getStatusTag = (status) => {
    const statusMap = {
      ready: { color: "green", label: "SẴN SÀNG" },
      "ready-action": { color: "blue", label: "SẴN SÀNG HÀNH ĐỘNG" },
      maintenance: { color: "orange", label: "BẢO TRÌ" },
      stop: { color: "red", label: "DỪNG SỬ DỤNG" },
    };
    return statusMap[status] || statusMap.ready;
  };

  return (
    <div className="vehicle-page">
      {/* ================= PERFORMANCE ================= */}
      <div className="vehicle-performance">
        <div className="performance-header">
          <div>
            <h3>Hiệu suất sử dụng phương tiện</h3>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "12px" }}>
              Tổng số phương tiện: {vehicleList.length} | Đang hoạt động: {getStatusCount("ready") + getStatusCount("ready-action")}
            </p>
          </div>
          <span className="percentage">92%</span>
        </div>
        <Progress percent={92} showInfo={false} strokeColor="#3b82f6" />
        
        <div className="performance-metrics">
          <div className="metric-item">
            <div className="metric-label">Tính sẵn sàng</div>
            <div className="metric-value green">95%</div>
            <div className="metric-sub">Phương tiện sẵn sàng hoạt động</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Hiệu suất bảo trì</div>
            <div className="metric-value orange">12%</div>
            <div className="metric-sub">Đang trong quá trình bảo dưỡng</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Trạng thái bất thường</div>
            <div className="metric-value red">8%</div>
            <div className="metric-sub">Phương tiện bị hạn chế sử dụng</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Nhiên liệu trung bình</div>
            <div className="metric-value blue">66%</div>
            <div className="metric-sub">Mức tiêu hao hợp lý</div>
          </div>
        </div>
      </div>

      {/* ================= STAT CARDS ================= */}
      <div className="stat-grid">
        <div onClick={() => handleStatClick("maintenance")}>
          <StatCard
            title="ĐANG BẢO TRÌ"
            value={getStatusCount("maintenance")}
            icon={<ToolOutlined />}
            color="orange"
            subtext={`${((getStatusCount("maintenance") / vehicleList.length) * 100).toFixed(0)}% tổng số`}
            description="Phương tiện được bảo dưỡng định kỳ"
          />
        </div>

        <div onClick={() => handleStatClick("stop")}>
          <StatCard
            title="DỪNG SỬ DỤNG"
            value={getStatusCount("stop")}
            icon={<StopOutlined />}
            color="red"
            subtext={`${((getStatusCount("stop") / vehicleList.length) * 100).toFixed(0)}% tổng số`}
            description="Phương tiện không thể sử dụng"
          />
        </div>

        <div onClick={() => handleStatClick("ready-action")}>
          <StatCard
            title="SẴN SÀNG HÀNH ĐỘNG"
            value={getStatusCount("ready-action")}
            icon={<CheckCircleOutlined />}
            color="blue"
            subtext={`${((getStatusCount("ready-action") / vehicleList.length) * 100).toFixed(0)}% tổng số`}
            description="Phương tiện sẵn sàng triển khai"
          />
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
        {selectedModal === "maintenance" && (
          <VehicleMaintenanceDetail vehicles={vehicleList} />
        )}
        {selectedModal === "stop" && <VehicleStopDetail vehicles={vehicleList} />}
        {selectedModal === "ready-action" && (
          <VehicleReadyActionDetail vehicles={vehicleList} />
        )}
      </Drawer>

      {/* ================= LIST ================= */}
      <div className="vehicle-list">
        <div className="list-header">
          <h3>Danh sách phương tiện</h3>
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
              Sẵn sàng
            </Button>
            <Button
              type={filterStatus === "maintenance" ? "primary" : "default"}
              onClick={() => setFilterStatus("maintenance")}
            >
              Đang bảo trì
            </Button>
            <Button
              type={filterStatus === "stop" ? "primary" : "default"}
              onClick={() => setFilterStatus("stop")}
            >
              Dừng sử dụng
            </Button>
          </div>
        </div>

        <div className="vehicles-table">
          <div className="table-head">
            <span>MÃ XE</span>
            <span>TÊN PHƯƠNG TIỆN</span>
            <span>LOẠI</span>
            <span>VỊ TRÍ</span>
            <span>TRẠNG THÁI</span>
            <span>THAO TÁC</span>
          </div>

          {filteredData.map((vehicle) => (
            <VehicleRow
              key={vehicle.id}
              vehicle={vehicle}
              statusTag={getStatusTag(vehicle.status)}
              onAction={handleActionClick}
            />
          ))}
        </div>
      </div>

      {/* ================= ACTION MODAL ================= */}
      <Modal
        title={
          selectedVehicle
            ? `Điều chỉnh trạng thái: ${selectedVehicle.name}`
            : "Điều chỉnh trạng thái"
        }
        open={actionModalVisible}
        onCancel={() => {
          setActionModalVisible(false);
          setSelectedVehicle(null);
          setSelectedAction(null);
        }}
        footer={[
          <Button key="cancel" onClick={() => setActionModalVisible(false)}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleConfirmAction}
            disabled={!selectedAction}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <div className="action-options">
          <div
            className={`action-item ${selectedAction === "ready" ? "selected" : ""}`}
            onClick={() => setSelectedAction("ready")}
          >
            <div className="action-icon green">
              <CheckCircleOutlined />
            </div>
            <div>
              <strong>Sẵn sàng</strong>
              <p>Xe sẵn sàng để sử dụng</p>
            </div>
          </div>

          <div
            className={`action-item ${selectedAction === "maintenance" ? "selected" : ""}`}
            onClick={() => setSelectedAction("maintenance")}
          >
            <div className="action-icon orange">
              <ToolOutlined />
            </div>
            <div>
              <strong>Đang bảo trì</strong>
              <p>Xe đang được bảo dưỡng</p>
            </div>
          </div>

          <div
            className={`action-item ${selectedAction === "stop" ? "selected" : ""}`}
            onClick={() => setSelectedAction("stop")}
          >
            <div className="action-icon red">
              <StopOutlined />
            </div>
            <div>
              <strong>Dừng sử dụng</strong>
              <p>Xe không thể sử dụng</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, icon, color, subtext, description }) {
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
          {subtext && <div className="stat-subtext">{subtext}</div>}
          {description && <div className="stat-description">{description}</div>}
        </div>
      </div>
    </Card>
  );
}

function VehicleRow({ vehicle, statusTag, onAction }) {
  return (
    <div className="vehicle-row">
      <div className="row-cell">
        <strong>{vehicle.id}</strong>
      </div>
      <div className="row-cell">
        <strong>{vehicle.name}</strong>
      </div>
      <div className="row-cell">
        <Tag color={statusTag.color}>{vehicle.type}</Tag>
      </div>
      <div className="row-cell">
        <EnvironmentOutlined /> {vehicle.location}
      </div>
      <div className="row-cell">
        <Tag color={statusTag.color}>{statusTag.label}</Tag>
      </div>
      <div className="row-cell actions">
        <Button
          type="text"
          icon={<MoreOutlined />}
          onClick={() => onAction(vehicle)}
        />
      </div>
    </div>
  );
}

function VehicleMaintenanceDetail({ vehicles }) {
  const maintenanceVehicles = vehicles.filter((v) => v.status === "maintenance");

  return (
    <div className="drawer-content">
      <div style={{ marginBottom: "20px" }}>
        <p style={{ color: "#64748b", marginBottom: "16px" }}>
          📋 Danh sách {maintenanceVehicles.length} phương tiện đang bảo trì
        </p>
        <div style={{
          padding: "12px 16px",
          backgroundColor: "#fef3c7",
          borderLeft: "4px solid #f59e0b",
          borderRadius: "6px",
          fontSize: "12px",
          color: "#92400e"
        }}>
          💡 <strong>Ghi chú:</strong> Các phương tiện sẽ được trả về sau khi hoàn thành bảo dưỡng
        </div>
      </div>

      {maintenanceVehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          style={{
            padding: "16px",
            border: "2px solid #fed7aa",
            borderRadius: "10px",
            marginBottom: "12px",
            backgroundColor: "#fffbeb",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              marginBottom: "16px",
            }}
          >
            <div>
              <strong style={{ fontSize: "15px" }}>{vehicle.name}</strong>
              <p style={{ fontSize: "12px", color: "#64748b", margin: "4px 0 0" }}>
                {vehicle.id}
              </p>
            </div>
            <Tag color="orange">BẢO TRÌ</Tag>
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#475569",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <div>
              <div style={{ color: "#94a3b8", marginBottom: "4px", fontWeight: "600" }}>📍 Vị trí</div>
              {vehicle.location}
            </div>
            <div>
              <div style={{ color: "#94a3b8", marginBottom: "4px", fontWeight: "600" }}>👤 Lái xe</div>
              {vehicle.driver}
            </div>
            <div>
              <div style={{ color: "#94a3b8", marginBottom: "4px", fontWeight: "600" }}>⛽ Nhiên liệu</div>
              {vehicle.fuel}
            </div>
            <div>
              <div style={{ color: "#94a3b8", marginBottom: "4px", fontWeight: "600" }}>✅ Tình trạng</div>
              {vehicle.condition}
            </div>
          </div>

          <div style={{
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: "1px solid #fed7aa",
            fontSize: "11px",
            color: "#92400e"
          }}>
            🔧 Tiến hành bảo dưỡng định kỳ - Dự kiến hoàn thành: 3-5 ngày
          </div>
        </div>
      ))}
    </div>
  );
}

function VehicleStopDetail({ vehicles }) {
  const stopVehicles = vehicles.filter((v) => v.status === "stop");

  return (
    <div className="drawer-content">
      <div style={{ marginBottom: "20px" }}>
        <p style={{ color: "#64748b", marginBottom: "16px" }}>
          🛑 Danh sách {stopVehicles.length} phương tiện dừng sử dụng
        </p>
        <div style={{
          padding: "12px 16px",
          backgroundColor: "#fee2e2",
          borderLeft: "4px solid #dc2626",
          borderRadius: "6px",
          fontSize: "12px",
          color: "#7f1d1d"
        }}>
          ⚠️ <strong>Lưu ý:</strong> Các phương tiện này cần sửa chữa lớn hoặc thay thế
        </div>
      </div>

      {stopVehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          style={{
            padding: "16px",
            border: "2px solid #fecaca",
            borderRadius: "10px",
            marginBottom: "12px",
            backgroundColor: "#fef2f2",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              marginBottom: "16px",
            }}
          >
            <div>
              <strong style={{ fontSize: "15px" }}>{vehicle.name}</strong>
              <p style={{ fontSize: "12px", color: "#64748b", margin: "4px 0 0" }}>
                {vehicle.id}
              </p>
            </div>
            <Tag color="red">DỪNG SỬ DỤNG</Tag>
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#475569",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <div>
              <div style={{ color: "#94a3b8", marginBottom: "4px", fontWeight: "600" }}>📍 Vị trí</div>
              {vehicle.location}
            </div>
            <div>
              <div style={{ color: "#94a3b8", marginBottom: "4px", fontWeight: "600" }}>👤 Lái xe</div>
              {vehicle.driver}
            </div>
            <div>
              <div style={{ color: "#94a3b8", marginBottom: "4px", fontWeight: "600" }}>⛽ Nhiên liệu</div>
              {vehicle.fuel}
            </div>
            <div>
              <div style={{ color: "#94a3b8", marginBottom: "4px", fontWeight: "600" }}>✅ Tình trạng</div>
              {vehicle.condition}
            </div>
          </div>

          <div style={{
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: "1px solid #fecaca",
            fontSize: "11px",
            color: "#7f1d1d"
          }}>
            🔨 Cần sửa chữa - Liên hệ: Phòng Kỹ thuật
          </div>
        </div>
      ))}
    </div>
  );
}

function VehicleReadyActionDetail({ vehicles }) {
  const readyActionVehicles = vehicles.filter(
    (v) => v.status === "ready-action"
  );

  return (
    <div className="drawer-content">
      <div style={{ marginBottom: "20px" }}>
        <p style={{ color: "#64748b", marginBottom: "16px" }}>
          Danh sách {readyActionVehicles.length} phương tiện sẵn sàng hành động
        </p>
      </div>

      {readyActionVehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          style={{
            padding: "16px",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            marginBottom: "12px",
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              marginBottom: "12px",
            }}
          >
            <div>
              <strong>{vehicle.name}</strong>
              <p style={{ fontSize: "12px", color: "#64748b", margin: "4px 0 0" }}>
                {vehicle.id}
              </p>
            </div>
            <Tag color="blue">SẴN SÀNG HÀNH ĐỘNG</Tag>
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#475569",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div>
              <div style={{ color: "#94a3b8", marginBottom: "4px" }}>📍 Vị trí</div>
              {vehicle.location}
            </div>
            <div>
              <div style={{ color: "#94a3b8", marginBottom: "4px" }}>👤 Lái xe</div>
              {vehicle.driver}
            </div>
            <div>
              <div style={{ color: "#94a3b8", marginBottom: "4px" }}>⛽ Nhiên liệu</div>
              {vehicle.fuel}
            </div>
            <div>
              <div style={{ color: "#94a3b8", marginBottom: "4px" }}>✅ Tình trạng</div>
              {vehicle.condition}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
