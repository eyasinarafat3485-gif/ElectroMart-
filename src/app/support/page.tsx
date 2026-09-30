'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook } from 'react-icons/fa6';
import { 
  FiMail, 
  FiPhone, 
  FiArrowRight, 
  FiCheckCircle, 
  FiSend, 
  FiLifeBuoy, 
  FiBookOpen, 
  FiShield 
} from 'react-icons/fi';
import { Building2, MessageSquare, Clock, PhoneCall, ShieldCheck, HelpCircle } from 'lucide-react';

interface ContactMethod {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  badge?: string;
  color: string;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function SupportPage(): React.JSX.Element {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const contactMethods: ContactMethod[] = [
    {
      id: 1,
      icon: <FaFacebook className="w-5 h-5" />,
      title: "Live Messenger Support",
      description: "Chat with our Dhaka technical desk for immediate order tracking and warranty claim guidance.",
      actionText: "Open Messenger",
      badge: "Avg. 2 min reply",
      color: "from-blue-600 to-indigo-600 text-white"
    },
    {
      id: 2,
      icon: <FiMail className="w-5 h-5" />,
      title: "Official Ticket Desk",
      description: "Submit a formal hardware RMA or 0% EMI inquiry to our customer care team.",
      actionText: "Submit Ticket",
      color: "from-purple-600 to-indigo-600 text-white"
    },
    {
      id: 3,
      icon: <FiPhone className="w-5 h-5" />,
      title: "Hotline Support",
      description: "Direct assistance for corporate bulk purchases and urgent parcel delivery.",
      actionText: "Call +880 1900-123456",
      badge: "24/7 Active",
      color: "from-emerald-600 to-teal-600 text-white"
    }
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-12 px-4 md:px-10 sm:px-6 lg:px-8 relative overflow-hidden tech-grid-pattern">
      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-4 pt-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            24/7 Bangladesh Support Center Online
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            How Can We <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Assist Your Tech Needs?</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Get prompt assistance from our certified hardware technicians, warranty specialists, and customer success team.
          </p>
        </motion.div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method) => (
            <motion.div 
              key={method.id} 
              whileHover={{ y: -5 }}
              className="relative rounded-3xl border border-slate-800/90 bg-slate-900/60 backdrop-blur-xl p-6 transition-all duration-300 hover:border-cyan-500/40 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${method.color} shadow-lg`}>
                    {method.icon}
                  </div>
                  {method.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400">
                      {method.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {method.description}
                </p>
              </div>
              
              <button className="w-full inline-flex items-center justify-between text-xs font-bold text-slate-200 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-4 py-3 rounded-2xl transition-all cursor-pointer">
                <span>{method.actionText}</span>
                <FiArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Split Section: Form & Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Support Ticket Form */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Submit a Support Ticket</h2>
            <p className="text-slate-400 text-xs mb-6">
              Fill out your details below and our customer care team will respond via phone or email within 1 hour.
            </p>

            {isSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl p-6 text-center space-y-3">
                <FiCheckCircle className="w-10 h-10 mx-auto text-emerald-400" />
                <h3 className="text-base font-bold text-white">Ticket Submitted Successfully!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your ticket reference has been logged. Our specialist team in Dhaka will contact you shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 text-xs font-bold text-cyan-400 underline cursor-pointer"
                >
                  Send another query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Eyasin Arafat"
                      className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white outline-none shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="you@domain.com"
                      className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white outline-none shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Subject / Order ID</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Order #10492 Warranty claim inquiry"
                    className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white outline-none shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Detailed Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={handleInputChange}
                    placeholder="Describe your question, hardware issue, or claim request in detail..."
                    className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white outline-none shadow-inner resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-600/25 cursor-pointer"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      <span>Submit Support Ticket</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Walk-In Hubs & Knowledge Base */}
          <div className="lg:col-span-5 space-y-5">
            <div className="border border-slate-800/80 bg-slate-900/60 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white tracking-tight">Physical Support Points (BD)</h3>
              
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">IDB Bhaban Experience Center</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Level 4, BCS Computer City, Agargaon, Dhaka. Open 10 AM - 8 PM (Sat-Thu).</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Multiplan Center Tech Hub</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Level 6, ECS Computer City, Elephant Road, Dhaka. Open 10 AM - 8 PM.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Official Brand RMA Support</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Direct replacement servicing for Apple, Sony, Samsung, Asus and Dell authorized units.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-5 text-center">
              <p className="text-xs text-slate-400">
                Need urgent parcel tracking? Call our direct hotline: <br/>
                <strong className="text-cyan-400 text-sm font-bold">+880 1900-123456</strong>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}