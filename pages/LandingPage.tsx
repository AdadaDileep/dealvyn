
import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ShieldCheck, Zap, Users } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="rounded-full px-3 py-1 text-sm leading-6 text-indigo-600 ring-1 ring-indigo-600/10 hover:ring-indigo-600/20 bg-indigo-50 font-semibold">
                Trusted by 5,000+ Brands Worldwide
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Verified Coupons.<br />Real Savings.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The premier marketplace for authentic brand discounts. Whether you're a business looking to reach new customers or a shopper hunting for the best deals, we've got you covered.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/login"
                state={{ preferredRole: 'USER' }}
                className="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all transform hover:scale-105"
              >
                I want Coupons
              </Link>
              <Link
                to="/login"
                state={{ preferredRole: 'PUBLISHER' }}
                className="rounded-xl bg-white border-2 border-indigo-600 px-8 py-4 text-lg font-semibold text-indigo-600 hover:bg-indigo-50 transition-all"
              >
                I am a Publisher
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <dt className="text-lg font-bold leading-7 text-gray-900">Verified Codes</dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Every coupon is manually verified to ensure it works, saving you time and frustration.</p>
              </dd>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <dt className="text-lg font-bold leading-7 text-gray-900">Instant Access</dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Find deals in your city instantly. No complicated steps, just find, click, and save.</p>
              </dd>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                <Users className="h-6 w-6 text-white" />
              </div>
              <dt className="text-lg font-bold leading-7 text-gray-900">Publisher Control</dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Publishers get simple tools to manage their presence and distribution through our pool.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
