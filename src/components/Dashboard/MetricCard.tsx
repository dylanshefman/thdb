import React from 'react';
import { 
  Clock, 
  Users, 
  AlertTriangle, 
  TimerOff, 
  ThumbsUp,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { MetricType } from '../../types';

interface MetricCardProps {
  title: string;
  value: number;
  type: MetricType;
  previousValue?: number;
  isLoading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  type, 
  previousValue,
  isLoading = false 
}) => {
  const formatValue = (val: number, type: MetricType): string => {
    switch (type) {
      case 'onTimePerformance':
      case 'customerSatisfaction':
        return `${val.toFixed(1)}%`;
      case 'ridership':
        return val >= 1000000
          ? `${(val / 1000000).toFixed(2)}M`
          : val >= 1000
          ? `${(val / 1000).toFixed(1)}K`
          : val.toString();
      case 'averageDelay':
        return `${val.toFixed(1)} min`;
      default:
        return val.toString();
    }
  };

  const getIcon = (type: MetricType) => {
    switch (type) {
      case 'onTimePerformance':
        return <Clock className="text-blue-500" size={24} />;
      case 'ridership':
        return <Users className="text-green-500" size={24} />;
      case 'serviceDisruptions':
        return <AlertTriangle className="text-red-500" size={24} />;
      case 'averageDelay':
        return <TimerOff className="text-orange-500" size={24} />;
      case 'customerSatisfaction':
        return <ThumbsUp className="text-purple-500" size={24} />;
      default:
        return <Clock className="text-blue-500" size={24} />;
    }
  };

  const getChangePercent = (): { value: string; isPositive: boolean } => {
    if (previousValue === undefined || previousValue === 0) {
      return { value: '0%', isPositive: true };
    }
    
    const changePercent = ((value - previousValue) / previousValue) * 100;
    const isPositive = 
      (type === 'onTimePerformance' || type === 'ridership' || type === 'customerSatisfaction')
        ? changePercent > 0
        : changePercent < 0;
    
    return {
      value: `${Math.abs(changePercent).toFixed(1)}%`,
      isPositive
    };
  };
  
  const change = getChangePercent();
  const changeIcon = change.isPositive ? 
    <TrendingUp size={16} /> : 
    <TrendingDown size={16} />;
  
  const changeColorClass = change.isPositive ? 
    'text-green-600' : 
    'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-5 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-600 font-medium text-sm">{title}</h3>
        {getIcon(type)}
      </div>
      
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ) : (
        <>
          <div className="flex-grow">
            <p className="text-2xl font-bold text-gray-800">{formatValue(value, type)}</p>
          </div>
          
          {previousValue !== undefined && (
            <div className={`flex items-center text-xs mt-2 ${changeColorClass}`}>
              {changeIcon}
              <span className="ml-1">{change.value} from previous</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MetricCard;