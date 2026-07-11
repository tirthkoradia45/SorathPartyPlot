import { useLocation, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function BookingSuccess() {

  const { state } = useLocation();

  const booking = state || {};

  return (

    <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center px-6 py-24">

      <div className="w-full max-w-4xl">

        <div className="flex justify-center">

          <div
            className="w-28 h-28 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">

            <FaCheckCircle
              className="text-green-400 text-6xl"
            />

          </div>

        </div>

        <h1 className="text-center text-5xl font-bold mt-8 text-[#D4AF37]">
         Booking Request Submitted
        </h1>

        <p
          className="
            text-center
            text-gray-300
            mt-6
            text-lg
            max-w-2xl
            mx-auto
          "
        >

          Thank you for choosing
          <span className="text-[#D4AF37] font-semibold">
            {" "}Sorath Resort
          </span>.

          <br /><br />

          Your booking request has been submitted successfully.

          Our team will verify your booking and contact you shortly.

        </p>

        <div
          className="
            mt-10
            bg-[#1B1B1B]
            border
            border-[#D4AF37]/30
            rounded-3xl
            p-8
            shadow-xl
          "
        >

          <h2 className="text-2xl font-bold text-[#D4AF37] mb-5">

            Important Notice

          </h2>

          <ul className="space-y-4 text-gray-300 leading-8">

            <li>
              ✅ Your booking request has been submitted successfully.
            </li>

            <li>
              📞 Please contact <span className="text-[#D4AF37] font-semibold">Sorath Resort</span> within <span className="text-white font-semibold">24 hours</span> to confirm your reservation.
            </li>

            <li>
              ⏳ Bookings that are not confirmed within 24 hours may be cancelled by the resort.
            </li>

            <li>
              💳 Payment will be completed directly at the resort during confirmation or check-in.
            </li>

          </ul>

        </div>

        {/* ================= CONTACT DETAILS ================= */}

        <div
          className="
            mt-8
            bg-[#1B1B1B]
            border
            border-[#D4AF37]/30
            rounded-3xl
            p-8
          "
        >

          <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">

            Contact Sorath Resort

          </h2>

          <div className="space-y-3 text-lg text-gray-300">

            <p>
              📞 +91-9428575445
            </p>

            <p>
              📧 sorathresort1@gmail.com
            </p>

            <p>
              📍 Junagadh, Gujarat, India
            </p>

          </div>

        </div>

        {/* ================= ACTION BUTTONS ================= */}

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">

          <Link
            to="/"
            className="
              px-8
              py-4
              rounded-full
              bg-[#D4AF37]
              text-black
              font-semibold
              hover:scale-105
              transition-all
              duration-300
            "
          >

            Return Home

          </Link>

          <Link
            to="/check-availability"
            className="
              px-8
              py-4
              rounded-full
              border
              border-[#D4AF37]
              text-[#D4AF37]
              font-semibold
              hover:bg-[#D4AF37]
              hover:text-black
              transition-all
              duration-300
            "
          >

            Check Availability

          </Link>

        </div>

      </div>

    </div>

  );

}

export default BookingSuccess;