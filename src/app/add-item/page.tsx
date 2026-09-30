'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { PlusCircle, ShieldCheck, Sparkles, Image as ImageIcon, Layers, DollarSign, Star, Package, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

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
    category: 'Smartphones',
    shortDescription: '',
    fullDescription: '',
    price: 0,
    rating: 4.8,
    stock: 25,
    location: 'Dhaka Main Warehouse',
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
        toast.success("Gadget added successfully to inventory!");
        setFormData({
          title: '', brand: '', category: 'Smartphones', shortDescription: '',
          fullDescription: '', price: 0, rating: 4.8, stock: 25,
          location: 'Dhaka Main Warehouse', image: ''
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
    <div className="min-h-screen bg-[#030712] text-slate-200 py-12 px-4 sm:px-6 lg:px-8 tech-grid-pattern">
      <div className="max-w-3xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 border border-slate-800/90 rounded-3xl shadow-2xl p-6 sm:p-10 backdrop-blur-xl"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Inventory Portal
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight">Add New Gadget</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Publish new electronics to ElectroMart Bangladesh catalog</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Title */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Gadget Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner"
                  placeholder="e.g. Sony WH-1000XM5 Noise Cancelling Wireless Headphones"
                />
              </div>

              {/* Brand */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Brand <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner"
                  placeholder="e.g. Sony / Apple / Samsung"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Category <span className="text-rose-400">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none cursor-pointer"
                >
                  <option value="Smartphones">Smartphones</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Headphones">Headphones</option>
                  <option value="Televisions">Televisions</option>
                  <option value="Cameras">Cameras</option>
                </select>
              </div>

              {/* Price in BDT */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Price (৳ BDT) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1"
                  className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner"
                  placeholder="29999"
                />
              </div>

              {/* Rating */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Initial Rating (0 - 5.0)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner"
                  placeholder="4.8"
                />
              </div>

              {/* Stock */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Stock Units Available
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner"
                  placeholder="50"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Warehouse Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner"
                  placeholder="Dhaka Central Hub"
                />
              </div>
            </div>

            {/* Short Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Short Highlight Tagline
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={2}
                className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner resize-none"
                placeholder="Next-gen active noise cancelling with 30-hour battery life..."
              />
            </div>

            {/* Full Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Full Technical Overview &amp; Specifications
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                rows={4}
                className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner"
                placeholder="Comprehensive technical specifications, connectivity, battery, and warranty details..."
              />
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Product Image URL <span className="text-rose-400">*</span>
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:bg-slate-800 disabled:opacity-50 text-white font-bold py-4 rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                  <span>Adding Gadget...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish to ElectroMart Inventory</span>
                </>
              )}
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddItemPage;