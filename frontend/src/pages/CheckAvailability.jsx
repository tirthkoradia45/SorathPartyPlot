import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { buildApiUrl } from "../config/api";

import heroImage from "../assets/hero.jpg";

function CheckAvailability() {
const navigate = useNavigate();
const [bookingType, setBookingType] = useState("villa");
const [selectedDate, setSelectedDate] = useState("");
const [loading, setLoading] = useState(false);
const [result, setResult] = useState(null);
const checkAvailability = async () => {

    if (!selectedDate) {

        toast("Please select a date.");

        return;

    }

    try {

        setLoading(true);

        setResult(null);

        const response = await axios.get(
            buildApiUrl("/api/check-availability"),
            {
                params: {
                    type: bookingType,
                    date: selectedDate,
                },
            }
        );

        setResult(response.data);

    } catch (error) {

        console.error(error);

        if (!error.response) {
            toast.error("Unable to connect to the server. Please try again later.");
        } else {
            toast.error(
                error.response?.data?.message ||
                "Unable to check availability."
            );
        }

    } finally {

        setLoading(false);

    }

};

    return (

        <div className="min-h-screen bg-[#111111] text-white">
            <Toaster position="top-right" toastOptions={{duration: 3000, style: {background: "#1A1A1A", color: "#fff", border: "1px solid #D4AF37"}}} />

            <section
                className="relative h-[55vh] flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,.65),rgba(0,0,0,.65)),url(${heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >

                <div className="text-center px-6">

                    <p className="uppercase tracking-[0.35em] text-[#D4AF37] mb-4">

                        Sorath Resort & Party Lawns

                    </p>

                    <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">

                        Check Availability

                    </h1>

                    <p className="text-gray-300 max-w-3xl mx-auto text-lg">

                        Instantly check whether your preferred villa
                        or party plot date is available before booking.

                    </p>

                </div>

            </section>

            <div className="max-w-6xl mx-auto px-6 py-20">

                <div className="text-center mb-14">

                    <p className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-3">

                        Smart Booking

                    </p>

                    <h2 className="font-serif text-5xl font-bold mb-4">

                        Plan Before You Book

                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto">

                        Select your booking type and preferred date to
                        instantly check availability.

                    </p>

                </div>

                <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-10 shadow-[0_0_40px_rgba(212,175,55,.08)]">

                    <div className="grid md:grid-cols-2 gap-8">


                        <div>

                            <label className="block text-[#D4AF37] font-semibold mb-3">

                                Booking Type

                            </label>

                            <select

                                value={bookingType}

                                onChange={(e) =>
                                    setBookingType(e.target.value)
                                }

                                className="w-full bg-[#222] border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#D4AF37]"

                            >

                                <option value="villa">

                                    Villa Booking

                                </option>

                                <option value="wedding">

                                    Party Plot Booking

                                </option>

                            </select>

                        </div>

                

                        <div>

                            <label className="block text-[#D4AF37] font-semibold mb-3">

                                Select Date

                            </label>

                            <input

                                type="date"

                                min={new Date().toISOString().split("T")[0]}

                                value={selectedDate}

                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }

                                className="w-full bg-[#222] border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#D4AF37]"

                            />

                        </div>

                    </div>

                    <div className="mt-10 text-center">

                        <button

                            onClick={checkAvailability}

                            disabled={!selectedDate || loading}

                            className={`px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 ${
                                !selectedDate || loading
                                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                    : "bg-[#D4AF37] text-black hover:bg-[#c49b2c] hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,.35)]"
                            }`}

                        >

                            {loading
                                ? "CHECKING..."
                                : "CHECK AVAILABILITY"}

                        </button>

                    </div>

                </div>
                {result && (

                    <div className="mt-16">

                        <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-10 shadow-[0_0_40px_rgba(212,175,55,.08)]">

                            <p className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-3">

                                Availability Result

                            </p>

                            <h2 className="font-serif text-4xl font-bold mb-10">

                                Booking Status

                            </h2>

                            {bookingType === "villa" && (

                                <>

                                    <div className="grid md:grid-cols-3 gap-6 mb-10">

                                        <div className="bg-[#222] rounded-2xl p-6 text-center">

                                            <p className="text-gray-400 mb-2">

                                                Total Villas

                                            </p>

                                            <h3 className="text-[#D4AF37] text-4xl font-bold">

                                                {result.totalVillas}

                                            </h3>

                                        </div>

                                        <div className="bg-[#222] rounded-2xl p-6 text-center">

                                            <p className="text-gray-400 mb-2">

                                                Booked Villas

                                            </p>

                                            <h3 className="text-red-400 text-4xl font-bold">

                                                {result.bookedVillas}

                                            </h3>

                                        </div>

                                        <div className="bg-[#222] rounded-2xl p-6 text-center">

                                            <p className="text-gray-400 mb-2">

                                                Available Villas

                                            </p>

                                            <h3 className="text-green-400 text-4xl font-bold">

                                                {result.availableVillas}

                                            </h3>

                                        </div>

                                    </div>

                                    <div
                                        className={`rounded-2xl border p-8 text-center ${
                                            result.available
                                                ? "bg-green-900/20 border-green-500/30"
                                                : "bg-red-900/20 border-red-500/30"
                                        }`}
                                    >

                                        <h3
                                            className={`text-3xl font-bold mb-3 ${
                                                result.available
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                            }`}
                                        >

                                            {result.available

                                                ? "✓ Villas Available"

                                                : "✕ Villas Fully Booked"}

                                        </h3>

                                        <p className="text-gray-300">

                                            {result.available

                                                ? "You can continue with your villa booking."

                                                : "Please choose another date."}

                                        </p>

                                    </div>

                                </>

                            )}
                        {bookingType === "wedding" && (

                                <div
                                    className={`rounded-2xl border p-8 text-center ${
                                        result.available
                                            ? "bg-green-900/20 border-green-500/30"
                                            : "bg-red-900/20 border-red-500/30"
                                    }`}
                                >

                                    <h3
                                        className={`text-4xl font-bold mb-4 ${
                                            result.available
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }`}
                                    >

                                        {result.available

                                            ? "✓ Party Plot Available"

                                            : "✕ Party Plot Already Booked"}

                                    </h3>

                                    <p className="text-gray-300 text-lg">

                                        {result.available

                                            ? "Your selected party plot date is available."

                                            : "This date has already been reserved."}

                                    </p>

                                </div>

                            )}

                            <div className="text-center mt-10">

                                <button

                                    disabled={!result.available}

                                    onClick={() => {

                                        if (bookingType === "villa") {

                                            navigate("/villas");

                                        } else {

                                            navigate("/party-plot");

                                        }

                                    }}

                                    className={`px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 ${
                                        result.available
                                            ? "bg-[#D4AF37] text-black hover:bg-[#c49b2c] hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,.35)]"
                                            : "bg-gray-700 text-gray-400 cursor-not-allowed"
                                    }`}

                                >

                                    {result.available

                                        ? "BOOK NOW"

                                        : "SELECT ANOTHER DATE"}

                                </button>

                            </div>

                        </div>

                    </div>

                )}

                <section className="mt-24">

                    <div className="text-center mb-12">

                        <p className="uppercase tracking-[0.35em] text-[#D4AF37] text-sm mb-3">

                            Why Check Availability?

                        </p>

                        <h2 className="font-serif text-5xl font-bold">

                            Plan Your Celebration With Confidence

                        </h2>

                        <p className="text-gray-400 max-w-3xl mx-auto mt-5 leading-8">

                            Whether you're planning a destination wedding,
                            booking luxury villas for your guests, or reserving
                            our beautiful party plot, our availability checker
                            helps you choose the perfect date instantly.

                        </p>

                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        

                        <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-8 text-center hover:border-[#D4AF37] hover:-translate-y-2 transition-all duration-300">

                            <div className="text-5xl mb-5">

                                📅

                            </div>

                            <h3 className="text-2xl font-bold mb-4">

                                Instant Results

                            </h3>

                            <p className="text-gray-400 leading-8">

                                Select any future date and instantly know
                                whether villas or the party plot are available.

                            </p>

                        </div>

                        <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-8 text-center hover:border-[#D4AF37] hover:-translate-y-2 transition-all duration-300">

                            <div className="text-5xl mb-5">

                                🏡

                            </div>

                            <h3 className="text-2xl font-bold mb-4">

                                Luxury Experience

                            </h3>

                            <p className="text-gray-400 leading-8">

                                Premium villas, spacious lawns,
                                banquet facilities and exceptional
                                hospitality for every celebration.

                            </p>

                        </div>

                        <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-8 text-center hover:border-[#D4AF37] hover:-translate-y-2 transition-all duration-300">

                            <div className="text-5xl mb-5">

                                ⚡

                            </div>

                            <h3 className="text-2xl font-bold mb-4">

                                Quick Booking

                            </h3>

                            <p className="text-gray-400 leading-8">

                                Once availability is confirmed,
                                continue directly to the booking page
                                with a single click.

                            </p>

                        </div>

                    </div>

                </section>

                <section className="mt-24">

                    <div className="bg-gradient-to-r from-[#1A1A1A] to-[#222222] border border-[#D4AF37]/20 rounded-3xl p-12 text-center">

                        <p className="uppercase tracking-[0.35em] text-[#D4AF37] mb-4">

                            Sorath Resort

                        </p>

                        <h2 className="font-serif text-5xl font-bold mb-6">

                            Ready To Make Your Reservation?

                        </h2>

                        <p className="text-gray-400 max-w-3xl mx-auto leading-8 mb-10">

                            Reserve luxurious villas or book the party plot
                            for unforgettable weddings, family celebrations,
                            corporate events and destination gatherings.

                        </p>

                        <button

                            onClick={() => {

                                if (bookingType === "villa") {

                                    navigate("/villas");

                                } else {

                                    navigate("/party-plot");

                                }

                            }}

                            className="bg-[#D4AF37] text-black px-12 py-4 rounded-full text-lg font-bold hover:bg-[#c49b2c] hover:scale-105 transition-all duration-300"

                        >

                            START BOOKING

                        </button>

                    </div>

                </section>

            </div>

        </div>

    );

}

export default CheckAvailability;