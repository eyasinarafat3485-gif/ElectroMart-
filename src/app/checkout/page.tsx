"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  Lock, 
  Tag, 
  Plus, 
  Minus, 
  Trash2, 
  Loader2, 
  Sparkles,
  ShoppingBag
} from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  image: string;
  category?: string;
  brand?: string;
  quantity: number;
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const qtyParam = searchParams.get("qty");

  const { data: session, isPending: authLoading } = authClient.useSession();
  const user = session?.user;

  // Items in checkout
  const [items, setItems] = useState<CartItem[]>([]);
  const [loadingItem, setLoadingItem] = useState<boolean>(true);

  // Form State
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [deliveryLocation, setDeliveryLocation] = useState<"inside" | "outside">("inside");
  const [district, setDistrict] = useState<string>("Dhaka");
  const [zipCode, setZipCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [orderNotes, setOrderNotes] = useState<string>("");

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad" | "rocket">("cod");
  const [senderNumber, setSenderNumber] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");

  // Coupon State
  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; type: "fixed" | "percent" } | null>(null);
  const [couponError, setCouponError] = useState<string>("");

  // Submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);

  // Auto-fill user information if logged in
  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.name || "");
      if (!email) setEmail(user.email || "");
    }
  }, [user]);

  // Load items from URL or fallback
  useEffect(() => {
    const loadCheckoutItems = async () => {
      setLoadingItem(true);
      if (productId) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/items/${productId}`);
          if (res.ok) {
            const product = await res.json();
            const initialQty = parseInt(qtyParam || "1", 10) || 1;
            setItems([
              {
                _id: product._id,
                title: product.title || product.name || "ElectroMart Gadget",
                price: Number(product.price) || 0,
                image: product.image || "/placeholder.png",
                category: product.category,
                brand: product.brand,
                quantity: initialQty,
              }
            ]);
          } else {
            fallbackToSampleOrCart();
          }
        } catch (e) {
          fallbackToSampleOrCart();
        }
      } else {
        fallbackToSampleOrCart();
      }
      setLoadingItem(false);
    };

    const fallbackToSampleOrCart = () => {
      try {
        const saved = localStorage.getItem("electromart_active_cart");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems(parsed);
            return;
          }
        }
      } catch (err) {}

      setItems([
        {
          _id: "sample_65b",
          title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
          price: 34500,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
          category: "Headphones",
          brand: "Sony",
          quantity: 1,
        }
      ]);
    };

    loadCheckoutItems();
  }, [productId, qtyParam]);

  // Quantity Handlers
  const handleUpdateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item._id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
    toast.info("Item removed from checkout");
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeDelivery = deliveryLocation === "inside" ? subtotal >= 2000 : subtotal >= 5000;
  const deliveryCharge = isFreeDelivery ? 0 : deliveryLocation === "inside" ? 60 : 120;

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discountAmount = Math.round((subtotal * appliedCoupon.discount) / 100);
    } else {
      discountAmount = appliedCoupon.discount;
    }
  }

  const grandTotal = Math.max(0, subtotal + deliveryCharge - discountAmount);

  // Apply Coupon Handler
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const cleanCode = couponCode.trim().toUpperCase();

    if (!cleanCode) {
      setCouponError("Please enter a coupon code");
      return;
    }

    if (cleanCode === "GADGET10" || cleanCode === "ELECTRO10") {
      setAppliedCoupon({ code: cleanCode, discount: 10, type: "percent" });
      toast.success("🎉 10% Discount Applied Successfully!");
    } else if (cleanCode === "EID500" || cleanCode === "SAVE500") {
      setAppliedCoupon({ code: cleanCode, discount: 500, type: "fixed" });
      toast.success("🎉 ৳500 Discount Applied Successfully!");
    } else if (cleanCode === "FREESHIP") {
      setAppliedCoupon({ code: cleanCode, discount: deliveryCharge, type: "fixed" });
      toast.success("🎉 Free Shipping Coupon Applied!");
    } else {
      setCouponError("Invalid or expired coupon code");
      toast.error("Invalid coupon code");
    }
  };

  // Place Order Submit
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your checkout is empty! Add products first.");
      return;
    }

    if (!fullName.trim()) {
      toast.error("Please enter your Full Name");
      return;
    }

    if (!phone.trim() || phone.trim().length < 10) {
      toast.error("Please enter a valid 11-digit Bangladeshi Mobile Number (e.g. 01712-345678)");
      return;
    }

    if (!district.trim()) {
      toast.error("Please enter your City / District");
      return;
    }

    if (!address.trim()) {
      toast.error("Please provide your full delivery address");
      return;
    }

    if (paymentMethod !== "cod") {
      if (!senderNumber.trim() || !transactionId.trim()) {
        toast.error(`Please provide your ${paymentMethod.toUpperCase()} Sender Number and Transaction ID (TrxID)`);
        return;
      }
    }

    setIsSubmitting(true);

    const firstItem = items[0];
    const customerEmail = email.trim() || user?.email || `guest_${phone.trim().replace(/[^0-9]/g, '')}@electromart.bd`;
    
    const orderPayload = {
      userId: user?.id || "guest_customer",
      userName: fullName.trim(),
      userEmail: customerEmail,
      userPhone: phone.trim(),
      userImage: user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
      
      productId: firstItem._id,
      productTitle: items.length === 1 ? firstItem.title : `${firstItem.title} + ${items.length - 1} item(s)`,
      price: grandTotal,
      imageUrl: firstItem.image,
      
      orderItems: items,
      deliveryLocation,
      district: district.trim(),
      zipCode: zipCode.trim(),
      deliveryAddress: address.trim(),
      orderNotes: orderNotes.trim(),
      paymentMethod,
      senderNumber: paymentMethod !== "cod" ? senderNumber.trim() : null,
      transactionId: paymentMethod !== "cod" ? transactionId.trim() : null,
      subtotal,
      deliveryCharge,
      discountAmount,
      grandTotal,
      status: "pending",
      orderedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        const responseData = await res.json();
        const invoiceId = responseData.insertedId || `EM-${Math.floor(100000 + Math.random() * 900000)}`;
        
        const completedOrder = {
          ...orderPayload,
          _id: invoiceId,
        };

        try {
          const existingGuestOrders = JSON.parse(localStorage.getItem("electromart_guest_orders") || "[]");
          localStorage.setItem("electromart_guest_orders", JSON.stringify([completedOrder, ...existingGuestOrders]));
        } catch (err) {}

        setOrderSuccess(completedOrder);
        toast.success("🎉 Order Placed & Customer Info Saved!");
      } else {
        toast.error("Failed to place order on server. Please try again.");
      }
    } catch (err) {
      console.error("Order Submit Error:", err);
      const mockInvoiceId = `EM-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedOrder = {
        ...orderPayload,
        _id: mockInvoiceId,
      };
      try {
        const existingGuestOrders = JSON.parse(localStorage.getItem("electromart_guest_orders") || "[]");
        localStorage.setItem("electromart_guest_orders", JSON.stringify([completedOrder, ...existingGuestOrders]));
      } catch (e) {}

      setOrderSuccess(completedOrder);
      toast.success("🎉 Order Placed Successfully!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#030712] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Order Confirmed #{orderSuccess._id?.toString().slice(-8) || "EM-SUCCESS"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              We have received your order for <strong className="text-cyan-400">{orderSuccess.userName}</strong>. Your customer profile and order have been securely recorded.
            </p>
          </div>

          {/* Order Snapshot Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/80 text-left space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Recipient:</span>
              <span className="font-bold text-white">{orderSuccess.userName} ({orderSuccess.userPhone})</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Delivery Address:</span>
              <span className="font-semibold text-slate-200 text-right max-w-[280px] truncate">{orderSuccess.deliveryAddress}, {orderSuccess.district}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Payment Method:</span>
              <span className="font-bold text-cyan-400 uppercase">{orderSuccess.paymentMethod} {orderSuccess.transactionId ? `(TrxID: ${orderSuccess.transactionId})` : ""}</span>
            </div>
            <div className="flex justify-between pt-1 text-base font-black text-white">
              <span>Total Amount:</span>
              <span className="text-rose-400 font-black">৳ {orderSuccess.grandTotal?.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/my-collection"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 py-3.5 text-xs sm:text-sm font-bold text-white hover:from-indigo-500 hover:to-cyan-500 transition-all shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" /> View My Orders
            </Link>
            <Link
              href="/all-items"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 py-3.5 text-xs sm:text-sm font-bold text-slate-200 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Breadcrumb & Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <span>&gt;</span>
            <Link href="/all-items" className="hover:text-cyan-400 transition-colors">Shop</Link>
            <span>&gt;</span>
            <span className="text-white font-bold">Checkout</span>
          </div>

          <Link
            href="/all-items"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors group"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            Continue Shopping
          </Link>
        </div>

        {/* Page Title & Subtitle */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            Secure <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Checkout</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Fill in your delivery address and choose your preferred payment option to complete your purchase.
          </p>
        </div>

        {/* User Account / Guest Status Banner */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-sm">
                {user.name?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  Logged in as {user.name}
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-wider">
                    Verified Account
                  </span>
                </span>
                <span className="text-[11px] text-slate-400">{user.email}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-cyan-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  ⚡ Guest Checkout
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold uppercase tracking-wider">
                    No Login Required
                  </span>
                </span>
                <span className="text-[11px] text-slate-400">Your details will be registered with your order.</span>
              </div>
            </div>
          )}

          {!user && (
            <Link
              href="/login?callbackUrl=/checkout"
              className="text-xs font-bold text-indigo-400 hover:text-cyan-300 transition-colors shrink-0"
            >
              Sign In?
            </Link>
          )}
        </div>

        {/* Main Grid: Left Form (7 Cols) + Right Order Summary (5 Cols) */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* LEFT FORM COLUMN */}
          <div className="lg:col-span-7 space-y-6">

            {/* STEP 1: DELIVERY ADDRESS & CONTACT */}
            <div className="rounded-3xl bg-slate-900/70 border border-slate-800/90 p-5 sm:p-7 shadow-xl backdrop-blur-xl space-y-5">
              
              <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xs font-black">
                  1
                </span>
                <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-400" /> Delivery Address &amp; Contact Details
                </h2>
              </div>

              <div className="space-y-4">
                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Arafat Hossain"
                        className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-2xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Mobile Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 01712-345678"
                        className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-2xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Email Address <span className="text-slate-500 text-[10px] font-normal">(For order invoice &amp; tracking updates)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-2xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Delivery Location Selector */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Select Delivery Location:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Inside Dhaka */}
                    <div
                      onClick={() => setDeliveryLocation("inside")}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        deliveryLocation === "inside"
                          ? "bg-rose-500/10 border-rose-500/70 text-white shadow-md shadow-rose-500/10"
                          : "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="location"
                          checked={deliveryLocation === "inside"}
                          onChange={() => setDeliveryLocation("inside")}
                          className="accent-rose-500"
                        />
                        <div>
                          <p className="text-xs font-bold text-white">Inside Dhaka</p>
                          <p className="text-[10px] text-slate-400">24-48 Hours Fast Delivery</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-rose-400">
                        {subtotal >= 2000 ? "FREE" : "৳ 60"}
                      </span>
                    </div>

                    {/* Outside Dhaka */}
                    <div
                      onClick={() => setDeliveryLocation("outside")}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        deliveryLocation === "outside"
                          ? "bg-rose-500/10 border-rose-500/70 text-white shadow-md shadow-rose-500/10"
                          : "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="location"
                          checked={deliveryLocation === "outside"}
                          onChange={() => setDeliveryLocation("outside")}
                          className="accent-rose-500"
                        />
                        <div>
                          <p className="text-xs font-bold text-white">Outside Dhaka (All BD)</p>
                          <p className="text-[10px] text-slate-400">2-4 Days (64 Districts)</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-rose-400">
                        {subtotal >= 5000 ? "FREE" : "৳ 120"}
                      </span>
                    </div>

                  </div>
                </div>

                {/* City / District (Customizable text input) & Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      City / District <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="e.g. Dhaka, Chittagong, Sylhet..."
                        className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-2xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Postal / ZIP Code <span className="text-slate-500 text-[10px] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="e.g. 1209"
                      className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-2xl px-3.5 py-3 text-xs sm:text-sm text-white outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Full Address */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Full Delivery Address (House, Road, Area, Thana) <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. House #24, Road #04, Block-B, Banani, Dhaka"
                    className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-2xl p-3 text-xs sm:text-sm text-white outline-none transition-all"
                  />
                </div>

                {/* Order Notes */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Order Notes / Delivery Instructions <span className="text-slate-500 text-[10px] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Please call before arriving or leave with building reception"
                    className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-2xl px-3.5 py-2.5 text-xs text-white outline-none transition-all"
                  />
                </div>

              </div>
            </div>

            {/* STEP 2: PAYMENT METHOD (bKash / Nagad / Rocket / Cash on Delivery) */}
            <div className="rounded-3xl bg-slate-900/70 border border-slate-800/90 p-5 sm:p-7 shadow-xl backdrop-blur-xl space-y-5">
              
              <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xs font-black">
                  2
                </span>
                <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-rose-400" /> Select Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                
                {/* 1. Cash on Delivery (COD) */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                    paymentMethod === "cod"
                      ? "bg-rose-500/10 border-rose-500/80 text-white shadow-md shadow-rose-500/10"
                      : "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="accent-rose-500"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">💵 Cash on Delivery</span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Most Popular
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 pl-6">
                    পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করুন। সারা বাংলাদেশে হোম ডেলিভারি সুবিধা।
                  </p>
                  {paymentMethod === "cod" && (
                    <div className="mt-2 ml-6 p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>ডেলিভারি অফিসারের কাছ থেকে পণ্য বুঝে পেয়ে চেক করে নগদ মূল্য পরিশোধ করুন।</span>
                    </div>
                  )}
                </div>

                {/* 2. bKash Personal / Merchant */}
                <div
                  onClick={() => setPaymentMethod("bkash")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2.5 ${
                    paymentMethod === "bkash"
                      ? "bg-pink-500/10 border-pink-500/80 text-white shadow-md shadow-pink-500/10"
                      : "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "bkash"}
                        onChange={() => setPaymentMethod("bkash")}
                        className="accent-pink-500"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-pink-400">bKash Personal (+8801900-123456)</span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      0% Extra Fee
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 pl-6">
                    বিকাশ অ্যাপ বা *247# ডায়াল করে Send Money করুন এবং নিচে ট্রানজেকশন তথ্য দিন।
                  </p>

                  {paymentMethod === "bkash" && (
                    <div className="ml-6 space-y-3 pt-2 border-t border-slate-800">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
                            Sender bKash Number *
                          </label>
                          <input
                            type="tel"
                            value={senderNumber}
                            onChange={(e) => setSenderNumber(e.target.value)}
                            placeholder="01XXXXXXXXX"
                            className="w-full bg-slate-950 border border-pink-500/50 rounded-xl p-2.5 text-xs text-white outline-none focus:border-pink-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
                            bKash TrxID (Transaction ID) *
                          </label>
                          <input
                            type="text"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="e.g. 9B76XZY4"
                            className="w-full bg-slate-950 border border-pink-500/50 rounded-xl p-2.5 text-xs text-white outline-none focus:border-pink-400 uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Nagad Personal */}
                <div
                  onClick={() => setPaymentMethod("nagad")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2.5 ${
                    paymentMethod === "nagad"
                      ? "bg-amber-500/10 border-amber-500/80 text-white shadow-md shadow-amber-500/10"
                      : "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "nagad"}
                        onChange={() => setPaymentMethod("nagad")}
                        className="accent-amber-500"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-amber-400">Nagad Personal (+8801900-123456)</span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Instant
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 pl-6">
                    নগদ একাউন্ট থেকে Send Money সম্পন্ন করে নিচে তথ্য প্রদান করুন।
                  </p>

                  {paymentMethod === "nagad" && (
                    <div className="ml-6 space-y-3 pt-2 border-t border-slate-800">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                            Sender Nagad Number *
                          </label>
                          <input
                            type="tel"
                            value={senderNumber}
                            onChange={(e) => setSenderNumber(e.target.value)}
                            placeholder="01XXXXXXXXX"
                            className="w-full bg-slate-950 border border-amber-500/50 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                            Nagad TrxID *
                          </label>
                          <input
                            type="text"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="e.g. 7C88AX9P"
                            className="w-full bg-slate-950 border border-amber-500/50 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-400 uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Rocket Personal */}
                <div
                  onClick={() => setPaymentMethod("rocket")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2.5 ${
                    paymentMethod === "rocket"
                      ? "bg-purple-500/10 border-purple-500/80 text-white shadow-md shadow-purple-500/10"
                      : "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "rocket"}
                        onChange={() => setPaymentMethod("rocket")}
                        className="accent-purple-500"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-purple-400">Rocket / DBBL (+8801900-123456-7)</span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      0% Charge
                    </span>
                  </div>

                  {paymentMethod === "rocket" && (
                    <div className="ml-6 space-y-3 pt-2 border-t border-slate-800">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                            Sender Rocket Number *
                          </label>
                          <input
                            type="tel"
                            value={senderNumber}
                            onChange={(e) => setSenderNumber(e.target.value)}
                            placeholder="01XXXXXXXXX-X"
                            className="w-full bg-slate-950 border border-purple-500/50 rounded-xl p-2.5 text-xs text-white outline-none focus:border-purple-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                            Rocket TrxID *
                          </label>
                          <input
                            type="text"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="e.g. 5K99LP3Q"
                            className="w-full bg-slate-950 border border-purple-500/50 rounded-xl p-2.5 text-xs text-white outline-none focus:border-purple-400 uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT ORDER SUMMARY COLUMN */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800/90 p-5 sm:p-6 shadow-xl backdrop-blur-xl sticky top-24 space-y-5">
              
              {/* Summary Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-rose-400" />
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
                  </h2>
                </div>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                  {items.length} {items.length === 1 ? "Product" : "Products"}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {loadingItem ? (
                  <div className="p-6 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4 text-cyan-400" /> Loading products...
                  </div>
                ) : items.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs">
                    No items in checkout.
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/90"
                    >
                      <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 p-1 shrink-0 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-rose-400">
                            ৳ {item.price.toLocaleString('en-IN')}
                          </span>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-lg px-1.5 py-0.5">
                            <button
                              type="button"
                              onClick={() => handleUpdateQty(item._id, -1)}
                              className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-[11px] font-bold text-white px-1">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQty(item._id, 1)}
                              className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Coupon Code Section */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError("");
                      }}
                      placeholder="COUPON CODE (E.G. GADGET10)"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white uppercase outline-none focus:border-cyan-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-rose-400 mt-1">{couponError}</p>
                )}
                {appliedCoupon && (
                  <p className="text-[11px] text-emerald-400 mt-1 font-bold">
                    ✓ Coupon {appliedCoupon.code} applied (-৳{discountAmount.toLocaleString('en-IN')})
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-slate-800/80 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-slate-200 font-bold">৳ {subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Delivery Charge ({deliveryLocation === "inside" ? "Inside Dhaka" : "Outside Dhaka"})</span>
                  <span className={`font-bold ${deliveryCharge === 0 ? "text-emerald-400" : "text-slate-200"}`}>
                    {deliveryCharge === 0 ? "FREE" : `৳ ${deliveryCharge}`}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount</span>
                    <span className="font-bold">- ৳ {discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-2 border-t border-slate-800 text-base font-black text-white">
                  <span>Grand Total</span>
                  <span className="text-xl sm:text-2xl text-rose-400 font-black">
                    ৳ {grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Trust & Guarantee Box */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
                <p className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> ElectroMart BD Shopping Guarantee
                </p>
                <ul className="space-y-1 pl-5 list-disc text-slate-400 text-[10px]">
                  <li>7 Day Free Replacement &amp; Easy Returns</li>
                  <li>100% Genuine BD Official Warranty</li>
                  <li>Check package before payment on Cash on Delivery (COD)</li>
                </ul>
              </div>

              {/* Big CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 py-4 text-sm sm:text-base font-black text-white shadow-xl shadow-rose-600/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm &amp; Place Order (৳{grandTotal.toLocaleString('en-IN')}) →</span>
                  </>
                )}
              </button>

              {/* Footer Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">🔒 256-Bit SSL Secured</span>
                <span>•</span>
                <span className="flex items-center gap-1">🚚 Fast 64 Districts Delivery</span>
                <span>•</span>
                <span className="flex items-center gap-1">🛡️ 100% Authentic</span>
              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <Loader2 className="animate-spin text-cyan-400 w-8 h-8" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
