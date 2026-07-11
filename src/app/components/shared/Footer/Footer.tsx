"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import EMLogo from "../../../../../public/ElectroMart.png";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

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
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl">
             <Image src={EMLogo} alt="ElectroMart Logo" className="h-9 w-9 rounded-full " />
              <span>Electro<span className="text-indigo-500">Mart</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Your one-stop destination for the latest gadgets and premium electronics. Quality service, delivered to your doorstep.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link href="/explore" className="hover:text-indigo-400 transition-colors">Explore Products</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-indigo-500" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-indigo-500" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>support@electromart.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://web.facebook.com/eyasinarafatwebdev12" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 transition-colors">
                <FaFacebook className="w-5 h-5 text-white" />
              </a>
              <a href="https://github.com/eyasinarafat3485-gif" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 transition-colors">
                <FaGithub className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.linkedin.com/in/md-eyasin-arafat-webdev" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 transition-colors">
                <FaLinkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500 relative">
          <p>© {currentYear} ElectroMart. All rights reserved by Eyasin Arafat.</p>

          {isVisible && (
            <button
              onClick={scrollToTop}
              className="absolute right-0 bottom-0 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300 md:-mt-4 hover:-translate-y-1 focus:outline-none"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}