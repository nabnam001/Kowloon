import { Navbar } from "@/components/Navbar";
import { Intro } from "@/components/Intro";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Accolades } from "@/components/Accolades";
import { Philosophy } from "@/components/Philosophy";
import { Journey } from "@/components/Journey";
import { Menu } from "@/components/Menu";
import { Deals } from "@/components/Deals";
import { DishMarquee } from "@/components/DishMarquee";
import { KineticRibbon } from "@/components/KineticRibbon";
import { About } from "@/components/About";
import { Locations } from "@/components/Locations";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollTop } from "@/components/ScrollTop";

export default function Home() {
  return (
    <>
      <Intro />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Accolades />
        <Highlights />
        <Philosophy />
        <Journey />
        <Menu />
        <Deals />
        <DishMarquee />
        <About />
        <KineticRibbon />
        <Locations />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
