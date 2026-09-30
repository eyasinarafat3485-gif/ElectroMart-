'use client';

import { useState } from 'react';
import { Mail, Gift, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 5000);
    }
  };

  return (
    <section className="bg-[#030712] py-10 sm:py-18 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[200px] sm:h-[300px] bg-gradient-to-r from-indigo-600/15 via-cyan-500/15 to-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-2xl space-y-4 sm:space-y-6">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] sm:text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
            <span>Join ElectroMart VIP Tech Club</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Get ৳ 1,000 Off on Your First Flagship Order
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Subscribe to receive insider access to flash sales, exclusive Eid tech drops, and new device launches across Bangladesh.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-cyan-500 text-white pl-10 pr-3.5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl outline-none text-xs sm:text-sm transition-all shadow-inner"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 transition-all font-bold text-white px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm whitespace-nowrap shadow-lg shadow-indigo-600/25 cursor-pointer"
              >
                Claim Coupon
              </button>
            </form>
          ) : (
            <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 py-4 px-5 rounded-2xl text-xs sm:text-sm font-semibold max-w-md mx-auto space-y-1">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                <span>🎉 VIP Pass Activated!</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Use voucher code <strong className="text-white font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">ELECTROBD2026</strong> at checkout.
              </p>
            </div>
          )}

          <p className="text-[10px] sm:text-[11px] text-slate-400">
            No spam guaranteed. Unsubscribe anytime with 1-click.
          </p>

        </div>
      </div>
    </section>
  );
}