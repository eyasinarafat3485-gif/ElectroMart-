"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";

// টাইপস্ক্রিপ্ট ইন্টারফেস
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  isNew?: boolean;
}

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // রিকোয়ারমেন্ট অনুযায়ী স্কেলেটন লোডার টেস্ট করার জন্য ২ সেকেন্ড ডিলে দেওয়া হয়েছে
  useEffect(() => {
    const timer = setTimeout(() => {
      // রিয়েল গ্যাজেট ডাটা
      setProducts([
        {
          id: "1",
          name: "MacBook Pro M3 Max",
          category: "Laptops",
          price: 2499,
          oldPrice: 2699,
          rating: 4.9,
          image: "💻", 
          isNew: true,
        },
        {
          id: "2",
          name: "iPhone 16 Pro Max",
          category: "Smartphones",
          price: 1199,
          rating: 4.8,
          image: "📱",
          isNew: true,
        },
        {
          id: "3",
          name: "Ultra Watch 3 Cellular",
          category: "Wearables",
          price: 799,
          oldPrice: 849,
          rating: 4.7,
          image: "⌚",
        },
        {
          id: "4",
          name: "Sony WH-1000XM5",
          category: "Audio",
          price: 399,
          rating: 4.6,
          image: "🎧",
        },
      ]);
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-slate-950 py-15 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* সেকশন হেডার */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-indigo-400 text-xs font-semibold tracking-wider uppercase block mb-1">
              Top Picks
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              Trending Products
            </h2>
          </div>
          <Link 
            href="/explore" 
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors mt-2 md:mt-0 inline-flex items-center gap-1"
          >
            View All Products →
          </Link>
        </div>

        {/* রিকোয়ারমেন্ট ১: রেসপনসিভ গ্রিড লেআউট (বড় স্ক্রিনে ৪টি কার্ড) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? // রিকোয়ারমেন্ট ২: লোডিং অবস্থায় ৪টি স্কেলেটন কার্ড দেখাবে
              Array.from({ length: 4 }).map((_, index) => <ProductSkeleton key={index} />)
            : // ডেটা চলে আসলে রিয়েল প্রোডাক্ট কার্ড দেখাবে
              products.map((product) => (
                <div 
                  key={product.id}
                  className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4 transition-all duration-300 hover:border-slate-700 hover:-translate-y-1 flex flex-col justify-between"
                >
                  {/* ব্যাজ এবং অ্যাকশন বাটন */}
                  <div className="relative aspect-square w-full bg-slate-950 rounded-xl flex items-center justify-center text-6xl border border-slate-800/50 overflow-hidden">
                    {product.isNew && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-indigo-600 text-[10px] font-bold text-white uppercase tracking-wider rounded-md">
                        New
                      </span>
                    )}
                    <button className="absolute top-2 right-2 p-1.5 bg-slate-900/80 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-400 transition-colors border border-slate-800">
                      <Heart className="w-4 h-4" />
                    </button>
                    
                    {/* প্রোডাক্টের ডামি আইকন/ইমেজ */}
                    <span className="group-hover:scale-110 transition-transform duration-300">{product.image}</span>

                    {/* হোভার ওয়ান-ক্লিক কুইক ভিউ লেয়ার */}
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <Link 
                        href={`/products/${product.id}`}
                        className="p-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl transition-colors border border-slate-800 shadow-xl"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* টেক্সট কন্টেন্ট */}
                  <div className="mt-4 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-slate-500 font-medium">{product.category}</span>
                      <h3 className="text-base font-bold text-white mt-0.5 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* রেটিং */}
                      <div className="flex items-center space-x-1 mt-1.5">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span className="text-xs font-semibold text-slate-300">{product.rating}</span>
                      </div>
                    </div>

                    {/* প্রাইস এবং কার্ট বাটন */}
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/60">
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-lg font-extrabold text-white">${product.price}</span>
                        {product.oldPrice && (
                          <span className="text-xs text-slate-500 line-through">${product.oldPrice}</span>
                        )}
                      </div>
                      
                      <button className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-95">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

// ৩. স্কেলেটন লোডার কম্পোনেন্ট (একই ফাইলে বা আলাদা ফাইলে রাখা যাবে)
function ProductSkeleton() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 animate-pulse flex flex-col justify-between h-full">
      {/* ইমেজ এরিয়া স্কেলেটন */}
      <div className="aspect-square w-full bg-slate-950 rounded-xl" />
      
      {/* টেক্সট এরিয়া স্কেলেটন */}
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-slate-950 rounded w-1/4" />
        <div className="h-4 bg-slate-950 rounded w-3/4" />
        <div className="h-3 bg-slate-950 rounded w-1/3" />
      </div>

      {/* ফুটার/প্রাইস এরিয়া স্কেলেটন */}
      <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between">
        <div className="h-5 bg-slate-950 rounded w-1/3" />
        <div className="h-8 w-8 bg-slate-950 rounded-xl" />
      </div>
    </div>
  );
}