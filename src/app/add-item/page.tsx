'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface AddItemFormData {
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

const AddItemPage: React.FC = () => {
    const [formData, setFormData] = useState<AddItemFormData>({
        title: '',
        brand: '',
        category: '',
        shortDescription: '',
        fullDescription: '',
        price: 0,
        rating: 0,
        stock: 0,
        location: '',
        image: '',
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'rating' || name === 'stock'
                ? parseFloat(value) || 0
                : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const itemsData: AddItemFormData = {
                title: formData.title.trim(),
                brand: formData.brand.trim(),
                category: formData.category.trim(),
                shortDescription: formData.shortDescription.trim(),
                fullDescription: formData.fullDescription.trim(),
                price: formData.price,
                rating: formData.rating,
                stock: formData.stock,
                location: formData.location.trim(),
                image: formData.image.trim(),
            };

            // Basic validation
            if (!itemsData.title || !itemsData.brand || !itemsData.price || !itemsData.image) {
                toast.error('Title, Brand, Price, and Image URL are required!');
                setIsSubmitting(false);
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemsData),
            });

            if (response.ok) {
                toast.success("Product added successfully to inventory!");

                // Reset form
                setFormData({
                    title: '', brand: '', category: '', shortDescription: '',
                    fullDescription: '', price: 0, rating: 0, stock: 0,
                    location: '', image: ''
                });
            } else {
                toast.error("Failed to add the item. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-10">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-white mb-2">Add New Product</h1>
                        <p className="text-slate-400">ElectroMart Admin • New Item Entry</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Product Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-lg"
                                    placeholder="Sony WH-1000XM5 Headphones"
                                />
                            </div>

                            {/* Brand */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Brand <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="Sony"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Headphones">Headphones</option>
                                    <option value="Smartphones">Smartphones</option>
                                    <option value="Laptops">Laptops</option>
                                    <option value="Televisions">Televisions</option>
                                    <option value="Cameras">Cameras</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Price (৳) <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="1"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="29999"
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Initial Rating (0-5)</label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="4.5"
                                />
                            </div>

                            {/* Stock */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Stock Quantity</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="50"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Location / Warehouse</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="Dhaka, Bangladesh"
                                />
                            </div>
                        </div>

                        {/* Short Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Short Description</label>
                            <textarea
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                rows={2}
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                placeholder="Premium noise cancelling wireless headphones..."
                            />
                        </div>

                        {/* Full Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Full Description</label>
                            <textarea
                                name="fullDescription"
                                value={formData.fullDescription}
                                onChange={handleChange}
                                rows={6}
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y"
                                placeholder="Detailed specifications and features..."
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Image URL <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                placeholder="https://images.unsplash.com/..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-400 font-semibold py-5 rounded-2xl text-lg transition-all duration-200 mt-4 flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                                    Adding Product...
                                </>
                            ) : (
                                'Add Product to Inventory'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddItemPage;