import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Journey } from "@/components/Journey";
import { Menu } from "@/components/Menu";
import { Deals } from "@/components/Deals";
import { About } from "@/components/About";
import { Drinks } from "@/components/Drinks";
import { Locations } from "@/components/Locations";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollTop } from "@/components/ScrollTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Highlights />
        <Journey />
        <Menu />
        <Deals />
        <About />
        <Drinks />
        <Locations />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
