"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight, BadgeDollarSign } from "lucide-react";

import { Item } from "@/types/item";

interface Props {
    item: Item;
}

export default function ItemCard({ item }: Props) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            whileHover={{
                y: -10,
            }}
            transition={{
                duration: .5,
            }}
            viewport={{
                once: true,
            }}
            className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl transition-all duration-300 hover:border-cyan-500/40"
        >
            <div className="relative overflow-hidden">
                <img
                    src={item?.image}
                    alt={item.name || "Product"}
                    className="w-full h-60 object-cover rounded-xl"
                    onError={() => console.log("Image failed:", item.image)}
                />
                <div className="absolute right-3 top-3 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                    {item.category}
                </div>
            </div>

            <div className="space-y-5 p-6">

                <div>

                    <h2 className="line-clamp-1 text-xl font-bold text-white">
                        {item.name}
                    </h2>

                    <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-400">
                        {item.description}
                    </p>

                </div>

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <BadgeDollarSign
                            className="text-cyan-400"
                            size={18}
                        />

                        <span className="text-lg font-bold text-cyan-400">
                            ${item.price}
                        </span>

                    </div>

                    <div className="flex items-center gap-1">

                        <Star
                            size={18}
                            className="fill-yellow-400 text-yellow-400"
                        />

                        <span className="font-semibold text-white">
                            {item.rating}
                        </span>

                    </div>

                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-4">

                    <div>

                        <p className="text-xs text-slate-500">
                            Brand
                        </p>

                        <p className="font-semibold text-white">
                            {item.brand}
                        </p>

                    </div>

                    <Link
                        href={`/all-items/${item._id}`}
                        className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-cyan-600"
                    >
                        View Details

                        <ArrowRight size={18} />

                    </Link>

                </div>

            </div>
        </motion.div>
    );
}