import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/dashboard/Dashboard';
import PropertiesPage from './pages/properties/PropertiesPage';
import PropertyForm from './pages/properties/PropertyForm';
import BookingsPage from './pages/bookings/BookingsPage';
import BillingPage from './pages/billing/BillingPage';
import SettingsPage from './pages/settings/SettingsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/login" 
              element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/register" 
              element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} 
            />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              isAuthenticated ? (
                <>
                  <Navbar />
                  <Dashboard />
                </>
              ) : (
                <Navigate to="/login" />
              )
            } />
            <Route path="/properties" element={
              isAuthenticated ? (
                <>
                  <Navbar />
                  <PropertiesPage />
                </>
              ) : (
                <Navigate to="/login" />
              )
            } />
            <Route path="/properties/new" element={
              isAuthenticated ? (
                <>
                  <Navbar />
                  <PropertyForm />
                </>
              ) : (
                <Navigate to="/login" />
              )
            } />
            <Route path="/properties/edit/:id" element={
              isAuthenticated ? (
                <>
                  <Navbar />
                  <PropertyForm />
                </>
              ) : (
                <Navigate to="/login" />
              )
            } />
            <Route path="/bookings" element={
              isAuthenticated ? (
                <>
                  <Navbar />
                  <BookingsPage />
                </>
              ) : (
                <Navigate to="/login" />
              )
            } />
            <Route path="/billing" element={
              isAuthenticated ? (
                <>
                  <Navbar />
                  <BillingPage />
                </>
              ) : (
                <Navigate to="/login" />
              )
            } />
            <Route path="/settings" element={
              isAuthenticated ? (
                <>
                  <Navbar />
                  <SettingsPage />
                </>
              ) : (
                <Navigate to="/login" />
              )
            } />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;