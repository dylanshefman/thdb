import React from 'react';
import { Database, MapPin, Activity, Info, GitMerge, GithubIcon } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About Transit Health Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Info size={24} className="mr-2 text-blue-600" />
            Project Overview
          </h2>
          <p className="text-gray-700 mb-4">
            The Transit Health Dashboard integrates data feeds from American transit systems to analyze and
            visualize key performance metrics. This tool helps transit agencies, urban planners, 
            researchers, and riders gain insights into transit system performance across the United States.
          </p>
          <p className="text-gray-700">
            Our mission is to improve transit service quality through data transparency and analysis. 
            By aggregating performance metrics from multiple transit agencies, we can identify trends, 
            benchmark performance, and share best practices across the industry.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Database size={24} className="mr-2 text-indigo-600" />
            Data Sources
          </h2>
          <p className="text-gray-700 mb-4">
            Our dashboard relies on the following data sources:
          </p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="font-medium text-gray-800 mb-1">GTFS Data Feeds</h3>
              <p className="text-gray-600 text-sm">
                General Transit Feed Specification (GTFS) data from transit agencies provides 
                schedule information, routes, stops, and trip data. We use these feeds to calculate 
                on-time performance and service coverage metrics.
              </p>
              <a 
                href="https://gtfs.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm inline-block mt-1"
              >
                Learn more about GTFS →
              </a>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="font-medium text-gray-800 mb-1">GTFS Realtime</h3>
              <p className="text-gray-600 text-sm">
                GTFS-RT provides real-time updates on vehicle positions, service alerts, and trip updates.
                This data allows us to calculate actual service performance versus scheduled service.
              </p>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="font-medium text-gray-800 mb-1">National Transit Database (NTD)</h3>
              <p className="text-gray-600 text-sm">
                The NTD contains reported performance metrics from US transit agencies including ridership,
                service hours, and operational costs.
              </p>
              <a 
                href="https://www.transit.dot.gov/ntd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm inline-block mt-1"
              >
                Explore the National Transit Database →
              </a>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="font-medium text-gray-800 mb-1">Agency APIs</h3>
              <p className="text-gray-600 text-sm">
                Many transit agencies provide additional APIs with performance data such as
                crowding information, customer satisfaction scores, and equipment status.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Activity size={24} className="mr-2 text-red-600" />
              Metrics Explained
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm mr-2 mt-0.5">1</span>
                <div>
                  <h3 className="font-medium text-gray-800">On-time Performance</h3>
                  <p className="text-gray-600 text-sm">Percentage of vehicles arriving within the agency's on-time window (typically 1-5 minutes)</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-medium text-sm mr-2 mt-0.5">2</span>
                <div>
                  <h3 className="font-medium text-gray-800">Ridership</h3>
                  <p className="text-gray-600 text-sm">Number of passengers using the transit system within a given time period</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-medium text-sm mr-2 mt-0.5">3</span>
                <div>
                  <h3 className="font-medium text-gray-800">Service Disruptions</h3>
                  <p className="text-gray-600 text-sm">Number of delays, cancellations, or service outages</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-medium text-sm mr-2 mt-0.5">4</span>
                <div>
                  <h3 className="font-medium text-gray-800">Average Delay</h3>
                  <p className="text-gray-600 text-sm">Mean time between scheduled and actual arrival times</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin size={24} className="mr-2 text-green-600" />
              Get Involved
            </h2>
            <p className="text-gray-700 mb-4">
              We welcome contributions from the community to improve this dashboard and expand its capabilities:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Add new transit agencies and data feeds</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Develop new visualization features</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Improve data processing and analysis algorithms</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Report bugs or suggest enhancements</span>
              </li>
            </ul>
            <div className="mt-4">
              <a
                href="https://github.com/transithealth/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <GithubIcon size={16} className="mr-2" />
                Join on GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <GitMerge size={24} className="mr-2 text-purple-600" />
            Getting Started with Data Integration
          </h2>
          <p className="text-gray-700 mb-4">
            To integrate your own transit data with this dashboard, follow these steps:
          </p>
          
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>
                <strong>Identify Available GTFS Feeds</strong>
                <p className="text-sm text-gray-600 ml-5 mt-1">
                  Most transit agencies publish GTFS data. Check their developer portals or 
                  the <a href="https://transitfeeds.com/" className="text-blue-600 hover:text-blue-800">Transit Feeds directory</a>.
                </p>
              </li>
              <li>
                <strong>Access Real-time APIs</strong>
                <p className="text-sm text-gray-600 ml-5 mt-1">
                  Many agencies offer real-time APIs for vehicle positions, service alerts, and predictions.
                  You may need to register for an API key.
                </p>
              </li>
              <li>
                <strong>Process GTFS Data</strong>
                <p className="text-sm text-gray-600 ml-5 mt-1">
                  Parse the GTFS data to extract routes, stops, trips, and schedule information.
                  Tools like <a href="https://github.com/MobilityData/gtfs-validator" className="text-blue-600 hover:text-blue-800">GTFS Validator</a> can help validate your data.
                </p>
              </li>
              <li>
                <strong>Calculate Performance Metrics</strong>
                <p className="text-sm text-gray-600 ml-5 mt-1">
                  Compare scheduled times with actual times from real-time data to calculate 
                  metrics like on-time performance and average delays.
                </p>
              </li>
              <li>
                <strong>Integrate with the Dashboard</strong>
                <p className="text-sm text-gray-600 ml-5 mt-1">
                  Use our API endpoints to send your processed data to the dashboard for visualization.
                </p>
              </li>
            </ol>
          </div>
          
          <p className="text-gray-700">
            For detailed technical documentation and API reference, visit our
            <a href="#" className="text-blue-600 hover:text-blue-800 ml-1">Developer Guide</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;