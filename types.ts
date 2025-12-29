
export enum UserRole {
  PUBLISHER = 'PUBLISHER',
  USER = 'USER'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface Coupon {
  id: string;
  brandName: string;
  productName?: string; // Specific product for the offer
  category: string;
  discountPercentage: number;
  code: string;
  city: string;
  isActive: boolean;
  publisherId: string;
  createdAt: number;
  imageUrl?: string; // Image for better UX
}

export interface Category {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
}

export interface CouponSuggestion {
  productName: string;
  discountPercentage: number;
  imageUrl: string;
}
