"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, Award, Mail, Phone, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
  year: string;
  customers: number;
}

const growthData: ChartData[] = [
  { year: "2023", customers: 12000 },
  { year: "2024", customers: 28000 },
  { year: "2025", customers: 45000 },
  { year: "2026", customers: 75000 },
];

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm shadow-xl flex flex-col items-center text-center space-y-3"
  >
    <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white tracking-wide">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-5 py-15 pt-30 pb-15 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <span className="text-xs font-bold tracking-widest text-cyan-500 uppercase px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            Who We Are
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-8">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 ">ElectroMart</span>
          </h1>
          <p className="text-base md:text-lg mt-6 text-slate-400 leading-relaxed">
            ElectroMart is Bangladesh's premier tech and electronics marketplace, dedicated to bringing you global innovations right to your doorstep. Founded in 2023, we bridge the gap between world-class technology and smart consumers in Dhaka and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white">Our Mission</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                To empower lives by providing genuine electronic gadgets, tech hardware, and home appliances with seamless accessibility, unparalleled customer service, and reliable warranties.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-cyan-400">Our Vision</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                To become the most trusted and user-centric tech e-commerce platform in the nation, setting high industry benchmarks for secure online trading and verified product quality.
              </p>
            </div>
          </motion.div>
        </div>

        {/* (Core Values) */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Why Choose Us</h2>
            <p className="text-slate-400 text-sm mt-2">The core values we strictly stand by every single day.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<ShieldCheck size={24} />} 
              title="100% Authentic" 
              description="Every product listed on ElectroMart is directly sourced from official global brands and verified suppliers."
            />
            <FeatureCard 
              icon={<Zap size={24} />} 
              title="Superfast Delivery" 
              description="Get your favorite tech delivered right to your home inside Dhaka within 24 hours with secure packaging."
            />
            <FeatureCard 
              icon={<Users size={24} />} 
              title="Dedicated Support" 
              description="Our experienced tech-support squad is active 24/7 to solve your queries and handling claim processes."
            />
            <FeatureCard 
              icon={<Award size={24} />} 
              title="Official Warranty" 
              description="Enjoy peace of mind with valid official brand replacement warranties and internal service facilities."
            />
          </div>
        </div>

        {/*(Recharts) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-3xl bg-slate-900/30 border border-slate-800/80"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Our Growth Story</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Numbers don't lie. Thanks to our transparent policies and customer loyalty, ElectroMart has achieved massive milestones in expanding its family across Bangladesh.
              </p>
              <div className="pt-2">
                <span className="text-3xl font-black text-cyan-400">75,000+</span>
                <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Happy Active Customers</p>
              </div>
            </div>

            <div className="lg:col-span-8 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData}>
                  <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="customers" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-slate-800/60 pt-10 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-white">Have Any Questions?</h3>
          <p className="text-sm text-slate-400">Feel free to connect with our official corporate branch for partnerships, bulk corporate queries, or service inquiries.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300 pt-2">
            <span className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"><MapPin size={16} className="text-cyan-400" /> Dhaka, Bangladesh</span>
            <span className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"><Phone size={16} className="text-cyan-400" /> +880 1234 567890</span>
            <span className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"><Mail size={16} className="text-cyan-400" /> support@electromart.com</span>
          </div>
        </div>

      </div>
    </div>
  );
}