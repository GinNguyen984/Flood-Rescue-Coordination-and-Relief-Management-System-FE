import { Card, Progress, Tag } from "antd";
import {
  PlayCircleOutlined,
  CarOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  EnvironmentOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import "./DashboardOverview.css";

/* ================= DATA ================= */

// UC-M11: Hiệu suất cứu hộ theo ngày (%)
const rescuePerformanceData = [
  { day: "Thứ 2", value: 62 },
  { day: "Thứ 3", value: 78 },
  { day: "Thứ 4", value: 70 },
  { day: "Thứ 5", value: 88 },
  { day: "Thứ 6", value: 66 },
  { day: "Thứ 7", value: 72 },
  { day: "CN", value: 90 },
];

// UC-M13: Thống kê nhiệm vụ theo tuần
const rescueStatisticData = [
  { week: "Tuần 1", value: 24 },
  { week: "Tuần 2", value: 36 },
  { week: "Tuần 3", value: 28 },
  { week: "Tuần 4", value: 40 },
];

export default function DashboardOverview() {
  return (
    <div className="dashboard">
      {/* ===== TOP STATS ===== */}
      <div className="stat-grid">
        <StatCard
          title="NHIỆM VỤ ĐANG CHẠY"
          value="24"
          change="+5.2%"
          icon={<PlayCircleOutlined />}
          color="green"
        />

        <StatCard
          title="PHƯƠNG TIỆN SẴN SÀNG"
          value="15"
          change="-2 v.x"
          icon={<CarOutlined />}
          color="red"
        />

        <StatCard
          title="PHÊ DUYỆT CHỜ XỬ LÝ"
          value="08"
          change="+12%"
          icon={<CheckCircleOutlined />}
          color="green"
        />

        <StatCard
          title="MỨC TỒN KHO THIẾT YẾU"
          value="82%"
          icon={<BarChartOutlined />}
          progress={82}
        />
      </div>

      {/* ===== CHARTS ===== */}
      <div className="chart-grid">
        {/* ===== UC-M11 ===== */}
        <Card className="chart-card">
          <div className="chart-header">
            <div>
              <h4>Hiệu suất cứu hộ (UC-M11)</h4>
              <span>Tỉ lệ hoàn thành nhiệm vụ theo thời gian</span>
            </div>
            <Tag>7 ngày qua</Tag>
          </div>

          <div className="fake-chart">
            <svg viewBox="0 0 700 200" width="100%" height="200">
              <polyline
                fill="none"
                stroke="#2f4f4f"
                strokeWidth="3"
                points={rescuePerformanceData
                  .map((d, i) => {
                    const x =
                      (i / (rescuePerformanceData.length - 1)) * 700;
                    const y = 200 - (d.value / 100) * 180;
                    return `${x},${y}`;
                  })
                  .join(" ")}
              />
            </svg>

            <div className="chart-labels">
              {rescuePerformanceData.map((d) => (
                <span key={d.day}>{d.day}</span>
              ))}
            </div>
          </div>
        </Card>

        {/* ===== UC-M13 ===== */}
        <Card className="chart-card">
          <div className="chart-header">
            <div>
              <h4>Thống kê nhiệm vụ (UC-M13)</h4>
              <span>Số lượng điều động theo tuần</span>
            </div>
            <div className="total">
              <strong>
                {rescueStatisticData.reduce(
                  (sum, item) => sum + item.value,
                  0
                )}
              </strong>
              <span>TỔNG THÁNG</span>
            </div>
          </div>

          <div className="bar-placeholder">
            {rescueStatisticData.map((item) => (
              <div key={item.week} className="bar-item">
                <div
                  className="bar"
                  style={{ height: `${item.value * 2}px` }}
                />
                <span>{item.week}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ===== TABLE ===== */}
      <Card className="table-card">
        <div className="table-tabs">
          <span className="active">🚑 Phương tiện (UC-M01)</span>
          <span>📦 Kho cứu trợ (UC-M05)</span>
          <span>
            ✅ Phê duyệt phân phối (UC-M20)
            <Tag color="red">8</Tag>
          </span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>MÃ HIỆU</th>
              <th>LOẠI PHƯƠNG TIỆN</th>
              <th>TRẠNG THÁI</th>
              <th>NHÂN SỰ PHỤ TRÁCH</th>
              <th>VỊ TRÍ HIỆN TẠI</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="code">VN-RSC-001</td>
              <td>Cano Cứu hộ Cao tốc</td>
              <td><Tag color="green">SẴN SÀNG</Tag></td>
              <td>
                <span className="user-dot" />
                Trần Văn Nam
              </td>
              <td>
                <EnvironmentOutlined /> Bến Bạch Đằng
              </td>
              <td><MoreOutlined /></td>
            </tr>

            <tr>
              <td className="code">VN-RSC-005</td>
              <td>Xe Cứu thương 4x4</td>
              <td><Tag color="blue">ĐANG SỬ DỤNG</Tag></td>
              <td>
                <span className="user-dot dark" />
                Lê Thị Hoa
              </td>
              <td>
                <EnvironmentOutlined /> Vùng tâm bão B1
              </td>
              <td><MoreOutlined /></td>
            </tr>

            <tr>
              <td className="code">VN-RSC-012</td>
              <td>Trực thăng Cứu hộ H-12</td>
              <td><Tag color="gold">BẢO TRÌ</Tag></td>
              <td>
                <span className="user-dot gray" />
                Nguyễn Văn Kỳ
              </td>
              <td>
                <EnvironmentOutlined /> Hangar khu A
              </td>
              <td><MoreOutlined /></td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ================= SUB COMPONENT ================= */

function StatCard({ title, value, change, icon, color, progress }) {
  return (
    <Card className="stat-card">
      <div className="stat-header">
        <span>{title}</span>
        <div className="stat-icon">{icon}</div>
      </div>

      <div className="stat-body">
        <h2>{value}</h2>
        {change && (
          <span className={`change ${color}`}>{change}</span>
        )}
        {progress && <Progress percent={progress} showInfo={false} />}
      </div>
    </Card>
  );
}
