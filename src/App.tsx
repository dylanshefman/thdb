import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layout components
import MainLayout from './components/Layout/MainLayout';

// Page components
import DashboardPage from './pages/DashboardPage';
import MapPage from './pages/MapPage';
import AgenciesPage from './pages/AgenciesPage';
import AboutPage from './pages/AboutPage';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/agencies" element={<AgenciesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<DashboardPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;