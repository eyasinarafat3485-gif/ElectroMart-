"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Eye, EyeOff, UploadCloud, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // 📸 Image States
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");
    };

    // 🖼️ Image Selection Handler
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File size is too large! Maximum limit is 2MB.");
                return;
            }
            setProfileImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // 🗑️ Remove Selected Image Handler
    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setProfileImage(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        // 🚨 Image Validation
        if (!profileImage) {
            setError("Profile photo is required.");
            toast.error("Profile photo is required.");
            return;
        }

        if (!validatePassword(formData.password)) {
            setError(
                "Password must be at least 8 characters and include uppercase, lowercase, number and special character."
            );
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            // 🚀 1. ImgBB Image Upload Logic
            const IMGBBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            if (!IMGBBB_API_KEY) {
                setError("Image upload API key is missing in environment variables.");
                toast.error("Image upload API key is missing.");
                setLoading(false);
                return;
            }

            const imgbbFormData = new FormData();
            imgbbFormData.append("image", profileImage);

            const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBBB_API_KEY}`, {
                method: "POST",
                body: imgbbFormData,
            });

            const imgbbData = await imgbbResponse.json();

            if (!imgbbResponse.ok || !imgbbData.success) {
                const errMsg = imgbbData.error?.message || "Failed to upload profile image.";
                setError(`ImgBB Error: ${errMsg}`);
                toast.error(`ImgBB Error: ${errMsg}`);
                setLoading(false);
                return;
            }

            const imageUrl = imgbbData.data.url;

            // 🔐 2. Auth SignUp with Image URL
            const { error: signUpError } = await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                image: imageUrl, // ✅ Image URL Passed Here
            });

            if (signUpError) {
                setError(signUpError.message);
                toast.error(signUpError.message);
                return;
            }

            // ✅ Default Role = user
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/role`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    role: "user",
                }),
            });

            toast.success("Account created successfully!");
            router.push("/login");

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
                    <h1 className="text-4xl font-bold text-white">Create Account</h1>
                    <p className="mt-3 text-slate-400">Join ElectroMart today</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* 📸 Profile Image Upload UI */}
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border transition-all cursor-pointer group ${
                            imagePreview ? "border-blue-500/50 bg-slate-800/60" : "border-slate-700 hover:border-slate-600"
                        }`}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />

                        <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-500 overflow-hidden relative shrink-0 group-hover:border-blue-500/50 transition-colors">
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <Trash2 size={16} className="text-red-500" onClick={removeImage} />
                                    </div>
                                </>
                            ) : (
                                <UploadCloud size={22} className="group-hover:text-blue-400 transition-colors" />
                            )}
                        </div>
                        <div className="text-center sm:text-left flex-1">
                            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                                Profile Avatar <span className="text-red-500 text-sm">*</span>
                            </h4>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                                {imagePreview ? "Image loaded successfully." : "Click to browse image. Max 2MB (Required)."}
                            </p>
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-400">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-400">Email Address</label>
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
                        <label className="block mb-2 text-sm font-medium text-slate-400">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create password"
                                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 pr-14 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-400">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 pr-14 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:bg-slate-700"
                    >
                        {loading ? (
                            <>
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                Creating Account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                {/* Bottom */}
                <div className="mt-8 text-center text-slate-400">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-blue-400 hover:text-blue-300">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}