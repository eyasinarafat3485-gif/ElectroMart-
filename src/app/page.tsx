import CustomerStories from "./components/Homepage/CustomerStories";
import FAQ from "./components/Homepage/FAQ";
import Features from "./components/Homepage/Features";
import Hero from "./components/Homepage/Hero";
import Newsletter from "./components/Homepage/Newsletter";
import ProductSection from "./components/Homepage/ProductSection";
import ServiceItem from "./components/Homepage/ServiceItem";
import Stats from "./components/Homepage/Stats";

export default function Home() {
  return (
    <div>
      <Hero />
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
