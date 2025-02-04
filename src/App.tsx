import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { HowItWorks } from './pages/HowItWorks';
import { AboutUs } from './pages/AboutUs';
import { Careers } from './pages/Careers';
import { Press } from './pages/Press';
import { JoinAsPro } from './pages/JoinAsPro';
import { SuccessStories } from './pages/SuccessStories';
import { ProResources } from './pages/ProResources';
import { Pricing } from './pages/Pricing';
import { HelpCenter } from './pages/HelpCenter';
import SafetyCenter from './pages/SafetyCenter';
import Guidelines from './pages/Guidelines';
import CookiePolicy from './pages/CookiePolicy';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/join-as-pro" element={<JoinAsPro />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/pro-resources" element={<ProResources />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/safety-center" element={<SafetyCenter />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;