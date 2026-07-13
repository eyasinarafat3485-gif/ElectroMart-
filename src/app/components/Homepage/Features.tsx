"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, Award } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
        className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-cyan-400 mb-5"
      >
        {icon}
      </motion.div>
      <h3 className="text-lg font-bold text-white tracking-tight mb-3">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default function Features() {
  const features: Feature[] = [
    {
      id: 1,
      title: "100% Authentic",
      description:
        "Every product listed on ElectroMart is directly sourced from official global brands and verified suppliers.",
      icon: <ShieldCheck size={24} />,
    },
    {
      id: 2,
      title: "Superfast Delivery",
      description:
        "Get your favorite tech delivered right to your home inside Dhaka within 24 hours with secure packaging.",
      icon: <Zap size={24} />,
    },
    {
      id: 3,
      title: "Dedicated Support",
      description:
        "Our experienced tech-support squad is active 24/7 to solve your queries and handling claim processes.",
      icon: <Users size={24} />,
    },
    {
      id: 4,
      title: "Official Warranty",
      description:
        "Enjoy peace of mind with valid official brand replacement warranties and internal service facilities.",
      icon: <Award size={24} />,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="bg-slate-950 py-16 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <span className="text-indigo-400 text-xs font-semibold tracking-wider uppercase">Why Choose Us</span>
           
            <p className="text-slate-400 mt-2">
              The core values we strictly stand by every single day.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feat) => (
              <FeatureCard
                key={feat.id}
                icon={feat.icon}
                title={feat.title}
                description={feat.description}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}