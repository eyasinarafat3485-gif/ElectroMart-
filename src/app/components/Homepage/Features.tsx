"use client";

import React from "react";
import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Features() {
  const features: Feature[] = [
    { id: 1, title: "Free Global Shipping", description: "On all orders over $150 with secure package tracking.", icon: Truck },
    { id: 2, title: "Secure Payments", description: "100% protected SSL encrypted checkout with top gateways.", icon: ShieldCheck },
    { id: 3, title: "Easy 30-Day Returns", description: "Not satisfied? Return it within 30 days for a full refund.", icon: RefreshCw },
    { id: 4, title: "24/7 Premium Support", description: "Dedicated tech experts ready to assist you anytime.", icon: Headphones },
  ];

  return (
    <section className="bg-slate-950 py-15 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ৪ কলাম গ্রিড যা মোবাইলে ১ কলামে কনভার্ট হবে */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.id} className="flex gap-4 items-start">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-indigo-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-normal">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}