"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, User, LogOut, PlusCircle, Settings, Home, Compass, Info } from "lucide-react";

// টাইপ স্ক্রিপ্টের জন্য লিংকের ইন্টারফেস বা টাইপ ফিক্সড করা
interface NavLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>; // আইকনের প্রোপার্টি টাইপ
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // টেস্ট করার জন্য এই স্টেটটি পরিবর্তন করে দেখতে পারো (true = logged in, false = logged out)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const pathname = usePathname();

  // রিকোয়ারমেন্ট অনুযায়ী সব লিংকেই আইকন যুক্ত করা হলো (যাতে টাইপ এরর না আসে)
  const publicLinks: NavLink[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "About", href: "/about", icon: Info },
  ];

  const privateLinks: NavLink[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Add Item", href: "/items/add", icon: PlusCircle },
    { name: "Manage Items", href: "/items/manage", icon: Settings },
  ];

  const currentLinks = isLoggedIn ? privateLinks : publicLinks;

  const isActive = (path: string) => pathname === path;

  return (
    <nav className=" left-0 w-full z-50 bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ১. লোগো এরিয়া */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl tracking-wider">
              <ShoppingBag className="h-6 w-6 text-indigo-500" />
              <span>
                Electro<span className="text-indigo-500">Mart</span>
              </span>
            </Link>
          </div>

          {/* ২. ডেক্সটপ মেনু (Desktop View) */}
          <div className="hidden md:flex items-center space-x-1">
            {currentLinks.map((link) => {
              // প্রধান সমাধান: ছোট হাতের link.icon কে বড় হাতের Icon ভ্যারিয়েবলে নেওয়া হলো
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </div>
                </Link>
              );
            })}

            {/* লগইন বা প্রোফাইল বাটন */}
            <div className="ml-4 pl-4 border-l border-slate-800">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/profile"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive("/profile") ? "text-indigo-400" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="flex items-center space-x-1 text-slate-400 hover:text-rose-400 text-sm font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-indigo-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* ৩. মোবাইল হ্যামবার্গার বাটন */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ৪. মোবাইল ড্রপডাউন মেনু */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {currentLinks.map((link) => {
            // মোবাইল ভিউতেও একই ফিক্সড ব্যবহার করা হলো
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </div>
              </Link>
            );
          })}

          {/* মোবাইল লগইন/লগআউট সেকশন */}
          <div className="pt-4 mt-2 border-t border-slate-800 px-3">
            {isLoggedIn ? (
              <div className="space-y-2">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 text-slate-300 hover:text-white text-base font-medium py-2"
                >
                  <User className="w-5 h-5" />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 text-rose-400 hover:text-rose-500 text-base font-medium py-2 w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}