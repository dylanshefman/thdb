import React from 'react';
import { TimeRange } from '../../types';

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onChange: (range: TimeRange) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedRange,
  onChange,
}) => {
  const ranges: { value: TimeRange; label: string }[] = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
  ];
  
  return (
    <div className="flex items-center justify-end mb-4 space-x-1">
      <span className="text-sm text-gray-500 mr-2">Time Range:</span>
      <div className="flex bg-gray-100 rounded-lg p-1">
        {ranges.map((range) => (
          <button
            key={range.value}
            className={`px-3 py-1 text-sm rounded ${
              selectedRange === range.value
                ? 'bg-white shadow-sm text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            } transition-colors`}
            onClick={() => onChange(range.value)}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeRangeSelector;