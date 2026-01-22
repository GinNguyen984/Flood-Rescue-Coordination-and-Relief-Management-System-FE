import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

import MapHeader from "../../components/MapHeader/MapHeader";
import RescueSidebar from "../../components/RescueSidebar/RescueSidebar";

import "./RescueMap.css";

const center = {
  lat: 10.8231,
  lng: 106.6297,
};

const rescueTeams = [
  {
    id: 1,
    name: "Đội Phản ứng Nhanh Sài Gòn",
    position: { lat: 10.78, lng: 106.68 },
  },
  {
    id: 2,
    name: "Cứu hộ Thủy nạn Miền Nam",
    position: { lat: 10.75, lng: 106.65 },
  },
];

const RescueMap = () => {
  const mapRef = useRef(null);
  const [userPos, setUserPos] = useState(null);

  /* ===== GPS FREE ===== */
  const locateUser = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ GPS");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setUserPos(position);

        if (mapRef.current) {
          mapRef.current.panTo(position);
          mapRef.current.setZoom(16);
        }
      },
      () => alert("Không lấy được vị trí GPS"),
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="rescue-page">
      <MapHeader />

      <div className="map-layout">
        <RescueSidebar />

        <div className="map-wrapper">
          <LoadScript googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={center}
              zoom={13}
              onLoad={(map) => (mapRef.current = map)}
            >
              {/* USER */}
              {userPos && (
                <Marker
                  position={userPos}
                  icon={{
                    url:
                      "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  }}
                />
              )}

              {/* TEAMS */}
              {rescueTeams.map((team) => (
                <Marker
                  key={team.id}
                  position={team.position}
                  icon={{
                    url:
                      "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  }}
                />
              ))}
            </GoogleMap>
          </LoadScript>

          {/* GPS BUTTON */}
          <button className="gps-btn" onClick={locateUser}>
            📍
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescueMap;
