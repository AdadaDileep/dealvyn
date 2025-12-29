
import { Category, City, Coupon, CouponSuggestion } from './types';

export const CATEGORIES: Category[] = [
  { id: 'food', name: 'Food' },
  { id: 'grocery', name: 'Grocery' },
  { id: 'travel', name: 'Travel' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'other', name: 'Other' },
];

export const CITIES: City[] = [
  { id: 'hyderabad', name: 'Hyderabad' },
  { id: 'bangalore', name: 'Bangalore' },
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'delhi', name: 'Delhi' },
  { id: 'pune', name: 'Pune' },
];

export const SYSTEM_SUGGESTIONS: Record<string, CouponSuggestion[]> = {
  'Food': [
    { productName: 'Classic Burger Combo', discountPercentage: 15, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400' },
    { productName: 'Family Pizza Feast', discountPercentage: 20, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400' },
    { productName: 'Healthy Salad Bowl', discountPercentage: 10, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400' }
  ],
  'Grocery': [
    { productName: 'Rin Bar Multi-Pack', discountPercentage: 10, imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=400' },
    { productName: 'Surf Excel Matic 2kg', discountPercentage: 15, imageUrl: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=400' },
    { productName: 'Fresh Organic Milk', discountPercentage: 5, imageUrl: 'https://images.unsplash.com/photo-1563636619-e910f64ff1cf?auto=format&fit=crop&q=80&w=400' }
  ],
  'Travel': [
    { productName: 'Domestic Flight Voucher', discountPercentage: 12, imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=400' },
    { productName: 'Luxury Hotel Stay', discountPercentage: 25, imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400' },
    { productName: 'Weekend Gateway Package', discountPercentage: 18, imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400' }
  ],
  'Electronics': [
    { productName: 'Wireless Noise Canceling Buds', discountPercentage: 10, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
    { productName: 'Next-Gen Smartphone', discountPercentage: 5, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400' },
    { productName: 'Smart Home Hub', discountPercentage: 15, imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400' }
  ],
  'Beauty': [
    { productName: 'Hydrating Skin Serum', discountPercentage: 30, imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400' },
    { productName: 'Pro-Glow Face Wash', discountPercentage: 20, imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400' },
    { productName: 'Nourishing Hair Mask', discountPercentage: 15, imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=400' }
  ],
  'Other': [
    { productName: 'General Store Credit', discountPercentage: 10, imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=400' },
    { productName: 'Premium Subscription', discountPercentage: 20, imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400' }
  ]
};

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: '1',
    brandName: 'Swiggy',
    productName: 'Lunch Specials',
    category: 'Food',
    discountPercentage: 20,
    code: 'SWIG20',
    city: 'Hyderabad',
    isActive: true,
    publisherId: 'pub_1',
    createdAt: Date.now() - 100000,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    brandName: 'Zomato',
    productName: 'Dinner Combo',
    category: 'Food',
    discountPercentage: 10,
    code: 'ZOM10',
    city: 'Hyderabad',
    isActive: true,
    publisherId: 'pub_1',
    createdAt: Date.now() - 90000,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    brandName: 'Zepto',
    productName: 'Fresh Fruits',
    category: 'Grocery',
    discountPercentage: 15,
    code: 'ZEP15',
    city: 'Hyderabad',
    isActive: true,
    publisherId: 'pub_1',
    createdAt: Date.now() - 80000,
    imageUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800'
  }
];
