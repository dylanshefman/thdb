import React from 'react';
import { GithubIcon, InfoIcon, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Transit Health Dashboard</h3>
            <p className="text-sm leading-relaxed">
              Monitoring and analyzing public transit performance across the United States.
              Our goal is to improve transit reliability through data transparency.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.transit.dot.gov/ntd" className="hover:text-orange-300 transition-colors flex items-center">
                  <InfoIcon size={16} className="mr-2" />
                  National Transit Database
                </a>
              </li>
              <li>
                <a href="https://gtfs.org/" className="hover:text-orange-300 transition-colors flex items-center">
                  <InfoIcon size={16} className="mr-2" />
                  GTFS Reference
                </a>
              </li>
              <li>
                <a href="https://www.apta.com/" className="hover:text-orange-300 transition-colors flex items-center">
                  <InfoIcon size={16} className="mr-2" />
                  American Public Transportation Association
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@transithealth.example.com" className="hover:text-orange-300 transition-colors flex items-center">
                  <Mail size={16} className="mr-2" />
                  info@transithealth.example.com
                </a>
              </li>
              <li>
                <a href="https://github.com/transithealth/dashboard" className="hover:text-orange-300 transition-colors flex items-center">
                  <GithubIcon size={16} className="mr-2" />
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Transit Health Dashboard. All data is provided for informational purposes only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;