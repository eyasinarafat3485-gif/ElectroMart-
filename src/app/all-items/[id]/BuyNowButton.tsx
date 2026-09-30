"use client";

import React from 'react';
import { useRouter } from "next/navigation"; 
import { motion } from "framer-motion";
import { IoCartOutline } from 'react-icons/io5';
import { ArrowRight, Zap } from "lucide-react";

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

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

interface BuyNowButtonProps {
  item: ItemDetail;
  user: UserInfo | null;
}

export default function BuyNowButton({ item }: BuyNowButtonProps) {
  const router = useRouter(); 

  const handleBuyNow = () => {
    // Save to active checkout cart for instant smooth checkout
    try {
      localStorage.setItem("electromart_active_cart", JSON.stringify([{
        _id: item._id,
        title: item.title,
        price: Number(item.price) || 0,
        image: item.image,
        category: item.category,
        brand: item.brand,
        quantity: 1
      }]));
    } catch (e) {}

    router.push(`/checkout?productId=${item._id}&qty=1`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-1">
      <motion.button
        type="button"
        onClick={handleBuyNow}
        whileHover={{ scale: item.stock > 0 ? 1.02 : 1 }}
        whileTap={{ scale: item.stock > 0 ? 0.98 : 1 }}
        disabled={item.stock <= 0}
        className={`flex-1 flex items-center justify-center gap-2.5 rounded-2xl p-4 text-sm sm:text-base font-black text-white transition-all duration-300 shadow-xl ${
          item.stock > 0 
            ? "bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-rose-600/30 cursor-pointer" 
            : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
        }`}
      >
        <Zap className="w-5 h-5 fill-white text-white" />
        <span>{item.stock > 0 ? "Order Now • Buy Now" : "Out of Stock"}</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}