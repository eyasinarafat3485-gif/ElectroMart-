"use client";

import { useState, useMemo, useEffect } from "react";
import { Item } from "@/types/item";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  X,
  Filter
} from "lucide-react";
import ItemCard from "./ItemCard";
import { motion } from "framer-motion";

interface AllItemsClientProps {
  initialItems: Item[];
}

const AllItemsClient = ({ initialItems = [] }: AllItemsClientProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [sortBy, setSortBy] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  // Responsive items per page: 4 on mobile (< 640px), 8 on desktop
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(8);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Calculate max available price dynamically
  const maxAvailablePrice = useMemo(() => {
    if (!initialItems.length) return 200000;
    const highest = Math.max(...initialItems.map((item) => Number(item?.price) || 0));
    return highest > 0 ? highest : 200000;
  }, [initialItems]);

  useEffect(() => {
    setMaxPrice(maxAvailablePrice);
  }, [maxAvailablePrice]);

  // Unique categories
  const categories = useMemo(() => {
    if (!initialItems.length) return ["All"];
    const allCats = initialItems.map((item) => item?.category).filter(Boolean);
    return ["All", ...Array.from(new Set(allCats))];
  }, [initialItems]);

  // Unique brands
  const brands = useMemo(() => {
    if (!initialItems.length) return ["All"];
    const allBrands = initialItems.map((item) => item?.brand).filter(Boolean);
    return ["All", ...Array.from(new Set(allBrands))];
  }, [initialItems]);

  // Filter & sort logic
  const filteredAndSortedItems = useMemo(() => {
    let result = [...initialItems];

    // Search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item?.title?.toLowerCase().includes(query) ||
          item?.name?.toLowerCase().includes(query) ||
          item?.brand?.toLowerCase().includes(query) ||
          item?.category?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((item) => item?.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== "All") {
      result = result.filter((item) => item?.brand === selectedBrand);
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
  }, [initialItems, searchQuery, selectedCategory, selectedBrand, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedItems.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedBrand, maxPrice, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setMaxPrice(maxAvailablePrice);
    setSortBy("default");
  };

  const isFiltered = 
    searchQuery !== "" || 
    selectedCategory !== "All" || 
    selectedBrand !== "All" || 
    maxPrice < maxAvailablePrice || 
    sortBy !== "default";

  return (
    <div className="bg-[#030712] min-h-screen text-slate-100 pb-16 sm:pb-20 pt-6 sm:pt-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto pt-2 sm:pt-4 pb-6 sm:pb-8"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wider text-cyan-400 uppercase">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Authentic Bangladesh Tech Store
          </span>

          <h1 className="mt-2.5 text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight">
            Explore All <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Gadgets &amp; Hardware</span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Find the latest smartphones, premium laptops, professional studio headphones, and tech accessories with official BD warranty.
          </p>
        </motion.div>

        {/* Category Pill Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none mb-4 sm:mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {cat === "All" ? "⚡ All Products" : cat}
            </button>
          ))}
        </div>

        {/* Search & Filter Control Panel */}
        <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search gadgets, brands, models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 text-white pl-10 pr-9 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-800 focus:outline-none focus:border-cyan-500 text-xs sm:text-sm transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Brand Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-950/80 text-slate-200 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-800 focus:outline-none focus:border-cyan-500 text-xs sm:text-sm cursor-pointer"
              >
                <option value="All">All Brands</option>
                {brands.filter(b => b !== "All").map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-950/80 text-slate-200 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-800 focus:outline-none focus:border-cyan-500 text-xs sm:text-sm cursor-pointer"
              >
                <option value="default">Sort: Default Order</option>
                <option value="price-low">Price: Low to High (৳)</option>
                <option value="price-high">Price: High to Low (৳)</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>

          </div>

          {/* Price Range Slider & Filter Reset Strip */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-slate-400 whitespace-nowrap text-[11px] sm:text-xs">
                Max Price: <strong className="text-cyan-400 font-bold">৳ {maxPrice.toLocaleString("en-IN")}</strong>
              </span>
              <input
                type="range"
                min="1000"
                max={maxAvailablePrice}
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full sm:w-48 accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-slate-400 font-medium text-[11px] sm:text-xs">
                Showing <strong className="text-white">{filteredAndSortedItems.length}</strong> items
              </span>

              {isFiltered && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 text-rose-400 hover:text-rose-300 font-bold text-[11px] sm:text-xs transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" /> Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {currentItems.length > 0 ? (
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {currentItems.map((item) => (
              <ItemCard key={item?._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:p-12 text-center max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg sm:text-xl font-bold text-white">No Matching Gadgets Found</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-5">
              We couldn&apos;t find any gadget matching your selected filters. Try adjusting your search keyword or clearing filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 sm:mt-14 flex items-center justify-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-800 bg-slate-900/80 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Previous Page"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  currentPage === index + 1
                    ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/20"
                    : "border border-slate-800 bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-800 bg-slate-900/80 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Next Page"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllItemsClient;