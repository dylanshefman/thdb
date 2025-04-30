import React, { useEffect } from 'react';
import { useTransitStore } from '../store/useTransitStore';
import { transitApi } from '../services/api';
import { TransitAgency, TransitType } from '../types';
import { ExternalLink, Filter, Bus, Train, Ship, Search, Loader2 } from 'lucide-react';

const AgenciesPage: React.FC = () => {
  const {
    agencies,
    setAgencies,
    isLoadingAgencies,
    setLoading
  } = useTransitStore();
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterState, setFilterState] = React.useState<string>('');
  const [filterType, setFilterType] = React.useState<TransitType | ''>('');
  const [sortBy, setSortBy] = React.useState<'name' | 'state' | 'city'>('name');
  const [displayCount, setDisplayCount] = React.useState(50);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  
  // Intersection Observer reference
  const loadMoreRef = React.useRef<HTMLDivElement>(null);
  
  const getTransitTypeIcon = (type: TransitType, size = 16) => {
    switch (type) {
      case 'bus':
        return <Bus size={size} className="text-green-600" />;
      case 'subway':
      case 'light-rail':
      case 'commuter-rail':
        return <Train size={size} className="text-blue-600" />;
      case 'ferry':
        return <Ship size={size} className="text-cyan-600" />;
      default:
        return <Bus size={size} className="text-gray-500" />;
    }
  };
  
  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = searchTerm === '' ||
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = filterState === '' || agency.state === filterState;
    const matchesType = filterType === '' || agency.transitType.includes(filterType);
    
    return matchesSearch && matchesState && matchesType;
  });
  
  // Sort agencies - Moved before useEffect
  const sortedAgencies = [...filteredAgencies].sort((a, b) => {
    switch (sortBy) {
      case 'state':
        return a.state.localeCompare(b.state) || a.name.localeCompare(b.name);
      case 'city':
        return a.city.localeCompare(b.city) || a.name.localeCompare(b.name);
      default:
        return a.name.localeCompare(b.name);
    }
  });
  
  // Set up intersection observer for infinite scroll
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          // Simulate loading delay
          setTimeout(() => {
            setDisplayCount(prev => Math.min(prev + 50, sortedAgencies.length));
            setIsLoadingMore(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );
    
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    
    return () => observer.disconnect();
  }, [sortedAgencies.length, isLoadingMore]);
  
  // Load mock agencies
  useEffect(() => {
    const loadData = async () => {
      setLoading('isLoadingAgencies', true);
      
      const agencies = await transitApi.getAgencies();
      setAgencies(agencies);
      
      setLoading('isLoadingAgencies', false);
    };
    
    loadData();
  }, [setAgencies, setLoading]);
  
  // Get unique states for filter
  const states = [...new Set(agencies.map(agency => agency.state))].sort();
  
  // Get unique transit types for filter
  const transitTypes: TransitType[] = [...new Set(
    agencies.flatMap(agency => agency.transitType)
  )].sort() as TransitType[];
  
  const getTransitTypeName = (type: TransitType): string => {
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
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transit Agencies</h1>
        <p className="text-gray-500">
          Browse and filter {agencies.length} transit agencies across the United States
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-grow">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Agencies
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search by name, city, or state..."
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-10 pr-3 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
            <div>
              <label htmlFor="stateFilter" className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                id="stateFilter"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Transit Type
              </label>
              <select
                id="typeFilter"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as TransitType | '')}
              >
                <option value="">All Types</option>
                {transitTypes.map(type => (
                  <option key={type} value={type}>{getTransitTypeName(type)}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sortBy"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'state' | 'city')}
              >
                <option value="name">Agency Name</option>
                <option value="state">State</option>
                <option value="city">City</option>
              </select>
            </div>
            
            <div className="col-span-2 md:col-span-1 flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterState('');
                  setFilterType('');
                }}
                className="w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isLoadingAgencies ? (
        <div className="grid grid-cols-1 gap-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm h-28"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredAgencies.length} of {agencies.length} agencies
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {sortedAgencies.slice(0, displayCount).map(agency => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
            
            {sortedAgencies.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">No agencies match your filters. Try adjusting your search criteria.</p>
              </div>
            ) : displayCount < sortedAgencies.length && (
              <div 
                ref={loadMoreRef}
                className="text-center py-8 flex items-center justify-center"
              >
                <Loader2 className="animate-spin mr-2" size={20} />
                <span className="text-gray-600">Loading more agencies...</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

interface AgencyCardProps {
  agency: TransitAgency;
}

const AgencyCard: React.FC<AgencyCardProps> = ({ agency }) => {
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
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="mb-3 sm:mb-0">
          <h3 className="font-semibold text-gray-800">{agency.name}</h3>
          <p className="text-gray-600 text-sm">
            {agency.city ? `${agency.city}, ${agency.state}` : agency.state}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {agency.transitType.map((type, index) => (
              <div key={`${agency.id}-${type}-${index}`} className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs">
                {getTransitTypeIcon(type)}
                <span className="ml-1">{type.replace('-', ' ')}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <a
            href={agency.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <ExternalLink size={14} className="mr-1" />
            Agency Website
          </a>
          
          {agency.gtfsUrl && (
            <a
              href={agency.gtfsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-green-600 hover:text-green-800"
            >
              <ExternalLink size={14} className="mr-1" />
              GTFS Feed
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgenciesPage;