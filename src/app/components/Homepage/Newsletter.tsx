// components/home/Newsletter.tsx
'use client';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 2500);
    }
  };

  return (
    <section className="bg-slate-950 py-15  border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto ">
         <span className="text-indigo-400 text-xs font-semibold tracking-wider uppercase">Stay Updated</span>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-white my-3">
            Get Exclusive Deals &amp; Updates
          </h2>
          
          <p className="text-slate-400 mt-4 mb-12">
            Subscribe to our newsletter and be the first to know about flash sales, 
            new arrivals, and special offers.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-slate-950 border border-slate-700 focus:border-indigo-500 text-white px-6 py-4 rounded-2xl outline-none transition-all"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 transition-all font-semibold text-white px-10 py-4 rounded-2xl whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="bg-emerald-900/30 border border-emerald-500 text-emerald-400 py-6 px-8 rounded-3xl text-lg font-medium">
              🎉 Thank you! You're now subscribed.
            </div>
          )}

          <p className="text-xs text-slate-500 mt-6">
            We respect your inbox. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}