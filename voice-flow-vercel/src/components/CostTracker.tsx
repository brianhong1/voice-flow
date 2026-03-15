// src/components/CostTracker.tsx
import React from 'react';

interface CostTrackerProps {
  todayCost: number;
  monthCost: number;
  recordingCount: number;
  avgCost: number;
}

export const CostTracker: React.FC<CostTrackerProps> = ({
  todayCost,
  monthCost,
  recordingCount,
  avgCost
}) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-md p-6 mb-6 border border-green-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">💰 Cost Tracker</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded p-4 shadow-sm">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Today's Cost</p>
          <p className="text-2xl font-bold text-blue-500 mt-1">${todayCost.toFixed(3)}</p>
        </div>
        <div className="bg-white rounded p-4 shadow-sm">
          <p className="text-xs text-gray-600 uppercase tracking-wide">This Month</p>
          <p className="text-2xl font-bold text-green-500 mt-1">${monthCost.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded p-4 shadow-sm">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Recordings</p>
          <p className="text-2xl font-bold text-purple-500 mt-1">{recordingCount}</p>
        </div>
        <div className="bg-white rounded p-4 shadow-sm">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Avg Cost/Rec</p>
          <p className="text-2xl font-bold text-orange-500 mt-1">${avgCost.toFixed(4)}</p>
        </div>
      </div>
      
      {recordingCount > 0 && (
        <div className="mt-4 pt-4 border-t border-green-100">
          <p className="text-xs text-gray-600">
            <span className="font-semibold">ROI Estimate:</span> At $25/hr, you save approximately ${(recordingCount * 3 * 25 / 60).toFixed(2)} in editing time vs ${monthCost.toFixed(2)} in API costs.
          </p>
        </div>
      )}
    </div>
  );
};
