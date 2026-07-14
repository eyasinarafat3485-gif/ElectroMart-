'use client'
import React, { useState } from 'react';
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

// Types for Contact Cards
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
      icon: <FaFacebook className="w-6 h-6" />,
      title: "Live Chat Support",
      description: "Chat with our global team for immediate technical assistance.",
      actionText: "Start Live Chat",
      badge: "Avg. response: 2m",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 2,
      icon: <FiMail className="w-6 h-6" />,
      title: "Email Ticket",
      description: "Open a formal developer or billing support ticket anytime.",
      actionText: "Open Ticket",
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 3,
      icon: <FiPhone className="w-6 h-6" />,
      title: "Direct Request",
      description: "Available for enterprise clients requiring urgent care.",
      actionText: "Request Callback",
      color: "from-emerald-500 to-teal-600"
    }
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 pt-15 px-4 md:px-10 sm:px-6 lg:px-8 overflow-x-hidden relative">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 bg-slate-900 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto  py-16 relative z-10">
        
        {/* Header / Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-cyan-400  tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full text-xs font-bold bg-cyan-400 animate-pulse uppercase " />
            All Systems Operational
          </div>
           <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">help you thrive?</span>
          </h1>
          <p className="text-lg text-slate-400 font-normal leading-relaxed">
            Get personalized assistance from our engineering and product specialist teams. Choose a channel or leave a direct request below.
          </p>
        </div>

        {/* 3-Column Interactive Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {contactMethods.map((method) => (
            <div 
              key={method.id} 
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md p-6 transition-all duration-300 hover:border-slate-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/20 flex flex-col justify-between"
            >
              <div>
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${method.color} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {method.icon}
                </div>
                {method.badge && (
                  <span className="absolute top-6 right-6 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300">
                    {method.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-white transition-colors">
                  {method.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {method.description}
                </p>
              </div>
              
              <button className="w-full inline-flex items-center justify-between text-sm font-semibold text-slate-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 px-4 py-3 rounded-xl transition-all duration-200 group-hover:text-white">
                {method.actionText}
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Core Layout: Form & Alternative Resources split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Ticket Form */}
          <div className="lg:col-span-7 bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 sm:p-10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-2">Send a Direct Message</h2>
            <p className="text-slate-400 text-sm mb-8">
              Can not talk right now? Drop your query here, and our system will instantly route it to the right specialist department.
            </p>

            {isSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-6 text-center space-y-3 animate-fade-in">
                <FiCheckCircle className="w-12 h-12 mx-auto text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">Message Dispatched Successfully</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Thank you for reaching out. A confirmation code has been sent to your mail. Our technical desk will review this within 1 hour.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-xs font-medium text-emerald-400 underline underline-offset-4 hover:text-emerald-300"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Eyasin Arafat"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="you@domain.com"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Subject Topic</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleInputChange}
                    placeholder="Short summary of the issue..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Detailed Description</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleInputChange}
                    placeholder="Describe your issue or custom request step-by-step..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors focus:ring-1 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/10 transform active:scale-[0.99]"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Submit Support Ticket
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Documentation / Knowledge Base Alternatives */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-slate-800/60 bg-slate-900/10 rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-bold text-white tracking-tight">Self-Service Resources</h3>
              
              <div className="space-y-4">
                {/* Resource item 1 */}
                <div className="flex gap-4 p-3 rounded-xl hover:bg-slate-900/40 transition-colors border border-transparent hover:border-slate-800 group cursor-pointer">
                  <div className="p-2.5 h-fit rounded-lg bg-slate-800 text-indigo-400">
                    <FiBookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">Developer Documentation</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Explore SDKs, API references, configuration guides, and architectural models.</p>
                  </div>
                </div>

                {/* Resource item 2 */}
                <div className="flex gap-4 p-3 rounded-xl hover:bg-slate-900/40 transition-colors border border-transparent hover:border-slate-800 group cursor-pointer">
                  <div className="p-2.5 h-fit rounded-lg bg-slate-800 text-cyan-400">
                    <FiLifeBuoy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">Community Knowledge Base</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Read curated integration insights, troubleshooting methods, and tips from experts.</p>
                  </div>
                </div>

                {/* Resource item 3 */}
                <div className="flex gap-4 p-3 rounded-xl hover:bg-slate-900/40 transition-colors border border-transparent hover:border-slate-800 group cursor-pointer">
                  <div className="p-2.5 h-fit rounded-lg bg-slate-800 text-purple-400">
                    <FiShield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">Trust & Safety Portal</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Check security compliance updates, status histories, data encryption details.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro-Card info */}
            <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 p-6 text-center">
              <p className="text-xs text-slate-400 leading-relaxed">
                Looking for active server incidents or API changelogs? <br/>
                <span className="text-indigo-400 font-medium hover:underline cursor-pointer inline-flex items-center gap-1 mt-1">
                  Visit Developer Changelog <FiArrowRight className="w-3 h-3" />
                </span>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}