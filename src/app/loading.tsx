"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import EMLogo from "../../../../public/ElectroMart.png";

export default function LoadingScreen() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#030712] gap-4 px-4 text-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 animate-spin">
          <div className="w-full h-full rounded-full bg-slate-950" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        </div>
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-bold text-white tracking-tight">
          ElectroMart <span className="text-cyan-400">Bangladesh</span>
        </h2>
        <p className="text-xs text-slate-400">
          Fetching genuine gadgets &amp; real-time pricing...
        </p>
      </div>
    </div>
  );
}