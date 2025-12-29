
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { CATEGORIES, CITIES } from '../constants';
import { Search, MapPin, Tag, ArrowRight, Info, Ticket, Zap } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { getFilteredCoupons } = useData();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const coupons = selectedCity ? getFilteredCoupons(selectedCity, selectedCategory) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Discover Premium Offers</h1>
        <p className="text-gray-500 mt-2 text-lg">Platform-verified deals available in your city.</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-200 mb-12 flex flex-col md:flex-row gap-5 items-center">
        <div className="flex-1 w-full relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <select
            className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none appearance-none font-bold text-gray-700 transition-all"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select Target City (Mandatory)</option>
            {CITIES.map(city => (
              <option key={city.id} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 w-full relative group">
          <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <select
            className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none appearance-none font-bold text-gray-700 transition-all"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories (Optional)</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-shrink-0 hidden md:block">
           <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
             <Search className="h-6 w-6" />
           </div>
        </div>
      </div>

      {/* Content */}
      {!selectedCity ? (
        <div className="bg-indigo-50 border border-indigo-100 rounded-[3rem] p-24 text-center">
          <div className="mx-auto w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mb-8 shadow-md">
            <Zap className="h-10 w-10 text-indigo-600 fill-indigo-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Ready to start saving?</h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">Select your city above to browse exclusive, system-generated promotions tailored to your location.</p>
        </div>
      ) : coupons.length === 0 ? (
        <div className="text-center py-24">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
            <Info className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-black text-gray-900">No active promotions in {selectedCity}</h3>
          <p className="text-gray-500 mt-2">Try switching categories or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group hover:-translate-y-2">
              {/* Image Section */}
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={coupon.imageUrl || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800'} 
                  alt={coupon.brandName} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30">
                    {coupon.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-6">
                   <div className="flex items-center space-x-2">
                     <span className="text-4xl font-black text-white">{coupon.discountPercentage}%</span>
                     <span className="text-lg font-bold text-white/90">OFF</span>
                   </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{coupon.brandName}</h3>
                    <p className="text-sm font-bold text-indigo-500 mt-1 uppercase tracking-tighter">
                      {coupon.productName || 'Special Offer'}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center mt-3 font-semibold">
                      <MapPin className="h-3 w-3 mr-1" />
                      {coupon.city}
                    </p>
                  </div>
                  <div className="p-2 bg-indigo-50 rounded-xl">
                    <Ticket className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                
                <Link
                  to={`/coupon/${coupon.id}`}
                  className="w-full flex items-center justify-center space-x-2 py-4 px-6 bg-gray-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all transform active:scale-95 shadow-xl shadow-gray-100"
                >
                  <span>Claim Coupon</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
