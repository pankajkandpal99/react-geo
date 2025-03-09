import { useState, useRef } from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import * as toGeoJSON from "@tmcw/togeojson";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Custom marker icon for production build
const customIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

function App() {
  const [summary, setSummary] = useState<Record<string, number> | null>(null);
  const [detailedInfo, setDetailedInfo] = useState<Array<{
    type: string;
    length: number;
  }> | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if the file is a KML file
    if (
      file.type !== "application/vnd.google-earth.kml+xml" &&
      file.name.split(".").pop() !== "kml"
    ) {
      setError("Please upload a valid KML file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;
      const parser = new DOMParser();
      try {
        const kml = parser.parseFromString(
          e.target.result as string,
          "text/xml"
        );
        const converted = toGeoJSON.kml(kml);
        if (!converted.features || converted.features.length === 0) {
          setError("The KML file is empty or invalid.");
          return;
        }
        setGeoJsonData(converted);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(
          "Failed to parse the KML file. Please check the file and try again."
        );
      }
    };
    reader.onerror = () => {
      setError("Failed to read the file. Please try again.");
    };
    reader.readAsText(file);
  };

  const handleSummary = () => {
    if (!geoJsonData) return;

    const counts: Record<string, number> = {};
    geoJsonData.features.forEach((feature: any) => {
      const type = feature.geometry.type;
      counts[type] = (counts[type] || 0) + 1;
    });
    setSummary(counts);
  };

  const handleDetailed = () => {
    if (!geoJsonData) return;

    const details: Array<{ type: string; length: number }> = [];
    geoJsonData.features.forEach((feature: any) => {
      const type = feature.geometry.type;
      if (type === "LineString" || type === "MultiLineString") {
        const length = calculateLength(feature.geometry.coordinates);
        details.push({ type, length });
      }
    });
    setDetailedInfo(details);
  };

  const calculateLength = (coordinates: any[]): number => {
    // Simplified length calculation for demonstration purposes
    return coordinates.length;
  };

  const handleReset = () => {
    setSummary(null);
    setDetailedInfo(null);
    setGeoJsonData(null);
    setError(null);
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input field
    }
  };

  // Disable buttons conditionally
  const isSummaryDisabled = !geoJsonData;
  const isDetailedDisabled = !geoJsonData;
  const isResetDisabled = !geoJsonData && !summary && !detailedInfo;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">KML File Viewer</h1>
      <input
        type="file"
        accept=".kml"
        onChange={handleFileUpload}
        ref={fileInputRef} // Attach ref to the input
        className="mb-4 p-2 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
      />
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleSummary}
          disabled={isSummaryDisabled}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
            isSummaryDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          } transition-all duration-300`}
        >
          Summary
        </button>
        <button
          onClick={handleDetailed}
          disabled={isDetailedDisabled}
          className={`bg-green-500 text-white px-4 py-2 rounded-lg ${
            isDetailedDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          } transition-all duration-300`}
        >
          Detailed
        </button>
        <button
          onClick={handleReset}
          disabled={isResetDisabled}
          className={`bg-red-500 text-white px-4 py-2 rounded-lg ${
            isResetDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          } transition-all duration-300`}
        >
          Reset
        </button>
      </div>
      {summary && (
        <div className="mb-4 p-4 bg-white shadow rounded-lg w-full max-w-md">
          <h2 className="font-semibold text-gray-700 mb-2">Summary</h2>
          <ul className="space-y-1">
            {Object.entries(summary).map(([key, value]) => (
              <li key={key} className="text-gray-600">
                <span className="font-medium">{key}:</span> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
      {detailedInfo && (
        <div className="mb-4 p-4 bg-white shadow rounded-lg w-full max-w-md">
          <h2 className="font-semibold text-gray-700 mb-2">
            Detailed Information
          </h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-4 text-gray-600">Type</th>
                <th className="text-left py-2 px-4 text-gray-600">Length</th>
              </tr>
            </thead>
            <tbody>
              {detailedInfo.map((info, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="py-2 px-4 text-gray-700">{info.type}</td>
                  <td className="py-2 px-4 text-gray-700">
                    {info.length.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <MapContainer
        center={[20, 78] as LatLngExpression}
        zoom={5}
        className="h-96 w-full rounded-lg shadow-lg"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            pointToLayer={(_feature, latlng) =>
              L.marker(latlng, { icon: customIcon })
            }
          />
        )}
      </MapContainer>
    </div>
  );
}

export default App;
