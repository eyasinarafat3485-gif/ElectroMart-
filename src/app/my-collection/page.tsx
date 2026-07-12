"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { authClient } from "@/lib/auth-client"; 
import { Loader2, ShoppingBag, Calendar, ArrowRight, ShoppingCart } from 'lucide-react';
import { TbCoinTaka } from "react-icons/tb";

interface OrderItem {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  productId: string;
  productTitle: string;
  price: number;
  imageUrl: string;
  orderedAt: string;
}

export default function MyCollectionPage() {
  const { data: session, isPending: authLoading } = authClient.useSession();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders?email=${session.user.email}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch your collection");
        }
        
        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [session, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
        <p className="text-slate-400 text-sm tracking-widest animate-pulse">Loading Your Collection...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="p-4 bg-slate-900 rounded-full border border-slate-800 text-rose-500">
          <ShoppingCart size={32} />
        </div>
        <h2 className="text-xl font-bold text-white">Access Denied</h2>
        <p className="text-slate-400 max-w-sm">Please log in to view your personalized product collection.</p>
        <Link href="/login" className="mt-2 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-500/20">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-5 py-15 pt-30 pb-15 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <ShoppingBag className="text-cyan-400" size={28} />
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Collection</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Welcome back, <span className="text-slate-200 font-medium">{session.user.name}</span>. Review all your ordered items below.
            </p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-2xl text-xs md:text-sm text-slate-400 w-fit">
            Total Ordered: <strong className="text-cyan-400 text-base ml-1">{orders.length}</strong> Items
          </div>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm mb-6">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-12 text-center max-w-xl mx-auto backdrop-blur-sm"
          >
            <p className="text-lg font-semibold text-slate-300 mb-2">Your collection is empty!</p>
            <p className="text-sm text-slate-500 mb-6">You haven't ordered any premium items yet. Start exploring our shop today.</p>
            <Link href="/all-items" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-5 py-2.5 text-sm font-semibold text-cyan-400 hover:bg-slate-800 transition-all group">
              Explore Products <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative flex flex-col justify-between bg-slate-900/50 border border-slate-800 rounded-2xl p-4 hover:border-slate-700/80 transition-all shadow-xl"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800/80">
                    <img 
                      src={order.imageUrl} 
                      alt={order.productTitle}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
                      {order.productTitle}
                    </h3>
                    
                    <div className="flex items-center gap-0.5 text-cyan-400 font-extrabold text-lg">
                      <TbCoinTaka size={20} />
                      <span>{order.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-slate-600" />
                    <span>
                      {new Date(order.orderedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded-md font-medium">
                    Confirmed
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}