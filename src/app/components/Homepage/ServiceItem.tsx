"use client";

import {
    Truck,
    ShieldCheck,
    Wrench,
    BadgeCheck,
    Headset,
    CreditCard,
    LucideIcon,
} from "lucide-react";

interface Service {
    icon: LucideIcon;
    title: string;
    description: string;
}

const services: Service[] = [

    {
        icon: Wrench,
        title: "Free Installation",
        description: "Expert technicians handle setup for TVs, PCs, and appliances at no extra cost.",
    },
    {
        icon: BadgeCheck,
        title: "Easy Returns",
        description: "7-day hassle-free replacement policy on all eligible products.",
    },
    {
        icon: CreditCard,
        title: "EMI Available",
        description: "Split your payment into easy monthly installments with partner banks.",
    }
  
];

export default function ServiceItem() {
    return (
        <section className="bg-slate-950 py-15 border-slate-900">
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-8">
                <div className="text-center mb-12">
                     <span className="text-indigo-400 text-xs font-semibold tracking-wider uppercase">Our Services</span>
                    <p className="text-slate-400 text-sm mt-3 max-w-xl mx-auto">
                        Everything you need for a smooth, worry-free shopping experience.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={i}
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/30 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                                    <Icon className="w-6 h-6 text-indigo-400" strokeWidth={1.75} />
                                </div>

                                <h3 className="font-semibold text-white text-lg mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed text-[15px]">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}