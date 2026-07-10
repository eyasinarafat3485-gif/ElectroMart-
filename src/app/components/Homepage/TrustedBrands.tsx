// components/home/TrustedBrands.tsx
const brands = [
  { name: "Apple", logo: "https://i.ibb.co.com/Jw4VfxYn/images-5.png" },
  { name: "Samsung", logo: "https://i.ibb.co.com/RTz2Y1wD/2-23376-samsung-logo-png-icon-samsung-logo-png.png" },
  { name: "Sony", logo: "https://i.ibb.co.com/DDVhLZpr/791ef5e3f34d2e45d15ea6c5c23881ae.jpg" },
  { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" },
  { name: "DJI", logo: "https://i.ibb.co.com/6cSRYZ5F/images-4.png" },
  { name: "Bose", logo: "https://i.ibb.co.com/FLXgM7X3/Bose-Logo-Gray.png" },
];

export default function TrustedBrands() {
  return (
    <section className="bg-slate-950 py-20 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-indigo-400 text-xs font-semibold tracking-wider uppercase">PREMIUM PARTNERS</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">Brands You Can Trust</h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-75 hover:opacity-100 transition-all duration-500">
          {brands.map((brand, i) => (
            <div 
              key={i} 
              className="flex justify-center items-center h-20 grayscale hover:grayscale-0 transition-all"
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="h-10 md:h-12 object-contain" 
              />
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-12">
          Official authorized reseller of all premium electronics brands
        </p>
      </div>
    </section>
  );
}