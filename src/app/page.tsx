import CustomerStories from "./components/Homepage/CustomerStories";
import Features from "./components/Homepage/Features";
import Hero from "./components/Homepage/Hero";
import Newsletter from "./components/Homepage/Newsletter";
import ProductSection from "./components/Homepage/ProductSection";
import Stats from "./components/Homepage/Stats";
import TechInsights from "./components/Homepage/TechInsights";
import TrustedBrands from "./components/Homepage/TrustedBrands";


export default function Home() {
  return (
    <div>
      <Hero />
      <TrustedBrands />
      <ProductSection />
      <Stats />
      <Features />
      <CustomerStories />
      {/* <TechInsights /> */}
      <Newsletter />
    </div>
  );
}
