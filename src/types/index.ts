export type TransitAgency = {
  id: string;
  name: string;
  city: string;
  state: string;
  transitType: TransitType[];
  url: string;
  gtfsUrl?: string;
  logoUrl?: string;
};

export type TransitType = 'bus' | 'subway' | 'light-rail' | 'commuter-rail' | 'ferry' | 'cable-car' | 'gondola' | 'funicular';

export type GtfsStaticFeed = {
  id: number;
  state: string | null;
  municipality: string | null;
  provider: string;
  name: string | null;
  feed_contact_email: string | null;
  direct_download: string | null;
  authentication_type: number;
  api_key_parameter_name: string | null;
  latest: string | null;
  license: string | null;
  minimum_latitude: number | null;
  maximum_latitude: number | null;
  minimum_longitude: number | null;
  maximum_longitude: number | null;
  extracted_on: string;
  status: 'active' | 'inactive';
  features: string | null;
};

export type GtfsRealtimeFeed = {
  id: number;
  provider: string;
  static_reference: number;
  direct_download: string;
  authentication_type: number;
  api_key_parameter_name: string | null;
  license: string | null;
  status: 'active' | 'inactive';
};

export type PerformanceMetric = {
  id: string;
  agencyId: string;
  date: string;
  onTimePerformance: number; // percentage
  ridership: number;
  serviceDisruptions: number;
  averageDelay: number; // minutes
  customerSatisfaction?: number; // 0-100
};

export type TimeRange = '24h' | '7d' | '30d' | '90d' | '1y';

export type MetricType = 'onTimePerformance' | 'ridership' | 'serviceDisruptions' | 'averageDelay' | 'customerSatisfaction';

export type FilterOptions = {
  states: string[];
  transitTypes: TransitType[];
  timeRange: TimeRange;
  metricTypes: MetricType[];
};

export type AgencyComparison = {
  agencyId: string;
  metricType: MetricType;
  value: number;
  nationalAverage: number;
  percentDifference: number;
};

export type MapPoint = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  status: 'normal' | 'delayed' | 'disrupted' | 'outOfService';
  type: TransitType;
  metrics?: {
    delay?: number; // minutes
    affectedLines?: number;
  };
};