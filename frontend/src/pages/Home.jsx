// Import all components needed for homepage
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Facilities from "../components/Facilities";
import Footer from "../components/Footer";

/**
 * Home Page Component
 * Main landing page that displays the resort overview with navbar, hero section, facilities, and footer
 */
function Home() {
  return (
    <>
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Banner Section */}
      <Hero />

      {/* Facilities/Amenities Section */}
      <Facilities />

      {/* Footer Section */}
      <Footer />

    </>
  );
}

export default Home;