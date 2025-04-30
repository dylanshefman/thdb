import React from 'react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PerformanceMetric, MetricType, TransitAgency } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceChartProps {
  data: PerformanceMetric[];
  metricType: MetricType;
  agencies: TransitAgency[];
  title: string;
  isLoading?: boolean;
}

// Define a color palette for agencies
const agencyColors = [
  'rgb(53, 162, 235)',
  'rgb(255, 99, 132)',
  'rgb(75, 192, 192)',
  'rgb(255, 159, 64)',
  'rgb(153, 102, 255)',
  'rgb(255, 205, 86)',
  'rgb(201, 203, 207)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(255, 99, 132)',
];

const getMetricUnit = (type: MetricType): string => {
  switch (type) {
    case 'onTimePerformance':
    case 'customerSatisfaction':
      return 'Percentage (%)';
    case 'ridership':
      return 'Passengers';
    case 'serviceDisruptions':
      return 'Disruption Count';
    case 'averageDelay':
      return 'Minutes';
    default:
      return '';
  }
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  metricType,
  agencies,
  title,
  isLoading = false,
}) => {
  // Group data by agency and collect unique dates
  const groupedData = React.useMemo(() => {
    const dateSet = new Set<string>();
    const agencyData: Record<string, Record<string, number>> = {};
    
    // Initialize with empty objects for all agencies
    agencies.forEach(agency => {
      agencyData[agency.id] = {};
    });
    
    // Populate with actual data
    data.forEach(item => {
      dateSet.add(item.date);
      if (agencyData[item.agencyId]) {
        agencyData[item.agencyId][item.date] = item[metricType] as number;
      }
    });
    
    // Sort dates
    const sortedDates = Array.from(dateSet).sort();
    
    return { agencyData, sortedDates };
  }, [data, agencies, metricType]);
  
  // Prepare chart data
  const chartData = {
    labels: groupedData.sortedDates,
    datasets: agencies.map((agency, index) => {
      const color = agencyColors[index % agencyColors.length];
      
      return {
        label: agency.name,
        data: groupedData.sortedDates.map(date => 
          groupedData.agencyData[agency.id][date] || null
        ),
        borderColor: color,
        backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.5)'),
        borderWidth: 2,
        pointRadius: 1,
        pointHoverRadius: 5,
        tension: 0.3,
      };
    }),
  };
  
  // Chart options
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: metricType !== 'averageDelay',
        title: {
          display: true,
          text: getMetricUnit(metricType),
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          maxTicksLimit: 10,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
      axis: 'x',
    },
  };
  
  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow h-72">
        <div className="animate-pulse h-full flex flex-col">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="flex-grow bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-700 font-medium mb-4">{title}</h3>
      <div className="h-72">
        <Line 
          data={chartData} 
          options={options} 
        />
      </div>
    </div>
  );
};

export default PerformanceChart;