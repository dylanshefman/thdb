import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import { TransitAgency, PerformanceMetric, FilterOptions, MapPoint, GtfsStaticFeed, GtfsRealtimeFeed } from '../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const transitApi = {
  getGtfsFeeds: async (): Promise<GtfsStaticFeed[]> => {
    try {
      const { data, error } = await supabase
        .from('gtfs_static')
        .select('*')
        .eq('authentication_type', 0)
        .eq('status', 'active');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching GTFS feeds:', error);
      return [];
    }
  },

  getRealtimeFeeds: async (staticIds: number[]): Promise<GtfsRealtimeFeed[]> => {
    try {
      const { data, error } = await supabase
        .from('gtfs_rt')
        .select('*')
        .eq('status', 'active')
        .in('static_reference', staticIds);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching realtime feeds:', error);
      return [];
    }
  },

  // Convert GTFS feed to TransitAgency format
  convertGtfsToAgency: (feed: GtfsStaticFeed): TransitAgency => ({
    id: feed.id.toString(),
    name: feed.provider,
    city: feed.municipality || '',
    state: feed.state || 'National',
    transitType: feed.features ? 
      feed.features.split('|').map(f => f.includes('fares') ? 'bus' : 'bus' as TransitType) : 
      ['bus'],
    url: feed.direct_download || feed.latest || '',
    gtfsUrl: feed.latest || feed.direct_download || '',
  }),

  // Get all transit agencies from GTFS feeds
  getAgencies: async (): Promise<TransitAgency[]> => {
    try {
      const feeds = await transitApi.getGtfsFeeds();
      return feeds.map(transitApi.convertGtfsToAgency);
    } catch (error) {
      console.error('Error converting GTFS feeds to agencies:', error);
      return [];
    }
  },
};