
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Copy, CheckCircle, ArrowLeft, Ticket, MapPin, ShieldCheck, Clock, ExternalLink, Zap } from 'lucide-react';

const CouponDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { coupons } = useData();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const coupon = coupons.find(c => c.id === id);

  if (!coupon) {
    return (
      <div className="max-w-xl mx-auto p-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Coupon not found</h1>
        <p className="text-gray-500 mt-2">The link might be broken or the coupon was removed.</p>
        <Link to="/dashboard" className="text-indigo-600 mt-6 inline-flex items-center font-semibold hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(coupon.code)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = coupon.code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-400 hover:text-indigo-600 font-bold mb-8 transition-colors group uppercase tracking-widest text-xs"
      >
        <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
        <span>Back to Market</span>
      </button>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Brand/Promo Section */}
          <div className="h-80 lg:h-auto relative overflow-hidden bg-gray-900">
             <img 
               src={coupon.imageUrl || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200'} 
               alt={coupon.brandName} 
               className="absolute inset-0 w-full h-full object-cover opacity-70"
             />
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-black/60" />
             
             <div className="relative h-full p-12 flex flex-col justify-center items-center text-center text-white z-10">
               <div className="inline-flex items-center px-5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black mb-8 tracking-[0.2em] uppercase border border-white/30">
                 <Zap className="h-3 w-3 mr-2 fill-current" />
                 {coupon.category}
               </div>
               <h1 className="text-8xl font-black mb-2 tracking-tighter drop-shadow-2xl">
                 {coupon.discountPercentage}%
               </h1>
               <p className="text-3xl font-black opacity-90 uppercase tracking-tighter mb-8">Instant Discount</p>
               
               <div className="w-full max-w-[280px] p-6 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20">
                 <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.3em] mb-2">Verified Merchant</p>
                 <p className="text-2xl font-black">{coupon.brandName}</p>
                 <p className="text-xs font-bold text-indigo-300 mt-1">{coupon.productName}</p>
               </div>
             </div>
          </div>

          {/* Details & Actions Section */}
          <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">{coupon.brandName}</h2>
                <div className="bg-green-100 text-green-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-green-200">
                  Live in {coupon.city}
                </div>
              </div>
              
              <p className="text-gray-500 font-bold text-lg leading-relaxed mb-6">
                Exclusive platform-generated offer for <span className="text-indigo-600">{coupon.productName || 'Premium Services'}</span>. 
              </p>

              <div className="flex flex-wrap items-center text-gray-400 gap-x-8 gap-y-3 text-xs font-black uppercase tracking-widest">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-indigo-500" />
                  {coupon.city} Hub
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                  Added {new Date(coupon.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Code Copy Area */}
            <div className="bg-gray-50 rounded-[2.5rem] p-10 border-2 border-dashed border-gray-200 mb-10 transition-all hover:border-indigo-300 hover:bg-indigo-50/20 group">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-6 text-center">Your Exclusive Code</p>
              <div className="flex flex-col items-center">
                <div className="bg-white px-10 py-6 rounded-3xl shadow-sm border border-gray-100 mb-8 w-full text-center">
                  <span className="text-5xl md:text-6xl font-mono font-black text-gray-900 tracking-[0.2em] uppercase">
                    {coupon.code}
                  </span>
                </div>
                
                <button
                  onClick={handleCopy}
                  className={`w-full py-6 rounded-[2rem] font-black text-xl flex items-center justify-center space-x-4 transition-all transform active:scale-95 shadow-2xl ${
                    copied 
                      ? 'bg-green-600 text-white shadow-green-100' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-7 w-7 animate-bounce" />
                      <span>COPIED SUCCESSFULLY</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-7 w-7" />
                      <span>COPY CODE TO CLIPBOARD</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Terms / Info */}
            <div className="space-y-6">
               <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em] mb-2">Instructions</h4>
               <div className="flex items-start space-x-5 p-6 rounded-3xl bg-gray-50/50 border border-gray-100">
                  <div className="bg-indigo-600 p-2 rounded-xl mt-1">
                    <ShieldCheck className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed font-medium">
                    This is a <span className="font-bold text-gray-900 underline decoration-indigo-300 decoration-2">system-generated offer</span>. Apply this code at checkout on the {coupon.brandName} digital platform. One-time use per customer.
                  </div>
               </div>
               <div className="flex items-center justify-center pt-4">
                 <button className="text-xs font-black text-indigo-600 flex items-center hover:text-indigo-800 transition-colors uppercase tracking-widest">
                    <span>Explore Merchant Store</span>
                    <ExternalLink className="h-3 w-3 ml-2" />
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponDetailPage;
