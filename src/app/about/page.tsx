"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Zap, 
  Users, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  Building2,
  CheckCircle2
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
  year: string;
  customers: number;
}

const growthData: ChartData[] = [
  { year: "2023", customers: 12000 },
  { year: "2024", customers: 28000 },
  { year: "2025", customers: 48000 },
  { year: "2026", customers: 78000 },
];

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description 
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm shadow-xl flex flex-col items-center text-center space-y-3 transition-all duration-300 hover:border-cyan-500/40"
  >
    <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 border border-cyan-500/20">
      {icon}
    </div>
    <h3 className="text-base font-bold text-white tracking-wide">{title}</h3>
    <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

export default function AboutUsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-12 px-4 md:px-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-16">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-3xl mx-auto pt-6"
        >
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase px-3.5 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            About ElectroMart Bangladesh
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Pioneering the Ultimate <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Tech Destination</span> in BD
          </h1>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            Founded with a vision to eliminate counterfeit electronics and overpriced grey-market imports in Bangladesh, ElectroMart bridges global innovation directly to enthusiasts in Dhaka, Chittagong, Sylhet, and beyond.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-xl"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Core Purpose</span>
              <h2 className="text-2xl font-black text-white">Our Mission</h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                To empower Bangladeshi students, tech professionals, gamers, and households with 100% genuine electronics, prompt nationwide 24h delivery, and transparent warranty claims without hidden clauses.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-xl"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Future Outlook</span>
              <h2 className="text-2xl font-black text-white">Our Vision</h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                To establish the benchmark for digital e-commerce excellence across all 64 districts of Bangladesh by integrating next-gen customer care, 0% EMI financing, and authentic brand partnerships.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">The ElectroMart Promise</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Strict quality and customer protection principles we live by.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard 
              icon={<ShieldCheck size={22} />} 
              title="100% Verified Genuine" 
              description="Official BTRC and manufacturer authorized serials for every unit."
            />
            <FeatureCard 
              icon={<Zap size={22} />} 
              title="Express 24h Dispatch" 
              description="Fastest doorstep delivery inside Dhaka with real-time parcel updates."
            />
            <FeatureCard 
              icon={<Users size={22} />} 
              title="Dedicated BD Support" 
              description="Specialized hardware team to troubleshoot and assist with brand RMA claims."
            />
            <FeatureCard 
              icon={<Award size={22} />} 
              title="Official Warranty" 
              description="Direct manufacturer replacement guarantees and local service facilities."
            />
          </div>
        </div>

        {/* Growth Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Community Milestone</span>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Our Growth in Bangladesh</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Over 78,000 satisfied tech lovers across Bangladesh have trusted ElectroMart for their workstation setups, smartphones, and entertainment gear.
              </p>
              <div className="pt-1">
                <span className="text-3xl font-black text-cyan-400">78,000+</span>
                <p className="text-[11px] text-slate-400 font-semibold tracking-wide uppercase">Active Customers across 64 Districts</p>
              </div>
            </div>

            <div className="lg:col-span-8 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData}>
                  <XAxis 
                    dataKey="year" 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderColor: '#1e293b', 
                      borderRadius: '16px',
                      color: '#fff'
                    }}
                    labelStyle={{ color: '#38bdf8', fontWeight: 'bold' }}
                  />
                  <Bar 
                    dataKey="customers" 
                    fill="#38bdf8" 
                    radius={[10, 10, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Experience Hubs */}
        <div className="border-t border-slate-800/80 pt-10 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-white">Visit Our Experience Hubs</h3>
          <p className="text-xs sm:text-sm text-slate-400">Feel the latest tech firsthand, inspect hardware, or pick up your online order instantly.</p>
          
          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-300 pt-2">
            <span className="flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-800">
              <Building2 size={14} className="text-cyan-400" /> IDB Bhaban, Agargaon, Dhaka
            </span>
            <span className="flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-800">
              <Building2 size={14} className="text-cyan-400" /> Multiplan Center, Elephant Road, Dhaka
            </span>
            <span className="flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-800">
              <Phone size={14} className="text-cyan-400" /> +880 1900-123456
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}