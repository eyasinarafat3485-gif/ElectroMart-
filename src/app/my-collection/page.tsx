"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { authClient } from "@/lib/auth-client";
import { 
  Loader2, 
  Calendar, 
  ArrowRight, 
  ShoppingCart, 
  PackageCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  ShieldCheck, 
  Truck, 
  CreditCard 
} from 'lucide-react';

interface OrderItem {
  _id: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  userImage?: string;
  productId?: string;
  productTitle?: string;
  price?: number;
  imageUrl?: string;          
  orderedAt?: string;
  status?: string;
  paymentMethod?: string;
  deliveryAddress?: string;
  district?: string;
}

export default function MyCollectionPage() {
  const { data: session, isPending: authLoading } = authClient.useSession();
  
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchPhone, setSearchPhone] = useState<string>("");

  useEffect(() => {
    if (authLoading) return;

    const loadOrders = async () => {
      setLoading(true);
      setError(null);

      let loadedOrders: OrderItem[] = [];

      // 1. If logged in, fetch user's orders from server
      if (session?.user?.email) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders?email=${encodeURIComponent(session.user.email)}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) {
              loadedOrders = [...data];
            }
          }
        } catch (err) {
          console.error("API error fetching orders:", err);
        }
      }

      // 2. Also load guest orders stored in localStorage
      try {
        const guestSaved = localStorage.getItem("electromart_guest_orders");
        if (guestSaved) {
          const parsed: OrderItem[] = JSON.parse(guestSaved);
          if (Array.isArray(parsed)) {
            // merge without duplicate IDs
            parsed.forEach((gOrder) => {
              if (!loadedOrders.some((o) => o._id === gOrder._id)) {
                loadedOrders.push(gOrder);
              }
            });
          }
        }
      } catch (e) {}

      setOrders(loadedOrders);
      setLoading(false);
    };

    loadOrders();
  }, [session, authLoading]);

  // Guest order phone lookup
  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPhone.trim()) return;

    try {
      const guestSaved = localStorage.getItem("electromart_guest_orders");
      if (guestSaved) {
        const parsed: OrderItem[] = JSON.parse(guestSaved);
        const filtered = parsed.filter(o => 
          o.userPhone?.includes(searchPhone.trim()) || 
          o._id?.toLowerCase().includes(searchPhone.trim().toLowerCase())
        );
        if (filtered.length > 0) {
          setOrders(filtered);
          return;
        }
      }
    } catch (e) {}
  };

  const getStatusBadge = (status?: string) => {
    const normalizedStatus = (status || 'pending').toLowerCase();

    if (normalizedStatus === 'pending') {
      return (
        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
          <Clock className="w-3 h-3" /> Processing
        </span>
      );
    }
    if (normalizedStatus === 'confirmed' || normalizedStatus === 'done') {
      return (
        <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
          <CheckCircle2 className="w-3 h-3" /> Confirmed
        </span>
      );
    }
    if (normalizedStatus === 'delivered') {
      return (
        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
          <PackageCheck className="w-3 h-3" /> Delivered
        </span>
      );
    }
    if (normalizedStatus === 'rejected') {
      return (
        <span className="inline-flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
          <XCircle className="w-3 h-3" /> Cancelled
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
        <Clock className="w-3 h-3" /> Processing
      </span>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
        <p className="text-slate-400 text-xs tracking-widest uppercase font-semibold">Loading Your Orders &amp; Parcels...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-8 sm:py-12 px-4 md:px-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
              ⚡ 64 Districts Parcel Tracking
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white tracking-tight">
              My Orders &amp; <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Collection</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {session?.user ? (
                <>Welcome, <strong className="text-white">{session.user.name}</strong>. Real-time status of all your electronics orders across Bangladesh.</>
              ) : (
                <>Track all your active orders and parcels across Bangladesh (Guest &amp; Registered orders).</>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/checkout"
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-rose-600/20 transition-all flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Direct Checkout
            </Link>

            <div className="bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-2xl text-xs text-slate-400 backdrop-blur-md">
              Total Orders: <strong className="text-cyan-400 font-black ml-1">{orders.length}</strong>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-xs sm:text-sm">
            {error}
          </div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-10 sm:p-14 text-center max-w-lg mx-auto backdrop-blur-sm space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No Orders Placed Yet</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              You haven&apos;t placed any gadget orders yet. Explore our genuine catalog with official BD warranty, 0% EMI, and fast Dhaka delivery.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/all-items" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-3 text-xs font-bold text-white shadow-lg">
                Explore Gadgets <ArrowRight size={14} />
              </Link>
              {!session?.user && (
                <Link href="/login" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-5 py-3 text-xs font-bold text-slate-300 hover:text-white">
                  Sign In to Account
                </Link>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative flex flex-col justify-between bg-slate-900/70 border border-slate-800/90 rounded-3xl p-5 hover:border-cyan-500/40 transition-all duration-300 shadow-xl backdrop-blur-sm"
              >
                <div className="space-y-4">
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 p-3 border border-slate-800 flex items-center justify-center">
                    <img
                      src={order.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"}      
                      alt={order.productTitle || "Gadget"}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";
                      }}
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-cyan-400">
                      ID: #{order._id?.toString().slice(-6)}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors leading-snug">
                      {order.productTitle || "ElectroMart Gadget"}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="text-base font-black text-rose-400">
                        ৳ {Number(order.price || 0).toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                        {order.paymentMethod || "COD"}
                      </span>
                    </div>

                    {order.deliveryAddress && (
                      <p className="text-[11px] text-slate-400 truncate">
                        📍 {order.deliveryAddress}, {order.district || "Dhaka"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-slate-500" />
                    <span className="text-[11px]">
                      {order.orderedAt ? new Date(order.orderedAt).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : "Recently"}
                    </span>
                  </div>

                  {getStatusBadge(order.status)}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}