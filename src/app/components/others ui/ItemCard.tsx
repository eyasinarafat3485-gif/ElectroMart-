"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight, ShieldCheck } from "lucide-react";
import { Item } from "@/types/item";

type CategoryType = 'Smartphones' | 'Laptops' | 'Televisions' | 'Headphones' | 'Cameras';

const categoryColors: Record<CategoryType, string> = {
  Smartphones: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Laptops: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Televisions: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Headphones: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Cameras: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const currentCategoryColor = 
    categoryColors[item.category as CategoryType] || 'bg-slate-800 text-slate-300 border-slate-700';

  const priceNum = Number(item.price) || 0;
  const regularPrice = Math.round(priceNum * 1.12);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-slate-900/60 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-950/30"
    >
      {/* Top Media & Badges */}
      <div className="relative overflow-hidden aspect-[4/3] w-full bg-slate-950 p-3 sm:p-4 flex items-center justify-center">
        <img
          src={item?.image || "/placeholder.png"}
          alt={item?.title || item?.name || "Product"}
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-108"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";
          }}
        />

        {/* Category Badge */}
        <div className={`absolute left-2.5 top-2.5 rounded-full px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[11px] font-bold border backdrop-blur-md shadow-md ${currentCategoryColor}`}>
          {item.category || "Gadget"}
        </div>

        {/* Official Warranty Chip */}
        <div className="absolute right-2.5 top-2.5 rounded-full px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold bg-slate-900/90 border border-slate-700 text-emerald-400 flex items-center gap-1 shadow-md">
          <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Official BD
        </div>
      </div>

      {/* Product Content */}
      <div className="flex flex-col flex-1 justify-between p-3.5 sm:p-5 space-y-3 sm:space-y-4">
        
        <div className="space-y-1.5 sm:space-y-2">
          {/* Brand & Rating Row */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-indigo-400 uppercase tracking-wider text-[10px] sm:text-[11px] bg-indigo-500/10 px-1.5 sm:px-2 py-0.5 rounded-md border border-indigo-500/20">
              {item.brand || "Brand"}
            </span>

            <div className="flex items-center gap-1 bg-slate-950/80 px-1.5 sm:px-2 py-0.5 rounded-lg border border-slate-800 text-slate-200">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-[10px] sm:text-xs">{item.rating || 4.8}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="line-clamp-2 text-xs sm:text-base font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
            {item.title || item.name}
          </h3>

          {/* Description snippet */}
          <p className="line-clamp-2 text-[11px] sm:text-xs text-slate-400 leading-relaxed">
            {item.shortDescription || item.description || "Authentic tech gadget backed with official Bangladesh replacement warranty."}
          </p>
        </div>

        {/* Price & Action Section */}
        <div className="pt-2.5 sm:pt-3 border-t border-slate-800/80 space-y-2 sm:space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-xl font-black text-white tracking-tight">
                  ৳ {priceNum.toLocaleString("en-IN")}
                </span>
                {regularPrice > priceNum && (
                  <span className="text-[10px] sm:text-xs text-slate-500 line-through font-medium">
                    ৳ {regularPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] text-cyan-400 font-medium">
                EMI starts ৳{Math.round(priceNum / 12).toLocaleString("en-IN")}/mo
              </span>
            </div>
          </div>

          <Link
            href={`/all-items/${item._id}`}
            className="flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 py-2 sm:py-2.5 px-3 sm:px-4 text-[11px] sm:text-xs font-bold text-white transition-all duration-300 shadow-md shadow-indigo-600/20"
          >
            <span>View Details</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </motion.div>
  );
}