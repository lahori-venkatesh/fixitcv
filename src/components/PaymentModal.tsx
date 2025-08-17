import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  X, 
  Star,
  Download,
  Crown,
  Zap,
  Clock
} from 'lucide-react';
import { ResumeTemplate, PaymentPlan } from '../types/resume';

interface PaymentModalProps {
  template?: ResumeTemplate;
  plan?: PaymentPlan;
  onClose: () => void;
  onPaymentSuccess: (paymentData: any) => void;
  isDarkMode?: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  template,
  plan,
  onClose,
  onPaymentSuccess,
  isDarkMode = false
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    email: '',
    phone: ''
  });

  const paymentPlans: PaymentPlan[] = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 99,
      currency: 'INR',
      features: ['5 Template Downloads', 'Basic ATS Reports', 'Email Support'],
      downloadLimit: 5,
      atsReports: true,
      premiumTemplates: false,
      priority: false
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: 299,
      currency: 'INR',
      features: ['20 Template Downloads', 'Advanced ATS Reports', 'Premium Templates', 'Priority Support'],
      downloadLimit: 20,
      atsReports: true,
      premiumTemplates: true,
      priority: true
    },
    {
      id: 'unlimited',
      name: 'Unlimited Plan',
      price: 599,
      currency: 'INR',
      features: ['Unlimited Downloads', 'All Premium Templates', 'Advanced ATS Reports', '24/7 Priority Support', 'Custom Branding'],
      downloadLimit: -1,
      atsReports: true,
      premiumTemplates: true,
      priority: true
    }
  ];

  const currentPlan = plan || paymentPlans[1]; // Default to Pro plan
  const isTemplatePayment = !!template;
  const amount = isTemplatePayment ? template.price : currentPlan.price;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock successful payment
    const paymentData = {
      id: `pay_${Date.now()}`,
      amount,
      currency: 'INR',
      status: 'success',
      method: paymentMethod,
      template: template?.id,
      plan: currentPlan.id,
      timestamp: new Date().toISOString()
    };
    
    onPaymentSuccess(paymentData);
    setIsProcessing(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden ${
          isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'
        }`}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              {isTemplatePayment ? (
                <Download className="w-6 h-6" />
              ) : (
                <Crown className="w-6 h-6" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {isTemplatePayment ? 'Purchase Template' : 'Upgrade Plan'}
              </h2>
              <p className="text-blue-100">
                {isTemplatePayment 
                  ? 'Get instant access to this premium template'
                  : 'Unlock premium features and templates'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Summary */}
            <div className={`p-6 rounded-xl border ${
              isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              
              {isTemplatePayment && template ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-16 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {template.institutionName}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{template.rating}</span>
                        <span className="text-sm text-gray-500">
                          ({template.downloadCount} downloads)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Template Price</span>
                      <span className="font-bold text-xl">₹{template.price}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Crown className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">{currentPlan.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Monthly subscription
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Monthly Price</span>
                      <span className="font-bold text-xl">₹{currentPlan.price}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Badge */}
              <div className="mt-6 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
                
                {/* Payment Method Tabs */}
                <div className="flex space-x-1 mb-6">
                  {[
                    { id: 'card', label: 'Card', icon: CreditCard },
                    { id: 'upi', label: 'UPI', icon: Zap },
                    { id: 'netbanking', label: 'Net Banking', icon: Shield }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setPaymentMethod(id as any)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border transition-colors ${
                        paymentMethod === id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>

                {/* Payment Forms */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          cardNumber: formatCardNumber(e.target.value) 
                        }))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode 
                            ? 'bg-slate-800 border-slate-600 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            expiryDate: formatExpiryDate(e.target.value) 
                          }))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            isDarkMode 
                              ? 'bg-slate-800 border-slate-600 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            cvv: e.target.value.replace(/\D/g, '').slice(0, 3) 
                          }))}
                          placeholder="123"
                          maxLength={3}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            isDarkMode 
                              ? 'bg-slate-800 border-slate-600 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={formData.cardholderName}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          cardholderName: e.target.value 
                        }))}
                        placeholder="John Doe"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode 
                            ? 'bg-slate-800 border-slate-600 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">UPI ID</label>
                      <input
                        type="text"
                        value={formData.upiId}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          upiId: e.target.value 
                        }))}
                        placeholder="yourname@paytm"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode 
                            ? 'bg-slate-800 border-slate-600 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Bank</label>
                      <select className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-slate-800 border-slate-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}>
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Punjab National Bank</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      email: e.target.value 
                    }))}
                    placeholder="john@example.com"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      phone: e.target.value 
                    }))}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Pay ₹{amount} Securely</span>
                  </>
                )}
              </button>

              {/* Terms */}
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                By proceeding, you agree to our{' '}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentModal;