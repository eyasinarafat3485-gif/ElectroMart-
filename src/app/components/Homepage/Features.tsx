"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Award, CreditCard } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function Features() {
  const features: Feature[] = [
    {
      id: 1,
      title: "100% Authentic BD Stock",
      description:
        "Directly imported & authorized from Apple, Sony, Samsung, Asus, and global brands with official serial verification.",
      icon: ShieldCheck,
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      id: 2,
      title: "Express 24h Dhaka Delivery",
      description:
        "Fastest doorstep delivery inside Dhaka within 24 hours, plus swift 48-72h insured courier delivery to all 64 districts.",
      icon: Zap,
      color: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30",
    },
    {
      id: 3,
      title: "Official Warranty Support",
      description:
        "Get valid brand replacement & service warranties with easy claim assistance in major tech hubs across Bangladesh.",
      icon: Award,
      color: "from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30",
    },
    {
      id: 4,
      title: "Flexible EMI & bKash Pay",
      description:
        "Enjoy up to 36 months 0% EMI with top Bangladeshi banks, instant bKash/Nagad payments, and Cash on Delivery.",
      icon: CreditCard,
      color: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
    },
  ];

  return (
    <section className="bg-[#030712] py-10 sm:py-16 border-b border-slate-800/60 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-cyan-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            The ElectroMart Advantage
          </span>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-white mt-2">
            Why Bangladesh Chooses Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Uncompromising authenticity, transparent pricing, and industry-leading after-sales care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800/80 p-5 sm:p-6 flex flex-col justify-between backdrop-blur-sm transition-all duration-300 hover:border-slate-700"
              >
                <div>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${feat.color} border flex items-center justify-center mb-3 sm:mb-5 shadow-inner`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}