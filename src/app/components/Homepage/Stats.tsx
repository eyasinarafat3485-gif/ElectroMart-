// components/home/Stats.tsx
'use client';
import { useEffect, useState } from 'react';

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
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

  return <span className="font-mono text-5xl font-bold text-white">{count}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="bg-slate-950 py-15 border-slate-900">
        
      <div className="text-center mb-12">
          <span className="text-indigo-400 text-xs font-semibold tracking-wider uppercase">Trusted By Thousands Across Bangladesh </span>
        </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div>
            <Counter end={25000} suffix="+" />
            <p className="text-slate-400 mt-3 text-lg">Happy Customers</p>
          </div>

          <div>
            <Counter end={850} suffix="+" />
            <p className="text-slate-400 mt-3 text-lg">Premium Products</p>
          </div>

          <div>
            <Counter end={98} suffix="%" />
            <p className="text-slate-400 mt-3 text-lg">On-Time Delivery</p>
          </div>

          <div>
            <Counter end={24} suffix="/7" />
            <p className="text-slate-400 mt-3 text-lg">Customer Support</p>
          </div>

        </div>

        
      </div>
    </section>
  );
}