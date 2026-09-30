'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Menu, 
  X, 
  LogOut, 
  ShoppingCart, 
  Package, 
  PlusCircle, 
  Settings, 
  Home, 
  Info, 
  Loader2, 
  Search, 
  PhoneCall,
  LogIn,
  User as UserIcon,
  RotateCcw,
  Banknote,
  ShieldCheck,
  Headphones,
  Truck,
  CreditCard,
  Sparkles
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import EMLogo from "../../../../../public/ElectroMart.png";
import Image from "next/image";
import { BiSupport } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const marqueeItems = [
  { icon: RotateCcw, text: "30 Days Easy Returns & Exchange" },
  { icon: Banknote, text: "Cash on Delivery Available Nationwide" },
  { icon: ShieldCheck, text: "100% Authentic Quality Guaranteed" },
  { icon: Headphones, text: "24/7 Dedicated Help & Support (+880 1900-123456)" },
  { icon: Truck, text: "Fast Delivery across 64 Districts in Bangladesh" },
  { icon: CreditCard, text: "0% EMI Facilities Available on 30+ Banks" },
  { icon: Sparkles, text: "Official BD Brand Warranty on All Gadgets" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const isLoading = isPending;
  const pathname = usePathname();

  const isLoggedIn = !!user;

  const userWithRole = user as Record<string, unknown> & { role?: string };
  const sessionWithRole = session as Record<string, unknown> & { role?: string };

  const userRole = userWithRole?.role || sessionWithRole?.role;
  const isAdmin = userRole?.toLowerCase() === 'admin' || user?.email === 'admin123@gmail.com' || user?.email === 'admin@electormart.com';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsideMenu = mobileMenuRef.current?.contains(target);
      const clickedButton = mobileButtonRef.current?.contains(target);

      if (!clickedInsideMenu && !clickedButton) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.warning("Logged out successfully!", { autoClose: 2000 });
    setIsOpen(false);
    router.refresh();
    router.push("/login");
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/all-items?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  const isActive = (path: string) => pathname === path;

  const publicLinks: NavLink[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Gadgets", href: "/all-items", icon: Package },
    { name: "My Orders", href: "/my-collection", icon: ShoppingCart },
    { name: "About BD Hub", href: "/about", icon: Info },
  ];

  const privateLinks: NavLink[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Gadgets", href: "/all-items", icon: Package },
    ...(isAdmin ? [{ name: "Add Item", href: "/add-item", icon: PlusCircle, badge: "Admin" }] : []),
    { name: "My Orders", href: "/my-collection", icon: ShoppingCart },
    ...(isAdmin ? [{ name: "Order Manage", href: "/order-manage", icon: Settings, badge: "Admin" }] : []),
    { name: "About BD Hub", href: "/about", icon: Info },
    { name: "24/7 Support", href: "/support", icon: BiSupport },
  ];

  const currentLinks = isLoggedIn ? privateLinks : publicLinks;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Infinite Scrolling Marquee Top Bar (Right to Left with Pause on Hover) */}
      <div className="marquee-container relative w-full bg-gradient-to-r from-slate-950 via-indigo-950/90 to-slate-950 border-b border-indigo-500/20 text-slate-200 py-2 overflow-hidden select-none cursor-pointer shadow-lg backdrop-blur-md">
        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap text-xs font-semibold tracking-wide">
          {/* Loop items twice for seamless infinite loop */}
          {[...marqueeItems, ...marqueeItems].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors shrink-0">
                <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{item.text}</span>
                <span className="text-indigo-500/40 ml-4 font-normal">•</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full glass-nav border-b border-slate-800/80 shadow-xl backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <Link href="/" className="group flex items-center space-x-2.5">
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src={EMLogo} 
                    alt="ElectroMart BD Logo" 
                    className="h-8 w-8 rounded-full bg-slate-900 object-cover" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-lg tracking-tight leading-none group-hover:text-indigo-200 transition-colors">
                    Electro<span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Mart</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-indigo-400 font-semibold leading-none mt-0.5">
                    Bangladesh
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {currentLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                      active
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? "text-white" : "text-slate-400"}`} />
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

              {/* Right Action Utilities (Search, Cart, User Avatar + Logout / Login) */}
              <div className="flex items-center gap-2 sm:gap-3">
                
                {/* Quick Search Trigger */}
                <Link
                  href="/all-items"
                  className="hidden md:flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-xl text-xs transition-all duration-200"
                >
                  <Search className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden lg:inline">Search gadgets...</span>
                  <kbd className="hidden lg:inline-block bg-slate-800 border border-slate-700 text-[10px] px-1.5 py-0.5 rounded text-slate-400 font-mono">
                    ⌘K
                  </kbd>
                </Link>

                {/* Cart Icon */}
                <Link
                  href="/my-collection"
                  title="My Cart & Orders"
                  className="relative p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-cyan-400 transition-all flex items-center justify-center shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="sr-only">Cart</span>
                </Link>

                {/* ALWAYS-VISIBLE USER AVATAR + DYNAMIC AUTH BUTTON */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  {/* User Avatar Circle (Shows user picture when logged in, or guest icon when logged out) */}
                  {isLoading ? (
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 animate-pulse">
                      <Loader2 className="animate-spin text-indigo-400 w-4 h-4" />
                    </div>
                  ) : isLoggedIn ? (
                    <Link 
                      href="/my-collection"
                      className="flex items-center gap-2 group cursor-pointer"
                      title={`Logged in as ${user?.name || user?.email}`}
                    >
                      {/* User Avatar Image or Gradient Initial */}
                      <div className="relative">
                        {user?.image ? (
                          <img 
                            src={user.image} 
                            alt={user.name || "User Avatar"} 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              if (target.nextElementSibling) {
                                (target.nextElementSibling as HTMLElement).style.display = 'flex';
                              }
                            }}
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500 shadow-md shadow-indigo-500/30 group-hover:ring-cyan-400 group-hover:scale-105 transition-all"
                          />
                        ) : null}
                        <div 
                          className={`w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 items-center justify-center text-xs font-bold text-white ring-2 ring-indigo-500 shadow-md shadow-indigo-500/30 group-hover:ring-cyan-400 group-hover:scale-105 transition-all ${
                            user?.image ? 'hidden' : 'flex'
                          }`}
                        >
                          {user?.name?.[0]?.toUpperCase() || <UserIcon className="w-4 h-4" />}
                        </div>
                        {/* Online active dot indicator */}
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                      </div>
                      <span className="hidden xl:inline text-xs font-bold text-slate-200 truncate max-w-[85px] group-hover:text-cyan-300 transition-colors">
                        {user?.name?.split(' ')[0] || "Profile"}
                      </span>
                    </Link>
                  ) : (
                    /* Guest Avatar Circle (Always shown when logged out) */
                    <Link
                      href="/login"
                      className="flex items-center group cursor-pointer"
                      title="User Profile / Sign In"
                    >
                      <div className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 border-2 border-slate-700/80 group-hover:border-indigo-500 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:scale-105 transition-all shadow-md">
                        <UserIcon className="w-4 h-4" />
                      </div>
                    </Link>
                  )}

                  {/* Dynamic Action Button: Logout if Logged In, Login if Logged Out */}
                  {!isLoading && (
                    isLoggedIn ? (
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-rose-300 text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
                        title="Logout from Account"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Logout</span>
                      </button>
                    ) : (
                      <Link
                        href="/login"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/25 active:scale-95 cursor-pointer"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Login</span>
                      </Link>
                    )
                  )}
                </div>

              {/* Mobile Hamburger Button */}
              <div className="lg:hidden">
                <button
                  ref={mobileButtonRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 focus:outline-none transition-colors cursor-pointer"
                  aria-label="Toggle Navigation Menu"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-slate-900/95 border-b border-slate-800 p-4 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              {/* User Profile info if logged in */}
              {isLoggedIn && (
                <div className="flex items-center gap-3 p-3 bg-slate-950/80 rounded-2xl border border-slate-800 mb-3">
                  {user?.image ? (
                    <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white">
                      {user?.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  </div>
                </div>
              )}

              {/* Mobile Search input */}
              <div className="mb-3">
                <form onSubmit={handleQuickSearch} className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search gadgets in Bangladesh..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </form>
              </div>

              <ul className="flex flex-col gap-1">
                {currentLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          active
                            ? "bg-indigo-600 text-white"
                            : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{link.name}</span>
                        </div>
                        {link.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded font-bold">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}

                <hr className="border-slate-800 my-2" />

                {isLoggedIn ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-400 hover:text-rose-300 rounded-xl hover:bg-rose-950/20 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl shadow-md transition-all"
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}