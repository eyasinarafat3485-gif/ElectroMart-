// import { Item } from "@/types/item";
// import ItemCard from "../components/others ui/ItemCard";

// const AllItemsPage = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/items`,
//     {
//       cache: "no-store",
//     }
//   );
//   console.log(process.env.NEXT_PUBLIC_SERVER_URL);

//   if (!res.ok) {
//     throw new Error("Failed to fetch items");
//   }

//   const items: Item[] = await res.json();

//   console.log(items);

//   return (
//    <div className="bg-slate-950 min-h-screen">
//   <div className="max-w-7xl mx-auto px-5 py-16">

//     {/* Header */}
//     <div className="text-center max-w-3xl mx-auto">

//       <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium tracking-wide text-cyan-400">
//         Premium Electronics Collection
//       </span>

//       <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-white leading-tight">
//         Explore Our
//         <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//           {" "}
//           Latest Products
//         </span>
//       </h1>

//       <p className="mt-6 text-slate-400 text-lg leading-8">
//         Discover premium laptops, smartphones, gaming accessories and
//         innovative gadgets from trusted brands with competitive prices
//         and exceptional quality.
//       </p>

//     </div>

//     {/* Stats */}

//     <div className="mt-12 flex flex-wrap justify-center gap-4">

//       <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-3">
//         <h3 className="text-2xl font-bold text-white">
//           {items.length}+
//         </h3>

//         <p className="text-sm text-slate-400">
//           Products
//         </p>
//       </div>

//       <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-3">
//         <h3 className="text-2xl font-bold text-white">
//           4.9
//         </h3>

//         <p className="text-sm text-slate-400">
//           Average Rating
//         </p>
//       </div>

//       <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-3">
//         <h3 className="text-2xl font-bold text-white">
//           100%
//         </h3>

//         <p className="text-sm text-slate-400">
//           Authentic Products
//         </p>
//       </div>

//     </div>

//     {/* Grid */}

//     <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

//       {items.map((item) => (
//         <ItemCard
//           key={item._id}
//           item={item}
//         />
//       ))}

//     </div>

//   </div>
// </div>
//   );
// };

// export default AllItemsPage;


import { Item } from "@/types/item";
import AllItemsClient from "../components/others ui/AllItemsClient";
// import AllItemsClient from "./AllItemsClient";

const AllItemsPage = async () => {
  // সার্ভার সাইড ডাটা ফেচিং
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/items`, {
    cache: "no-store",
  });

  console.log(process.env.NEXT_PUBLIC_SERVER_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }

  const items: Item[] = await res.json();
  console.log(items);

  // ক্লায়েন্ট কম্পোনেন্টে ডাটা পাঠিয়ে দেওয়া হচ্ছে
  return <AllItemsClient initialItems={items} />;
};

export default AllItemsPage;