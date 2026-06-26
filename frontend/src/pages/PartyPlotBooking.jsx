import { useState } from "react"
import axios from "axios";

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

  <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10">

    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">


      <div className="text-center mb-8">

        <h1 className="text-5xl font-bold text-green-700 mb-2">

          💍 Wedding Booking

        </h1>

        <p className="text-lg text-gray-600">

          Reserve the Party Plot for your Wedding at Sorath Resort

        </p>

      </div>


      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >


        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 mb-8">

          <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">

            👤 Customer Details

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Full Name */}

            <input

              type="text"

              name="customerName"

              placeholder="Full Name"

              value={formData.customerName}

              onChange={handleChange}

              required

              className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"

            />

            {/* Phone */}

            <input

              type="text"

              name="phone"

              placeholder="Phone Number"

              value={formData.phone}

              onChange={handleChange}

              required

              className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"

            />

            {/* Email */}

            <input

              type="email"

              name="email"

              placeholder="Email Address"

              value={formData.email}

              onChange={handleChange}

              required

              className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition md:col-span-2"

            />

          </div>

        </div>


        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 mb-8">

          <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">

            📅 Wedding Dates

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Start Date */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">

                Start Date

              </label>

              <input

                type="date"

                min={new Date().toISOString().split("T")[0]}

                name="startDate"

                value={formData.startDate}

                onChange={handleChange}

                required

                className="border-2 border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"

              />

            </div>

            {/* End Date */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">

                End Date

              </label>

              <input

                type="date"
                
                min={new Date().toISOString().split("T")[0]}

                name="endDate"

                value={formData.endDate}

                onChange={handleChange}

                required

                className="border-2 border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"

              />

            </div>

          </div>

        </div>
        {/* ==========================================
            WEDDING DURATION
        ========================================== */}

        {weddingDays > 0 && (

          <div className="bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-400 rounded-2xl p-6 shadow-md">

            <h3 className="text-lg font-bold text-blue-700 mb-2">

              📆 Wedding Duration

            </h3>

            <p className="text-3xl font-bold text-blue-800">

              {weddingDays} {weddingDays === 1 ? "Day" : "Days"}

            </p>

          </div>

        )}
        {/* ==========================================
    WEDDING PACKAGE
========================================== */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">

            🎉 Wedding Package

          </h2>

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-2xl p-8 shadow-lg">

            <div className="space-y-3">

              <p className="text-lg font-semibold text-green-800">

                ✨ Fully Air Conditioned Banquet Hall

              </p>

              <p className="text-lg font-semibold text-green-800">

                👥 Capacity: 1000+ Guests

              </p>

              <p className="text-lg font-semibold text-green-800">

                🏠 40 Luxury Villas Included

              </p>

            </div>

            <p className="text-gray-700 mt-4 italic">

              Every Wedding Booking automatically includes the entire Party Plot and all 40 Villas.

            </p>

          </div>

        </div>

{/* ==========================================
    OPTIONAL SERVICES
========================================== */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">

            ⭐ Optional Services

          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-300 p-6 space-y-6">

            {/* Swimming Pool */}

            <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-purple-200 cursor-pointer hover:border-purple-400 hover:shadow-md transition">

              <div>

                <h3 className="font-bold text-lg text-gray-800">

                  🏊 Swimming Pool

                </h3>

                <p className="text-gray-600">

                  Add Swimming Pool Access

                </p>

              </div>

              <div className="flex items-center gap-4">

                <span className="font-bold text-lg text-green-700">

                  +₹25,000

                </span>

                <input

                  type="checkbox"

                  name="swimmingPool"

                  checked={formData.swimmingPool}

                  onChange={handleChange}

                  className="w-6 h-6 cursor-pointer"

                />

              </div>

            </label>

            {/* Generator */}

            <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-purple-200 cursor-pointer hover:border-purple-400 hover:shadow-md transition">

              <div>

                <h3 className="font-bold text-lg text-gray-800">

                  🔌 Generator Backup

                </h3>

                <p className="text-gray-600">

                  Backup during power failure

                </p>

              </div>

              <div className="flex items-center gap-4">

                <span className="font-bold text-lg text-green-700">

                  +₹15,000

                </span>

                <input

                  type="checkbox"

                  name="generator"

                  checked={formData.generator}

                  onChange={handleChange}

                  className="w-6 h-6 cursor-pointer"

                />

              </div>

            </label>

          </div>

        </div>

        {/* ==========================================
            ESTIMATED AMOUNT
        ========================================== */}

        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 mb-8">

          <p className="text-center text-gray-600 mb-2">Estimated Amount:</p>

          <p className="text-center text-4xl font-bold text-green-700">

            ₹ {calculateEstimate().toLocaleString('en-IN')}

          </p>

        </div>

        {/* ==========================================
            SUBMIT BUTTON
        ========================================== */}

        <div className="text-center">

          <button

            type="submit"

            disabled={loading || weddingDays === 0}

            className={`px-12 py-4 rounded-lg text-lg font-bold transition duration-300 shadow-lg ${
              loading || weddingDays === 0
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:shadow-xl transform hover:scale-105"
            }`}

          >

            {loading ? "🔄 Processing..." : "💍 Book Wedding"}

          </button>

          <p className="text-gray-500 text-sm mt-4">

            ✨ You'll receive a confirmation email shortly

          </p>

        </div>

      </form>

    </div>

  </div>

);

}

export default PartyPlotBooking;