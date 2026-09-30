"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles, User } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleDemoLogin = (role: 'admin' | 'user') => {
    setError("");
    if (role === 'admin') {
      setFormData({
        email: "admin@electormart.com",
        password: "admin123",
      });
      toast.info("⚡ Demo Admin credentials applied!");
    } else {
      setFormData({
        email: "user@electormart.com",
        password: "user123",
      });
      toast.info("✨ Demo User credentials applied!");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError("Invalid email or password.");
        toast.error("Invalid email or password.");
        return;
      }

      toast.success("Welcome back to ElectroMart!");
      router.refresh();

      const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl");
      if (callbackUrl) {
        router.push(decodeURIComponent(callbackUrl));
      } else {
        router.push("/"); 
      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center py-16 px-4 relative overflow-hidden tech-grid-pattern">
      {/* Background glowing orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-3xl border border-slate-800/90 bg-slate-900/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl relative z-10"
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Secure Authentication
          </span>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Sign in to your ElectroMart Bangladesh account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full rounded-2xl border border-slate-700/80 bg-slate-950/80 pl-11 pr-4 py-3.5 text-xs sm:text-sm text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-slate-700/80 bg-slate-950/80 pl-11 pr-12 py-3.5 text-xs sm:text-sm text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error notice */}
          {error && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-400 font-medium">
              {error}
            </div>
          )}

          {/* Login Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 py-3.5 text-xs sm:text-sm font-bold text-white transition-all shadow-lg shadow-indigo-600/25 disabled:bg-slate-800 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Signing In...</span>
              </>
            ) : (
              "Sign In to Account"
            )}
          </button>

          {/* Demo Login Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Instant 1-Click Demo Login
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Demo Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 py-2.5 text-xs font-bold text-indigo-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Demo Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 py-2.5 text-xs font-bold text-cyan-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" /> Demo User
            </button>
          </div>

        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-xs text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-cyan-400 hover:text-cyan-300 hover:underline"
          >
            Create Free Account
          </Link>
        </div>

      </motion.div>
    </div>
  );
}