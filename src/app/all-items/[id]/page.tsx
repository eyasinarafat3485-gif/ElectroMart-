"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Star, ArrowLeft, ShoppingBag, MapPin, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { TbCoinTaka } from "react-icons/tb";
import ItemCard from '@/app/components/others ui/ItemCard';

interface ItemDetail {
  _id: string; 
  title: string;
  brand: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  rating: number;
  stock: number;
  location: string;
  image: string;
}

type CategoryType = 'Smartphones' | 'Laptops' | 'Televisions' | 'Headphones' | 'Cameras';

const categoryColors: Record<CategoryType, string> = {
  Smartphones: 'bg-green-500/10 text-green-400 border-green-500/20',
  Laptops: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Televisions: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Headphones: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Cameras: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function ItemDetailsPage() {
  const params = useParams();
  const id = params?.id as string; 

  const [item, setItem] = useState<ItemDetail | null>(null);
  const [relatedItems, setRelatedItems] = useState<ItemDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/items/${id}`); 
        
        if (!res.ok) {
          throw new Error("Failed to fetch product details");
        }
        
        const data = await res.json();
        setItem(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  useEffect(() => {
    if (!item || !item.category) return;

    const fetchRelatedItems = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/items?category=${item.category}`);
        if (res.ok) {
          const data: ItemDetail[] = await res.json();
          const filtered = data
            .filter((p) => p._id !== item._id)
            .slice(0, 4);
          setRelatedItems(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch related items:", err);
      }
    };

    fetchRelatedItems();
  }, [item, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
        <p className="text-slate-400 text-sm tracking-widest animate-pulse">Loading Product Details...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-center px-4">
        <AlertTriangle className="w-16 h-16 text-rose-500 animate-bounce" />
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400 max-w-md">{error || "The item you are looking for does not exist or has been removed."}</p>
        <Link href="/all-items" className="mt-2 inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-5 py-2.5 text-sm font-semibold text-cyan-400 hover:bg-slate-850 transition-all">
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>
    );
  }

  const currentCategoryColor = categoryColors[item.category as CategoryType] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <Link 
            href="/all-items" 
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to All Items
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-2xl">

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 group">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <span className={`absolute top-4 left-4 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${currentCategoryColor}`}>
                {item.category}
              </span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-4">
                <span className="text-sm font-medium tracking-wider text-cyan-400 uppercase">
                  Brand: {item.brand}
                </span>
                <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-700/50">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-slate-200">{item.rating}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                  {item.title}
                </h1>
                <p className="text-base text-cyan-400/90 font-medium italic">
                  "{item.shortDescription}"
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800/80 w-fit px-4 py-2.5 rounded-2xl shadow-inner">
                <TbCoinTaka className="text-cyan-400" size={24} />
                <span className="text-2xl md:text-3xl font-black text-cyan-400 tracking-tight">
                  {item.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase">Description</h3>
                <p className="text-sm md:text-base leading-relaxed text-slate-300">
                  {item.fullDescription}
                </p>
              </div>
            </div>

            <div className="space-y-5 pt-6 border-t border-slate-800/60">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-slate-800/30 border border-slate-800/50 p-3 rounded-xl">
                  {item.stock > 0 ? (
                    <>
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                      <span className="text-xs md:text-sm text-slate-300">
                        Available: <strong className="text-emerald-400">{item.stock} Items</strong>
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={18} className="text-rose-400 shrink-0" />
                      <span className="text-xs md:text-sm text-rose-400 font-medium">Out of Stock</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 bg-slate-800/30 border border-slate-800/50 p-3 rounded-xl">
                  <MapPin size={18} className="text-amber-400 shrink-0" />
                  <span className="text-xs md:text-sm text-slate-300 truncate">
                    {item.location}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: item.stock > 0 ? 1.02 : 1 }}
                whileTap={{ scale: item.stock > 0 ? 0.98 : 1 }}
                disabled={item.stock <= 0}
                className={`w-full flex items-center justify-center gap-3 rounded-2xl p-4 text-base font-bold text-white transition-all duration-300 shadow-lg ${
                  item.stock > 0 
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-cyan-500/10 hover:shadow-cyan-500/20 cursor-pointer" 
                    : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
                }`}
              >
                <ShoppingBag size={20} />
                {item.stock > 0 ? "Buy Now" : "Out of Stock"}
              </motion.button>
            </div>

          </motion.div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="mt-16 space-y-6">
            <h2 className="text-2xl font-extrabold text-white tracking-tight border-b border-slate-800/60 pb-3">
              Related Products <span className="text-cyan-400">({item.category})</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedItems.map((relatedItem) => (
                <ItemCard key={relatedItem._id} item={relatedItem} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}