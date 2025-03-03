import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import TwoFactorSetup from './pages/auth/TwoFactorSetup';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

// Dashboard pages
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import NewApplication from './pages/applications/NewApplication';
import ApplicationForm from './pages/applications/ApplicationForm';
import ApplicationDetail from './pages/applications/ApplicationDetail';
import UploadDocuments from './pages/applications/UploadDocuments';
import ScheduleAppointment from './pages/applications/ScheduleAppointment';
import Payment from './pages/applications/Payment';
import TrackApplication from './pages/applications/TrackApplication';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ApplicationsManagement from './pages/admin/ApplicationsManagement';
import AppointmentsCalendar from './pages/admin/AppointmentsCalendar';
import UserManagement from './pages/admin/UserManagement';
import ReportsAnalytics from './pages/admin/ReportsAnalytics';

import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <ToastContainer position="top-right" autoClose={5000} />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            
            {/* Protected User Routes */}
            <Route 
              path="/dashboard" 
              element={<PrivateRoute><Dashboard /></PrivateRoute>} 
            />
            <Route 
              path="/profile" 
              element={<PrivateRoute><Profile /></PrivateRoute>} 
            />
            <Route 
              path="/2fa-setup" 
              element={<PrivateRoute><TwoFactorSetup /></PrivateRoute>} 
            />
            <Route 
              path="/applications/new" 
              element={<PrivateRoute><NewApplication /></PrivateRoute>} 
            />
            <Route 
              path="/applications/:id" 
              element={<PrivateRoute><ApplicationDetail /></PrivateRoute>} 
            />
            <Route 
              path="/applications/:id/form" 
              element={<PrivateRoute><ApplicationForm /></PrivateRoute>} 
            />
            <Route 
              path="/applications/:id/documents" 
              element={<PrivateRoute><UploadDocuments /></PrivateRoute>} 
            />
            <Route 
              path="/applications/:id/appointment" 
              element={<PrivateRoute><ScheduleAppointment /></PrivateRoute>} 
            />
            <Route 
              path="/applications/:id/payment" 
              element={<PrivateRoute><Payment /></PrivateRoute>} 
            />
            <Route 
              path="/track/:trackingNumber" 
              element={<TrackApplication />} 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={<PrivateRoute roles={['admin', 'officer']}><AdminDashboard /></PrivateRoute>} 
            />
            <Route 
              path="/admin/applications" 
              element={<PrivateRoute roles={['admin', 'officer']}><ApplicationsManagement /></PrivateRoute>} 
            />
            <Route 
              path="/admin/appointments" 
              element={<PrivateRoute roles={['admin', 'officer']}><AppointmentsCalendar /></PrivateRoute>} 
            />
            <Route 
              path="/admin/users" 
              element={<PrivateRoute roles={['admin']}><UserManagement /></PrivateRoute>} 
            />
            <Route 
              path="/admin/reports" 
              element={<PrivateRoute roles={['admin']}><ReportsAnalytics /></PrivateRoute>} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;