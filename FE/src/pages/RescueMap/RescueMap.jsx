import { useState } from "react";
import MapHeader from "../../components/MapHeader/MapHeader";
import RescueSidebar from "../../components/RescueSidebar/RescueSidebar";
import "./RescueMap.css";

const DEFAULT_POS = {
  lat: 10.7731,
  lng: 106.7031,
};

export default function RescueMap() {
  const [pos, setPos] = useState(DEFAULT_POS);
  const [zoom, setZoom] = useState(14);

  /* ===== GPS (GIỐNG GOOGLE MAP WEB) ===== */
  const locateUser = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ GPS");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (p) => {
        const lat = p.coords.latitude;
        const lng = p.coords.longitude;

        setPos({ lat, lng });
        setZoom(17); // ✅ zoom gần cho đẹp
      },
      () => alert("Không lấy được vị trí"),
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="rescue-page">
      <MapHeader />

      <div className="map-layout">
        <RescueSidebar />

        <div className="map-wrapper">
          {/* GOOGLE MAP IFRAME */}
          <iframe
            title="map"
            src={`https://www.google.com/maps?q=${pos.lat},${pos.lng}&z=${zoom}&output=embed`}
            loading="lazy"
            allowFullScreen
          />

          {/* GPS BUTTON */}
          <button className="gps-btn" onClick={locateUser} title="Vị trí của tôi">
            ⦿
          </button>
        </div>
      </div>
    </div>
  );
}
