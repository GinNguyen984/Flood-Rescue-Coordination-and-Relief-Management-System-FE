import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";

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
    status: "free",
    position: { lat: 10.78, lng: 106.68 },
  },
  {
    id: 2,
    name: "Cứu hộ Thủy nạn Miền Nam",
    status: "busy",
    position: { lat: 10.75, lng: 106.65 },
  },
];

const RescueMap = () => {
  const [userPos, setUserPos] = useState(null);
  const [directions, setDirections] = useState(null);

  /* ===== LẤY GPS USER ===== */
  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Không lấy được vị trí GPS")
    );
  };

  /* ===== VẼ CHỈ ĐƯỜNG ===== */
  const drawRoute = useCallback(
    (destination) => {
      if (!userPos) {
        alert("Vui lòng bật GPS trước");
        return;
      }

      const service = new window.google.maps.DirectionsService();

      service.route(
        {
          origin: userPos,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            alert("Không thể tìm đường");
          }
        }
      );
    },
    [userPos]
  );

  return (
    <div className="rescue-page">
      <MapHeader />

      <div className="map-layout">
        {/* SIDEBAR */}
        <RescueSidebar onDirection={drawRoute} />

        {/* MAP */}
        <div className="map-wrapper">
          <LoadScript
            googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao"
            libraries={["places"]}
          >
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={userPos || center}
              zoom={13}
            >
              {/* USER MARKER */}
              {userPos && (
                <Marker
                  position={userPos}
                  label="📍"
                />
              )}

              {/* TEAM MARKER */}
              {rescueTeams.map((team) => (
                <Marker
                  key={team.id}
                  position={team.position}
                  label={team.name}
                  onClick={() => drawRoute(team.position)}
                />
              ))}

              {/* ROUTE */}
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    polylineOptions: {
                      strokeColor: "#1d4ed8",
                      strokeWeight: 5,
                    },
                  }}
                />
              )}
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
