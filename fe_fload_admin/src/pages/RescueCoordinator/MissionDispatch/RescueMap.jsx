import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 16.0604,
  lng: 108.2246,
};

export default function RescueMap() {
  return (
    <div className="map-shell">
      <LoadScript googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&libraries">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            styles: darkMapStyle,
          }}
        >
          {/* Mission marker */}
          <Marker
            position={{ lat: 16.06, lng: 108.22 }}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />

          {/* Rescue team */}
          <Marker
            position={{ lat: 16.07, lng: 108.215 }}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
            }}
          />
        </GoogleMap>
      </LoadScript>

      {/* Legend */}
      <div className="map-legend">
        <span><i className="dot red" /> Cấp bách</span>
        <span><i className="dot green" /> Sẵn sàng</span>
      </div>
    </div>
  );
}

/* DARK STYLE */
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#0b1620" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9ca3af" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#020617" }] },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#020617" }],
  },
];
