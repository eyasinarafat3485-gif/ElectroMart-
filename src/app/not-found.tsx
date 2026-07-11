"use client";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-950  relative overflow-hidden pt-30 pb-15 px-4">
      
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center max-w-lg relative z-10">
        
        <div className="relative inline-block ">
          <p className="text-7xl md:text-9xl font-black text-indigo-500/10 tracking-tighter select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
          </div>
        </div>

        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Oops! Page Not Found
        </h1>

        <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-400">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or the URL might be incorrect.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/" 
            className="w-full sm:w-auto rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 flex items-center justify-center gap-2 group border border-indigo-500/20"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Go Back Home</span>
          </Link>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2 text-slate-600">
            <ShoppingBag className="h-5 w-5 text-indigo-500/50" />
            <span className="font-bold tracking-widest text-xs uppercase">
              Electro<span className="text-indigo-500/50">Mart</span>
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
}