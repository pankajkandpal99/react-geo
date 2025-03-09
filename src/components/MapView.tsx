import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSONData } from "../types/types";

const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

interface MapViewProps {
  geoJsonData: GeoJSONData | null;
}

const MapView: React.FC<MapViewProps> = ({ geoJsonData }) => (
  <MapContainer
    center={[20, 78]}
    zoom={5}
    className="h-96 w-full rounded-lg shadow-lg"
  >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {geoJsonData && (
      <GeoJSON
        data={geoJsonData}
        pointToLayer={(_feature, latlng) => L.marker(latlng, { icon: customIcon })}
      />
    )}
  </MapContainer>
);

export default MapView;