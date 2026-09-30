import ItemCard from "../others ui/ItemCard";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  title?: string;
  category: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  brand?: string;
  description?: string;
  shortDescription?: string;
}

export default async function ProductSection() {
  let products: Product[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/items?limit=4`,
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      const data = await res.json();
      products = Array.isArray(data) ? data.slice(0, 4) : [];
    }
  } catch (err) {
    console.error("Failed to load trending products:", err);
  }

  return (
    <section className="py-10 sm:py-16 bg-[#030712] px-4 md:px-10 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-rose-400 text-[10px] sm:text-xs font-bold tracking-wider uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 bg-rose-500/10 rounded-full border border-rose-500/20">
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Flash Tech Deals
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Updated Today</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-white mt-2">
              Trending Gadget Collections
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Authentic high-performance devices with official brand replacement warranty &amp; nationwide shipping.
            </p>
          </div>

          <Link 
            href="/all-items" 
            className="group inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors w-fit"
          >
            <span>Explore All 500+ Items</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ItemCard
                key={product._id}
                item={{
                  ...product,
                  title: product.title || product.name,
                  name: product.name || product.title || "",
                  brand: product.brand || "ElectroMart",
                  description: product.description || product.shortDescription || "",
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:p-12 text-center">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 mx-auto mb-2.5" />
            <h3 className="text-base sm:text-lg font-bold text-white">Discovering Trending Gadgets</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1 mb-5">
              Browse our complete catalog to find top-tier smartphones, laptops, and studio audio equipment.
            </p>
            <Link
              href="/all-items"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg"
            >
              Browse Full Catalog
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}