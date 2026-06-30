import { useEffect, useState } from "react";
import axios from "axios";
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,} from "recharts";
function AdminDashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/admin/dashboard"
      );

      setDashboard(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen bg-[#111111] flex items-center justify-center">

        <div className="w-20 h-20 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin"></div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#111111] text-white">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="border-b border-[#D4AF37]/20">

        <div className="max-w-7xl mx-auto px-8 py-14">

          <p className="uppercase tracking-[0.35em] text-[#D4AF37] mb-4">

            Sorath Resort

          </p>

          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-5">

            Admin Dashboard

          </h1>

          <p className="text-gray-400 text-lg max-w-3xl">

            Welcome back Administrator.

            Monitor bookings, revenue, villa availability
            and resort activity from one place.

          </p>

        </div>

      </section>

      {/* ==========================================
          MAIN CONTAINER
      ========================================== */}

      <div className="max-w-7xl mx-auto px-8 py-12">
                {/* ==========================================
            DASHBOARD STATISTICS
        ========================================== */}

        <div className="mb-14">

          <p className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-3">

            Resort Overview

          </p>

          <h2 className="font-serif text-4xl font-bold mb-10">

            Live Statistics

          </h2>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

            {/* Total Villas */}

            <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,.20)]">

              <div className="text-5xl mb-6">

                🏡

              </div>

              <p className="text-gray-400 mb-2">

                Total Villas

              </p>

              <h3 className="text-5xl font-bold text-[#D4AF37]">

                {dashboard.statistics.totalVillas}

              </h3>

            </div>

            {/* Villa Bookings */}

            <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,.20)]">

              <div className="text-5xl mb-6">

                📅

              </div>

              <p className="text-gray-400 mb-2">

                Villa Bookings

              </p>

              <h3 className="text-5xl font-bold text-[#D4AF37]">

                {dashboard.statistics.totalVillaBookings}

              </h3>

            </div>

            {/* Wedding Bookings */}

            <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,.20)]">

              <div className="text-5xl mb-6">

                💍

              </div>

              <p className="text-gray-400 mb-2">

                Wedding Bookings

              </p>

              <h3 className="text-5xl font-bold text-[#D4AF37]">

                {dashboard.statistics.totalWeddingBookings}

              </h3>

            </div>

            {/* Revenue */}

            <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,.20)]">

              <div className="text-5xl mb-6">

                💰

              </div>

              <p className="text-gray-400 mb-2">

                Estimated Revenue

              </p>

              <h3 className="text-4xl font-bold text-[#D4AF37]">

                ₹ {dashboard.statistics.totalRevenue.toLocaleString("en-IN")}

              </h3>

            </div>

            {/* Available Villas */}

            <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,.20)]">

              <div className="text-5xl mb-6">

                ✅

              </div>

              <p className="text-gray-400 mb-2">

                Available Villas

              </p>

              <h3 className="text-5xl font-bold text-green-400">

                {dashboard.statistics.availableVillas}

              </h3>

            </div>

            {/* Pending */}

            <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,.20)]">

              <div className="text-5xl mb-6">

                ⏳

              </div>

              <p className="text-gray-400 mb-2">

                Pending Bookings

              </p>

              <h3 className="text-5xl font-bold text-orange-400">

                {dashboard.statistics.pendingBookings}

              </h3>

            </div>

          </div>

        </div>
                {/* ==========================================
            ANALYTICS
        ========================================== */}

        <div className="mb-16">

          <p className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-3">

            Booking Analytics

          </p>

          <h2 className="font-serif text-4xl font-bold mb-10">

            Resort Overview

          </h2>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Booking Distribution */}

            <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 p-8">

              <h3 className="text-2xl font-bold mb-8">

                Booking Distribution

              </h3>

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <BarChart
                  data={[
                    {
                      name: "Villa",
                      bookings:
                        dashboard.statistics.totalVillaBookings,
                    },
                    {
                      name: "Wedding",
                      bookings:
                        dashboard.statistics.totalWeddingBookings,
                    },
                  ]}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#444"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#D4AF37"
                  />

                  <YAxis stroke="#D4AF37" />

                  <Tooltip />

                  <Bar
                    dataKey="bookings"
                    fill="#D4AF37"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

            {/* Villa Status */}

            <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 p-8">

              <h3 className="text-2xl font-bold mb-8">

                Villa Status

              </h3>

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <BarChart
                  data={[
                    {
                      name: "Available",
                      villas:
                        dashboard.statistics.availableVillas,
                    },
                    {
                      name: "Booked",
                      villas:
                        dashboard.statistics.bookedVillas,
                    },
                  ]}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#444"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#D4AF37"
                  />

                  <YAxis stroke="#D4AF37" />

                  <Tooltip />

                  <Bar
                    dataKey="villas"
                    fill="#D4AF37"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>
                {/* ==========================================
            RECENT VILLA BOOKINGS
        ========================================== */}

        <div className="mb-16">

          <p className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-3">

            Villa Reservations

          </p>

          <h2 className="font-serif text-4xl font-bold mb-8">

            Recent Villa Bookings

          </h2>

          <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-[#222]">

                  <tr>

                    <th className="px-6 py-5 text-left text-[#D4AF37]">
                      Customer
                    </th>

                    <th className="px-6 py-5 text-left text-[#D4AF37]">
                      Phone
                    </th>

                    <th className="px-6 py-5 text-center text-[#D4AF37]">
                      Villas
                    </th>

                    <th className="px-6 py-5 text-center text-[#D4AF37]">
                      Check In
                    </th>

                    <th className="px-6 py-5 text-center text-[#D4AF37]">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {dashboard.recentVillaBookings.length === 0 ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="py-10 text-center text-gray-500"
                      >

                        No Villa Bookings Found

                      </td>

                    </tr>

                  ) : (

                    dashboard.recentVillaBookings.map((booking) => (

                      <tr
                        key={booking._id}
                        className="border-t border-[#D4AF37]/10 hover:bg-[#202020] transition"
                      >

                        <td className="px-6 py-5">

                          <div>

                            <p className="font-semibold">

                              {booking.customerName}

                            </p>

                            <p className="text-gray-500 text-sm">

                              {booking.email}

                            </p>

                          </div>

                        </td>

                        <td className="px-6 py-5">

                          {booking.phone}

                        </td>

                        <td className="px-6 py-5 text-center">

                          {booking.villaCount}

                        </td>

                        <td className="px-6 py-5 text-center">

                          {new Date(
                            booking.checkInDate
                          ).toLocaleDateString("en-IN")}

                        </td>

                        <td className="px-6 py-5 text-center">

                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              booking.status === "Confirmed"
                                ? "bg-green-900/30 text-green-400"
                                : booking.status === "Pending"
                                ? "bg-yellow-900/30 text-yellow-400"
                                : "bg-red-900/30 text-red-400"
                            }`}
                          >

                            {booking.status}

                          </span>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>
                {/* ==========================================
            RECENT WEDDING BOOKINGS
        ========================================== */}

        <div className="mb-16">

          <p className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-3">

            Wedding Reservations

          </p>

          <h2 className="font-serif text-4xl font-bold mb-8">

            Recent Wedding Bookings

          </h2>

          <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-[#222]">

                  <tr>

                    <th className="px-6 py-5 text-left text-[#D4AF37]">

                      Customer

                    </th>

                    <th className="px-6 py-5 text-left text-[#D4AF37]">

                      Phone

                    </th>

                    <th className="px-6 py-5 text-center text-[#D4AF37]">

                      Start Date

                    </th>

                    <th className="px-6 py-5 text-center text-[#D4AF37]">

                      End Date

                    </th>

                    <th className="px-6 py-5 text-center text-[#D4AF37]">

                      Amount

                    </th>

                    <th className="px-6 py-5 text-center text-[#D4AF37]">

                      Status

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {dashboard.recentWeddingBookings.length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="py-10 text-center text-gray-500"
                      >

                        No Wedding Bookings Found

                      </td>

                    </tr>

                  ) : (

                    dashboard.recentWeddingBookings.map((booking) => (

                      <tr
                        key={booking._id}
                        className="border-t border-[#D4AF37]/10 hover:bg-[#202020] transition"
                      >

                        <td className="px-6 py-5">

                          <div>

                            <p className="font-semibold">

                              {booking.customerName}

                            </p>

                            <p className="text-gray-500 text-sm">

                              {booking.email}

                            </p>

                          </div>

                        </td>

                        <td className="px-6 py-5">

                          {booking.phone}

                        </td>

                        <td className="px-6 py-5 text-center">

                          {new Date(
                            booking.startDate
                          ).toLocaleDateString("en-IN")}

                        </td>

                        <td className="px-6 py-5 text-center">

                          {new Date(
                            booking.endDate
                          ).toLocaleDateString("en-IN")}

                        </td>

                        <td className="px-6 py-5 text-center font-semibold text-[#D4AF37]">

                          ₹{" "}
                          {booking.estimatedAmount.toLocaleString("en-IN")}

                        </td>

                        <td className="px-6 py-5 text-center">

                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              booking.status === "Confirmed"
                                ? "bg-green-900/30 text-green-400"
                                : booking.status === "Pending"
                                ? "bg-yellow-900/30 text-yellow-400"
                                : "bg-red-900/30 text-red-400"
                            }`}
                          >

                            {booking.status}

                          </span>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>
                {/* ==========================================
            QUICK ACTIONS
        ========================================== */}

        <div className="mb-20">

          <p className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-3">

            Quick Actions

          </p>

          <h2 className="font-serif text-4xl font-bold mb-10">

            Administrator Controls

          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

            {/* Villa Bookings */}

            <button
              onClick={() => window.location.href = "/admin/bookings"}
              className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-8 hover:border-[#D4AF37] hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(212,175,55,.20)] transition-all duration-300"
            >

              <div className="text-5xl mb-5">

                🏡

              </div>

              <h3 className="text-2xl font-bold mb-3">

                Villa Bookings

              </h3>

              <p className="text-gray-400">

                View and manage all villa reservations.

              </p>

            </button>

            {/* Wedding Bookings */}

            <button
              onClick={() => window.location.href = "/admin/weddings"}
              className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-8 hover:border-[#D4AF37] hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(212,175,55,.20)] transition-all duration-300"
            >

              <div className="text-5xl mb-5">

                💍

              </div>

              <h3 className="text-2xl font-bold mb-3">

                Wedding Bookings

              </h3>

              <p className="text-gray-400">

                Review wedding and party plot bookings.

              </p>

            </button>

            {/* Availability */}

            <button
              onClick={() => window.location.href = "/check-availability"}
              className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-8 hover:border-[#D4AF37] hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(212,175,55,.20)] transition-all duration-300"
            >

              <div className="text-5xl mb-5">

                📅

              </div>

              <h3 className="text-2xl font-bold mb-3">

                Availability

              </h3>

              <p className="text-gray-400">

                Check resort availability for any selected date.

              </p>

            </button>

            {/* Logout */}

            <button
              onClick={() => {

                localStorage.removeItem("adminToken");
                window.location.href = "/admin";

              }}
              className="bg-[#1A1A1A] border border-red-500/30 rounded-3xl p-8 hover:border-red-500 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,0,0,.15)] transition-all duration-300"
            >

              <div className="text-5xl mb-5">

                🚪

              </div>

              <h3 className="text-2xl font-bold mb-3 text-red-400">

                Logout

              </h3>

              <p className="text-gray-400">

                Securely sign out from the administrator panel.

              </p>

            </button>

          </div>

        </div>

        {/* ==========================================
            FOOTER
        ========================================== */}

        <div className="border-t border-[#D4AF37]/20 pt-10 pb-12 text-center">

          <p className="text-gray-500">

            © 2026 Sorath Resort & Party Lawns

          </p>

          <p className="text-[#D4AF37] mt-2">

            Luxury Resort Management Dashboard

          </p>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;