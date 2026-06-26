import { useEffect, useState } from "react";

import axios from "axios";

function AdminWeddingBookings() {
   const [bookings, setBookings] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState("All");

const fetchBookings = async () => {

    try {

      const response = await axios.get(

        "http://localhost:5000/api/wedding-bookings"

      );

      setBookings(response.data);

    }

    catch (error) {

      console.log(error);

      alert("Failed to Load Wedding Bookings");

    }
};
const updateStatus = async (bookingId, status) => {

  try {

    await axios.patch(

      `http://localhost:5000/api/wedding-bookings/${bookingId}`,

      {
        status,
      }

    );

    alert("Booking Updated Successfully");

    fetchBookings();

  }

  catch (error) {

    console.log(error);

    alert("Failed to update booking");

  }

};
const deleteBooking = async (bookingId) => {

  const confirmDelete = window.confirm(

    "Delete this wedding booking?"

  );

  if (!confirmDelete) {

    return;

  }

  try {

    await axios.delete(

      `http://localhost:5000/api/wedding-bookings/${bookingId}`

    );

    alert("Booking Deleted Successfully");

    fetchBookings();

  }

  catch (error) {

    console.log(error);

    alert("Failed to Delete Booking");

  }

};


useEffect(() => {

    fetchBookings();

  }, []);
const filteredBookings = bookings.filter((booking) => {

  const matchesSearch = booking.customerName

    .toLowerCase()

    .includes(searchTerm.toLowerCase());

  const matchesStatus =

    statusFilter === "All"

      ? true

      : booking.status === statusFilter;

  return matchesSearch && matchesStatus;

});

// Total Bookings
const totalBookings = bookings.length;

// Total Pending
const pendingBookings = bookings.filter(
  (booking) => booking.status === "Pending"
).length;

// Total Confirmed
const confirmedBookings = bookings.filter(
  (booking) => booking.status === "Confirmed"
).length;

// Total Cancelled
const cancelledBookings = bookings.filter(
  (booking) => booking.status === "Cancelled"
).length;

// Total Estimated Revenue
const totalRevenue = bookings.reduce(

  (total, booking) => total + booking.estimatedAmount,

  0

);

return (

    <div className="min-h-screen bg-gray-100 p-8">


      <h1 className="text-4xl font-bold text-green-700 mb-8">

        💍 Wedding Booking Dashboard

      </h1>
      <div className="grid md:grid-cols-5 gap-5 mb-8">

  {/* Total */}

  <div className="bg-white rounded-xl shadow p-6">

    <h3 className="text-gray-500">

      Total Bookings

    </h3>

    <p className="text-4xl font-bold text-green-700">

      {totalBookings}

    </p>

  </div>

  {/* Pending */}

  <div className="bg-yellow-50 rounded-xl shadow p-6">

    <h3 className="text-yellow-700">

      Pending

    </h3>

    <p className="text-4xl font-bold">

      {pendingBookings}

    </p>

  </div>

  {/* Confirmed */}

  <div className="bg-green-50 rounded-xl shadow p-6">

    <h3 className="text-green-700">

      Confirmed

    </h3>

    <p className="text-4xl font-bold">

      {confirmedBookings}

    </p>

  </div>

  {/* Cancelled */}

  <div className="bg-red-50 rounded-xl shadow p-6">

    <h3 className="text-red-700">

      Cancelled

    </h3>

    <p className="text-4xl font-bold">

      {cancelledBookings}

    </p>

  </div>

  {/* Revenue */}

  <div className="bg-blue-50 rounded-xl shadow p-6">

    <h3 className="text-blue-700">

      Estimated Revenue

    </h3>

    <p className="text-2xl font-bold">

      ₹{totalRevenue.toLocaleString("en-IN")}

    </p>

  </div>

</div>
<div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

  {/* Search */}

  <input

    type="text"

    placeholder="Search Customer..."

    value={searchTerm}

    onChange={(e) => setSearchTerm(e.target.value)}
    
    className="w-full md:w-96 border rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-green-500"

  />

  {/* Status Filter */}

  <select

    value={statusFilter}

    onChange={(e) => setStatusFilter(e.target.value)}

   className="border rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-green-500"

  >

    <option value="All">All</option>

    <option value="Pending">Pending</option>

    <option value="Confirmed">Confirmed</option>

    <option value="Cancelled">Cancelled</option>

  </select>

</div>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

        <table className="w-full">

          {/* Table Header */}

          <thead>

            <tr className="bg-gradient-to-r from-green-700 to-emerald-600 text-white">

              <th className="p-4">Customer</th>

              <th className="p-4">Phone</th>

              <th className="p-4">Wedding Dates</th>

              <th className="p-4">Swimming Pool</th>

              <th className="p-4">Generator</th>

              <th className="p-4">Estimated Amount</th>

              <th className="p-4">Status</th>

              <th className="p-4">Actions</th>

            </tr>

          </thead>

          {/* Table Body */}

          <tbody>

            {

              bookings.length === 0 ?

              (

                <tr>

                  <td

                    colSpan="7"

                    className="text-center p-10 text-gray-500"

                  >

                    No Wedding Bookings Found

                  </td>

                </tr>

              )

              :

              (

                filteredBookings.map((booking) => (

                  <tr

                    key={booking._id}

                    className="border-b hover:bg-green-50 transition duration-200"

                  >

                    {/* Customer */}

                    <td className="p-4">

                      {booking.customerName}

                    </td>

                    {/* Phone */}

                    <td className="p-4">

                      {booking.phone}

                    </td>

                    {/* Dates */}

                    <td className="p-4">

                      {new Date(

                        booking.startDate

                      ).toLocaleDateString()}

                      {" - "}

                      {new Date(

                        booking.endDate

                      ).toLocaleDateString()}

                    </td>

                    {/* Swimming Pool */}

                    <td className="p-4 text-center">

                      {

                        booking.swimmingPool

                        ?

                        "✅"

                        :

                        "❌"

                      }

                    </td>

                    {/* Generator */}

                    <td className="p-4 text-center">

                      {

                        booking.generator

                        ?

                        "✅"

                        :

                        "❌"

                      }

                    </td>

                    {/* Estimate */}

                    <td className="p-4">
                    <span className="font-bold text-green-700">
                     ₹{booking.estimatedAmount.toLocaleString("en-IN")}
                    </span>
                    </td>

                    {/* Status */}

                    <td className="p-4">

                      <span

                        className={`

                          px-3

                          py-1

                          rounded-full

                          text-white

                          ${

                            booking.status === "Confirmed"

                            ?

                            "bg-green-600"

                            :

                            booking.status === "Cancelled"

                            ?

                            "bg-red-600"

                            :

                            "bg-yellow-500"

                          }

                        `}

                      >

                        {booking.status}

                      </span>

                    </td>
                    <td className="p-4 space-x-2">

  {

    booking.status !== "Confirmed" && (

      <button

        onClick={() =>

          updateStatus(

            booking._id,

            "Confirmed"

          )

        }

        className="bg-green-600 text-white px-3 py-1 rounded"

      >

        Confirm

      </button>

    )

  }

  {

    booking.status !== "Cancelled" && (

      <button

        onClick={() =>

          updateStatus(

            booking._id,

            "Cancelled"

          )

        }

        className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold"

      >

        Cancel

      </button>

    )

  }

  <button

    onClick={() =>

      deleteBooking(

        booking._id

      )

    }

    className="bg-gray-700 text-white px-3 py-1 rounded"

  >

    Delete

  </button>

</td>

                  </tr>

                ))

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminWeddingBookings;