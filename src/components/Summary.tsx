import React from "react";
import type { Summary } from "../types/types";

interface SummaryProps {
  summary: Summary;
}

const Summary: React.FC<SummaryProps> = ({ summary }) => (
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
);

export default Summary;
