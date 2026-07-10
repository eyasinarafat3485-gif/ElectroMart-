import CustomerStories from "./components/Homepage/CustomerStories";
import Features from "./components/Homepage/Features";
import Hero from "./components/Homepage/Hero";
import ProductSection from "./components/Homepage/ProductSection";


export default function Home() {
  return (
   <div>
    <Hero />
    <ProductSection />

    <CustomerStories />
    <Features />
   </div>
  );
}
