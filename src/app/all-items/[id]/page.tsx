"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Star, 
  ArrowLeft, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  RotateCcw
} from "lucide-react";
import ItemCard from '@/app/components/others ui/ItemCard';
import BuyNowButton from './BuyNowButton';
import { authClient } from "@/lib/auth-client";

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
  name?: string;         
  description?: string;  
}

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

type CategoryType = 'Smartphones' | 'Laptops' | 'Televisions' | 'Headphones' | 'Cameras';

const categoryColors: Record<CategoryType, string> = {
  Smartphones: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Laptops: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Televisions: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Headphones: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Cameras: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export default function ItemDetailsPage() {
  const params = useParams();
  
  const [item, setItem] = useState<ItemDetail | null>(null);
  const [relatedItems, setRelatedItems] = useState<ItemDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = authClient.useSession();

  const loggedUser: UserInfo | null = session?.user ? {
    _id: session.user.id || "",
    name: session.user.name || "",
    email: session.user.email || "",
    image: session.user.image || undefined
  } : null;

  useEffect(() => {
    const fetchItemDetails = async () => {
      const resolvedParams = await params;
      const id = resolvedParams?.id as string;

      if (!id) {
        setError("Product ID not found in URL");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/items/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }

        const data = await res.json();
        
        if (!data || Object.keys(data).length === 0) {
          throw new Error("No product details returned from server");
        }

        setItem(data);
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (params) {
      fetchItemDetails();
    }
  }, [params]);

  useEffect(() => {
    if (!item || !item.category) return;

    const fetchRelatedItems = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/items?category=${item.category}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
  }, [item]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 animate-spin" />
        <p className="text-slate-400 text-[11px] sm:text-xs tracking-widest uppercase font-semibold">Loading Genuine BD Unit...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center gap-4 text-center px-4">
        <AlertTriangle className="w-12 h-12 text-rose-500 animate-bounce" />
        <h2 className="text-lg sm:text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400 max-w-md text-xs sm:text-sm">{error || "The gadget you are looking for does not exist or has been removed."}</p>
        <Link href="/all-items" className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-slate-900 border border-slate-800 px-5 py-2.5 text-xs font-bold text-cyan-400 hover:bg-slate-800 transition-all">
          <ArrowLeft size={14} /> Back to Catalog
        </Link>
      </div>
    );
  }

  const currentCategoryColor = categoryColors[item.category as CategoryType] || 'bg-slate-800 text-slate-300 border-slate-700';
  const priceNum = Number(item.price) || 0;
  const regularPrice = Math.round(priceNum * 1.12);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Back link & Breadcrumbs */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <Link
            href="/all-items"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            Back to All Gadgets
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span>ElectroMart BD</span>
            <span>/</span>
            <span className="text-slate-400">{item.category}</span>
            <span>/</span>
            <span className="text-cyan-400 font-semibold">{item.brand}</span>
          </div>
        </div>

        {/* Product Details Main Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 bg-slate-900/70 border border-slate-800/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 backdrop-blur-xl shadow-2xl">

          {/* Left Media Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-slate-950 p-4 sm:p-6 flex items-center justify-center group shadow-inner">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-108"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";
                }}
              />
              <span className={`absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-[10px] sm:text-xs font-bold backdrop-blur-md shadow-md ${currentCategoryColor}`}>
                {item.category}
              </span>
              <span className="absolute top-3 right-3 rounded-full px-2 py-0.5 text-[9px] sm:text-[11px] font-bold bg-slate-900/90 border border-slate-700 text-emerald-400 flex items-center gap-1 shadow-md">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Official BD Warranty
              </span>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 text-[10px] sm:text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                <span>24h Dhaka Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0" />
                <span>7-Day Replacement</span>
              </div>
            </div>
          </motion.div>

          {/* Right Product Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-6"
          >
            <div className="space-y-3 sm:space-y-4">
              
              {/* Brand & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
                <span className="text-[10px] sm:text-xs font-bold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 px-2 sm:px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                  Brand: {item.brand}
                </span>
                <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="text-[11px] sm:text-xs font-bold text-white">{item.rating}</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400">(Verified BD Buyer Ratings)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                  {item.title}
                </h1>
                {item.shortDescription && (
                  <p className="text-[11px] sm:text-xs md:text-sm text-cyan-400 font-medium italic">
                    &ldquo;{item.shortDescription}&rdquo;
                  </p>
                )}
              </div>

              {/* Price Block with BDT & Regular Price */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800/90 flex flex-wrap items-baseline justify-between gap-2.5 shadow-inner">
                <div>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Special Online Price</p>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                      ৳ {priceNum.toLocaleString('en-IN')}
                    </span>
                    {regularPrice > priceNum && (
                      <span className="text-xs sm:text-sm text-slate-500 line-through font-medium">
                        ৳ {regularPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg">
                    <CreditCard className="w-3 h-3" /> EMI ৳{Math.round(priceNum / 12).toLocaleString('en-IN')}/mo
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1 pt-1">
                <h3 className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-400 uppercase">Product Overview</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                  {item.fullDescription || item.description || "Authentic electronic device sourced from official global distributors. Packaged securely with authentic manufacturer seal and warranty card."}
                </p>
              </div>

            </div>

            {/* Stock, Location & Buy Button */}
            <div className="space-y-3 sm:space-y-4 pt-3 border-t border-slate-800/60">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-950/70 border border-slate-800/70 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl">
                  {item.stock > 0 ? (
                    <>
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <span className="text-[11px] sm:text-xs text-slate-300">
                        In Stock: <strong className="text-emerald-400 font-bold">{item.stock} Units</strong>
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={14} className="text-rose-400 shrink-0" />
                      <span className="text-[11px] sm:text-xs text-rose-400 font-bold">Out of Stock</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-950/70 border border-slate-800/70 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl">
                  <MapPin size={14} className="text-amber-400 shrink-0" />
                  <span className="text-[11px] sm:text-xs text-slate-300 truncate">
                    Hub: <strong className="text-white">{item.location || "Dhaka Warehouse"}</strong>
                  </span>
                </div>
              </div>

              {/* Buy Now / Order Button */}
              <BuyNowButton item={item} user={loggedUser} />
            </div>

          </motion.div>
        </div>

        {/* Related Items Section */}
        {relatedItems.length > 0 && (
          <div className="mt-10 sm:mt-16 space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight">
                Related Gadgets in <span className="text-cyan-400">{item.category}</span>
              </h2>
              <Link href={`/all-items?category=${item.category}`} className="text-[11px] sm:text-xs font-bold text-indigo-400 hover:text-indigo-300">
                View All in {item.category} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedItems.map((relatedItem) => (
                <ItemCard
                  key={relatedItem._id}
                  item={{
                    ...relatedItem,
                    name: relatedItem.name ?? relatedItem.title,
                    description: relatedItem.description ?? relatedItem.fullDescription,
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}