'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, Truck, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface CounterProps {
  end: number;
  suffix?: string;
}

function Counter({ end, suffix = "" }: CounterProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const increment = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">{count.toLocaleString()}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="bg-[#030712] py-10 sm:py-16 border-b border-slate-800/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/20 via-slate-900/10 to-cyan-950/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-cyan-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            Trusted By Tech Enthusiasts
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-2">
            Powering Bangladesh&apos;s Digital Revolution
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
            From Dhaka tech parks to all 64 districts — delivering genuine innovation daily.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-center">
          
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-2.5 sm:mb-4">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <Counter end={28500} suffix="+" />
            <p className="text-slate-400 mt-1 sm:mt-2 text-xs sm:text-sm font-semibold">Happy Customers</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2.5 sm:mb-4">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <Counter end={1200} suffix="+" />
            <p className="text-slate-400 mt-1 sm:mt-2 text-xs sm:text-sm font-semibold">Original Gadgets</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2.5 sm:mb-4">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <Counter end={64} suffix=" Districts" />
            <p className="text-slate-400 mt-1 sm:mt-2 text-xs sm:text-sm font-semibold">Nationwide Delivery</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5 sm:mb-4">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <Counter end={24} suffix="/7" />
            <p className="text-slate-400 mt-1 sm:mt-2 text-xs sm:text-sm font-semibold">Tech Support</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}