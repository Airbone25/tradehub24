import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Layouts
import HomeownerLayout from './layouts/HomeownerLayout';
import ProfessionalLayout from './layouts/ProfessionalLayout';

// Auth Pages
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import OTPVerification from './pages/auth/OTPVerification';
import VerificationSuccess from './pages/auth/VerificationSuccess';

// Homeowner Pages
import HomeownerDashboard from './pages/homeowner/Dashboard';
import PostJob from './pages/homeowner/PostJob';
import MyJobs from './pages/homeowner/MyJobs';
import JobDetails from './pages/homeowner/JobDetails';
import FindProfessionals from './pages/homeowner/FindProfessionals';
import ProfessionalProfile from './pages/homeowner/ProfessionalProfile';
import Messages from './pages/homeowner/Messages';
import HomeownerSettings from './pages/homeowner/Settings';

// Professional Pages
import ProfessionalDashboard from './pages/professional/Dashboard';
import AvailableJobs from './pages/professional/AvailableJobs';
import JobDetailsProf from './pages/professional/JobDetails';
import MyQuotes from './pages/professional/MyQuotes';
import MessagesProf from './pages/professional/Messages';
import ProfessionalSettings from './pages/professional/Settings';
import ProfileManagement from './pages/professional/ProfileManagement';
import Subscription from './pages/professional/Subscription';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify" element={<OTPVerification />} />
          <Route path="/verification-success" element={<VerificationSuccess />} />

          {/* Homeowner Routes */}
          <Route
            path="/homeowner"
            element={
              <PrivateRoute userType="homeowner">
                <HomeownerLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<HomeownerDashboard />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="my-jobs" element={<MyJobs />} />
            <Route path="job/:id" element={<JobDetails />} />
            <Route path="find-professionals" element={<FindProfessionals />} />
            <Route path="professional/:id" element={<ProfessionalProfile />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<HomeownerSettings />} />
          </Route>

          {/* Professional Routes */}
          <Route
            path="/professional"
            element={
              <PrivateRoute userType="professional">
                <ProfessionalLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<ProfessionalDashboard />} />
            <Route path="available-jobs" element={<AvailableJobs />} />
            <Route path="job/:id" element={<JobDetailsProf />} />
            <Route path="my-quotes" element={<MyQuotes />} />
            <Route path="messages" element={<MessagesProf />} />
            <Route path="profile" element={<ProfileManagement />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="settings" element={<ProfessionalSettings />} />
          </Route>

          {/* Redirect root to login */}
          <Route path="/" element={<Login />} />
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}

export default App;