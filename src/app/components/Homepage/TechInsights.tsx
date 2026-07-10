// components/home/TechInsights.tsx
const insights = [
  {
    title: "Best Smartphones Under ৳50,000 in 2026",
    category: "Buying Guide",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    readTime: "8 min",
    link: "/blog/best-smartphones-2026"
  },
  {
    title: "Why OLED TVs Are Worth Buying This Year",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1593784991095-d9e0c5d8e0b0",
    readTime: "12 min",
    link: "/blog/oled-tv-guide"
  },
  {
    title: "Top 5 Wireless Earbuds with Best Battery Life",
    category: "Reviews",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    readTime: "6 min",
    link: "/blog/best-earbuds-2026"
  },
];

export default function TechInsights() {
  return (
    <section className="bg-slate-950 py-20 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-indigo-400 text-xs font-semibold tracking-wider uppercase">KNOWLEDGE HUB</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Tech Insights</h2>
          </div>
          <a 
            href="/blog" 
            className="text-indigo-400 hover:text-indigo-300 font-medium mt-4 md:mt-0 inline-flex items-center gap-2"
          >
            View All Articles →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((item, i) => (
            <div 
              key={i} 
              className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/30 transition-all cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-4 py-1.5 rounded-full">
                  {item.category}
                </div>
              </div>

              <div className="p-7">
                <h3 className="font-bold text-white text-[17px] leading-tight line-clamp-2 group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-between mt-6 text-sm">
                  <span className="text-slate-500">{item.readTime} read</span>
                  <span className="text-indigo-400 group-hover:underline">Read Article →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}