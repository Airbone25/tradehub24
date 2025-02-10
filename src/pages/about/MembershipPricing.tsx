import React from 'react';
import { CheckCircle } from 'lucide-react';

export function MembershipPricing() {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Membership Pricing</h1>
        
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">Silver</h2>
          <p className="text-lg font-bold">£30.99 Per Month</p>
          <ul className="list-disc list-inside">
            <li>Profile listing – complete business profile</li>
            <li>3 Business Categories</li>
            <li>Direct contact on display</li>
            <li>Gallery of previous work</li>
            <li>Instant contact with customers</li>
            <li>Daily email update</li>
            <li>Review page (get reviews from your satisfied customers)</li>
          </ul>
          <button className="mt-3 p-2 bg-red-600 text-white rounded">Subscribe Now</button>
        </div>
        
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">Silver Plus</h2>
          <p className="text-lg font-bold">£45.99 Per Month</p>
          <ul className="list-disc list-inside">
            <li>Profile listing – complete business profile</li>
            <li>5 Business Categories</li>
            <li>Direct contact on display</li>
            <li>Gallery of previous work</li>
            <li>Instant contact with customers</li>
            <li>Daily email update</li>
            <li>Review page (get reviews from your satisfied customers)</li>
          </ul>
          <button className="mt-3 p-2 bg-red-600 text-white rounded">Subscribe Now</button>
        </div>
        
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">Silver Advance</h2>
          <p className="text-lg font-bold">£30.99 Per Month</p>
          <ul className="list-disc list-inside">
            <li>Profile listing – complete business profile</li>
            <li>10 Business Categories</li>
            <li>Direct contact on display</li>
            <li>Gallery of previous work</li>
            <li>Instant contact with customers</li>
            <li>Daily email update</li>
            <li>Review page (get reviews from your satisfied customers)</li>
          </ul>
          <button className="mt-3 p-2 bg-red-600 text-white rounded">Subscribe Now</button>
        </div>
      </div>
    );
  }
  