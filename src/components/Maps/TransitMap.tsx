import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { MapPoint, TransitType } from '../../types';

interface TransitMapProps {
  points: MapPoint[];
  selectedAgencyIds: string[];
  center?: [number, number];
  zoom?: number;
  isLoading?: boolean;
}

const TransitMap: React.FC<TransitMapProps> = ({
  points,
  selectedAgencyIds,
  center = [39.8283, -98.5795], // Center of US
  zoom = 4,
  isLoading = false,
}) => {
  const [activePoint, setActivePoint] = useState<MapPoint | null>(null);
  
  const getStatusColor = (status: MapPoint['status']): string => {
    switch (status) {
      case 'normal': return '#22c55e'; // Green
      case 'delayed': return '#f97316'; // Orange
      case 'disrupted': return '#ef4444'; // Red
      case 'outOfService': return '#64748b'; // Slate
      default: return '#64748b';
    }
  };
  
  const getMarkerIcon = (point: MapPoint) => {
    const color = getStatusColor(point.status);
    
    return divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1);
        "></div>
      `,
      className: '',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
  };
  
  const getTransitTypeLabel = (type: TransitType): string => {
    switch (type) {
      case 'bus': return 'Bus';
      case 'subway': return 'Subway';
      case 'light-rail': return 'Light Rail';
      case 'commuter-rail': return 'Commuter Rail';
      case 'ferry': return 'Ferry';
      case 'cable-car': return 'Cable Car';
      case 'gondola': return 'Gondola';
      case 'funicular': return 'Funicular';
      default: return type;
    }
  };
  
  const getStatusLabel = (status: MapPoint['status']): string => {
    switch (status) {
      case 'normal': return 'Operating Normally';
      case 'delayed': return 'Experiencing Delays';
      case 'disrupted': return 'Service Disruption';
      case 'outOfService': return 'Out of Service';
      default: return status;
    }
  };
  
  const filterPoints = () => {
    if (selectedAgencyIds.length === 0) return points;
    
    return points.filter(point => {
      const agencyId = point.id.split('-')[0]; // Extract agency ID from point ID
      return selectedAgencyIds.includes(agencyId);
    });
  };
  
  const filteredPoints = filterPoints();
  
  if (isLoading) {
    return (
      <div className="rounded-lg shadow-md animate-pulse bg-gray-100 h-96"></div>
    );
  }
  
  return (
    <div className="rounded-lg shadow-md overflow-hidden h-96">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {filteredPoints.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={getMarkerIcon(point)}
            eventHandlers={{
              click: () => {
                setActivePoint(point);
              },
            }}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-medium">{point.name}</h3>
                <div className="mt-1">
                  <div className="flex items-center">
                    <span 
                      className={`inline-block w-3 h-3 rounded-full mr-2`}
                      style={{ backgroundColor: getStatusColor(point.status) }}
                    ></span>
                    <span>{getStatusLabel(point.status)}</span>
                  </div>
                  <div className="mt-1">Type: {getTransitTypeLabel(point.type)}</div>
                  
                  {point.metrics && (
                    <div className="mt-2 text-xs">
                      {point.metrics.delay && (
                        <div>Average Delay: {point.metrics.delay} minutes</div>
                      )}
                      {point.metrics.affectedLines && (
                        <div>Affected Lines: {point.metrics.affectedLines}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {activePoint && <MapRecenter point={activePoint} />}
      </MapContainer>
    </div>
  );
};

// Helper component to recenter map on active point
interface MapRecenterProps {
  point: MapPoint;
}

const MapRecenter: React.FC<MapRecenterProps> = ({ point }) => {
  const map = useMap();
  map.setView([point.lat, point.lng], 12);
  return null;
};

export default TransitMap;