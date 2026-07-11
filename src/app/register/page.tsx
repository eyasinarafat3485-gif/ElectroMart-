"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
    };
    const validatePassword = (password: string) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

        return regex.test(password);
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
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

            const { error } = await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
            });

            if (error) {
                setError(error.message);
                toast.error(error.message);
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

                    <h1 className="text-4xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="mt-3 text-slate-400">
                        Join ElectroMart today
                    </p>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Name */}

                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-400">
                            Full Name
                        </label>

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
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create password"
                                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 pr-14 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
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

                    {/* Confirm Password */}

                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-400">
                            Confirm Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                value={
                                    formData.confirmPassword
                                }
                                onChange={handleChange}
                                placeholder="Confirm password"
                                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 pr-14 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                            >
                                {showConfirmPassword ? (
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

                    <Link
                        href="/login"
                        className="font-semibold text-blue-400 hover:text-blue-300"
                    >
                        Login
                    </Link>

                </div>

            </div>

        </div>
    );
}