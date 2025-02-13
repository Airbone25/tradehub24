// src/App.tsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProfessionalHome } from './pages/professional/ProfessionalHome';
import { HowItWorks } from './pages/HowItWorks';
import { AboutUs } from './pages/AboutUs';
import { Careers } from './pages/Careers';
import { FindPros } from './pages/FindPros';
import { Press } from './pages/Press';
import { JoinAsPro } from './pages/JoinAsPro';
import { SuccessStories } from './pages/SuccessStories';
import { ProResources } from './pages/ProResources';
import { Pricing } from './pages/Pricing';
import { HelpAndFAQ } from './pages/help/HelpAndFAQ';
import { ContactUs } from './pages/help/ContactUs';
import { Account } from './pages/help/Account';
import { AdviceAndInspiration } from './pages/help/AdviceAndInspiration';
import { RateGuide } from './pages/help/RateGuide';
import { TermsAndConditions } from './pages/legal/TermsAndConditions';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { CompanyInformation } from './pages/about/CompanyInformation';
import { MembershipPricing } from './pages/about/MembershipPricing';
import { HiringGuide } from './pages/homeowner/HiringGuide';
import { PostJob } from './pages/homeowner/PostJob';
import { Support } from './pages/homeowner/Support';
import { ComplaintsHomeowner } from './pages/homeowner/Complaints';
import { Complaints } from './pages/professional/Complaints';
import { ProfessionalSupport } from './pages/professional/ProfessionalSupport';
import { ProfessionalRegistration } from './pages/professional/ProfessionalRegistration';
import { ProfessionalDashboard } from './pages/professional/ProfessionalDashboard';
import { Services } from './pages/Services';
import { UserTypeProvider, UserTypeContext } from './context/UserTypeContext';

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
            {/* Home route is now dynamic */}
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/join-as-pro" element={<JoinAsPro />} />
            <Route path="/find-pros" element={<FindPros />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/pro-resources" element={<ProResources />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/help/help-and-faq" element={<HelpAndFAQ />} />
            <Route path="/help/contact-us" element={<ContactUs />} />
            <Route path="/help/account" element={<Account />} />
            <Route path="/help/advice-and-inspiration" element={<AdviceAndInspiration />} />
            <Route path="/help/rate-guide" element={<RateGuide />} />
            <Route path="/legal/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/about/company-info" element={<CompanyInformation />} />
            <Route path="/about/membership-pricing" element={<MembershipPricing />} />
            <Route path="/homeowner/hiring-guide" element={<HiringGuide />} />
            <Route path="/homeowner/post-job" element={<PostJob />} />
            <Route path="/services" element={<Services />} />
            <Route path="/homeowner/support" element={<Support />} />
            <Route path="/homeowner/complaints" element={<ComplaintsHomeowner />} />

            {/* Professional routes */}
            <Route path="/professional/dashboard" element={<ProfessionalDashboard />} />
            <Route path="/professional/register" element={<ProfessionalRegistration />} />
            <Route path="/professional/complaints" element={<Complaints />} />
            <Route path="/professional/professional-support" element={<ProfessionalSupport />} />
          </Routes>
        </Layout>
      </Router>
    </UserTypeProvider>
  );
}

export default App;
