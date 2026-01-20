import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

import MapHeader from "../../components/MapHeader/MapHeader";
import RescueSidebar from "../../components/RescueSidebar/RescueSidebar";

import {
  greenIcon,
  blueIcon,
  redIcon,
} from "../../utils/leafletIcons";

import "./RescueMap.css";

const center = [10.8231, 106.6297]; // HCM

const rescueTeams = [
  { id: 1, status: "available", position: [10.78, 106.68] },
  { id: 2, status: "busy", position: [10.75, 106.65] },
  { id: 3, status: "emergency", position: [10.77, 106.7] },
];

const getIcon = (status) => {
  if (status === "available") return greenIcon;
  if (status === "busy") return blueIcon;
  return redIcon;
};

const RescueMap = () => {
  const mapRef = useRef(null);
  const [userPosition, setUserPosition] = useState(null);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ GPS");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const currentPos = [latitude, longitude];

        setUserPosition(currentPos);

        mapRef.current?.setView(currentPos, 16, {
          animate: true,
        });
      },
      () => {
        alert("Không thể lấy vị trí hiện tại");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  return (
    <div className="rescue-page">
      <MapHeader />

      <div className="map-layout">
        <RescueSidebar />

        <div className="map-wrapper">
          {/* GPS BUTTON */}
     

          <MapContainer
            center={center}
            zoom={12}
            scrollWheelZoom
            zoomControl={false} // tắt mặc định
            whenCreated={(map) => (mapRef.current = map)}
            style={{ width: "100%", height: "100%" }}

          >
                 <button className="gps-btn" onClick={handleLocate}>
            📍
          </button>
            {/* ZOOM IN / OUT ICON */}
            <ZoomControl position="bottomright" />

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* MARKER ĐỘI CỨU HỘ */}
            {rescueTeams.map((team) => (
              <Marker
                key={team.id}
                position={team.position}
                icon={getIcon(team.status)}
              >
                <Popup>
                  <b>Đội cứu hộ</b>
                  <br />
                  Trạng thái: <b>{team.status}</b>
                </Popup>
              </Marker>
            ))}

            {/* MARKER VỊ TRÍ HIỆN TẠI */}
            {userPosition && (
              <Marker position={userPosition}>
                <Popup>📍 Vị trí hiện tại của bạn</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default RescueMap;
