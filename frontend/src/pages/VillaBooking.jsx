// Import React hooks for state and lifecycle management
import { useEffect, useState } from "react";
import villaImage from "../assets/villa.jpg";

// Import axios library for HTTP requests to the backend API
import axios from "axios";


function VillaBooking() {

  // Store the list of villas retrieved from backend
  const [villas, setVillas] = useState([]);

  // Store availability details for the selected villa and date range
  const [availability, setAvailability] = useState(null);

  // Store values from the booking form fields
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    villaId: "",
    villaCount: 1,
    checkInDate: "",
    checkOutDate: "",
  });

  // ===============================
  // FETCH ALL VILLAS
  // ===============================
  useEffect(() => {

    const fetchVillas = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/villas"
        );

        setVillas(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchVillas();

  }, []);

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================
  const handleChange = (e) => {

    const value =
      e.target.type === "number"
        ? Number(e.target.value)
        : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });

};

  // ===============================
  // CHECK AVAILABILITY
  // ===============================
  // Fetch availability from the backend for the selected villa and dates.
  // The backend returns booked and available villa counts.
  const checkAvailability = async () => {

    if (
      !formData.villaId ||
      !formData.checkInDate ||
      !formData.checkOutDate
    ) {
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/bookings/availability?villaId=${formData.villaId}&checkInDate=${formData.checkInDate}&checkOutDate=${formData.checkOutDate}`
      );

      // save availability response in state for UI display and validation
      setAvailability(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ===============================
  // AUTO CHECK AVAILABILITY
  // ===============================
  // Run availability check whenever the selected villa or dates change.
  useEffect(() => {
    checkAvailability();
  }, [
    formData.villaId,
    formData.checkInDate,
    formData.checkOutDate,
  ]);

  // ===============================
  // SUBMIT BOOKING
  // ===============================
  const handleSubmit = async (e) => {

    e.preventDefault();

    // Frontend Validation
    if (
      availability &&
      formData.villaCount >
      availability.availableVillas
    ) {

      alert(
        `Only ${availability.availableVillas} villas available`
      );

      return;

    }

    try {

      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        formData
      );

      alert("Booking Created Successfully!");

      console.log(response.data);

      setFormData({
        customerName: "",
        phone: "",
        email: "",
        villaId: "",
        villaCount: 1,
        checkInDate: "",
        checkOutDate: "",
      });

      setAvailability(null);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Booking Failed"
      );

    }

  };

  return (
  <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#141414] to-[#111111] text-white">

    {/* ── Hero ── */}
    <section
      className="relative h-[65vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.65)), url(${villaImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center px-6">
        <p className="uppercase tracking-[0.35em] text-[#D4AF37] mb-4">
          Sorath Resort &amp; Party Lawns
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-wide drop-shadow-[0_5px_20px_rgba(0,0,0,.8)]">
          Luxury Villa Booking
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-gray-300">
          Reserve premium villas for weddings, family vacations and destination events.
        </p>
      </div>
    </section>

    {/* ── Statistics Strip (Change #19) ── */}
    <div className="max-w-7xl mx-auto px-6 lg:px-10 -mt-10 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: "40", label: "Luxury Villas" },
          { value: "4.9★", label: "Guest Rating" },
          { value: "24/7", label: "Reception" },
          { value: "15+", label: "Years Experience" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl p-8 text-center hover:border-[#D4AF37] transition-all duration-300"
          >
            <p className="font-serif text-3xl font-bold text-[#D4AF37]">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ── Main Content ── */}
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
      <div className="grid lg:grid-cols-3 gap-10">

        {/* ── Left Column: Villa Cards ── */}
        <div className="lg:col-span-2">

          {/* Section header */}
          <div className="mb-10">
            <p className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-3">
              Premium Accommodation
            </p>
            <h2 className="font-serif text-5xl font-bold mb-3">Choose Your Villa</h2>
            {/* Section divider (Change #18) */}
            <div className="w-24 h-1 bg-[#D4AF37] rounded-full mb-6" />
            <p className="text-gray-400 max-w-2xl">
              Experience luxurious accommodation surrounded by nature, designed for
              unforgettable family vacations, weddings, and destination celebrations.
            </p>
          </div>

          {/* Villa Cards (Change #5) */}
          <div className="grid gap-8 mb-10">
            {villas.map((villa) => (
              <div
                key={villa._id}
                className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:border-[#D4AF37] hover:shadow-[0_0_45px_rgba(212,175,55,.22)] cursor-pointer"
              >
                {/* Image with zoom (Changes #7) */}
                <div className="overflow-hidden rounded-t-3xl">
                  <img
                    src={villaImage}
                    alt={villa.name}
                    className="h-72 w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>

                {/* Card body (Change #8) */}
                <div className="p-8">
                  {/* Villa name (Change #9) */}
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">
                    {villa.name}
                  </h2>

                  {/* Description (Change #10) */}
                  <p className="text-gray-400 leading-8 mb-8">{villa.description}</p>

                  {/* Price & Capacity grid (Change #11) */}
                  <div className="grid grid-cols-2 gap-5 mb-8">
                    <div className="bg-[#222222] rounded-2xl border border-[#D4AF37]/10 p-5 hover:border-[#D4AF37] transition-all">
                      <p className="text-gray-400 text-sm">Price</p>
                      <h3 className="text-[#D4AF37] text-2xl font-bold">₹{villa.price}</h3>
                    </div>
                    <div className="bg-[#222222] rounded-2xl border border-[#D4AF37]/10 p-5 hover:border-[#D4AF37] transition-all">
                      <p className="text-gray-400 text-sm">Capacity</p>
                      <h3 className="text-2xl font-bold">{villa.capacity} Guests</h3>
                    </div>
                  </div>

                  {/* Availability (Change #12) */}
                  {availability && formData.villaId === villa._id && (
                    <div className="flex gap-6 mt-4">
                      <p className="text-red-400 font-semibold">
                        Booked: {availability.bookedVillas}
                      </p>
                      <p className="text-green-400 font-semibold">
                        Available: {availability.availableVillas}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Column: Booking Panel (Change #13) ── */}
        <div className="bg-gradient-to-b from-[#1A1A1A] to-[#141414] border border-[#D4AF37]/20 rounded-3xl p-10 sticky top-24 shadow-[0_0_35px_rgba(212,175,55,.08)]">

          {/* Booking heading (Change #14) */}
          <h2 className="font-serif text-4xl font-bold text-[#D4AF37] mb-2">
            Book Your Stay
          </h2>
          <p className="text-gray-400 mb-8">
            Reserve your luxury villa in just a few steps.
          </p>

          {/* Availability summary */}
          {availability && (
            <div className="mb-6 rounded-xl bg-black/40 p-4 border border-[#D4AF37]/20">
              <div className="flex justify-between">
                <span className="text-gray-400">Available</span>
                <span className="text-[#D4AF37] font-semibold">{availability.availableVillas}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-400">Booked</span>
                <span className="text-red-400 font-semibold">{availability.bookedVillas}</span>
              </div>
            </div>
          )}

          {/* Booking Form — inputs styled per Change #15 */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="customerName"
              placeholder="Full Name"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full bg-[#252525] border border-gray-700 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-[#252525] border border-gray-700 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#252525] border border-gray-700 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
            />

            <select
              name="villaId"
              value={formData.villaId}
              onChange={handleChange}
              required
              className="w-full bg-[#252525] border border-gray-700 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
            >
              <option value="" disabled>
                {villas.length === 0 ? "Loading villas…" : "Select Villa"}
              </option>
              {villas.map((villa) => (
                <option key={villa._id} value={villa._id}>
                  {villa.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="villaCount"
              placeholder="Number of Villas"
              value={formData.villaCount}
              onChange={handleChange}
              min="1"
              required
              className="w-full bg-[#252525] border border-gray-700 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
            />

            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
              className="w-full bg-[#252525] border border-gray-700 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
            />

            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
              className="w-full bg-[#252525] border border-gray-700 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
            />

            {/* Book Button (Change #16) */}
            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-black font-bold text-lg py-4 rounded-xl transition-all duration-300 hover:bg-[#c49b2c] hover:shadow-[0_0_25px_rgba(212,175,55,.35)] hover:scale-[1.02] active:scale-95"
            >
              BOOK NOW
            </button>
          </form>

          {/* Booking Summary (Change #17) */}
          <hr className="my-8 border-gray-700" />
          <div className="space-y-4 text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-500">Check-in</span>
              <span>{formData.checkInDate || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Check-out</span>
              <span>{formData.checkOutDate || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Villas</span>
              <span>{formData.villaCount || "—"}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);


}
export default VillaBooking;