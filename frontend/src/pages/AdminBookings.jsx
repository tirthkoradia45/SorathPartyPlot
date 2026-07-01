import { useEffect, useState } from "react";
import axios from "axios";

function AdminBookings() {

  // ==============================
  // STATE
  // ==============================

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  // ==============================
  // FETCH BOOKINGS
  // ==============================

  const fetchBookings = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/bookings"
      );

      setBookings(response.data);

    }

    catch (error) {

      console.log(error);

      alert("Failed to fetch bookings.");

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchBookings();

  }, []);

  // ==============================
  // UPDATE STATUS
  // ==============================

  const updateStatus = async (

    bookingId,

    status

  ) => {

    try {

      await axios.patch(

        `http://localhost:5000/api/bookings/${bookingId}`,

        {

          status,

        }

      );

      fetchBookings();

    }

    catch (error) {

      console.log(error);

      alert("Failed to update booking status.");

    }

  };

  // ==============================
  // DELETE BOOKING
  // ==============================

  const deleteBooking = async (

    bookingId

  ) => {

    const confirmed = window.confirm(

      "Are you sure you want to delete this booking?"

    );

    if (!confirmed) return;

    try {

      await axios.delete(

        `http://localhost:5000/api/bookings/${bookingId}`

      );

      fetchBookings();

    }

    catch (error) {

      console.log(error);

      alert("Failed to delete booking.");

    }

  };

  // ==============================
  // SEARCH + FILTER
  // ==============================

  const filteredBookings = bookings.filter(

    (booking) => {

      const search = searchTerm.toLowerCase();

      const matchesSearch =

        booking.customerName
          ?.toLowerCase()
          .includes(search)

        ||

        booking.phone
          ?.toLowerCase()
          .includes(search)

        ||

        booking.email
          ?.toLowerCase()
          .includes(search)

        ||

        booking.villaId?.name
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =

        statusFilter === "All"

          ? true

          : booking.status === statusFilter;

      return (

        matchesSearch &&

        matchesStatus

      );

    }

  );

  // ==============================
  // STATISTICS
  // ==============================

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(

    (booking) =>

      booking.status === "Pending"

  ).length;

  const confirmedBookings = bookings.filter(

    (booking) =>

      booking.status === "Confirmed"

  ).length;

  const cancelledBookings = bookings.filter(

    (booking) =>

      booking.status === "Cancelled"

  ).length;

  const completedBookings = bookings.filter(

    (booking) =>

      booking.status === "Completed"

  ).length;

  // ==============================
  // LOADING
  // ==============================

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
                HERO SECTION
      ========================================== */}

      <section className="border-b border-[#D4AF37]/20">

        <div className="max-w-7xl mx-auto px-8 py-14">

          <p className="uppercase tracking-[0.35em] text-[#D4AF37] mb-4">

            Sorath Resort

          </p>

          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-5">

            Villa Booking Management

          </h1>

          <p className="text-gray-400 text-lg max-w-3xl">

            Manage all villa reservations, update booking status,
            search bookings and maintain resort records from one place.

          </p>

        </div>

      </section>

      {/* ==========================================
                MAIN CONTAINER
      ========================================== */}

      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* ==========================================
                    SEARCH & FILTER
        ========================================== */}

        <div className="grid lg:grid-cols-2 gap-6 mb-10">

          <input

            type="text"

            placeholder="Search by Name, Phone, Email or Villa"

            value={searchTerm}

            onChange={(e) =>
              setSearchTerm(e.target.value)
            }

            className="
              bg-[#1A1A1A]
              border
              border-[#D4AF37]/20
              rounded-2xl
              px-6
              py-4
              outline-none
              focus:border-[#D4AF37]
            "

          />

          <select

            value={statusFilter}

            onChange={(e) =>
              setStatusFilter(e.target.value)
            }

            className="
              bg-[#1A1A1A]
              border
              border-[#D4AF37]/20
              rounded-2xl
              px-6
              py-4
              outline-none
              focus:border-[#D4AF37]
            "

          >

            <option value="All">

              All Status

            </option>

            <option value="Pending">

              Pending

            </option>

            <option value="Confirmed">

              Confirmed

            </option>

            <option value="Cancelled">

              Cancelled

            </option>

            <option value="Completed">

              Completed

            </option>

          </select>

        </div>

        {/* ==========================================
                    STATISTICS
        ========================================== */}

        <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-14">

          {/* Total */}

          <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 p-6">

            <div className="text-4xl mb-4">

              📋

            </div>

            <p className="text-gray-400">

              Total Bookings

            </p>

            <h2 className="text-4xl font-bold text-[#D4AF37] mt-2">

              {totalBookings}

            </h2>

          </div>

          {/* Pending */}

          <div className="bg-[#1A1A1A] rounded-3xl border border-yellow-500/20 p-6">

            <div className="text-4xl mb-4">

              🟡

            </div>

            <p className="text-gray-400">

              Pending

            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-2">

              {pendingBookings}

            </h2>

          </div>

          {/* Confirmed */}

          <div className="bg-[#1A1A1A] rounded-3xl border border-green-500/20 p-6">

            <div className="text-4xl mb-4">

              🟢

            </div>

            <p className="text-gray-400">

              Confirmed

            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-2">

              {confirmedBookings}

            </h2>

          </div>

          {/* Completed */}

          <div className="bg-[#1A1A1A] rounded-3xl border border-blue-500/20 p-6">

            <div className="text-4xl mb-4">

              🔵

            </div>

            <p className="text-gray-400">

              Completed

            </p>

            <h2 className="text-4xl font-bold text-blue-400 mt-2">

              {completedBookings}

            </h2>

          </div>

          {/* Cancelled */}

          <div className="bg-[#1A1A1A] rounded-3xl border border-red-500/20 p-6">

            <div className="text-4xl mb-4">

              🔴

            </div>

            <p className="text-gray-400">

              Cancelled

            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-2">

              {cancelledBookings}

            </h2>

          </div>

        </div>

        {/* ==========================================
                    BOOKINGS TABLE
        ========================================== */}

        <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 overflow-hidden shadow-2xl">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-[#222222]">

                <tr>

                  <th className="px-6 py-5 text-left text-[#D4AF37]">

                    Customer

                  </th>

                  <th className="px-6 py-5 text-left text-[#D4AF37]">

                    Villa

                  </th>

                  <th className="px-6 py-5 text-center text-[#D4AF37]">

                    Villas

                  </th>

                  <th className="px-6 py-5 text-center text-[#D4AF37]">

                    Check-In

                  </th>

                  <th className="px-6 py-5 text-center text-[#D4AF37]">

                    Check-Out

                  </th>

                  <th className="px-6 py-5 text-center text-[#D4AF37]">

                    Status

                  </th>

                  <th className="px-6 py-5 text-center text-[#D4AF37]">

                    Actions

                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredBookings.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="py-16 text-center text-gray-500"
                    >

                      No bookings found.

                    </td>

                  </tr>

                ) : (

                  filteredBookings.map((booking) => (

                    <tr
                      key={booking._id}
                      className="
                        border-t
                        border-[#D4AF37]/10
                        hover:bg-[#202020]
                        transition-all
                      "
                    >

                      {/* Customer */}

                      <td className="px-6 py-5">

                        <div>

                          <h3 className="font-semibold text-lg">

                            {booking.customerName}

                          </h3>

                          <p className="text-gray-400 text-sm">

                            {booking.email}

                          </p>

                          <p className="text-gray-500 text-sm">

                            {booking.phone}

                          </p>

                        </div>

                      </td>

                      {/* Villa */}

                      <td className="px-6 py-5">

                        {booking.villaId?.name || "Unknown Villa"}

                      </td>

                      {/* Villa Count */}

                      <td className="px-6 py-5 text-center">

                        {booking.villaCount}

                      </td>

                      {/* Check In */}

                      <td className="px-6 py-5 text-center">

                        {new Date(

                          booking.checkInDate

                        ).toLocaleDateString("en-IN")}

                      </td>

                      {/* Check Out */}

                      <td className="px-6 py-5 text-center">

                        {new Date(

                          booking.checkOutDate

                        ).toLocaleDateString("en-IN")}

                      </td>

                      {/* Status */}

                      <td className="px-6 py-5 text-center">

                        <select

                          value={booking.status}

                          onChange={(e) =>
                            updateStatus(
                              booking._id,
                              e.target.value
                            )
                          }

                          className={`
                            px-4
                            py-2
                            rounded-full
                            border
                            font-semibold
                            outline-none
                            transition-all

                            ${
                              booking.status === "Pending"
                                ? "bg-yellow-900/30 text-yellow-400 border-yellow-500"

                              : booking.status === "Confirmed"
                                ? "bg-green-900/30 text-green-400 border-green-500"

                              : booking.status === "Completed"
                                ? "bg-blue-900/30 text-blue-400 border-blue-500"

                              : "bg-red-900/30 text-red-400 border-red-500"
                            }
                          `}
                        >

                          <option value="Pending">

                            Pending

                          </option>

                          <option value="Confirmed">

                            Confirmed

                          </option>

                          <option value="Completed">

                            Completed

                          </option>

                          <option value="Cancelled">

                            Cancelled

                          </option>

                        </select>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-5 text-center">

                        <button

                          onClick={() =>
                            deleteBooking(
                              booking._id
                            )
                          }

                          className="
                            px-5
                            py-2
                            rounded-full
                            border
                            border-red-500
                            text-red-400
                            hover:bg-red-500
                            hover:text-white
                            transition-all
                            duration-300
                          "

                        >

                          Delete

                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* ==========================================
                    PAGE FOOTER
        ========================================== */}

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">

          <div>

            <p className="text-gray-500">

              Showing

              <span className="text-[#D4AF37] font-semibold">

                {" "}{filteredBookings.length}{" "}

              </span>

              booking(s)

            </p>

          </div>

          <button

            onClick={() => window.location.href="/admin/dashboard"}

            className="
              px-8
              py-3
              rounded-full
              bg-[#D4AF37]
              text-black
              font-semibold
              hover:scale-105
              transition-all
              duration-300
            "

          >

            ← Back to Dashboard

          </button>

        </div>

        {/* ==========================================
                    COPYRIGHT
        ========================================== */}

        <div className="border-t border-[#D4AF37]/20 mt-16 pt-8 text-center">

          <p className="text-gray-500">

            © 2026 Sorath Resort & Party Lawns

          </p>

          <p className="text-[#D4AF37] mt-2">

            Villa Booking Management System

          </p>

        </div>

      </div>

    </div>

  );

}

export default AdminBookings;
