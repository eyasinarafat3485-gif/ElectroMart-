"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation"; 
import { motion } from "framer-motion";
import { IoCartOutline } from 'react-icons/io5';
import { Loader2 } from "lucide-react";
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

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

export default function BuyNowButton({ item, user }: BuyNowButtonProps) {
  const [isOrdering, setIsOrdering] = useState<boolean>(false);
  const router = useRouter(); 

  const handleBuyNow = async () => {
    if (!user) {
      toast.warning("Please login first to place an order!");
      return;
    }

    setIsOrdering(true);

    const orderData = {
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      userImage: user.image || "https://placeholder.com/user.png",
      productId: item._id,
      productTitle: item.title,
      price: item.price,
      imageUrl: item.image,
      orderedAt: new Date().toISOString(),
    };

    try {
      // const { data: tokenData } = await authClient.token();
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "authorization": `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        toast.success("Order successfully done!");
        
        setTimeout(() => {
          router.push("/my-collection");
        }, 1500);

      } else {
        toast.error("Failed to place your order.");
        setIsOrdering(false);
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Something went wrong!");
      setIsOrdering(false);
    }
  };

  return (
    <motion.button
      onClick={handleBuyNow}
      whileHover={{ scale: item.stock > 0 && !isOrdering ? 1.02 : 1 }}
      whileTap={{ scale: item.stock > 0 && !isOrdering ? 0.98 : 1 }}
      disabled={item.stock <= 0 || isOrdering}
      className={`w-full flex items-center justify-center gap-3 rounded-2xl p-4 text-base font-bold text-white transition-all duration-300 shadow-lg ${
        item.stock > 0 
          ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-cyan-500/10 hover:shadow-cyan-500/20 cursor-pointer" 
          : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
      } ${isOrdering ? "opacity-75 cursor-wait" : ""}`}
    >
      {isOrdering ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <IoCartOutline size={21} />
      )}
      {item.stock > 0 ? (isOrdering ? "Processing..." : "Buy Now") : "Out of Stock"}
    </motion.button>
  );
}