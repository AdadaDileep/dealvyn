
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Coupon } from '../types';
import { INITIAL_COUPONS } from '../constants';

interface DataContextType {
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id' | 'isActive' | 'createdAt' | 'code'>) => void;
  getCouponsByPublisher: (publisherId: string) => Coupon[];
  getFilteredCoupons: (city: string, category?: string) => Coupon[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const savedCoupons = localStorage.getItem('cf_coupons');
    if (savedCoupons) {
      setCoupons(JSON.parse(savedCoupons));
    } else {
      setCoupons(INITIAL_COUPONS);
      localStorage.setItem('cf_coupons', JSON.stringify(INITIAL_COUPONS));
    }
  }, []);

  const addCoupon = (newCouponData: Omit<Coupon, 'id' | 'isActive' | 'createdAt' | 'code'>) => {
    // Internal Platform Logic: Generate code only. Everything else is pre-selected.
    const generatedCode = `${newCouponData.brandName.substring(0, 3).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`;

    const newCoupon: Coupon = {
      ...newCouponData,
      id: Math.random().toString(36).substr(2, 9),
      code: generatedCode,
      isActive: true,
      createdAt: Date.now(),
    };
    
    const updatedCoupons = [newCoupon, ...coupons];
    setCoupons(updatedCoupons);
    localStorage.setItem('cf_coupons', JSON.stringify(updatedCoupons));
  };

  const getCouponsByPublisher = (publisherId: string) => {
    return coupons.filter(c => c.publisherId === publisherId);
  };

  const getFilteredCoupons = (city: string, category?: string) => {
    return coupons.filter(c => {
      const cityMatch = c.city.toLowerCase() === city.toLowerCase();
      const categoryMatch = !category || c.category === category;
      return c.isActive && cityMatch && categoryMatch;
    });
  };

  return (
    <DataContext.Provider value={{ coupons, addCoupon, getCouponsByPublisher, getFilteredCoupons }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
