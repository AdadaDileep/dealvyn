
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { CATEGORIES, CITIES, SYSTEM_SUGGESTIONS } from '../constants';
import { CouponSuggestion } from '../types';
import { 
  CheckCircle2, 
  Zap, 
  MapPin, 
  Tag, 
  ArrowRight, 
  Loader2, 
  Utensils, 
  ShoppingBag, 
  Plane, 
  Smartphone, 
  Sparkles, 
  MoreHorizontal,
  ChevronLeft,
  Store,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

const CategoryIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Food': return <Utensils className={className} />;
    case 'Grocery': return <ShoppingBag className={className} />;
    case 'Travel': return <Plane className={className} />;
    case 'Electronics': return <Smartphone className={className} />;
    case 'Beauty': return <Sparkles className={className} />;
    default: return <MoreHorizontal className={className} />;
  }
};

const PublisherDashboard: React.FC = () => {
  const { user } = useAuth();
  const { addCoupon } = useData();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    brandName: 'Premium Partner', // Default brand name for the demo
    city: '',
    category: '',
  });

  const [selectedSuggestion, setSelectedSuggestion] = useState<CouponSuggestion | null>(null);
  const [submittedTrack, setSubmittedTrack] = useState<CouponSuggestion | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category });
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 1000);
  };

  const handleSubmitPromotion = () => {
    if (!selectedSuggestion) return;
    
    // Extract a more realistic brand name from user email if possible, else use default
    const inferredBrand = user?.email.split('@')[0].toUpperCase() || formData.brandName;

    addCoupon({
      brandName: inferredBrand,
      productName: selectedSuggestion.productName,
      category: formData.category,
      discountPercentage: selectedSuggestion.discountPercentage,
      city: formData.city,
      imageUrl: selectedSuggestion.imageUrl,
      publisherId: user?.id || '',
    });

    setSubmittedTrack(selectedSuggestion);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({ ...formData, city: '', category: '' });
    setSelectedSuggestion(null);
    setSubmittedTrack(null);
  };

  const currentSuggestions = SYSTEM_SUGGESTIONS[formData.category] || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Progress Header */}
      {step < 4 && (
        <div className="mb-12 flex items-center justify-between px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                step >= s ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`w-12 sm:w-24 h-1 mx-2 rounded-full transition-all ${
                  step > s ? 'bg-indigo-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
        {/* Step 1: Location Selection */}
        {step === 1 && (
          <div className="p-10 md:p-16 flex flex-col items-center justify-center flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-indigo-50 p-4 rounded-3xl mb-6">
              <MapPin className="h-10 w-10 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 text-center mb-2">Target Market</h1>
            <p className="text-gray-500 text-center mb-10 max-w-sm">Select the geographical hub where you want to deploy your promotional visibility.</p>
            
            <form onSubmit={handleStep1Submit} className="w-full max-w-md space-y-8">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Select Active City</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
                  <select
                    required
                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold transition-all appearance-none cursor-pointer"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    <option value="">Choose Location</option>
                    {CITIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              
              <button
                disabled={!formData.city}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-2 shadow-xl shadow-indigo-100"
              >
                <span>Continue to Categories</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-12 flex items-center space-x-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              <Store className="h-3 w-3" />
              <span>Merchant: {user?.email}</span>
            </div>
          </div>
        )}

        {/* Step 2: Category Selection */}
        {step === 2 && (
          <div className="p-10 md:p-16 flex flex-col items-center justify-center flex-grow animate-in fade-in slide-in-from-right-4 duration-500 relative">
            <button onClick={() => setStep(1)} className="absolute top-8 left-8 flex items-center text-gray-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </button>
            <div className="bg-indigo-50 p-4 rounded-3xl mb-6">
              <Tag className="h-10 w-10 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 text-center mb-2">Select Category</h2>
            <p className="text-gray-500 text-center mb-10 max-w-sm">Identify your business segment for optimized offer generation in <span className="text-indigo-600 font-bold">{formData.city}</span>.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl">
              {CATEGORIES.filter(c => c.name !== 'Other').map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.name)}
                  className="group flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-100 rounded-[2rem] hover:bg-indigo-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm hover:shadow-xl"
                >
                  <CategoryIcon name={cat.name} className="h-8 w-8 mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm tracking-tight">{cat.name}</span>
                </button>
              ))}
            </div>
            
            {isProcessing && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 animate-in fade-in duration-300">
                <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
                <p className="font-black text-indigo-600 tracking-widest uppercase text-xs">Analyzing Market Data...</p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: AI Suggestions */}
        {step === 3 && (
          <div className="p-10 md:p-16 flex flex-col flex-grow animate-in fade-in slide-in-from-right-4 duration-500">
             <button onClick={() => setStep(2)} className="self-start flex items-center text-gray-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest mb-8 transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Change Category
            </button>
            <div className="mb-10">
              <h2 className="text-3xl font-black text-gray-900 mb-2">AI-Optimized Tracks</h2>
              <p className="text-gray-500">Select one promotional track. All pricing and codes are platform-managed for maximum conversion in <span className="text-indigo-600 font-bold">{formData.city}</span>.</p>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              {currentSuggestions.map((suggestion, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedSuggestion(suggestion)}
                  className={`relative flex items-center p-6 rounded-[2rem] border-2 transition-all cursor-pointer group ${
                    selectedSuggestion?.productName === suggestion.productName 
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-lg' 
                    : 'border-gray-100 bg-gray-50 hover:border-indigo-200 hover:bg-white'
                  }`}
                >
                  <div className="h-24 w-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                    <img src={suggestion.imageUrl} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt={suggestion.productName} />
                  </div>
                  <div className="ml-6 flex-grow">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="h-3 w-3 text-indigo-500 fill-indigo-500" />
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Optimized Track</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{suggestion.productName}</h4>
                    <div className="flex items-center mt-2">
                       <span className="text-2xl font-black text-gray-900">{suggestion.discountPercentage}% <span className="text-sm font-medium text-gray-400">Discount</span></span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full transition-all ${
                    selectedSuggestion?.productName === suggestion.productName 
                    ? 'bg-indigo-600 text-white shadow-lg scale-110' 
                    : 'bg-white text-transparent border border-gray-200'
                  }`}>
                     <CheckCircle2 className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>

            <button
              disabled={!selectedSuggestion}
              onClick={handleSubmitPromotion}
              className="w-full bg-gray-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-indigo-600 transition-all transform active:scale-[0.98] shadow-2xl disabled:opacity-50"
            >
              Submit Promotion
            </button>
          </div>
        )}

        {/* Step 4: Confirmation & Summary */}
        {step === 4 && (
          <div className="p-10 md:p-16 flex flex-col items-center justify-center text-center flex-grow animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-50">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            
            <h3 className="text-3xl font-black text-gray-900 mb-2">Promotion Live!</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto mb-10">
              Your promotional campaign has been successfully deployed and is now being served to active users in <span className="text-indigo-600 font-bold">{formData.city}</span>.
            </p>

            {/* Submitted Track Card Summary */}
            {submittedTrack && (
              <div className="w-full max-w-md bg-gray-50 border border-gray-100 rounded-[2.5rem] p-6 mb-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">Active Track</span>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="h-24 w-24 rounded-2xl overflow-hidden shadow-lg border border-white">
                    <img src={submittedTrack.imageUrl} alt={submittedTrack.productName} className="h-full w-full object-cover" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1 flex items-center">
                      <Zap className="h-3 w-3 mr-1 fill-current" />
                      {formData.category}
                    </p>
                    <h4 className="text-xl font-black text-gray-900">{submittedTrack.productName}</h4>
                    <div className="flex items-center mt-2 space-x-3">
                      <div className="text-2xl font-black text-gray-900">{submittedTrack.discountPercentage}%</div>
                      <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        <MapPin className="h-3 w-3 mr-1" />
                        {formData.city}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
              <button 
                onClick={handleReset}
                className="flex items-center justify-center space-x-2 px-6 py-5 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 transform active:scale-95"
              >
                <ArrowRight className="h-5 w-5" />
                <span>Launch New Hub</span>
              </button>
              
              <button 
                onClick={handleReset}
                className="flex items-center justify-center space-x-2 px-6 py-5 bg-white border-2 border-gray-200 text-gray-600 rounded-2xl font-black hover:bg-gray-50 hover:border-gray-300 transition-all transform active:scale-95"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Hubs</span>
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 w-full flex items-center justify-center space-x-4 opacity-50">
               <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                 <ExternalLink className="h-3 w-3 mr-1.5" />
                 Platform Managed distribution
               </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer Info */}
      <div className="mt-8 text-center px-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto">
          AI Distribution Engine v2.4 (Beta) • Visibility and Coupon Generation is 100% Platform Managed
        </p>
      </div>
    </div>
  );
};

export default PublisherDashboard;
