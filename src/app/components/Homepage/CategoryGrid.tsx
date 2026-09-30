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
  return (
    <section className="py-10 sm:py-14 bg-[#030712] border-b border-slate-800/60 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-2.5 sm:gap-4">
          <div>
            <span className="text-cyan-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
              Browse Categories
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mt-2">
              Explore Popular Gadget Hubs
            </h2>
          </div>
          <Link
            href="/all-items"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors w-fit"
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <Link
                  href={cat.href}
                  className={`group flex flex-col items-center text-center p-3.5 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cat.borderColor}`}
                >
                  <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-2.5 shadow-inner group-hover:scale-108 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 font-medium">
                    {cat.count}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
