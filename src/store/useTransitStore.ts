import { create } from 'zustand';
import { TransitAgency, PerformanceMetric, FilterOptions, TimeRange, TransitType, MetricType } from '../types';

interface TransitStore {
  // Data
  agencies: TransitAgency[];
  selectedAgencyIds: string[];
  performanceData: PerformanceMetric[];
  
  // Filters
  filters: FilterOptions;
  
  // Loading states
  isLoadingAgencies: boolean;
  isLoadingPerformance: boolean;
  
  // Actions
  setAgencies: (agencies: TransitAgency[]) => void;
  setSelectedAgencyIds: (ids: string[]) => void;
  setPerformanceData: (data: PerformanceMetric[]) => void;
  updateFilters: (filters: Partial<FilterOptions>) => void;
  toggleAgencySelection: (id: string) => void;
  selectAllAgencies: () => void;
  deselectAllAgencies: () => void;
  setTimeRange: (range: TimeRange) => void;
  setLoading: (key: 'isLoadingAgencies' | 'isLoadingPerformance', value: boolean) => void;
}

export const useTransitStore = create<TransitStore>((set) => ({
  // Initial data
  agencies: [],
  selectedAgencyIds: [],
  performanceData: [],
  
  // Initial filters
  filters: {
    states: [],
    transitTypes: [],
    timeRange: '30d',
    metricTypes: ['onTimePerformance', 'ridership', 'serviceDisruptions', 'averageDelay'],
  },
  
  // Loading states
  isLoadingAgencies: false,
  isLoadingPerformance: false,
  
  // Actions
  setAgencies: (agencies) => set({ agencies }),
  
  setSelectedAgencyIds: (ids) => set({ selectedAgencyIds: ids }),
  
  // Update to automatically select first 5 agencies when setting agencies
  setAgenciesAndSelect: (agencies) => set((state) => ({
    agencies,
    selectedAgencyIds: agencies.slice(0, 5).map(a => a.id)
  })),
  
  setPerformanceData: (data) => set({ performanceData: data }),
  
  updateFilters: (filters) => set((state) => ({
    filters: {
      ...state.filters,
      ...filters
    }
  })),
  
  toggleAgencySelection: (id) => set((state) => {
    const isSelected = state.selectedAgencyIds.includes(id);
    return {
      selectedAgencyIds: isSelected
        ? state.selectedAgencyIds.filter(agencyId => agencyId !== id)
        : [...state.selectedAgencyIds, id]
    };
  }),
  
  selectAllAgencies: () => set((state) => ({
    selectedAgencyIds: state.agencies.map(agency => agency.id)
  })),
  
  deselectAllAgencies: () => set({ selectedAgencyIds: [] }),
  
  setTimeRange: (range) => set((state) => ({
    filters: {
      ...state.filters,
      timeRange: range
    }
  })),
  
  setLoading: (key, value) => set((state) => ({
    [key]: value
  })),
}));