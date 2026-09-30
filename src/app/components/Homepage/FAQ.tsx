'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Are all gadgets on ElectroMart 100% genuine with official warranty?",
    answer: "Yes, absolutely. Every single smartphone, laptop, audio gadget, and appliance is sourced directly from verified authorized global brand distributors. All devices include valid official warranty papers and serial verification."
  },
  {
    question: "What are your delivery timelines across Bangladesh?",
    answer: "For Dhaka Metro city, we provide Express Delivery within 12 to 24 hours. For all other 63 districts (Chittagong, Sylhet, Rajshahi, Khulna, etc.), delivery is executed via insured courier partners within 48 to 72 hours."
  },
  {
    question: "How do 0% EMI and bKash / Nagad payment options work?",
    answer: "We support instant online checkout with bKash, Nagad, Rocket, and all major VISA, MasterCard, and Amex cards. For EMI, you can choose up to 36 months 0% interest tenures with City Bank, BRAC Bank, Eastern Bank, SCB, and other partner financial institutions."
  },
  {
    question: "How can I claim warranty or get technical support in Bangladesh?",
    answer: "You can simply contact our 24/7 hotline or visit any of our affiliated service assistance desks in IDB Bhaban Agargaon, Multiplan Center Elephant Road, or Jamuna Future Park, Dhaka. Our technicians will handle brand RMA claims on your behalf."
  },
  {
    question: "What is your 7-day replacement guarantee?",
    answer: "If you encounter any manufacturing defect with your gadget within 7 days of receiving the parcel, simply let our support team know. We will arrange a free reverse pickup and dispatch a brand-new replacement unit immediately."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#030712] py-10 sm:py-18 border-b border-slate-800/60 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-indigo-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
            Got Questions?
          </span>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-white mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Everything you need to know about purchasing gadgets on ElectroMart BD.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-200 hover:border-slate-700"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 sm:px-6 py-3.5 sm:py-5 text-left flex items-center justify-between gap-3 cursor-pointer focus:outline-none"
                >
                  <span className={`font-bold text-xs sm:text-sm md:text-base transition-colors ${isOpen ? 'text-cyan-400' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-1 sm:p-1.5 rounded-full bg-slate-800 text-slate-300 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-indigo-600 text-white' : ''}`}>
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 text-[11px] sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}