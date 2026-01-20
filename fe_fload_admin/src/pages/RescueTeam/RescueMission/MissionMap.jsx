import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "./MissionMap.css";

const center = { lat: 10.776889, lng: 106.700806 };

export default function MissionMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao",
    libraries: ["places"],
  });

  if (!isLoaded) return <div className="map-loading">Loading map...</div>;

  return (
    <div className="mission-map-wrapper">
      <GoogleMap
        center={center}
        zoom={14}
        mapContainerClassName="mission-map"
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        <Marker position={center} />
      </GoogleMap>

      {/* INFO OVERLAY */}
      <div className="map-time-box">
        <span>THỜI GIAN ƯỚC TÍNH</span>
        <strong>8 phút</strong>
        <small>(2.4 km)</small>
      </div>
    </div>
  );
}
