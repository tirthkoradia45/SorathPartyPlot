// Import all homepage components

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Facilities from "../components/Facilities";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import WhyChoose from "../components/WhyChoose";
import Contact from "../components/Contact"
/**
 * Home Page Component
 */

function Home() {
  return (
    <>
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Facilities Section */}
      <Facilities />

      {/* Gallery Section */}
      <Gallery />

      <WhyChoose />

      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;