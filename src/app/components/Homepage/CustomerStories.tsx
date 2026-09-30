"use client";

import { Star, CheckCircle2, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  name: string;
  image: string;
  location: string;
  text: string;
  rating: number;
  product: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    name: "Tanvir Ahmed",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    location: "Dhanmondi, Dhaka",
    text: "Ordered the MacBook Pro M3 and it arrived at my doorstep within 12 hours. Sealed box with genuine Apple Bangladesh warranty.",
    rating: 5,
    product: "Apple MacBook Pro M3",
    verified: true,
  },
  {
    name: "Nusrat Jahan",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
    location: "Agrabad, Chattogram",
    text: "Used their 0% EMI with BRAC Bank for my Sony WH-1000XM5 headphones. Hassle-free online verification and quick processing!",
    rating: 5,
    product: "Sony WH-1000XM5 ANC",
    verified: true,
  },
  {
    name: "Mahfuzur Rahman",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    location: "Zindabazar, Sylhet",
    text: "Customer support is top notch. They helped me choose the best gaming monitor and shipped it with ultra-secure wooden crating.",
    rating: 5,
    product: "Samsung Odyssey OLED G9",
    verified: true,
  },
];

export default function CustomerStories() {
  return (
    <section className="bg-[#030712] py-10 sm:py-18 border-b border-slate-800/60 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-cyan-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            Real Tech Experiences
          </span>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-white mt-2">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Verified feedback from gadgets and electronics buyers across Bangladesh.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: review.rating }).map((_, r) => (
                      <Star key={r} size={13} className="fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                </div>

                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm mb-4 sm:mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-slate-700 shrink-0">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-white text-xs sm:text-sm truncate">{review.name}</h4>
                    {review.verified && (
                      <span title="Verified Buyer">
                        <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                    {review.location} • <span className="text-cyan-400">{review.product}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}