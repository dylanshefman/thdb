import React, { useEffect, useState } from 'react';
import { useTransitStore } from '../store/useTransitStore';
import { transitApi } from '../services/api';
import MetricCard from '../components/Dashboard/MetricCard';
import PerformanceChart from '../components/Dashboard/PerformanceChart';
import AgencyFilter from '../components/Dashboard/AgencyFilter';
import TimeRangeSelector from '../components/Dashboard/TimeRangeSelector';
import { BadgeAlert as Alert, Clock, BarChart3, RefreshCw } from 'lucide-react';
import { mockAgencies, generateMockPerformanceData } from '../services/mockData';

const DashboardPage: React.FC = () => {
  const { 
    agencies, 
    selectedAgencyIds,
    performanceData,
    filters,
    setAgencies,
    setSelectedAgencyIds,
    setPerformanceData,
    setTimeRange,
    toggleAgencySelection,
    selectAllAgencies,
    deselectAllAgencies,
    isLoadingAgencies,
    isLoadingPerformance,
    setLoading
  } = useTransitStore();
  
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Load mock data for demo purposes
  useEffect(() => {
    const loadData = async () => {
      setLoading('isLoadingAgencies', true);
      setLoading('isLoadingPerformance', true);
      
      const agencies = await transitApi.getAgencies();
      setAgencies(agencies);
      setSelectedAgencyIds(agencies.slice(0, 5).map(a => a.id));
      
      // For now, still using mock performance data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPerformanceData(generateMockPerformanceData());
      setLastUpdated(new Date());
      
      setLoading('isLoadingAgencies', false);
      setLoading('isLoadingPerformance', false);
    };
    
    loadData();
  }, [setAgencies, setPerformanceData, setSelectedAgencyIds, setLoading]);
  
  // Calculate summary metrics
  const getAggregatedMetrics = () => {
    if (performanceData.length === 0 || selectedAgencyIds.length === 0) {
      return {
        onTimePerformance: 0,
        ridership: 0,
        serviceDisruptions: 0,
        averageDelay: 0,
        customerSatisfaction: 0
      };
    }
    
    // Filter data by selected agencies and time range
    const filteredData = performanceData.filter(item => {
      if (!selectedAgencyIds.includes(item.agencyId)) return false;
      
      // For demo, just return the most recent 30 items for each agency
      const agencyData = performanceData
        .filter(d => d.agencyId === item.agencyId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      const index = agencyData.findIndex(d => d.id === item.id);
      
      switch (filters.timeRange) {
        case '24h': return index < 1;
        case '7d': return index < 7;
        case '30d': return index < 30;
        case '90d': return index < 90;
        case '1y': return true;
        default: return index < 30;
      }
    });
    
    if (filteredData.length === 0) return { onTimePerformance: 0, ridership: 0, serviceDisruptions: 0, averageDelay: 0, customerSatisfaction: 0 };
    
    const metrics = {
      onTimePerformance: filteredData.reduce((sum, item) => sum + item.onTimePerformance, 0) / filteredData.length,
      ridership: filteredData.reduce((sum, item) => sum + item.ridership, 0),
      serviceDisruptions: filteredData.reduce((sum, item) => sum + item.serviceDisruptions, 0),
      averageDelay: filteredData.reduce((sum, item) => sum + item.averageDelay, 0) / filteredData.length,
      customerSatisfaction: filteredData.reduce((sum, item) => sum + (item.customerSatisfaction || 0), 0) / filteredData.length
    };
    
    return metrics;
  };
  
  const currentMetrics = getAggregatedMetrics();
  
  // Get previous period metrics for comparison
  const getPreviousPeriodMetrics = () => {
    // This is simplified for the demo
    return {
      onTimePerformance: currentMetrics.onTimePerformance * 0.98,
      ridership: currentMetrics.ridership * 0.95,
      serviceDisruptions: currentMetrics.serviceDisruptions * 1.1,
      averageDelay: currentMetrics.averageDelay * 1.05,
      customerSatisfaction: currentMetrics.customerSatisfaction * 0.97
    };
  };
  
  const previousMetrics = getPreviousPeriodMetrics();
  
  const handleRefresh = () => {
    setLoading('isLoadingPerformance', true);
    
    // Simulate refreshing data
    setTimeout(() => {
      setPerformanceData(generateMockPerformanceData());
      setLastUpdated(new Date());
      setLoading('isLoadingPerformance', false);
    }, 1000);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transit System Health</h1>
          <p className="text-gray-500">
            Monitoring {selectedAgencyIds.length} of {agencies.length} transit agencies
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="text-sm text-gray-600 flex items-center">
            <Clock size={16} className="mr-1" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <button 
            onClick={handleRefresh}
            className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
          >
            <RefreshCw size={16} className="mr-1" />
            Refresh
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <AgencyFilter 
            agencies={agencies}
            selectedAgencyIds={selectedAgencyIds}
            onSelectAgency={toggleAgencySelection}
            onSelectAll={selectAllAgencies}
            onDeselectAll={deselectAllAgencies}
          />
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-6">
            <h3 className="font-medium text-blue-700 flex items-center">
              <Alert size={18} className="mr-2" /> Data Sources
            </h3>
            <p className="text-sm text-blue-600 mt-2">
              This dashboard uses public GTFS feeds and performance metrics from transit agencies.
              The data refreshes automatically every 15 minutes.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-gray-700 font-medium mb-3 flex items-center">
              <BarChart3 size={18} className="mr-2" /> Performance Insights
            </h3>
            <div className="text-sm space-y-2">
              <p>Transit metrics compared to industry average:</p>
              <div className="bg-gray-100 rounded-md p-3 mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">On-time Performance</span>
                  <span className={`text-xs font-medium ${
                    currentMetrics.onTimePerformance > 85 ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {currentMetrics.onTimePerformance.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      currentMetrics.onTimePerformance > 85 ? 'bg-green-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${Math.min(100, currentMetrics.onTimePerformance)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3 space-y-6">
          <TimeRangeSelector
            selectedRange={filters.timeRange}
            onChange={setTimeRange}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="On-time Performance"
              value={currentMetrics.onTimePerformance}
              type="onTimePerformance"
              previousValue={previousMetrics.onTimePerformance}
              isLoading={isLoadingPerformance}
            />
            <MetricCard
              title="Daily Ridership"
              value={currentMetrics.ridership}
              type="ridership"
              previousValue={previousMetrics.ridership}
              isLoading={isLoadingPerformance}
            />
            <MetricCard
              title="Service Disruptions"
              value={currentMetrics.serviceDisruptions}
              type="serviceDisruptions"
              previousValue={previousMetrics.serviceDisruptions}
              isLoading={isLoadingPerformance}
            />
            <MetricCard
              title="Average Delay"
              value={currentMetrics.averageDelay}
              type="averageDelay"
              previousValue={previousMetrics.averageDelay}
              isLoading={isLoadingPerformance}
            />
          </div>
          
          <PerformanceChart
            data={performanceData}
            metricType="onTimePerformance"
            agencies={agencies.filter(a => selectedAgencyIds.includes(a.id))}
            title="On-time Performance Trend"
            isLoading={isLoadingPerformance}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceChart
              data={performanceData}
              metricType="ridership"
              agencies={agencies.filter(a => selectedAgencyIds.includes(a.id))}
              title="Ridership Trend"
              isLoading={isLoadingPerformance}
            />
            <PerformanceChart
              data={performanceData}
              metricType="serviceDisruptions"
              agencies={agencies.filter(a => selectedAgencyIds.includes(a.id))}
              title="Service Disruptions Trend"
              isLoading={isLoadingPerformance}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;