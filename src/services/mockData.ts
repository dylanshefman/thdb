import { TransitAgency, PerformanceMetric, MapPoint } from '../types';
import { subDays, format } from 'date-fns';

// Mock transit agencies
export const mockAgencies: TransitAgency[] = [
  {
    id: 'nyct',
    name: 'New York City Transit',
    city: 'New York',
    state: 'NY',
    transitType: ['subway', 'bus'],
    url: 'https://new.mta.info/',
    gtfsUrl: 'https://api.mta.info/GTFS',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/MTA_NYC_Transit_logo.svg'
  },
  {
    id: 'sfmta',
    name: 'San Francisco Municipal Transportation Agency',
    city: 'San Francisco',
    state: 'CA',
    transitType: ['bus', 'light-rail', 'cable-car'],
    url: 'https://www.sfmta.com/',
    gtfsUrl: 'https://gtfs.sfmta.com/transitdata/google_transit.zip'
  },
  {
    id: 'mbta',
    name: 'Massachusetts Bay Transportation Authority',
    city: 'Boston',
    state: 'MA',
    transitType: ['subway', 'bus', 'commuter-rail', 'ferry'],
    url: 'https://www.mbta.com/',
    gtfsUrl: 'https://cdn.mbta.com/MBTA_GTFS.zip'
  },
  {
    id: 'wmata',
    name: 'Washington Metropolitan Area Transit Authority',
    city: 'Washington',
    state: 'DC',
    transitType: ['subway', 'bus'],
    url: 'https://www.wmata.com/',
    gtfsUrl: 'https://gtfsapi.wmata.com/gtfs_data.zip'
  },
  {
    id: 'cta',
    name: 'Chicago Transit Authority',
    city: 'Chicago',
    state: 'IL',
    transitType: ['subway', 'bus'],
    url: 'https://www.transitchicago.com/',
    gtfsUrl: 'https://www.transitchicago.com/downloads/sch_data/'
  }
];

// Generate mock performance data
export const generateMockPerformanceData = (): PerformanceMetric[] => {
  const data: PerformanceMetric[] = [];
  
  // Generate 90 days of data for each agency
  mockAgencies.forEach(agency => {
    for (let i = 0; i < 90; i++) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      
      // Create slightly randomized but trending data
      const baseOnTime = Math.min(95, Math.max(70, 85 + (Math.sin(i / 10) * 5) + (Math.random() * 10 - 5)));
      const baseRidership = Math.floor(500000 + (Math.sin(i / 15) * 100000) + (Math.random() * 50000));
      const baseDisruptions = Math.floor(5 + (Math.sin(i / 7) * 3) + (Math.random() * 5));
      const baseDelay = Math.min(15, Math.max(1, 5 + (Math.sin(i / 12) * 2) + (Math.random() * 4 - 2)));
      
      data.push({
        id: `${agency.id}-${date}`,
        agencyId: agency.id,
        date,
        onTimePerformance: parseFloat(baseOnTime.toFixed(1)),
        ridership: baseRidership,
        serviceDisruptions: baseDisruptions,
        averageDelay: parseFloat(baseDelay.toFixed(1)),
        customerSatisfaction: parseFloat((baseOnTime * 0.8).toFixed(1))
      });
    }
  });
  
  return data;
};

// Mock map points for transit systems
export const mockMapPoints: MapPoint[] = [
  // New York
  {
    id: 'nyct-1',
    lat: 40.7128,
    lng: -74.006,
    name: 'Downtown Manhattan',
    status: 'normal',
    type: 'subway'
  },
  {
    id: 'nyct-2',
    lat: 40.7382,
    lng: -73.9928,
    name: 'Union Square',
    status: 'delayed',
    type: 'subway',
    metrics: { delay: 15, affectedLines: 3 }
  },
  {
    id: 'nyct-3',
    lat: 40.6782,
    lng: -73.9442,
    name: 'Brooklyn',
    status: 'disrupted',
    type: 'subway',
    metrics: { delay: 25, affectedLines: 2 }
  },
  
  // San Francisco
  {
    id: 'sfmta-1',
    lat: 37.7749,
    lng: -122.4194,
    name: 'Downtown SF',
    status: 'normal',
    type: 'light-rail'
  },
  {
    id: 'sfmta-2',
    lat: 37.7936,
    lng: -122.3939,
    name: 'Fisherman\'s Wharf',
    status: 'delayed',
    type: 'cable-car',
    metrics: { delay: 10, affectedLines: 1 }
  },
  
  // Boston
  {
    id: 'mbta-1',
    lat: 42.3601,
    lng: -71.0589,
    name: 'Downtown Boston',
    status: 'normal',
    type: 'subway'
  },
  
  // Washington DC
  {
    id: 'wmata-1',
    lat: 38.9072,
    lng: -77.0369,
    name: 'Downtown DC',
    status: 'disrupted',
    type: 'subway',
    metrics: { delay: 20, affectedLines: 2 }
  },
  
  // Chicago
  {
    id: 'cta-1',
    lat: 41.8781,
    lng: -87.6298,
    name: 'The Loop',
    status: 'normal',
    type: 'subway'
  }
];