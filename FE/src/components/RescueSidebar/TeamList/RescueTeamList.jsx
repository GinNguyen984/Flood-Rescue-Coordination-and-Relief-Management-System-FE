import { useEffect, useState } from "react";
import { Input, Select, Button, Tag } from "antd";
import {
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "./RescueTeamList.css";

const { Option } = Select;

/* ================= DATA ================= */

const teamsData = [
  {
    id: 1,
    name: "Đội Phản ứng Nhanh Sài Gòn",
    specialty: "Y tế, Sơ cứu",
    status: "free",
    lat: 10.7769,
    lng: 106.7009,
  },
  {
    id: 2,
    name: "Cứu hộ Thủy nạn Miền Nam",
    specialty: "Xuồng máy, cứu nạn",
    status: "busy",
    lat: 10.7626,
    lng: 106.6602,
  },
  {
    id: 3,
    name: "Đội Cứu hộ Quận 7",
    specialty: "Cứu hộ dân cư",
    status: "free",
    lat: 10.7326,
    lng: 106.7219,
  },
  {
    id: 4,
    name: "Đội Cứu nạn Giao thông",
    specialty: "Tai nạn đường bộ",
    status: "busy",
    lat: 10.8108,
    lng: 106.7091,
  },
];

/* ================= UTILS ================= */

const getDistanceKm = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

/* ================= MAIN ================= */

const RescueTeamList = () => {
  const [filter, setFilter] = useState("all"); // all | free | nearest
  const [userLocation, setUserLocation] = useState(null);

  /* ===== GET GPS WHEN FILTER = NEAREST ===== */
  useEffect(() => {
    if (filter === "nearest" && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          alert("Không thể lấy vị trí GPS");
          setFilter("all");
        }
      );
    }
  }, [filter, userLocation]);

  /* ===== FILTER + SORT ===== */
  const teams = (() => {
    // CHỈ ĐỘI RẢNH
    const freeTeams = teamsData.filter(
      (t) => t.status === "free"
    );
  
    if (filter === "free") {
      return freeTeams;
    }
  
    if (filter === "nearest" && userLocation) {
      return freeTeams
        .map((t) => ({
          ...t,
          distance: getDistanceKm(
            userLocation.lat,
            userLocation.lng,
            t.lat,
            t.lng
          ),
        }))
        .sort((a, b) => a.distance - b.distance);
    }
  
    // all
    return teamsData;
  })();
  
  return (
    <>
      {/* ================= FIXED FILTER ================= */}
      <div className="sidebar-fixed">
        <Input
          placeholder="🔍 Tìm kiếm đội cứu hộ..."
          className="search-team"
        />

        <div className="dropdowns">
          <Select defaultValue="all">
            <Option value="all">Tất cả khu vực</Option>
          </Select>
          <Select defaultValue="type">
            <Option value="type">Loại cứu hộ</Option>
          </Select>
        </div>

        <div className="chips">
          <Button
            type={filter === "all" ? "primary" : "default"}
            shape="round"
            onClick={() => setFilter("all")}
          >
            Tất cả
          </Button>
          <Button
            type={filter === "free" ? "primary" : "default"}
            shape="round"
            onClick={() => setFilter("free")}
          >
            Đang rảnh
          </Button>
          <Button
            type={filter === "nearest" ? "primary" : "default"}
            shape="round"
            onClick={() => setFilter("nearest")}
          >
            Gần nhất
          </Button>
        </div>

        <h4 className="section-title">
          ĐỘI CỨU HỘ GẦN NHẤT ({teams.length})
        </h4>
      </div>

      {/* ================= SCROLL LIST ================= */}
      <div className="team-list-scroll">
        {teams.map((team) => (
          <TeamCard key={team.id} {...team} />
        ))}
      </div>
    </>
  );
};

export default RescueTeamList;

/* ================= CARD ================= */

function TeamCard({
  name,
  specialty,
  status,
  distance,
  lat,
  lng,
}) {
  const isFree = status === "free";

  const openDirection = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  };

  return (
    <div className={`team-card ${!isFree ? "busy" : ""}`}>
      <div className="team-header">
        <h5>{name}</h5>
        {isFree ? (
          <Tag color="green">RẢNH</Tag>
        ) : (
          <Tag>ĐANG BẬN</Tag>
        )}
      </div>

      <p className="specialty">{specialty}</p>

      <div className="team-meta">
        {distance !== undefined && (
          <span>📍 {distance.toFixed(2)} km</span>
        )}
      </div>

      {isFree && (
        <div className="team-actions">
          <Button
            type="primary"
            icon={<PhoneOutlined />}
            block
          >
            Liên hệ
          </Button>

          <Button
            icon={<EnvironmentOutlined />}
            className="btn-direction"
            onClick={openDirection}
          >
            Chỉ đường
          </Button>
        </div>
      )}
    </div>
  );
}
