import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import LoadingSpinner from "../components/LoadingSpinner";
import {ChevronUpDownIcon,CheckIcon,} from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { buildApiUrl } from "../config/api";
// STATUS OPTIONS
const statusOptions = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];
function WeddingBookingDashboard() {
  const navigate = useNavigate();
  // STATES
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // FETCH BOOKINGS
const fetchBookings = async () => {

  try {

    const token = localStorage.getItem("adminToken");

    if (!token) {

      navigate("/admin");

      return;

    }

    const response = await axios.get(

      buildApiUrl("/api/wedding-bookings"),

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );

    setBookings(response.data.bookings || []);

  }

  catch (error) {

    console.error(error);

    if (!error.response) {

      toast.error(
        "Unable to connect to the server. Please try again later."
      );

    }

    else if (error.response.status === 401) {

      localStorage.removeItem("adminToken");

      navigate("/admin");

      return;

    }

    else {

      toast.error(

        error.response?.data?.message ||

        "Something went wrong."

      );

    }

  }

  finally {

    setLoading(false);

  }

};

  useEffect(() => {

    fetchBookings();

  }, []);
// UPDATE STATUS
const updateStatus = async (
  bookingId,
  status
) => {

  try {

    const token = localStorage.getItem("adminToken");

    if (!token) {

      navigate("/admin");

      return;

    }

    await axios.patch(

      buildApiUrl(`/api/wedding-bookings/${bookingId}`),

      {
        status,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );

    toast.success(
      "Booking status updated."
    );

    fetchBookings();

  }

  catch (error) {

    console.error(error);

    if (!error.response) {

      toast.error(
        "Unable to connect to the server. Please try again later."
      );

    }

    else if (error.response.status === 401) {

      localStorage.removeItem("adminToken");

      navigate("/admin");

      return;

    }

    else {

      toast.error(

        error.response?.data?.message ||

        "Unable to update booking status."

      );

    }

  }

};

// DELETE BOOKING
const confirmDelete = async () => {

  try {

    const token = localStorage.getItem("adminToken");

    if (!token) {

      navigate("/admin");

      return;

    }

    await axios.delete(

      buildApiUrl(`/api/wedding-bookings/${selectedBookingId}`),

      {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      }

    );

    toast.success(
      "Booking deleted successfully."
    );

    fetchBookings();

  }

  catch (error) {

    console.error(error);

    if (!error.response) {

      toast.error(
        "Unable to connect to the server. Please try again later."
      );

    }

    else if (error.response.status === 401) {

      localStorage.removeItem("adminToken");

      navigate("/admin");

      return;

    }

    else {

      toast.error(

        error.response?.data?.message ||

        "Unable to delete the booking."

      );

    }

  }

  finally {

    setShowDeleteModal(false);

    setSelectedBookingId(null);

  }

};
// SEARCH + FILTER
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
          .includes(search);

      const matchesStatus =

        statusFilter === "All"

          ? true

          : booking.status === statusFilter;

      return matchesSearch && matchesStatus;

    }

  );
// STATISTICS
const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(

    booking => booking.status === "Pending"

  ).length;

  const confirmedBookings = bookings.filter(

    booking => booking.status === "Confirmed"

  ).length;

  const completedBookings = bookings.filter(

    booking => booking.status === "Completed"

  ).length;

  const cancelledBookings = bookings.filter(

    booking => booking.status === "Cancelled"

  ).length;

  const estimatedRevenue = bookings.reduce(

    (total, booking) =>

      total + booking.estimatedAmount,

    0

  );

