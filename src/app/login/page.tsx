"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

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

    // ডেমো ক্রেডেনশিয়াল অটো-ফিল করার হ্যান্ডলার
    const handleDemoLogin = (role: 'admin' | 'user') => {
        setError("");
        if (role === 'admin') {
            setFormData({
                email: "admin@electormart.com",
                password: "admin123",
            });
            toast.info("Admin credentials auto-filled!");
        } else {
            setFormData({
                email: "user@electormart.com",
                password: "user123",
            });
            toast.info("User credentials auto-filled!");
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

            toast.success("Login successfully done.");

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
        <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-30 pb-15 px-4">
            <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white">
                        Welcome Back
                    </h1>
                    <p className="mt-3 text-slate-400">
                        Login to your ElectroMart account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-400">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@gmail.com"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-400">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 pr-14 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:bg-slate-700 cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                Signing In...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>

                    {/* Divider Line */}
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-slate-800"></div>
                        <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase tracking-wider">Demo Login</span>
                        <div className="flex-grow border-t border-slate-800"></div>
                    </div>

                    {/* Demo Buttons Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => handleDemoLogin('admin')}
                            className="rounded-2xl border border-slate-700 bg-slate-800/50 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white cursor-pointer text-center"
                        >
                            Demo Admin
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDemoLogin('user')}
                            className="rounded-2xl border border-slate-700 bg-slate-800/50 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white cursor-pointer text-center"
                        >
                            Demo User
                        </button>
                    </div>

                </form>

                {/* Bottom */}
                <div className="mt-8 text-center text-slate-400">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-blue-400 hover:text-blue-300"
                    >
                        Register
                    </Link>
                </div>

            </div>
        </div>
    );
}