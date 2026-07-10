const reviews = [
  { 
    name: "Rahim Khan", 
    image: "https://i.ibb.co.com/SDC8BBMN/rahim.avif", 
    location: "Dhaka", 
    text: "Bought my gaming PC from here. Delivery was super fast and product is original.", 
    rating: 5, 
    product: "Custom Gaming PC" 
  },
  { 
    name: "Nadia Islam", 
    image: "https://i.ibb.co.com/bgmjttV1/smiling-young-beautiful-girl-pointing-right-side-with-copy-space-141793-92529.avif", 
    location: "Chittagong", 
    text: "The AirPods Pro 2 I ordered came with full warranty. Best experience.", 
    rating: 5, 
    product: "AirPods Pro 2" 
  },
  { 
    name: "Tamim Ahmed", 
    image: "https://i.ibb.co.com/3mYPMXkp/young-brazilian-man-isolated-on-260nw-2242569333.webp", 
    location: "Sylhet", 
    text: "Got my Samsung OLED TV at best price with free installation.", 
    rating: 5, 
    product: "Samsung OLED TV" 
  },
];

export default function CustomerStories() {
  return (
    <section className="bg-slate-950 py-15 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-indigo-400 text-xs font-semibold tracking-wider uppercase">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">What Our Customers Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex gap-1 text-amber-500 mb-6">
                {'★'.repeat(review.rating)}
              </div>

              <p className="text-slate-300 leading-relaxed text-[15px] mb-8">
                “{review.text}”
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-700 flex-shrink-0">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div>
                  <h4 className="font-semibold text-white">{review.name}</h4>
                  <p className="text-xs text-slate-500">
                    {review.location} • {review.product}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}