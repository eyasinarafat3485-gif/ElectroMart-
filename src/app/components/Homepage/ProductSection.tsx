
import ItemCard from "../others ui/ItemCard";

interface Product {
  _id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  isNew?: boolean;
}

export default async function ProductSection() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products?limit=4`,
    {
      cache: "no-store",
    }
  );

  const products: Product[] = await res.json();

  return (
    <section className="py-15 bg-slate-950 px-4 md:px-10 ">
      <div className="max-w-7xl mx-auto ">
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-indigo-400 uppercase text-sm">Top Picks</p>
            <h2 className="text-4xl font-bold text-white">
              Trending Collections
            </h2>
          </div>

          <a href="/all-items" className="text-indigo-400">
            View All Products →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ItemCard
              key={product._id}
              item={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}