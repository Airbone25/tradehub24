// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout & Components
import { Layout } from './components/Layout';
import TestConnection from './components/TestConnection';
import { UserProvider } from './contexts/UserContext';
import { UserTypeProvider } from './context/UserTypeContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public / Root Pages
import { HomePage } from './pages/HomePage';
import { AboutUs } from './pages/AboutUs';
import { Careers } from './pages/Careers';
import CookiePolicy from './pages/CookiePolicy';
import { FindPros } from './pages/FindPros';
import Guidelines from './pages/Guidelines';
import { HelpCenter } from './pages/HelpCenter';
import { HowItWorks } from './pages/HowItWorks';
import { JoinAsPro } from './pages/JoinAsPro';
import { Press } from './pages/Press';
import { Pricing } from './pages/Pricing';
import { ProResources } from './pages/ProResources';
import SafetyCenter from './pages/SafetyCenter';
import { Services } from './pages/Services';
import { SuccessStories } from './pages/SuccessStories';

// About & Membership
import { CompanyInformation } from './pages/about/CompanyInformation';
import { MembershipPricing } from './pages/about/MembershipPricing';

// Legal & Help
import { ContactUs } from './pages/help/ContactUs';
import { HelpAndFAQ } from './pages/help/HelpAndFAQ';
import { Account } from './pages/help/Account';
import { AdviceAndInspiration } from './pages/help/AdviceAndInspiration';
import { RateGuide } from './pages/help/RateGuide';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsAndConditions } from './pages/legal/TermsAndConditions';

// Homeowner Auth & Pages
import HomeownerSignUp from './pages/homeowner/HomeownerSignUp';
import HomeownerLogin from './pages/homeowner/HomeownerLogin';
import HomeownerLoginOTP from './pages/homeowner/HomeownerLoginOTP';
import { HiringGuide } from './pages/homeowner/HiringGuide';
import { PostJob } from './pages/homeowner/PostJob';
import SupportHomeowner from './pages/homeowner/Support';
import ComplaintsHomeowner from './pages/homeowner/Complaints';
import HomeownerProfile from './pages/homeowner/HomeownerProfile';
import HomeownerMessages from './pages/homeowner/Messages';
import JobDetails from './pages/homeowner/JobDetails';
import ProfessionalSearch from './pages/homeowner/ProfessionalSearch';
import ReviewsAndRatings from './pages/homeowner/ReviewsAndRatings';
import HomeownerPaymentHistory from './pages/homeowner/PaymentHistory';
import Notifications from './pages/homeowner/Notifications';
import HomeownerSettings from './pages/homeowner/Settings';
import HomeownerDashboard from './pages/homeowner/HomeownerDashboard';

