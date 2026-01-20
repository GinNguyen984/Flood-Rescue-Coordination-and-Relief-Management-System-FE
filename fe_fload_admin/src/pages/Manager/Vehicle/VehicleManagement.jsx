import { Tag, Button, Select } from "antd";
import {
  EnvironmentOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import "./VehicleManagement.css";

const vehicles = [
  {
    id: "001",
    name: "Cano Cứu hộ Cao tốc SeaGuard",
    brand: "Yamaha Maritime",
    type: "Cano",
    status: "ready",
    location: "Bến Bạch Đằng, Q.1",
    avatar: "👩‍✈️",
  },
  {
    id: "005",
    name: "Xe Cứu thương Mercedes Sprinter",
    brand: "Mercedes-Benz",
    type: "Xe cứu thương",
    status: "active",
    location: "Khu vực B-12 (Tâm bão)",
    avatar: "👩‍⚕️",
  },
  {
    id: "012",
    name: "Trực thăng Cứu nạn Eurocopter 135",
    brand: "Airbus Helicopters",
    type: "Trực thăng",
    status: "maintenance",
    location: "Hangar A, Sân bay TSN",
    avatar: "👩‍✈️",
  },
  {
    id: "024",
    name: "Xe lội nước đặc chủng 6x6",
    brand: "RescueTech Corp",
    type: "Xe lội nước",
    status: "ready",
    location: "Trạm Cứu hộ Nhà Bè",
    avatar: "👨‍🚒",
  },
];

const statusMap = {
  ready: <Tag color="green">SẴN SÀNG</Tag>,
  active: <Tag color="blue">ĐANG SỬ DỤNG</Tag>,
  maintenance: <Tag color="gold">BẢO TRÌ</Tag>,
};

export default function VehicleManagement() {
  return (
    <div className="vehicle-page">
        {/* ===== SUMMARY ===== */}
      <div className="vehicle-summary">
        <SummaryCard
          icon={<BarChartOutlined />}
          title="HIỆU SUẤT SỬ DỤNG"
          value="78.5%"
          note="+2.4% tháng qua"
        />
        <SummaryCard
          icon={<ToolOutlined />}
          title="ĐANG BẢO TRÌ"
          value="04"
          note="Phương tiện"
          color="orange"
        />
        <SummaryCard
          icon={<CheckCircleOutlined />}
          title="SẴN SÀNG ĐIỀU ĐỘNG"
          value="22"
          note="Phương tiện"
          color="green"
        />
      </div>
      {/* ===== FILTER ===== */}
      <div className="vehicle-filter">
        <Select defaultValue="all" style={{ width: 200 }}>
          <Select.Option value="all">Tất cả phương tiện</Select.Option>
          <Select.Option value="ready">Sẵn sàng</Select.Option>
          <Select.Option value="active">Đang sử dụng</Select.Option>
          <Select.Option value="maintenance">Bảo trì</Select.Option>
        </Select>

        <div className="view-switch">
          <Button icon={<AppstoreOutlined />} />
          <Button icon={<UnorderedListOutlined />} />
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="vehicle-table">
        <div className="table-header">
          <span>THÔNG TIN PHƯƠNG TIỆN</span>
          <span>MÃ HIỆU</span>
          <span>LOẠI</span>
          <span>TRẠNG THÁI</span>
          <span>VỊ TRÍ HIỆN TẠI</span>
          <span>THAO TÁC</span>
        </div>

        {vehicles.map((v) => (
          <div key={v.id} className="table-row">
            <div className="vehicle-info">
              <div className="avatar">{v.avatar}</div>
              <div>
                <strong>{v.name}</strong>
                <p>Hãng: {v.brand}</p>
              </div>
            </div>

            <div className="code">VN-RSC-{v.id}</div>

            <div className="type">{v.type}</div>

            <div>{statusMap[v.status]}</div>

            <div className="location">
              <EnvironmentOutlined /> {v.location}
            </div>

            <div className="actions">⋮</div>
          </div>
        ))}
      </div>

      {/* ===== PAGINATION ===== */}
      <div className="vehicle-pagination">
        {/* <span>Hiển thị 4 trong số 42 phương tiện cứu hộ</span> */}
        <div>
          <Button>Trước</Button>
          <Button type="primary">1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>Sau</Button>
        </div>
      </div>

      
    </div>
  );
}

/* ===== SUB ===== */

function SummaryCard({ icon, title, value, note, color }) {
  return (
    <div className={`summary-card ${color || ""}`}>
      <div className="summary-icon">{icon}</div>
      <div>
        <span>{title}</span>
        <h3>{value}</h3>
        <p>{note}</p>
      </div>
    </div>
  );
}
