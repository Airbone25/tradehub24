import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, CreditCard, Calendar, ArrowRight } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'annual';
  features: string[];
  isPopular?: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  expiryDate: string;
  isDefault: boolean;
}

const Subscription: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<string | null>('basic');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const plans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: billingCycle === 'monthly' ? 9.99 : 99.99,
      billingCycle,
      features: [
        'Up to 10 job bids per month',
        'Standard profile listing',
        'Email support',
        'Basic analytics',
      ],
    },
    {
      id: 'pro',
      name: 'Professional',
      price: billingCycle === 'monthly' ? 24.99 : 249.99,
      billingCycle,
      features: [
        'Up to 50 job bids per month',
        'Featured profile listing',
        'Priority email support',
        'Advanced analytics',
        'Customer review management',
      ],
      isPopular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingCycle === 'monthly' ? 49.99 : 499.99,
      billingCycle,
      features: [
        'Unlimited job bids',
        'Top-tier profile listing',
        'Priority phone support',
        'Comprehensive analytics',
        'Customer review management',
        'Dedicated account manager',
        'Marketing tools',
      ],
    },
  ];

  useEffect(() => {
    // Simulate fetching subscription data from API
    const fetchSubscriptionData = async () => {
      setLoading(true);
      try {
        // This would be replaced with an actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock payment methods
        const mockPaymentMethods: PaymentMethod[] = [
          {
            id: 'pm_1',
            type: 'card',
            last4: '4242',
            expiryDate: '12/25',
            isDefault: true,
          },
          {
            id: 'pm_2',
            type: 'card',
            last4: '5678',
            expiryDate: '10/24',
            isDefault: false,
          },
        ];
        
        setPaymentMethods(mockPaymentMethods);
        setSelectedPaymentMethod(mockPaymentMethods.find(pm => pm.isDefault)?.id || null);
      } catch (error) {
        console.error('Error fetching subscription data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    setBillingCycle(cycle);
  };

  const handlePaymentMethodSelect = (paymentMethodId: string) => {
    setSelectedPaymentMethod(paymentMethodId);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan || !selectedPaymentMethod) return;
    
    setProcessingPayment(true);
    
    try {
      // This would be replaced with an actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update current plan
      setCurrentPlan(selectedPlan);
      setShowSuccess(true);
      
      // Reset after a few seconds
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedPlan(null);
      }, 5000);
    } catch (error) {
      console.error('Error processing subscription:', error);
    } finally {
      setProcessingPayment(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getCurrentPlanDetails = () => {
    return plans.find(plan => plan.id === currentPlan);
  };

  const getNextBillingDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Subscription Management</h1>
      
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-800">Subscription Updated Successfully</h3>
            <p className="text-green-700 text-sm">
              Your subscription has been updated to the {plans.find(p => p.id === selectedPlan)?.name} plan.
            </p>
          </div>
        </div>
      )}
      
      {/* Current Subscription */}
      {currentPlan && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Subscription</h2>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <span className="text-xl font-bold text-gray-900 mr-2">
                  {getCurrentPlanDetails()?.name} Plan
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {getCurrentPlanDetails()?.billingCycle === 'monthly' ? 'Monthly' : 'Annual'}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">
                {formatCurrency(getCurrentPlanDetails()?.price || 0)}/{getCurrentPlanDetails()?.billingCycle === 'monthly' ? 'month' : 'year'}
              </p>
              
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Next billing date: {getNextBillingDate()}</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => setSelectedPlan(currentPlan === 'premium' ? 'pro' : 'premium')}
                className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium rounded-lg px-4 py-2 text-sm"
              >
                {currentPlan === 'premium' ? 'Downgrade Plan' : 'Upgrade Plan'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Plan Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select a Plan</h2>
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg">
            <button
              onClick={() => handleBillingCycleChange('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                billingCycle === 'monthly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleBillingCycleChange('annual')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                billingCycle === 'annual'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Annual (Save 16%)
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg overflow-hidden ${
                plan.isPopular ? 'border-blue-500 relative' : 'border-gray-200'
              } ${
                selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="bg-blue-500 text-white text-xs font-semibold py-1 px-3 absolute right-0">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">{formatCurrency(plan.price)}</span>
                  <span className="text-gray-500">/{plan.billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full py-2 px-4 rounded-lg font-medium ${
                    currentPlan === plan.id
                      ? 'bg-gray-100 text-gray-800 cursor-default'
                      : selectedPlan === plan.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  disabled={currentPlan === plan.id}
                >
                  {currentPlan === plan.id
                    ? 'Current Plan'
                    : selectedPlan === plan.id
                    ? 'Selected'
                    : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Payment Method */}
      {selectedPlan && selectedPlan !== currentPlan && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
          
          <div className="space-y-3 mb-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method.id)}
                className={`border rounded-lg p-4 cursor-pointer ${
                  selectedPaymentMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 text-gray-600 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium">
                      •••• •••• •••• {method.last4}
                    </p>
                    <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
                  </div>
                  <div className="ml-3">
                    <input
                      type="radio"
                      checked={selectedPaymentMethod === method.id}
                      onChange={() => handlePaymentMethodSelect(method.id)}
                      className="h-5 w-5 text-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button
            className="text-blue-500 hover:text-blue-700 text-sm font-medium mb-6"
            onClick={() => alert('Add payment method functionality would go here')}
          >
            + Add Payment Method
          </button>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">
                {plans.find(p => p.id === selectedPlan)?.name} Plan ({billingCycle})
              </span>
              <span className="font-medium">
                {formatCurrency(plans.find(p => p.id === selectedPlan)?.price || 0)}
              </span>
            </div>
            
            {currentPlan && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Credit from current plan</span>
                <span>-{formatCurrency((plans.find(p => p.id === currentPlan)?.price || 0) * 0.3)}</span>
              </div>
            )}
            
            <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>
                {formatCurrency(
                  (plans.find(p => p.id === selectedPlan)?.price || 0) -
                  (currentPlan ? (plans.find(p => p.id === currentPlan)?.price || 0) * 0.3 : 0)
                )}
              </span>
            </div>
          </div>
          
          <button
            onClick={handleSubscribe}
            disabled={processingPayment || !selectedPaymentMethod}
            className={`w-full bg-blue-500 text-white font-medium py-3 px-4 rounded-lg ${
              processingPayment || !selectedPaymentMethod
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:bg-blue-600'
            }`}
          >
            {processingPayment ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Confirm Subscription`
            )}
          </button>
        </div>
      )}
      
      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Can I change my plan later?</h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged the prorated difference immediately. When you downgrade, the new rate will apply at the start of your next billing cycle.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-1">How do refunds work?</h3>
            <p className="text-gray-600">
              We don't offer refunds for partial months, but if you downgrade or cancel, you'll continue to have access to your current plan until the end of your billing period.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-1">What happens if I exceed my plan limits?</h3>
            <p className="text-gray-600">
              If you reach your monthly bid limit, you won't be able to place additional bids until your next billing cycle begins or you upgrade to a higher plan.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-1">How do I cancel my subscription?</h3>
            <p className="text-gray-600">
              You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your current billing period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;