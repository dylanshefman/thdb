import React, { useState } from 'react';
import { TransitAgency, TransitType } from '../../types';
import { Bus, Train, Ship, Filter, CheckCircle2 } from 'lucide-react';

interface AgencyFilterProps {
  agencies: TransitAgency[];
  selectedAgencyIds: string[];
  onSelectAgency: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

const AgencyFilter: React.FC<AgencyFilterProps> = ({
  agencies,
  selectedAgencyIds,
  onSelectAgency,
  onSelectAll,
  onDeselectAll,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const getTransitTypeIcon = (type: TransitType) => {
    switch (type) {
      case 'bus':
        return <Bus size={16} className="text-green-600" />;
      case 'subway':
      case 'light-rail':
      case 'commuter-rail':
        return <Train size={16} className="text-blue-600" />;
      case 'ferry':
        return <Ship size={16} className="text-cyan-600" />;
      default:
        return <Bus size={16} className="text-gray-500" />;
    }
  };
  
  const getAgencyTransitIcons = (agency: TransitAgency) => {
    return (
      <div className="flex space-x-1">
        {agency.transitType.slice(0, 3).map((type, index) => (
          <span key={`${agency.id}-${type}-${index}`} title={type}>
            {getTransitTypeIcon(type)}
          </span>
        ))}
        {agency.transitType.length > 3 && (
          <span className="text-xs text-gray-500">+{agency.transitType.length - 3}</span>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-700 font-medium">Transit Agencies</h3>
        <div className="flex space-x-2">
          <button
            onClick={onSelectAll}
            className="text-xs px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded flex items-center"
          >
            <CheckCircle2 size={14} className="mr-1" /> Select All
          </button>
          <button
            onClick={onDeselectAll}
            className="text-xs px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded"
          >
            Clear
          </button>
          <button
            onClick={toggleFilter}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Filter agencies"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>
      
      {isFilterOpen && (
        <div className="mb-4 p-3 bg-gray-50 rounded grid grid-cols-2 md:grid-cols-3 gap-2">
          <div>
            <div className="text-xs font-medium mb-1 text-gray-500">State</div>
            <select className="text-sm w-full p-1 border rounded">
              <option value="">All States</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="MA">Massachusetts</option>
              <option value="DC">Washington DC</option>
              <option value="IL">Illinois</option>
            </select>
          </div>
          <div>
            <div className="text-xs font-medium mb-1 text-gray-500">Transit Type</div>
            <select className="text-sm w-full p-1 border rounded">
              <option value="">All Types</option>
              <option value="bus">Bus</option>
              <option value="subway">Subway</option>
              <option value="light-rail">Light Rail</option>
              <option value="commuter-rail">Commuter Rail</option>
              <option value="ferry">Ferry</option>
            </select>
          </div>
          <div>
            <div className="text-xs font-medium mb-1 text-gray-500">Sort By</div>
            <select className="text-sm w-full p-1 border rounded">
              <option value="name">Agency Name</option>
              <option value="performance">Performance</option>
              <option value="ridership">Ridership</option>
            </select>
          </div>
        </div>
      )}
      
      <div className="max-h-64 overflow-y-auto">
        <ul className="space-y-2">
          {agencies.map((agency) => (
            <li
              key={agency.id}
              className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                selectedAgencyIds.includes(agency.id)
                  ? 'bg-blue-50 border border-blue-100'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
              onClick={() => onSelectAgency(agency.id)}
            >
              <div className="flex-grow flex items-center">
                <span className={`h-3 w-3 rounded-full mr-2 ${
                  selectedAgencyIds.includes(agency.id) ? 'bg-blue-500' : 'bg-gray-300'
                }`}></span>
                <div>
                  <div className="font-medium text-sm">{agency.name}</div>
                  <div className="text-xs text-gray-500">
                    {agency.city}, {agency.state}
                  </div>
                </div>
              </div>
              {getAgencyTransitIcons(agency)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AgencyFilter;