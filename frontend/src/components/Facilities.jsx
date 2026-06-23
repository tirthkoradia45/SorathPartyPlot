/**
 * Facilities Component
 * Displays all available amenities and facilities at the resort
 */
function Facilities() {
  return (
    <section className="py-16">

      {/* Section Title */}
      <h2 className="text-4xl text-center font-bold mb-10">
        Our Facilities
      </h2>

      {/* Grid layout for facility cards (3 columns on medium+ screens) */}
      <div className="grid md:grid-cols-3 gap-8 text-center">

        {/* Luxury Villas Card */}
        <div className="p-6 shadow-lg rounded-lg">
          🏡
          <h3 className="text-xl font-bold">
            Luxury Villas
          </h3>
        </div>

        {/* Party Plot Card */}
        <div className="p-6 shadow-lg rounded-lg">
          🎉
          <h3 className="text-xl font-bold">
            Party Plot
          </h3>
        </div>

        {/* Swimming Pool Card */}
        <div className="p-6 shadow-lg rounded-lg">
          🏊
          <h3 className="text-xl font-bold">
            Swimming Pool
          </h3>
        </div>

        {/* Restaurant Card */}
        <div className="p-6 shadow-lg rounded-lg">
          🍽
          <h3 className="text-xl font-bold">
            Restaurant
          </h3>
        </div>

        {/* Parking Card */}
        <div className="p-6 shadow-lg rounded-lg">
          🚗
          <h3 className="text-xl font-bold">
            Parking
          </h3>
        </div>

        {/* Free WiFi Card */}
        <div className="p-6 shadow-lg rounded-lg">
          📶
          <h3 className="text-xl font-bold">
            Free WiFi
          </h3>
        </div>

      </div>

    </section>
  );
}

export default Facilities;