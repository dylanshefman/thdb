import React from 'react';

const MapLegend: React.FC = () => {
  const legendItems = [
    { status: 'Operating Normally', color: '#22c55e' },
    { status: 'Experiencing Delays', color: '#f97316' },
    { status: 'Service Disruption', color: '#ef4444' },
    { status: 'Out of Service', color: '#64748b' },
  ];
  
  return (
    <div className="bg-white shadow-sm rounded-lg p-3 my-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Map Legend</h3>
      <div className="flex flex-wrap gap-3">
        {legendItems.map((item) => (
          <div key={item.status} className="flex items-center">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-xs text-gray-600">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;