// Professional Auth & Pages
import { ProfessionalHome } from './pages/professional/ProfessionalHome';
import ProfessionalSignUp from './pages/professional/ProfessionalSignUp';
import ProfessionalLogin from './pages/professional/ProfessionalLogin';
import ProfessionalLoginOTP from './pages/professional/ProfessionalLoginOTP';
import { ProfessionalDashboard } from './pages/professional/ProfessionalDashboard';
import { ProfessionalRegistration } from './pages/professional/ProfessionalRegistration';
import { Complaints } from './pages/professional/Complaints';
import { ProfessionalSupport } from './pages/professional/ProfessionalSupport';
import ProfessionalProfile from './pages/professional/ProfessionalProfile';
import ProfessionalMessages from './pages/professional/Messages';
import BidManagement from './pages/professional/BidManagement';
import JobSearch from './pages/professional/JobSearch';
import AvailabilityCalendar from './pages/professional/AvailabilityCalendar';
import ProfessionalPaymentHistory from './pages/professional/PaymentHistory';
import ReviewsProfessional from './pages/professional/Reviews';
import Subscription from './pages/professional/Subscription';
import ProfessionalSettings from './pages/professional/Settings';
import FindJobs from './pages/professional/FindJobs';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <UserProvider>
        <UserTypeProvider>
          <Layout>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Routes>
              {/* Dynamic Home route */}
              <Route path="/" element={<HomePage />} />

              {/* Optional Test Route */}
              <Route path="/test-connection" element={<TestConnection />} />

              {/* Public / Shared Routes */}
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/find-pros" element={<FindPros />} />
              <Route path="/guidelines" element={<Guidelines />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/join-as-pro" element={<JoinAsPro />} />
              <Route path="/press" element={<Press />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/pro-resources" element={<ProResources />} />
              <Route path="/safety-center" element={<SafetyCenter />} />
              <Route path="/services" element={<Services />} />
              <Route path="/success-stories" element={<SuccessStories />} />

              {/* About & Membership */}
              <Route path="/about/company-info" element={<CompanyInformation />} />
              <Route path="/about/membership-pricing" element={<MembershipPricing />} />

              {/* Legal & Help */}
              <Route path="/help/contact-us" element={<ContactUs />} />
              <Route path="/help/help-and-faq" element={<HelpAndFAQ />} />
              <Route path="/help/account" element={<Account />} />
              <Route path="/help/advice-and-inspiration" element={<AdviceAndInspiration />} />
              <Route path="/help/rate-guide" element={<RateGuide />} />
              <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/legal/terms-and-conditions" element={<TermsAndConditions />} />

              {/* Homeowner Routes */}
              {/* Auth Routes (Public) */}
              <Route path="/homeowner/signup" element={<HomeownerSignUp />} />
              <Route path="/homeowner/login" element={<HomeownerLogin />} />
              <Route path="/homeowner/login-otp" element={<HomeownerLoginOTP />} />
              <Route path="/homeowner/login-otp-callback" element={<HomeownerLoginOTP />} />
              
              {/* Public Homeowner Routes */}
              <Route path="/homeowner/hiring-guide" element={<HiringGuide />} />
              
              {/* Routes that redirect to signup if not logged in */}
              <Route path="/homeowner/post-job" element={
                <ProtectedRoute requiredUserType="homeowner" redirectTo="/homeowner/signup">
                  <PostJob />
                </ProtectedRoute>
              } />
              <Route path="/homeowner/support" element={
                <ProtectedRoute requiredUserType="homeowner" redirectTo="/homeowner/signup">
                  <SupportHomeowner />
                </ProtectedRoute>
              } />
              <Route path="/homeowner/complaints" element={
                <ProtectedRoute requiredUserType="homeowner" redirectTo="/homeowner/signup">
                  <ComplaintsHomeowner />
                </ProtectedRoute>
              } />
              
              {/* Other Protected Homeowner Routes */}
              <Route path="/homeowner/dashboard" element={
                <ProtectedRoute requiredUserType="homeowner">
                  <HomeownerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/homeowner/profile" element={
                <ProtectedRoute requiredUserType="homeowner">
                  <HomeownerProfile />
                </ProtectedRoute>
              } />
              <Route path="/homeowner/messages" element={
                <ProtectedRoute requiredUserType="homeowner">
                  <HomeownerMessages />
                </ProtectedRoute>
              } />
              <Route path="/homeowner/job-details" element={
                <ProtectedRoute requiredUserType="homeowner">
                  <JobDetails />
                </ProtectedRoute>
              } />
              <Route path="/homeowner/professional-search" element={
                <ProtectedRoute requiredUserType="homeowner">
                  <ProfessionalSearch />
                </ProtectedRoute>
              } />
              <Route path="/homeowner/reviews-and-ratings" element={
                <ProtectedRoute requiredUserType="homeowner">
                  <ReviewsAndRatings />
                </ProtectedRoute>
              } />
              <Route path="/homeowner/payment-history" element={
                <ProtectedRoute requiredUserType="homeowner">
                  <HomeownerPaymentHistory />
                </ProtectedRoute>
              } />
              <Route path="/homeowner/notifications" element={
                <ProtectedRoute requiredUserType="homeowner">
                  <Notifications />
                </ProtectedRoute>
              } />
              <Route path="/homeowner/settings" element={
                <ProtectedRoute requiredUserType="homeowner">
                  <HomeownerSettings />
                </ProtectedRoute>
              } />

              {/* Professional Routes */}
              {/* Auth Routes (Public) */}
              <Route path="/professional/signup" element={<ProfessionalSignUp />} />
              <Route path="/professional/login" element={<ProfessionalLogin />} />
              <Route path="/professional/login-otp" element={<ProfessionalLoginOTP />} />
              <Route path="/professional/login-otp-callback" element={<ProfessionalLoginOTP />} />
              
              {/* Public Professional Routes */}
              <Route path="/professional/how-it-works" element={<ProfessionalHome />} />
              <Route path="/professional/find-jobs" element={<FindJobs />} />
              <Route path="/professional/membership" element={<Subscription />} />
              
              {/* Routes that redirect to signup if not logged in */}
              <Route path="/professional/support" element={
                <ProtectedRoute requiredUserType="professional" redirectTo="/professional/signup">
                  <ProfessionalSupport />
                </ProtectedRoute>
              } />
              
              {/* Protected Professional Routes */}
              <Route path="/professional/dashboard" element={
                <ProtectedRoute requiredUserType="professional">
                  <ProfessionalDashboard />
                </ProtectedRoute>
              } />
              <Route path="/professional/complaints" element={
                <ProtectedRoute requiredUserType="professional">
                  <Complaints />
                </ProtectedRoute>
              } />
              <Route path="/professional/professional-support" element={
                <ProtectedRoute requiredUserType="professional">
                  <ProfessionalSupport />
                </ProtectedRoute>
              } />
              <Route path="/professional/profile" element={
                <ProtectedRoute requiredUserType="professional">
                  <ProfessionalProfile />
                </ProtectedRoute>
              } />
              <Route path="/professional/messages" element={
                <ProtectedRoute requiredUserType="professional">
                  <ProfessionalMessages />
                </ProtectedRoute>
              } />
              <Route path="/professional/bid-management" element={
                <ProtectedRoute requiredUserType="professional">
                  <BidManagement />
                </ProtectedRoute>
              } />
              <Route path="/professional/job-search" element={
                <ProtectedRoute requiredUserType="professional">
                  <JobSearch />
                </ProtectedRoute>
              } />
              <Route path="/professional/availability-calendar" element={
                <ProtectedRoute requiredUserType="professional">
                  <AvailabilityCalendar />
                </ProtectedRoute>
              } />
              <Route path="/professional/payment-history" element={
                <ProtectedRoute requiredUserType="professional">
                  <ProfessionalPaymentHistory />
                </ProtectedRoute>
              } />
              <Route path="/professional/reviews" element={
                <ProtectedRoute requiredUserType="professional">
                  <ReviewsProfessional />
                </ProtectedRoute>
              } />
              <Route path="/professional/subscription" element={
                <ProtectedRoute requiredUserType="professional">
                  <Subscription />
                </ProtectedRoute>
              } />
              <Route path="/professional/settings" element={
                <ProtectedRoute requiredUserType="professional">
                  <ProfessionalSettings />
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
        </UserTypeProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
