/**
 * Hero Component
 * Displays the large welcome banner with call-to-action buttons
 */
function Hero() {
  return (
    // Hero section: Full screen height with light green background
    <section className="h-screen bg-green-100 flex items-center justify-center">

      <div className="text-center">

        {/* Main Headline */}
        <h1 className="text-6xl font-bold mb-6">
          Welcome to Sorath Resort
        </h1>

        {/* Tagline highlighting resort services */}
        <p className="text-2xl mb-6">
          Luxury Villas • Party Plot • Events
        </p>

        {/* Call-to-action Buttons */}
        <div className="space-x-4">

          {/* Button to navigate to villa booking */}
          <button className="bg-green-700 text-white px-6 py-3 rounded-lg">
            Book Villa
          </button>

          {/* Button to navigate to party plot booking */}
          <button className="bg-black text-white px-6 py-3 rounded-lg">
            Book Party Plot
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;