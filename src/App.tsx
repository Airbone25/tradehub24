// src/App.tsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Components
import { Layout } from './components/Layout';
import TestConnection from './components/TestConnection';
import { UserTypeProvider, UserTypeContext } from './context/UserTypeContext';

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

// Professional Auth & Pages
import { ProfessionalHome } from './pages/professional/ProfessionalHome';
import ProfessionalSignUp from './pages/professional/ProfessionalSignUp';
import ProfessionalLogin from './pages/professional/ProfessionalLogin';
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

// Dynamic home route based on user type
function HomeRedirect() {
  const { userType } = useContext(UserTypeContext)!;
  return userType === 'professional' ? <ProfessionalHome /> : <HomePage />;
}

function App() {
  return (
    <UserTypeProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Dynamic Home route */}
            <Route path="/" element={<HomeRedirect />} />

            {/* Optional Test Route */}
            <Route path="/test-connection" element={<TestConnection />} />

            {/* ----------------------------- */}
            {/* Public / Shared Routes        */}
            {/* ----------------------------- */}
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

            {/* ----------------------------- */}
            {/* Homeowner Routes              */}
            {/* ----------------------------- */}
            <Route path="/homeowner/signup" element={<HomeownerSignUp />} />
            <Route path="/homeowner/login" element={<HomeownerLogin />} />
            <Route path="/homeowner/hiring-guide" element={<HiringGuide />} />
            <Route path="/homeowner/post-job" element={<PostJob />} />
            <Route path="/homeowner/support" element={<SupportHomeowner />} />
            <Route path="/homeowner/complaints" element={<ComplaintsHomeowner />} />
            <Route path="/homeowner/profile" element={<HomeownerProfile />} />
            <Route path="/homeowner/messages" element={<HomeownerMessages />} />
            <Route path="/homeowner/job-details" element={<JobDetails />} />
            <Route path="/homeowner/professional-search" element={<ProfessionalSearch />} />
            <Route path="/homeowner/reviews-and-ratings" element={<ReviewsAndRatings />} />
            <Route path="/homeowner/payment-history" element={<HomeownerPaymentHistory />} />
            <Route path="/homeowner/notifications" element={<Notifications />} />
            <Route path="/homeowner/settings" element={<HomeownerSettings />} />

            {/* ----------------------------- */}
            {/* Professional Routes           */}
            {/* ----------------------------- */}
            <Route path="/professional/signup" element={<ProfessionalSignUp />} />
            <Route path="/professional/login" element={<ProfessionalLogin />} />
            <Route path="/professional/dashboard" element={<ProfessionalDashboard />} />
            <Route path="/professional/register" element={<ProfessionalRegistration />} />
            <Route path="/professional/complaints" element={<Complaints />} />
            <Route path="/professional/professional-support" element={<ProfessionalSupport />} />
            <Route path="/professional/profile" element={<ProfessionalProfile />} />
            <Route path="/professional/messages" element={<ProfessionalMessages />} />
            <Route path="/professional/bid-management" element={<BidManagement />} />
            <Route path="/professional/job-search" element={<JobSearch />} />
            <Route path="/professional/availability-calendar" element={<AvailabilityCalendar />} />
            <Route path="/professional/payment-history" element={<ProfessionalPaymentHistory />} />
            <Route path="/professional/reviews" element={<ReviewsProfessional />} />
            <Route path="/professional/subscription" element={<Subscription />} />
            <Route path="/professional/settings" element={<ProfessionalSettings />} />

          </Routes>
        </Layout>
      </Router>
    </UserTypeProvider>
  );
}

export default App;
