"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Laptop, 
  Smartphone, 
  Headphones, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  Flame
} from "lucide-react";

interface Slide {
  id: number;
  tag: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  priceHighlight: string;
  ctaText: string;
  ctaLink: string;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides: Slide[] = [
    {
      id: 1,
      tag: "🔥 Hot Flagship Deal",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      title: "Apple M3 Pro & Core i9 Series",
      subtitle: "Workstation Grade Laptops",
      description: "Supercharged performance for engineers, creators & gamers across Bangladesh. Enjoy official replacement warranty & 0% EMI facilities.",
      priceHighlight: "Starting at ৳ 145,000",
      ctaText: "Shop Flagship Laptops",
      ctaLink: "/all-items",
      gradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
      icon: Laptop,
    },
    {
      id: 2,
      tag: "⚡ New Official Arrival",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      title: "Revolutionary 200MP Cameras",
      subtitle: "Flagship Smartphones",
      description: "Experience 120Hz Super AMOLED displays, all-day battery performance, and official BTRC-approved genuine smartphones at unmatched prices.",
      priceHighlight: "Flat 12% bKash Cashback",
      ctaText: "Explore Smartphones",
      ctaLink: "/all-items",
      gradient: "from-cyan-600/20 via-blue-600/10 to-transparent",
      icon: Smartphone,
    },
    {
      id: 3,
      tag: "🎧 Audiophile Grade",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      title: "Industry Leading Noise Cancelling",
      subtitle: "Studio Audio & Headphones",
      description: "Immerse yourself in high-res spatial audio, crystal-clear voice microphones, and 30-hour battery life with global sound engineering.",
      priceHighlight: "From ৳ 4,999",
      ctaText: "Discover Premium Audio",
      ctaLink: "/all-items",
      gradient: "from-purple-600/20 via-indigo-600/10 to-transparent",
      icon: Headphones,
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const ActiveIcon = slides[currentSlide].icon;

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] w-full bg-[#030712] overflow-hidden border-b border-slate-800/60 pt-4 sm:pt-6 pb-8 sm:pb-12 flex items-center tech-grid-pattern">
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-600/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Text & CTA Section */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full border ${slides[currentSlide].badgeColor} shadow-sm backdrop-blur-md`}>
                {slides[currentSlide].tag}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-semibold rounded-full">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 100% Genuine BD Unit
              </span>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h2 className="text-xs sm:text-sm md:text-lg font-bold text-cyan-400 tracking-wider uppercase">
                {slides[currentSlide].subtitle}
              </h2>
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                {slides[currentSlide].title}
              </h1>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl leading-relaxed">
              {slides[currentSlide].description}
            </p>

            <div className="p-2.5 sm:p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md inline-flex items-center gap-2.5 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-[9px] sm:text-[11px] text-slate-400 font-medium uppercase tracking-wider">Offer Highlight</p>
                <p className="text-xs sm:text-sm md:text-base font-extrabold text-white">{slides[currentSlide].priceHighlight}</p>
              </div>
            </div>

            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2.5 sm:gap-4">
              <Link
                href={slides[currentSlide].ctaLink}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 shadow-xl shadow-indigo-600/25"
              >
                <span>{slides[currentSlide].ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/all-items"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 transition-all duration-200"
              >
                Browse All Items
              </Link>
            </div>

          </div>

          {/* Right Visual Interactive Card */}
          <div className="hidden lg:col-span-5 lg:flex justify-center items-center relative">
            <div className="relative w-80 h-80 rounded-3xl p-8 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 shadow-2xl flex flex-col items-center justify-center group overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} rounded-3xl pointer-events-none transition-all duration-700`} />
              
              <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-700/80 px-3 py-1 rounded-full text-[11px] font-bold text-cyan-400 flex items-center gap-1 shadow-md">
                <Flame className="w-3.5 h-3.5 text-rose-500" /> Bestseller
              </div>

              <div className="relative z-10 w-44 h-44 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center p-6 shadow-inner group-hover:scale-105 transition-transform duration-500">
                <ActiveIcon className="w-24 h-24 text-cyan-400 transition-colors duration-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
              </div>

              <div className="relative z-10 mt-6 text-center">
                <p className="text-xs font-semibold text-slate-400">Authentic Tech Solution</p>
                <p className="text-sm font-bold text-white mt-0.5">ElectroMart Bangladesh</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Quick Perks Strip */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-white truncate">24h Express Delivery</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 truncate">Dhaka &amp; 64 Districts</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-white truncate">Official Warranty</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 truncate">100% Genuine BD Units</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-white truncate">0% EMI Available</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 truncate">20+ Partner Banks</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-white truncate">7-Day Replacement</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 truncate">Easy Swap Protocol</p>
            </div>
          </div>
        </div>

      </div>

      {/* Slide Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl sm:rounded-2xl hover:bg-indigo-600 hover:text-white text-slate-400 transition-all duration-200 z-20 backdrop-blur-md cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl sm:rounded-2xl hover:bg-indigo-600 hover:text-white text-slate-400 transition-all duration-200 z-20 backdrop-blur-md cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Slide Dots Indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index ? "w-6 sm:w-8 bg-indigo-500" : "w-1.5 sm:w-2 bg-slate-700 hover:bg-slate-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}