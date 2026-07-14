'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "Are your products original?",
        answer: "Yes, we only source products from authorized distributors. All products come with official brand warranty."
    },
    {
        question: "How long does delivery take?",
        answer: "Delivery takes 1-3 days inside Dhaka and 3-5 days outside Dhaka."
    },
    {
        question: "What is your return policy?",
        answer: "You can return any product within 7 days of delivery if there is any issue with the product."
    },
    {
        question: "What payment options are available?",
        answer: "We support Cash on Delivery, bKash, Nagad, Rocket, Credit/Debit Card, and Bank Transfer."
    },
    {
        question: "How do I claim warranty?",
        answer: "A warranty card is provided with every product. In case of any issue, please contact our support team."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-slate-950 py-15 border-slate-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-indigo-400 text-xs font-semibold tracking-wider uppercase">SUPPORT</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">Frequently Asked Questions</h2>
                    <p className="text-slate-400 mt-4">Find answers to your most common questions</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-800 transition-colors"
                            >
                                <span className="font-medium text-white pr-6">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                )}
                            </button>
                            
                            <div className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                                <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}