// LOADING
if (loading) {

  return <LoadingSpinner />;

}

  return (

    <div className="min-h-screen bg-[#111111] text-white">

      <Toaster

        position="top-right"

        toastOptions={{

          duration: 3000,

          style: {

            background: "#1A1A1A",

            color: "#fff",

            border: "1px solid #D4AF37",

          },

        }}

      />
     <section className="border-b border-[#D4AF37]/20">

        <div className="max-w-7xl mx-auto px-8 py-14">

          <p className="uppercase tracking-[0.35em] text-[#D4AF37] mb-4">

            Sorath Resort

          </p>

          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-5">

            Wedding Booking Management

          </h1>

          <p className="text-gray-400 text-lg max-w-3xl leading-8">

            Manage all wedding reservations, update booking
            status, monitor event schedules and maintain
            customer records from one premium dashboard.

          </p>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-8 py-12">     

        <div className="grid lg:grid-cols-2 gap-6 mb-10">

          {/* Search */}

          <input

            type="text"

            placeholder="Search by Name, Phone or Email"

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
              text-white
              placeholder:text-gray-500
              outline-none
              focus:border-[#D4AF37]
              focus:ring-2
              focus:ring-[#D4AF37]/20
              transition-all
            "

          />

          {/* Status Filter */}

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
              text-white
              outline-none
              focus:border-[#D4AF37]
              focus:ring-2
              focus:ring-[#D4AF37]/20
              transition-all
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

            <option value="Completed">

              Completed

            </option>

            <option value="Cancelled">

              Cancelled

            </option>

          </select>

        </div>

        {/* ==========================================
                    STATISTICS
        ========================================== */}

        <div className="grid sm:grid-cols-2 xl:grid-cols-6 gap-6 mb-14">

          {/* Total */}

          <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 p-6 hover:border-[#D4AF37] transition-all duration-300">

            <div className="text-5xl mb-5">

              💍

            </div>

            <p className="text-gray-400">

              Total Bookings

            </p>

            <h2 className="text-4xl font-bold text-[#D4AF37] mt-2">

              {totalBookings}

            </h2>

          </div>

          {/* Pending */}

          <div className="bg-[#1A1A1A] rounded-3xl border border-yellow-500/20 p-6 hover:border-yellow-500 transition-all duration-300">

            <div className="text-5xl mb-5">

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

          <div className="bg-[#1A1A1A] rounded-3xl border border-green-500/20 p-6 hover:border-green-500 transition-all duration-300">

            <div className="text-5xl mb-5">

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

          <div className="bg-[#1A1A1A] rounded-3xl border border-blue-500/20 p-6 hover:border-blue-500 transition-all duration-300">

            <div className="text-5xl mb-5">

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

          <div className="bg-[#1A1A1A] rounded-3xl border border-red-500/20 p-6 hover:border-red-500 transition-all duration-300">

            <div className="text-5xl mb-5">

              🔴

            </div>

            <p className="text-gray-400">

              Cancelled

            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-2">

              {cancelledBookings}

            </h2>

          </div>

          {/* Revenue */}

          <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 p-6 hover:border-[#D4AF37] transition-all duration-300">

            <div className="text-5xl mb-5">

              💰

            </div>

            <p className="text-gray-400">

              Estimated Revenue

            </p>

            <h2 className="text-3xl font-bold text-[#D4AF37] mt-2">

              ₹ {estimatedRevenue.toLocaleString("en-IN")}

            </h2>

          </div>

        </div>
        <div className="bg-[#1A1A1A] rounded-3xl border border-[#D4AF37]/20 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-[#202020]">

                <tr>

                  <th className="px-6 py-5 text-left text-[#D4AF37] uppercase tracking-wider">

                    Customer

                  </th>

                  <th className="px-6 py-5 text-center text-[#D4AF37] uppercase tracking-wider">

                    Start Date

                  </th>

                  <th className="px-6 py-5 text-center text-[#D4AF37] uppercase tracking-wider">

                    End Date

                  </th>

                  <th className="px-6 py-5 text-center text-[#D4AF37] uppercase tracking-wider">

                    Pool

                  </th>

                  <th className="px-6 py-5 text-center text-[#D4AF37] uppercase tracking-wider">

                    Generator

                  </th>

                  <th className="px-6 py-5 text-center text-[#D4AF37] uppercase tracking-wider">

                    Amount

                  </th>

                  <th className="px-6 py-5 text-center text-[#D4AF37] uppercase tracking-wider">

                    Status

                  </th>

                  <th className="px-6 py-5 text-center text-[#D4AF37] uppercase tracking-wider">

                    Actions

                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredBookings.length === 0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="py-16 text-center text-gray-500"
                    >

                      No wedding bookings found.

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
                        duration-300
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

                      {/* Start Date */}

                      <td className="px-6 py-5 text-center">

                        {new Date(
                          booking.startDate
                        ).toLocaleDateString("en-IN")}

                      </td>

                      {/* End Date */}

                      <td className="px-6 py-5 text-center">

                        {new Date(
                          booking.endDate
                        ).toLocaleDateString("en-IN")}

                      </td>

                      {/* Swimming Pool */}

                      <td className="px-6 py-5 text-center">

                        {booking.swimmingPool ? (

                          <span className="text-green-400 font-semibold">

                            Yes

                          </span>

                        ) : (

                          <span className="text-gray-500">

                            No

                          </span>

                        )}

                      </td>

                      {/* Generator */}

                      <td className="px-6 py-5 text-center">

                        {booking.generator ? (

                          <span className="text-green-400 font-semibold">

                            Yes

                          </span>

                        ) : (

                          <span className="text-gray-500">

                            No

                          </span>

                        )}

                      </td>

                      {/* Amount */}

                      <td className="px-6 py-5 text-center">

                        <span className="text-[#D4AF37] font-semibold">

                          ₹ {booking.estimatedAmount.toLocaleString("en-IN")}

                        </span>

                      </td>

                      {/* Status */}

                      <td className="px-6 py-5 text-center">

                        <Listbox
                          value={booking.status}
                          onChange={(value) =>
                            updateStatus(
                              booking._id,
                              value
                            )
                          }
                        >

                          <div className="relative w-44 mx-auto">

                            {/* BUTTON */}

                            <Listbox.Button
                              className={`
                                relative
                                w-full
                                cursor-pointer
                                rounded-full
                                border
                                py-2.5
                                pl-4
                                pr-10
                                text-left
                                font-semibold
                                transition-all
                                duration-300
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#D4AF37]/30

                                ${
                                  booking.status === "Pending"
                                    ? "border-yellow-500 bg-yellow-900/20 text-yellow-400"

                                    : booking.status === "Confirmed"
                                    ? "border-green-500 bg-green-900/20 text-green-400"

                                    : booking.status === "Completed"
                                    ? "border-blue-500 bg-blue-900/20 text-blue-400"

                                    : "border-red-500 bg-red-900/20 text-red-400"
                                }
                              `}
                            >

                              <span className="block truncate">

                                {booking.status}

                              </span>

                              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">

                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-[#D4AF37]"
                                />

                              </span>

                            </Listbox.Button>

                            {/* OPTIONS */}

                            <Listbox.Options
                              className="
                                absolute
                                z-50
                                mt-2
                                w-full
                                overflow-hidden
                                rounded-2xl
                                border
                                border-[#D4AF37]/20
                                bg-[#1A1A1A]
                                shadow-2xl
                                focus:outline-none
                              "
                            >

                              {statusOptions.map((status) => (

                                <Listbox.Option
                                  key={status}
                                  value={status}
                                  className={({ active }) =>
                                    `
                                      cursor-pointer
                                      select-none
                                      px-4
                                      py-3
                                      flex
                                      items-center
                                      justify-between
                                      transition-all

                                      ${
                                        active
                                          ? "bg-[#2A2A2A]"
                                          : ""
                                      }
                                    `
                                  }
                                >

                                  {({ selected }) => (

                                    <>

                                      <span
                                        className={`
                                          font-medium

                                          ${
                                            status === "Pending"
                                              ? "text-yellow-400"

                                              : status === "Confirmed"
                                              ? "text-green-400"

                                              : status === "Completed"
                                              ? "text-blue-400"

                                              : "text-red-400"
                                          }
                                        `}
                                      >

                                        {status}

                                      </span>

                                      {selected && (

                                        <CheckIcon
                                          className="
                                            h-5
                                            w-5
                                            text-[#D4AF37]
                                          "
                                        />

                                      )}

                                    </>

                                  )}

                                </Listbox.Option>

                              ))}

                            </Listbox.Options>

                          </div>

                        </Listbox>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-5 text-center">

                        <button

                          onClick={() => {

                            setSelectedBookingId(
                              booking._id
                            );

                            setShowDeleteModal(true);

                          }}

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

            onClick={() => navigate("/admin/dashboard")}

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


        <div className="border-t border-[#D4AF37]/20 mt-16 pt-8 text-center">

          <p className="text-gray-500">

            © 2026 Sorath Resort & Party Lawns

          </p>

          <p className="text-[#D4AF37] mt-2">

            Wedding Booking Management System

          </p>

        </div>

      </div>


      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="w-[90%] max-w-md bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-8">

            <h2 className="text-3xl font-serif font-bold text-white mb-4">

              Delete Booking

            </h2>

            <p className="text-gray-400 leading-7">

              Are you sure you want to permanently delete this wedding booking?

            </p>

            <p className="text-red-400 mt-3">

              This action cannot be undone.

            </p>

            <div className="flex justify-end gap-4 mt-10">

              <button

                onClick={() => {

                  setShowDeleteModal(false);

                  setSelectedBookingId(null);

                }}

                className="
                  px-6
                  py-3
                  rounded-xl
                  border
                  border-gray-600
                  text-gray-300
                  hover:bg-gray-700
                  transition-all
                "

              >

                Cancel

              </button>

              <button

                onClick={confirmDelete}

                className="
                  px-6
                  py-3
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  font-semibold
                  transition-all
                "

              >

                Delete

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default WeddingBookingDashboard;