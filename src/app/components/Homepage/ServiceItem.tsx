"use client";

import {
  Wrench,
  BadgeCheck,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tag: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Wrench,
    title: "Free Custom Rig & TV Setup",
    tag: "Expert Hands",
    description: "Certified hardware engineers assemble your gaming PC, calibrate displays, or wall-mount TVs at zero cost inside Dhaka.",
  },
  {
    icon: BadgeCheck,
    title: "7-Day Easy Replacement",
    tag: "Zero Hassle",
    description: "Got any technical defect out of the box? Swap it instantly with our streamlined replacement protocol.",
  },
  {
    icon: CreditCard,
    title: "0% Interest EMI Plans",
    tag: "20+ BD Banks",
    description: "Split flagship purchases into convenient 3, 6, 12, or 24-month installments with City Bank, BRAC, Eastern Bank & more.",
  },
];

export default function ServiceItem() {
  return (
    <section className="bg-[#030712] py-10 sm:py-16 border-b border-slate-800/60 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-indigo-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
            Dedicated Customer Care
          </span>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-white mt-2">
            Premium Services &amp; Guarantees
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Engineered to give you a first-class gadget buying experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:border-indigo-500/40 transition-all duration-300 backdrop-blur-sm shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-cyan-400 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm sm:text-lg mb-1.5 sm:mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-[11px] sm:text-sm">
                    {service.description}
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