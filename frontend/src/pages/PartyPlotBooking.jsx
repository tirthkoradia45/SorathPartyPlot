import { useState } from "react"
import axios from "axios";
import lawnImage from "../assets/lawn.jpg";
import banquetImage from "../assets/hall.jpg";
import poolImage from "../assets/pool.jpg";


function PartyPlotBooking() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({

    customerName: "",

    phone: "",

    email: "",

    startDate: "",

    endDate: "",

    swimmingPool: false,

    generator: false,

  });
  const [weddingDays, setWeddingDays] = useState(0);
  const handleChange = (e) => {

    const {

      name,

      value,

      type,

      checked,

    } = e.target;

    // Updated form values
    const updatedData = {

      ...formData,

      [name]:

        type === "checkbox"

          ? checked

          : value,

    };

    setFormData(updatedData);


    if (

      updatedData.startDate &&

      updatedData.endDate

    ) {

      const start = new Date(updatedData.startDate);

      const end = new Date(updatedData.endDate);

      const difference = end - start;

      const days =

        difference /

        (1000 * 60 * 60 * 24) + 1;

      if (days > 0) {

        setWeddingDays(days);

      }

      else {

        setWeddingDays(0);

      }

    }

  };


  const calculateEstimate = () => {

    let amount = 0;

    // Party Plot Cost
    amount += weddingDays * 200000;

    // Swimming Pool
    if (formData.swimmingPool) {

      amount += 25000;

    }

    // Generator
    if (formData.generator) {

      amount += 15000;

    }

    return amount;

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    if (

      !formData.customerName ||

      !formData.phone ||

      !formData.email ||

      !formData.startDate ||

      !formData.endDate

    ) {

      alert(

        "Please fill all required fields."

      );

      return;

    }


    if (

      new Date(formData.endDate) <

      new Date(formData.startDate)

    ) {

      alert(

        "End Date cannot be before Start Date."

      );

      return;

    }

    setLoading(true);

    try {

      const response = await axios.post(

        "http://localhost:5000/api/wedding-bookings",

        {

          ...formData,

          estimatedAmount:

            calculateEstimate(),

        }

      );

      alert(

        "✅ Wedding Booking Created Successfully!"

      );

      console.log(response.data);

      // Reset Form

      setFormData({

        customerName: "",

        phone: "",

        email: "",

        startDate: "",

        endDate: "",

        swimmingPool: false,

        generator: false,

      });

      setWeddingDays(0);

    }

    catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Booking Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

return (
  <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#141414] to-[#111111] text-white py-16">

    <div className="max-w-6xl mx-auto bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl shadow-[0_0_40px_rgba(212,175,55,.08)] overflow-hidden">

      {/* ── Change #3: Hero Header ── */}
      <div
        className="relative h-[45vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.65)), url(${lawnImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center px-6">
          <p className="uppercase tracking-[0.35em] text-[#D4AF37] mb-4">
            Sorath Resort &amp; Party Lawns
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4">
            Wedding Booking
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Reserve our grand party lawn for unforgettable weddings and celebrations.
          </p>
        </div>
      </div>

      {/* ── Change #14: Statistics Strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-10 py-8 border-b border-[#D4AF37]/10">
        {[
          { value: "15,000", label: "sq.ft Lawn" },
          { value: "2000+", label: "Guests" },
          { value: "200+", label: "Parking Spots" },
          { value: "40", label: "Villas Included" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#222222] rounded-2xl border border-[#D4AF37]/20 text-center p-8 hover:border-[#D4AF37] transition-all duration-300"
          >
            <p className="font-serif text-3xl font-bold text-[#D4AF37]">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Change #15: Venue Highlights ── */}
      <div className="px-10 py-10 border-b border-[#D4AF37]/10">
        <p className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-3">Our Venues</p>
        <h2 className="font-serif text-4xl font-bold mb-2">Venue Highlights</h2>
        <div className="w-24 h-1 bg-[#D4AF37] rounded-full mb-8" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              img: lawnImage,
              icon: "🌿",
              title: "Party Lawn",
              desc: "Sprawling open-air lawn spanning 15,000 sq.ft, perfect for grand ceremonies under the stars.",
            },
            {
              img: banquetImage,
              icon: "🏛",
              title: "Banquet Hall",
              desc: "Fully air-conditioned hall accommodating 1,000+ guests with state-of-the-art lighting and sound.",
            },
            {
              img: poolImage,
              icon: "🏊",
              title: "Swimming Pool",
              desc: "Stunning pool area available as an optional add-on for pool parties and pre-wedding festivities.",
            },
          ].map((venue) => (
            <div
              key={venue.title}
              className="bg-[#222222] border border-[#D4AF37]/20 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,.15)] transition-all duration-300 group"
            >
              <div className="overflow-hidden h-44">
                <img
                  src={venue.img}
                  alt={venue.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  {venue.icon} {venue.title}
                </h3>
                <p className="text-gray-400 text-sm leading-6">{venue.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Change #4: Form wrapper ── */}
      <div className="p-10">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ── Change #5: Customer Details ── */}
          <div className="bg-[#222222] border border-[#D4AF37]/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 flex items-center gap-2">
              👤 Customer Details
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                name="customerName"
                placeholder="Full Name"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="w-full bg-[#2B2B2B] border border-gray-700 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-[#2B2B2B] border border-gray-700 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#2B2B2B] border border-gray-700 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all md:col-span-2"
              />
            </div>
          </div>

          {/* ── Change #6: Wedding Dates ── */}
          <div className="bg-[#222222] border border-[#D4AF37]/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 flex items-center gap-2">
              📅 Wedding Dates
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 font-semibold text-gray-400">Start Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#2B2B2B] border border-gray-700 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-400">End Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#2B2B2B] border border-gray-700 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* ── Change #8: Wedding Duration ── */}
          {weddingDays > 0 && (
            <div className="bg-[#222222] border border-[#D4AF37]/20 rounded-3xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-[#D4AF37] mb-2">📆 Wedding Duration</h3>
              <p className="text-5xl font-bold text-white">
                {weddingDays} {weddingDays === 1 ? "Day" : "Days"}
              </p>
            </div>
          )}

          {/* ── Change #9: Wedding Package ── */}
          <div>
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 flex items-center gap-2">
              🎉 Wedding Package
            </h2>
            <div className="bg-[#222222] border border-[#D4AF37]/20 rounded-3xl p-8 shadow-lg">
              <div className="space-y-3">
                <p className="text-lg font-semibold text-white">✨ Fully Air Conditioned Banquet Hall</p>
                <p className="text-lg font-semibold text-white">👥 Capacity: 1000+ Guests</p>
                <p className="text-lg font-semibold text-white">🏠 40 Luxury Villas Included</p>
              </div>
              <p className="text-gray-400 mt-4 italic">
                Every Wedding Booking automatically includes the entire Party Plot and all 40 Villas.
              </p>
            </div>
          </div>

          {/* ── Change #10: Optional Services ── */}
          <div>
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 flex items-center gap-2">
              ⭐ Optional Services
            </h2>
            <div className="bg-[#222222] border border-[#D4AF37]/20 rounded-3xl p-6 space-y-4">
              {/* Swimming Pool */}
              <label className="flex items-center justify-between p-4 bg-[#2B2B2B] rounded-xl border border-[#D4AF37]/10 cursor-pointer hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,.12)] transition-all">
                <div>
                  <h3 className="font-bold text-lg text-white">🏊 Swimming Pool</h3>
                  <p className="text-gray-400">Add Swimming Pool Access</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg text-[#D4AF37]">+₹25,000</span>
                  <input
                    type="checkbox"
                    name="swimmingPool"
                    checked={formData.swimmingPool}
                    onChange={handleChange}
                    className="w-6 h-6 cursor-pointer accent-[#D4AF37]"
                  />
                </div>
              </label>

              {/* Generator */}
              <label className="flex items-center justify-between p-4 bg-[#2B2B2B] rounded-xl border border-[#D4AF37]/10 cursor-pointer hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,.12)] transition-all">
                <div>
                  <h3 className="font-bold text-lg text-white">🔌 Generator Backup</h3>
                  <p className="text-gray-400">Backup during power failure</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg text-[#D4AF37]">+₹15,000</span>
                  <input
                    type="checkbox"
                    name="generator"
                    checked={formData.generator}
                    onChange={handleChange}
                    className="w-6 h-6 cursor-pointer accent-[#D4AF37]"
                  />
                </div>
              </label>
            </div>
          </div>

          {/* ── Changes #11: Estimated Amount ── */}
          <div className="bg-[#222222] border border-[#D4AF37] rounded-3xl p-8 text-center">
            <p className="text-gray-400 mb-2 uppercase tracking-widest text-sm">Estimated Amount</p>
            <p className="text-5xl font-bold text-[#D4AF37]">
              ₹ {calculateEstimate().toLocaleString("en-IN")}
            </p>
          </div>

          {/* ── Change #12: Submit Button ── */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading || weddingDays === 0}
              className={`w-full py-5 rounded-xl text-lg font-bold transition-all duration-300 ${
                loading || weddingDays === 0
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-[#D4AF37] text-black hover:bg-[#c49b2c] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(212,175,55,.35)] active:scale-95"
              }`}
            >
              {loading ? "Processing..." : "BOOK WEDDING"}
            </button>

            {/* ── Change #13: Confirmation text ── */}
            <p className="text-gray-400 text-sm mt-4">
              ✨ You'll receive a confirmation email shortly
            </p>
          </div>

        </form>
      </div>

    </div>
  </div>
);

}

export default PartyPlotBooking;