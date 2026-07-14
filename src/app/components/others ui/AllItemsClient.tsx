"use client";

import { useState, useMemo, useEffect } from "react";
import { Item } from "@/types/item";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import ItemCard from "./ItemCard";
import { TbCoinTaka } from "react-icons/tb";
import { motion } from "framer-motion";

interface AllItemsClientProps {
    initialItems: Item[];
}

const AllItemsClient = ({ initialItems = [] }: AllItemsClientProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [maxPrice, setMaxPrice] = useState<number>(5000);
    const [sortBy, setSortBy] = useState<string>("default");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const itemsPerPage = 8;

    // Calculate max available price
    const maxAvailablePrice = useMemo(() => {
        if (!initialItems.length) return 5000;
        return Math.max(...initialItems.map((item) => Number(item?.price) || 0), 5000);
    }, [initialItems]);

    // Update maxPrice when maxAvailablePrice changes
    useEffect(() => {
        setMaxPrice(maxAvailablePrice);
    }, [maxAvailablePrice]);

    // Get unique categories
    const categories = useMemo(() => {
        if (!initialItems.length) return ["All"];
        const allCats = initialItems.map((item) => item?.category).filter(Boolean);
        return ["All", ...Array.from(new Set(allCats))];
    }, [initialItems]);

    // Filter, search & sort logic
    const filteredAndSortedItems = useMemo(() => {
        let result = [...initialItems];

        // Search
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (item) =>
                    item?.title?.toLowerCase().includes(query) ||
                    item?.brand?.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory !== "All") {
            result = result.filter((item) => item?.category === selectedCategory);
        }

        // Price filter
        result = result.filter((item) => (Number(item?.price) || 0) <= maxPrice);

        // Sorting
        if (sortBy === "price-low") {
            result.sort((a, b) => (Number(a?.price) || 0) - (Number(b?.price) || 0));
        } else if (sortBy === "price-high") {
            result.sort((a, b) => (Number(b?.price) || 0) - (Number(a?.price) || 0));
        } else if (sortBy === "rating") {
            result.sort((a, b) => (Number(b?.rating) || 0) - (Number(a?.rating) || 0));
        }

        return result;
    }, [initialItems, searchQuery, selectedCategory, maxPrice, sortBy]);

    const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSortedItems.slice(indexOfFirstItem, indexOfLastItem);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, maxPrice, sortBy]);

    return (
        <div className="bg-slate-950 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-15 pt-30 pb-15">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium tracking-wide text-cyan-400">
                        Premium Electronics Collection
                    </span>

                    <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-white leading-tight">
                        Explore Our
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            {" "}
                            Latest Products
                        </span>
                    </h1>

                    <p className="mt-6 text-slate-400 text-lg leading-8">
                        Discover premium laptops, smartphones, gaming accessories and
                        innovative gadgets from trusted brands with competitive prices
                        and exceptional quality.
                    </p>

                    {/* Stats */}
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-3">
                            <h3 className="text-2xl font-bold text-white">
                                {initialItems.length}+
                            </h3>
                            <p className="text-sm text-slate-400">Products Available</p>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-3">
                            <h3 className="text-2xl font-bold text-white">4.9</h3>
                            <p className="text-sm text-slate-400">Average Rating</p>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-3">
                            <h3 className="text-2xl font-bold text-white">100%</h3>
                            <p className="text-sm text-slate-400">Authentic Products</p>
                        </div>
                    </div>
                </motion.div>

                {/* Filters */}
                <div className="mt-16 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                        <div className="relative w-full lg:max-w-md">
                            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search products by name or brand..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-950 text-white pl-12 pr-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 transition-colors"
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 w-full lg:w-auto items-center">
                            {/* Category Filter */}
                            <div className="flex flex-col min-w-[150px] w-full sm:w-auto">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="bg-slate-950 text-slate-300 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat === "All" ? "All Categories" : cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="flex items-center gap-3 bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 w-full sm:w-auto">
                                <span className="text-xs text-slate-400 whitespace-nowrap flex items-center gap-1">
                                    Max Price: <TbCoinTaka className="w-4 h-4" /> {maxPrice}
                                </span>
                                <input
                                    type="range"
                                    min="0"
                                    max={maxAvailablePrice}
                                    step="10"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full sm:w-32 accent-cyan-500 cursor-pointer"
                                />
                            </div>

                            {/* Sort By */}
                            <div className="flex flex-col min-w-[160px] w-full sm:w-auto">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-slate-950 text-slate-300 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                                >
                                    <option value="default">Default</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items Grid */}
                {currentItems.length > 0 ? (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {currentItems.map((item) => (
                            <ItemCard key={item?._id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-16 text-center text-slate-500 text-lg">
                        No products found matching your criteria.
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-16 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-3 rounded-xl border border-slate-800 bg-slate-900 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`w-11 h-11 rounded-xl text-sm font-semibold transition-colors ${
                                    currentPage === index + 1
                                        ? "bg-cyan-500 text-white"
                                        : "border border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-xl border border-slate-800 bg-slate-900 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllItemsClient;