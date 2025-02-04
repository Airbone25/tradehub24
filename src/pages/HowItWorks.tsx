import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How TradeHub24 Works</h1>
          <p className="text-xl text-gray-600">Simple steps to find the right professional for your project</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 h-12 bg-[#105298] text-white rounded-full mb-6">1</div>
            <h3 className="text-xl font-semibold mb-4">Post Your Job</h3>
            <p className="text-gray-600">Describe your project and we'll match you with qualified professionals in your area.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 h-12 bg-[#105298] text-white rounded-full mb-6">2</div>
            <h3 className="text-xl font-semibold mb-4">Compare Quotes</h3>
            <p className="text-gray-600">Review quotes from verified professionals and choose the best fit for your project.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 h-12 bg-[#105298] text-white rounded-full mb-6">3</div>
            <h3 className="text-xl font-semibold mb-4">Hire & Pay Securely</h3>
            <p className="text-gray-600">Work with your chosen professional and pay securely through our platform.</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Why Choose TradeHub24?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#e20000] mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button className="inline-flex items-center px-6 py-3 bg-[#e20000] text-white rounded-md hover:bg-[#cc0000] transition-colors">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

const benefits = [
  {
    title: "Verified Professionals",
    description: "Every professional on our platform is thoroughly vetted and background-checked for your peace of mind."
  },
  {
    title: "Secure Payments",
    description: "Our secure payment system protects both homeowners and professionals throughout the project."
  },
  {
    title: "Quality Guarantee",
    description: "We stand behind the quality of work with our satisfaction guarantee."
  },
  {
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to help with any questions or concerns."
  }
];