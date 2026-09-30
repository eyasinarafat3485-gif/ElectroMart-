"use client";

import React from "react";
import Link from "next/link";
import { 
  Smartphone, 
  Laptop, 
  Tv, 
  Headphones, 
  Camera, 
  Layers,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

interface Category {
  name: string;
  count: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  borderColor: string;
  href: string;
}

const categories: Category[] = [
  {
    name: "Smartphones",
    count: "120+ Models",
    icon: Smartphone,
    color: "from-emerald-500/20 to-teal-500/10 text-emerald-400",
    borderColor: "hover:border-emerald-500/40",
    href: "/all-items?category=Smartphones",
  },
  {
    name: "Laptops",
    count: "85+ Models",
    icon: Laptop,
    color: "from-orange-500/20 to-amber-500/10 text-orange-400",
    borderColor: "hover:border-orange-500/40",
    href: "/all-items?category=Laptops",
  },
  {
    name: "Headphones",
    count: "95+ Models",
    icon: Headphones,
    color: "from-blue-500/20 to-indigo-500/10 text-blue-400",
    borderColor: "hover:border-blue-500/40",
    href: "/all-items?category=Headphones",
  },
  {
    name: "Televisions",
    count: "40+ Models",
    icon: Tv,
    color: "from-purple-500/20 to-pink-500/10 text-purple-400",
    borderColor: "hover:border-purple-500/40",
    href: "/all-items?category=Televisions",
  },
  {
    name: "Cameras",
    count: "30+ Models",
    icon: Camera,
    color: "from-rose-500/20 to-red-500/10 text-rose-400",
    borderColor: "hover:border-rose-500/40",
    href: "/all-items?category=Cameras",
  },
  {
    name: "All Gadgets",
    count: "Explore 500+",
    icon: Layers,
    color: "from-cyan-500/20 to-blue-500/10 text-cyan-400",
    borderColor: "hover:border-cyan-500/40",
    href: "/all-items",
  },
];

export default function CategoryGrid() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      const itemWidth = 145; // Approximate card width + gap
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(categories.length - 1, Math.max(0, index)));
    }
  };

  // Auto-Carousel Timer for Mobile
  React.useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const cardStep = 145;

        if (scrollLeft >= maxScroll - 15) {
          // Loop back to start smoothly
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainerRef.current.scrollBy({ left: cardStep, behavior: "smooth" });
        }
      }
    }, 2400);

    return () => clearInterval(timer);
  }, [isPaused]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToCategory = (index: number) => {
    if (scrollContainerRef.current) {
      const targetLeft = index * 145;
      scrollContainerRef.current.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      className="py-8 sm:py-14 bg-[#030712] border-b border-slate-800/60 px-4 md:px-10 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        // Resume auto-sliding after 1.5s
        setTimeout(() => setIsPaused(false), 1500);
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Desktop View All & Mobile Scroll Arrows */}
        <div className="flex items-end justify-between mb-5 sm:mb-8 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                Browse Categories
              </span>
              <span className="sm:hidden text-[9px] font-bold text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Auto Slides
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white mt-1.5 sm:mt-2">
              Explore Popular Gadget Hubs
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Carousel Arrow Controls */}
            <div className="flex sm:hidden items-center gap-1">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all cursor-pointer"
                aria-label="Previous Category"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all cursor-pointer"
                aria-label="Next Category"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Desktop Link */}
            <Link
              href="/all-items"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>View Complete Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Auto Carousel for Mobile (< sm) & Responsive Grid for Desktop (>= sm) */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="shrink-0 w-[135px] sm:w-auto snap-start"
              >
                <Link
                  href={cat.href}
                  className={`group flex flex-col items-center text-center p-3.5 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cat.borderColor} h-full justify-between`}
                >
                  <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-2 shadow-inner group-hover:scale-108 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate max-w-[110px] sm:max-w-none">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 font-medium">
                      {cat.count}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Interactive Dots */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 mt-2">
          {categories.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToCategory(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex ? "w-5 bg-cyan-400" : "w-1.5 bg-slate-800 hover:bg-slate-700"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
