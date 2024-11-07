import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import HarvestProcess from "@/components/HarvestProcess";
import Hero from "@/components/Hero";
import NewProducts from "@/components/NewProducts";
import Products from "@/components/Products";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <NewProducts />
      <Products />
      <HarvestProcess />
      <ContactForm />
    </div>
  );
}
