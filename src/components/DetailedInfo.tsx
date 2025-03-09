import React from "react";
import type { DetailedInfo } from "../types/types";

interface DetailedInfoProps {
  detailedInfo: DetailedInfo[];
}

const DetailedInfo: React.FC<DetailedInfoProps> = ({ detailedInfo }) => (
  <div className="mb-4 p-4 bg-white shadow rounded-lg w-full max-w-md">
    <h2 className="font-semibold text-gray-700 mb-2">Detailed Information</h2>
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
);

export default DetailedInfo;
