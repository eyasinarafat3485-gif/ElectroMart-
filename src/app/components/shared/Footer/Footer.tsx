"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUp, 
  ShieldCheck, 
  Truck, 
  Clock, 
  CreditCard,
  Building2
} from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

import EMLogo from "../../../../../public/ElectroMart.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-300 relative">
      {/* Top Value Strip */}
      <div className="border-b border-slate-800/60 py-6 sm:py-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">100% Genuine BD</h4>
              <p className="text-[10px] sm:text-xs text-slate-400 truncate">Global authorized stock</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <Truck className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">64 Districts Delivery</h4>
              <p className="text-[10px] sm:text-xs text-slate-400 truncate">Insured express logistics</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <CreditCard className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">0% EMI Available</h4>
              <p className="text-[10px] sm:text-xs text-slate-400 truncate">20+ BD partner banks</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Clock className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">24/7 Tech Hotline</h4>
              <p className="text-[10px] sm:text-xs text-slate-400 truncate">+880 1900-123456</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-white font-bold text-lg sm:text-xl">
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500">
                <Image 
                  src={EMLogo} 
                  alt="ElectroMart Logo" 
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full" 
                />
              </div>
              <span className="font-black text-lg sm:text-xl">
                Electro<span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Mart BD</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400 max-w-sm">
              Bangladesh&apos;s leading technology retail &amp; e-commerce hub. Delivering authentic smartphones, custom gaming rigs, laptops, and smart audio solutions with official warranty guarantee.
            </p>
            
            <div className="pt-1">
              <p className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Payment Partners (BD)</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold">
                <span className="px-2 py-0.5 rounded-lg bg-pink-950/40 border border-pink-500/30 text-pink-400">bKash</span>
                <span className="px-2 py-0.5 rounded-lg bg-orange-950/40 border border-orange-500/30 text-orange-400">Nagad</span>
                <span className="px-2 py-0.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-400">Rocket</span>
                <span className="px-2 py-0.5 rounded-lg bg-blue-950/40 border border-blue-500/30 text-blue-400">VISA / Master</span>
                <span className="px-2 py-0.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link href="/all-items" className="hover:text-cyan-400 transition-colors">All Gadgets Catalog</Link></li>
              <li><Link href="/all-items?category=Smartphones" className="hover:text-cyan-400 transition-colors">Smartphones</Link></li>
              <li><Link href="/all-items?category=Laptops" className="hover:text-cyan-400 transition-colors">Workstation Laptops</Link></li>
              <li><Link href="/all-items?category=Headphones" className="hover:text-cyan-400 transition-colors">Audio &amp; Headphones</Link></li>
              <li><Link href="/my-collection" className="hover:text-cyan-400 transition-colors">My Orders Tracking</Link></li>
            </ul>
          </div>

          {/* Col 3: Experience Centers BD */}
          <div>
            <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">BD Hub Centers</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-1.5 sm:gap-2">
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>IDB Bhaban, Level 4, Agargaon, Dhaka</span>
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Multiplan Center, Level 6, Elephant Road, Dhaka</span>
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Sanmar Ocean City, GEC, Chattogram</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div>
            <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Direct Contact</h3>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                <span>+880 1900-123456</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                <span className="truncate">support@electromart.com.bd</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>

            <div className="pt-3 sm:pt-4">
              <h4 className="text-[11px] sm:text-xs font-semibold text-slate-400 mb-2">Follow Our Tech Updates</h4>
              <div className="flex space-x-2">
                <a href="https://web.facebook.com/eyasinarafatwebdev12" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors">
                  <FaFacebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
                <a href="https://github.com/eyasinarafat3485-gif" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors">
                  <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
                <a href="https://www.linkedin.com/in/md-eyasin-arafat-webdev" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors">
                  <FaLinkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-slate-400 text-center sm:text-left">
          <p>© {currentYear} ElectroMart Bangladesh. Developed by Eyasin Arafat.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/support" className="hover:text-white transition-colors">Support</Link>
            <span className="text-emerald-400 font-semibold">● BTRC Verified</span>
          </div>

          {isVisible && (
            <button
              onClick={scrollToTop}
              className="p-2.5 sm:p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl sm:rounded-2xl shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:-translate-y-1 focus:outline-none cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}