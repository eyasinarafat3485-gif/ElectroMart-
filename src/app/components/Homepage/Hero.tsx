"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Laptop, Smartphone, Watch } from "lucide-react";

// টাইপস্ক্রিপ্টের জন্য স্লাইড ডাটার ইন্টারফেস
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // রিয়েল ই-কমার্স কন্টেন্ট (কোনো ডামি টেক্সট নেই)
  const slides: Slide[] = [
    {
      id: 1,
      tag: "Limited Edition",
      title: "Next-Gen Spatial Computing",
      subtitle: "The Ultimate Workstation",
      description: "Experience professional-grade laptops with Apple M-series and Intel Core i9 processors. Pre-loaded with TypeScript & AI tools.",
      ctaText: "Shop Laptops",
      ctaLink: "/explore?category=laptops",
      icon: Laptop,
    },
    {
      id: 2,
      tag: "New Arrival",
      title: "Flagship Smartphones",
      subtitle: "Capture Your Universe",
      description: "Unleash revolutionary cameras, 120Hz OLED displays, and all-day battery life. Up to 20% flat discount for online pre-orders.",
      ctaText: "Explore Phones",
      ctaLink: "/explore?category=phones",
      icon: Smartphone,
    },
    {
      id: 3,
      tag: "Trending Now",
      title: "Ecosystem Smartwatches",
      subtitle: "Track Your Evolution",
      description: "Advanced health monitoring, cellular connectivity, and premium titanium build. Syncs flawlessly with your premium devices.",
      ctaText: "View Wearables",
      ctaLink: "/explore?category=wearables",
      icon: Watch,
    },
  ];

  // অটো-প্লে স্লাইডার ইফেক্ট (প্রতি ৫ সেকেন্ড পর পর স্লাইড চেঞ্জ হবে)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
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
    <section className="relative h-[69vh] w-full bg-slate-950 overflow-hidden border-slate-900 flex items-center">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:35px_35px]" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        <div className="md:col-span-7 space-y-4 text-left transition-all duration-500 ease-in-out">
          <span className="inline-block px-3 py-1 bg-indigo-600/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider rounded-full border border-indigo-500/20">
            {slides[currentSlide].tag}
          </span>
          
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-bold text-slate-400">
              {slides[currentSlide].subtitle}
            </h2>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
              {slides[currentSlide].title}
            </h1>
          </div>

          <p className="text-sm md:text-base text-slate-400 max-w-xl leading-relaxed">
            {slides[currentSlide].description}
          </p>

          <div className="pt-2 flex items-center space-x-4">
            <Link
              href={slides[currentSlide].ctaLink}
              className="group flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5"
            >
              <span>{slides[currentSlide].ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="hidden md:col-span-5 md:flex justify-center items-center relative">
          <div className="w-64 h-64 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center p-8 shadow-2xl relative animate-bounce [animation-duration:4s]">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/5 to-transparent rounded-3xl" />
            <ActiveIcon className="w-32 h-32 text-indigo-500 opacity-80" />
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-slate-900/60 border border-slate-800 rounded-xl hover:bg-indigo-600 hover:text-white text-slate-400 transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-slate-900/60 border border-slate-800 rounded-xl hover:bg-indigo-600 hover:text-white text-slate-400 transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-6 bg-indigo-500" : "w-1.5 bg-slate-700"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}