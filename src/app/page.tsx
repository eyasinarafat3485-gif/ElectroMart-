import CustomerStories from "./components/Homepage/CustomerStories";
import FAQ from "./components/Homepage/FAQ";
import Features from "./components/Homepage/Features";
import Hero from "./components/Homepage/Hero";
import CategoryGrid from "./components/Homepage/CategoryGrid";
import Newsletter from "./components/Homepage/Newsletter";
import ProductSection from "./components/Homepage/ProductSection";
import ServiceItem from "./components/Homepage/ServiceItem";
import Stats from "./components/Homepage/Stats";

export default function Home() {
  return (
    <div className="bg-[#030712] min-h-screen">
      <Hero />
      <CategoryGrid />
      <ProductSection />
      <Stats />
      <Features />
      <ServiceItem />
      <CustomerStories />
      <FAQ />
      <Newsletter />
    </div>
  );
}
