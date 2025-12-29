
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PublisherDashboard from './pages/PublisherDashboard';
import UserDashboard from './pages/UserDashboard';
import CouponDetailPage from './pages/CouponDetailPage';
import { UserRole } from './types';

// Simple Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRole?: UserRole }> = ({ children, allowedRole }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route 
            path="/publisher" 
            element={
              <ProtectedRoute allowedRole={UserRole.PUBLISHER}>
                <PublisherDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRole={UserRole.USER}>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/coupon/:id" 
            element={
              <ProtectedRoute allowedRole={UserRole.USER}>
                <CouponDetailPage />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2024 CouponFlow Marketplace MVP. All rights reserved.</p>
          <p className="text-gray-400 text-xs mt-1 tracking-widest uppercase">Investor Demo Version</p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
