import React, { useEffect, useState } from 'react';
import { useTransitStore } from '../store/useTransitStore';
import TransitMap from '../components/Maps/TransitMap';
import MapLegend from '../components/Maps/MapLegend';
import AgencyFilter from '../components/Dashboard/AgencyFilter';
import { MapPoint } from '../types';
import { mockMapPoints, mockAgencies } from '../services/mockData';
import { RefreshCw, MapPin, Filter } from 'lucide-react';

const MapPage: React.FC = () => {
  const {
    agencies,
    selectedAgencyIds,
    toggleAgencySelection,
    selectAllAgencies,
    deselectAllAgencies,
    setAgencies,
    setSelectedAgencyIds,
    isLoadingAgencies,
    setLoading
  } = useTransitStore();

  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  // Load mock data
  useEffect(() => {
    const loadData = async () => {
      setIsLoadingMap(true);
      setLoading('isLoadingAgencies', true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAgencies(mockAgencies);
      setSelectedAgencyIds(mockAgencies.slice(0, 3).map(a => a.id));

      await new Promise(resolve => setTimeout(resolve, 500));

      setMapPoints(mockMapPoints);
      
      setIsLoadingMap(false);
      setLoading('isLoadingAgencies', false);
    };

    loadData();
  }, [setAgencies, setSelectedAgencyIds, setLoading]);

  const handleRefresh = () => {
    setIsLoadingMap(true);
    
    // Simulate refreshing data
    setTimeout(() => {
      setMapPoints(mockMapPoints);
      setIsLoadingMap(false);
    }, 1000);
  };

  // Calculate statistics
  const getMapStatistics = () => {
    if (mapPoints.length === 0) return { total: 0, normal: 0, delayed: 0, disrupted: 0, outOfService: 0 };
    
    const filtered = mapPoints.filter(point => {
      if (selectedAgencyIds.length === 0) return true;
      const agencyId = point.id.split('-')[0];
      return selectedAgencyIds.includes(agencyId);
    });
    
    return {
      total: filtered.length,
      normal: filtered.filter(p => p.status === 'normal').length,
      delayed: filtered.filter(p => p.status === 'delayed').length,
      disrupted: filtered.filter(p => p.status === 'disrupted').length,
      outOfService: filtered.filter(p => p.status === 'outOfService').length
    };
  };
  
  const stats = getMapStatistics();
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transit System Map</h1>
          <p className="text-gray-500">
            Real-time status of transit systems across the United States
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
          >
            <Filter size={16} className="mr-1" />
            {filterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
          <button 
            onClick={handleRefresh}
            className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
          >
            <RefreshCw size={16} className="mr-1" />
            Refresh
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {filterOpen && (
          <div className="col-span-1">
            <AgencyFilter 
              agencies={agencies}
              selectedAgencyIds={selectedAgencyIds}
              onSelectAgency={toggleAgencySelection}
              onSelectAll={selectAllAgencies}
              onDeselectAll={deselectAllAgencies}
            />
            
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="text-gray-700 font-medium mb-3 flex items-center">
                <MapPin size={18} className="mr-2" /> Map Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Points:</span>
                  <span className="font-medium">{stats.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Normal:</span>
                  <span className="font-medium text-green-600">{stats.normal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delayed:</span>
                  <span className="font-medium text-orange-600">{stats.delayed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Disrupted:</span>
                  <span className="font-medium text-red-600">{stats.disrupted}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Out of Service:</span>
                  <span className="font-medium text-gray-600">{stats.outOfService}</span>
                </div>
              </div>
            </div>
            
            <MapLegend />
          </div>
        )}
        
        <div className={`${filterOpen ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          <TransitMap
            points={mapPoints}
            selectedAgencyIds={selectedAgencyIds}
            isLoading={isLoadingMap}
          />
          
          {!filterOpen && <MapLegend />}
        </div>
      </div>
    </div>
  );
};

export default MapPage;