import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TradeHub24</h3>
            <div className="space-y-3">
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                0800 123 4567
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                support@tradehub24.com
              </p>
              <p className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                London, UK
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-[#e20000]">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-[#e20000]">How It Works</Link></li>
              <li><Link to="/careers" className="hover:text-[#e20000]">Careers</Link></li>
              <li><Link to="/press" className="hover:text-[#e20000]">Press</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Professionals</h3>
            <ul className="space-y-2">
              <li><Link to="/join-as-pro" className="hover:text-[#e20000]">Join as Pro</Link></li>
              <li><Link to="/success-stories" className="hover:text-[#e20000]">Success Stories</Link></li>
              <li><Link to="/pro-resources" className="hover:text-[#e20000]">Pro Resources</Link></li>
              <li><Link to="/pricing" className="hover:text-[#e20000]">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help-center" className="hover:text-[#e20000]">Help Center</Link></li>
              <li><Link to="/safety-center" className="hover:text-[#e20000]">Safety Center</Link></li>
              <li><Link to="/guidelines" className="hover:text-[#e20000]">Community Guidelines</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-[#e20000]">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} TradeHub24. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}