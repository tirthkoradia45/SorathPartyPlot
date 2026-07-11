
import { useEffect, useState } from "react";
import villaImage from "../assets/villa.jpg";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { buildApiUrl } from "../config/api";

function VillaBooking() {
  const navigate = useNavigate();
  const [villas, setVillas] = useState([]);
  const [availability, setAvailability] = useState(null);s
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    villaId: "",
    villaCount: 1,
    checkInDate: "",
    checkOutDate: "",
  });
// FETCH ALL VILLAS

  useEffect(() => {

    const fetchVillas = async () => {

      try {

        const response = await axios.get(buildApiUrl("/api/villas"));

        setVillas(response.data);

      } catch (error) {

        console.error(error);
        toast.error("Unable to load villas. Please try again later.");

      }

    };

    fetchVillas();

  }, []);

  // HANDLE INPUT CHANGE
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
// CHECK AVAILABILITY
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
        buildApiUrl(`/api/bookings/availability?villaId=${formData.villaId}&checkInDate=${formData.checkInDate}&checkOutDate=${formData.checkOutDate}`)
      );
      setAvailability(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to check availability right now.");
    }
  };
// AUTO CHECK AVAILABILITY

  useEffect(() => {
    checkAvailability();
  }, [
    formData.villaId,
    formData.checkInDate,
    formData.checkOutDate,
  ]);
// SUBMIT BOOKING

const handleSubmit = async (e) => {

  e.preventDefault();

  if (!formData.customerName.trim()) {
    toast.error("Please enter your full name.");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(formData.phone)) {
    toast.error("Phone number must contain exactly 10 digits.");
    return;
  }
  const email = formData.email.trim();
  const emailRegex =/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address.");
    return;
}
  if (!formData.villaId) {
    toast.error("Please select a villa.");
    return;
  }

  if (formData.villaCount < 1) {
    toast.error("Please select at least one villa.");
    return;
  }

  if (!formData.checkInDate) {
    toast.error("Please select a check-in date.");
    return;
  }

  if (!formData.checkOutDate) {
    toast.error("Please select a check-out date.");
    return;
  }

  if (new Date(formData.checkOutDate) <= new Date(formData.checkInDate)) {
    toast.error("Check-out date must be after the check-in date.");
    return;
  }

  // Frontend Validation
  if (
    availability &&
    formData.villaCount > availability.availableVillas
  ) {

    toast.error(
      `Only ${availability.availableVillas} villas available`
    );

    return;

  }

  try {

    const payload = {
      customerName: formData.customerName.trim(),
      phone: formData.phone.trim(),
      email,
      villaId: formData.villaId,
      villaCount: formData.villaCount,
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
    };

    const response = await axios.post(
      buildApiUrl("/api/bookings"),
      payload
    );

    console.log(response.data);

    toast.success("Villa booking created successfully.");

    // Redirect to Booking Success Page
    navigate("/booking-success", {

      state: {

        ...(response.data.booking || {}),

        customerName: formData.customerName,

        phone: formData.phone,

        email: formData.email,

        checkInDate: formData.checkInDate,

        checkOutDate: formData.checkOutDate,

        status: "Pending",

      },

    });

    // Reset Form
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

  if (!error.response) {

    toast.error(
      "Unable to connect to the server."
    );

  }

  else {

    toast.error(

      error.response.data.message ||

      "Booking failed."

    );

  }

}

};

  return (
  <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#141414] to-[#111111] text-white">
    <Toaster position="top-right" toastOptions={{duration: 3000, style: {background: "#1A1A1A", color: "#fff", border: "1px solid #D4AF37"}}} />

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

    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
      <div className="grid lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2">

          <div className="mb-10">
            <p className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-3">
              Premium Accommodation
            </p>
            <h2 className="font-serif text-5xl font-bold mb-3">Choose Your Villa</h2>
            <div className="w-24 h-1 bg-[#D4AF37] rounded-full mb-6" />
            <p className="text-gray-400 max-w-2xl">
              Experience luxurious accommodation surrounded by nature, designed for
              unforgettable family vacations, weddings, and destination celebrations.
            </p>
          </div>

          <div className="grid gap-8 mb-10">
            {villas.map((villa) => (
              <div
                key={villa._id}
                className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:border-[#D4AF37] hover:shadow-[0_0_45px_rgba(212,175,55,.22)] cursor-pointer"
              >

                <div className="overflow-hidden rounded-t-3xl">
                  <img
                    src={villaImage}
                    alt={villa.name}
                    className="h-72 w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">
                    {villa.name}
                  </h2>
                  <p className="text-gray-400 leading-8 mb-8">{villa.description}</p>
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
        <div className="bg-gradient-to-b from-[#1A1A1A] to-[#141414] border border-[#D4AF37]/20 rounded-3xl p-10 sticky top-24 shadow-[0_0_35px_rgba(212,175,55,.08)]">

          <h2 className="font-serif text-4xl font-bold text-[#D4AF37] mb-2">
            Book Your Stay
          </h2>
          <p className="text-gray-400 mb-8">
            Reserve your luxury villa in just a few steps.
          </p>
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
              required
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

            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-black font-bold text-lg py-4 rounded-xl transition-all duration-300 hover:bg-[#c49b2c] hover:shadow-[0_0_25px_rgba(212,175,55,.35)] hover:scale-[1.02] active:scale-95"
            >
              BOOK NOW
            </button>
          </form>
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