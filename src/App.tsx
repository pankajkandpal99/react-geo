import React, { useState, useRef } from "react";
import {
  GeoJSONData,
  Summary as SummaryType,
  DetailedInfo as DetailedInfoType,
} from "./types/types";
import { calculateLength } from "./utils/calculateLength";
import FileUpload from "./components/FileUpload";
import Summary from "./components/Summary";
import DetailedInfo from "./components/DetailedInfo";
import MapView from "./components/MapView";
import { parseKML } from "./utils/parseKML";

const App: React.FC = () => {
  const [summary, setSummary] = useState<SummaryType | null>(null);
  const [detailedInfo, setDetailedInfo] = useState<DetailedInfoType[] | null>(
    null
  );
  const [geoJsonData, setGeoJsonData] = useState<GeoJSONData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    try {
      const parsedData = await parseKML(file);
      setGeoJsonData(parsedData);
      setError(null);
    } catch (err) {
      setError(err as string);
    }
  };

  const handleSummary = () => {
    if (!geoJsonData) return;

    const counts: SummaryType = {};
    geoJsonData.features.forEach((feature) => {
      const type = feature.geometry.type;
      counts[type] = (counts[type] || 0) + 1;
    });
    setSummary(counts);
  };

  const handleDetailed = () => {
    if (!geoJsonData) return;

    const details: DetailedInfoType[] = [];
    geoJsonData.features.forEach((feature) => {
      const type = feature.geometry.type;
      if (type === "LineString" || type === "MultiLineString") {
        const length = calculateLength(feature.geometry.coordinates);
        details.push({ type, length });
      }
    });
    setDetailedInfo(details);
  };

  const handleReset = () => {
    setSummary(null);
    setDetailedInfo(null);
    setGeoJsonData(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isSummaryDisabled = !geoJsonData;
  const isDetailedDisabled = !geoJsonData;
  const isResetDisabled = !geoJsonData && !summary && !detailedInfo;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">KML File Viewer</h1>
      <FileUpload onFileUpload={handleFileUpload} />
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
      {summary && <Summary summary={summary} />}
      {detailedInfo && <DetailedInfo detailedInfo={detailedInfo} />}
      <MapView geoJsonData={geoJsonData} />
    </div>
  );
};

export default App;
