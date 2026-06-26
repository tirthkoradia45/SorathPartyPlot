
import { useEffect, useState } from "react";

// Axios is used to make HTTP requests to the backend
import axios from "axios";

/**

 * ADMIN BOOKINGS PAGE

 * Features:

 * ✔ View all bookings
 * ✔ Search bookings by customer name
 * ✔ Filter bookings by booking status
 * ✔ View booking statistics
 * ✔ Confirm bookings
 * ✔ Cancel bookings
 * ✔ Delete bookings
 * ✔ Automatically refresh data after every action
 
 */

function AdminBookings() {

  // Stores all bookings fetched from the backend
  const [bookings, setBookings] = useState([]);

  // Stores the customer name entered in the search box
  const [searchTerm, setSearchTerm] = useState("");

  // Stores the selected booking status
  const [statusFilter, setStatusFilter] = useState("All");

  // Sort option selected by admin
   const [sortOption, setSortOption] = useState("Newest");

  // API:
  // GET /api/bookings

  // This function loads every booking from MongoDB.

  // It is called:
  //
  // • When page loads
  // • After Confirm
  // • After Cancel
  // • After Delete
  
  const fetchBookings = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/bookings"
      );

      // Save bookings inside React State
      setBookings(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    fetchBookings();

  }, []);

  // API:
  // PATCH /api/bookings/:id

  // Used to:

  // Pending  → Confirmed
  // Pending  → Cancelled
  // Confirmed → Cancelled
  // Cancelled → Confirmed
const updateStatus = async (bookingId, status) => {

    try {

      await axios.patch(

        `http://localhost:5000/api/bookings/${bookingId}`,

        {
          status
        }

      );

      alert("Booking Status Updated Successfully");

      // Reload latest bookings
      fetchBookings();

    } catch (error) {

      console.log(error);

      alert("Failed to update booking");

    }

  };

  // API:
  // DELETE /api/bookings/:id
  //
  // Steps:
  //
  // Admin clicks Delete
  //        ↓
  // Confirmation Popup
  //        ↓
  // Delete Booking
  //        ↓
  // Reload Dashboard
  

  const deleteBooking = async (bookingId) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this booking?"

    );

    if (!confirmDelete) {

      return;

    }

    try {

      await axios.delete(

        `http://localhost:5000/api/bookings/${bookingId}`

      );

      alert("Booking Deleted Successfully");

      fetchBookings();

    } catch (error) {

      console.log(error);

      alert("Failed to delete booking");

    }

  };

const filteredBookings = bookings

  .filter((booking) => {

    const matchesSearch = booking.customerName

      .toLowerCase()

      .includes(searchTerm.toLowerCase());

    const matchesStatus =

      statusFilter === "All"

        ? true

        : booking.status === statusFilter;

    return matchesSearch && matchesStatus;

  })

  .sort((a, b) => {

    if (sortOption === "Newest") {

      return new Date(b.createdAt) - new Date(a.createdAt);

    }

    if (sortOption === "Oldest") {

      return new Date(a.createdAt) - new Date(b.createdAt);

    }

    if (sortOption === "Check In") {

      return new Date(a.checkInDate) - new Date(b.checkInDate);

    }

    return 0;

  });

  return (

    <div className="p-8">


      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-green-700">

            Admin Dashboard

          </h1>

          <p className="text-gray-500">

            Manage all villa bookings

          </p>

        </div>

      </div>


      <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* Search Customer */}

        <div className="flex-1">

          <input

            type="text"

            placeholder="🔍 Search Customer..."

            value={searchTerm}

            onChange={(e) =>

              setSearchTerm(e.target.value)

            }

            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"

          />

        </div>

        {/* Status Filter */}

        <div>

          <select

            value={statusFilter}

            onChange={(e) =>

              setStatusFilter(e.target.value)

            }

            className="border border-gray-300 rounded-lg p-3"

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

          </select>

        </div>

        {/* Sort Dropdown */}

        <div>

          <select

            value={sortOption}

            onChange={(e) =>

              setSortOption(e.target.value)

            }

            className="border border-gray-300 rounded-lg p-3"

          >

            <option>

              Newest

            </option>

            <option>

              Oldest

            </option>

            <option>

              Check In

            </option>

          </select>

        </div>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        {/* Total Bookings */}

        <div className="bg-blue-100 rounded-lg shadow p-5">

          <h2 className="font-semibold text-lg">

            Total Bookings

          </h2>

          <p className="text-3xl font-bold text-blue-700">

            {bookings.length}

          </p>

        </div>

        {/* Pending */}

        <div className="bg-yellow-100 rounded-lg shadow p-5">

          <h2 className="font-semibold text-lg">

            Pending

          </h2>

          <p className="text-3xl font-bold text-yellow-700">

            {

              bookings.filter(

                booking => booking.status === "Pending"

              ).length

            }

          </p>

        </div>

        {/* Confirmed */}

        <div className="bg-green-100 rounded-lg shadow p-5">

          <h2 className="font-semibold text-lg">

            Confirmed

          </h2>

          <p className="text-3xl font-bold text-green-700">

            {

              bookings.filter(

                booking => booking.status === "Confirmed"

              ).length

            }

          </p>

        </div>

        {/* Cancelled */}

        <div className="bg-red-100 rounded-lg shadow p-5">

          <h2 className="font-semibold text-lg">

            Cancelled

          </h2>

          <p className="text-3xl font-bold text-red-700">

            {

              bookings.filter(

                booking => booking.status === "Cancelled"

              ).length

            }

          </p>

        </div>

      </div>


      <div className="overflow-x-auto">

        <table className="min-w-full border-collapse border border-gray-300">

        <thead>

          <tr className="bg-green-700 text-white">

            <th className="border p-3">Customer</th>

            <th className="border p-3">Villa</th>

            <th className="border p-3">Villa Count</th>

            <th className="border p-3">Check In</th>

            <th className="border p-3">Check Out</th>

            <th className="border p-3">Status</th>

            <th className="border p-3">Actions</th>

          </tr>

        </thead>

        <tbody>


          {filteredBookings.length === 0 ? (

            <tr>

              <td
                colSpan="7"
                className="text-center p-8 text-gray-500 text-lg"
              >

                No bookings found.

              </td>

            </tr>

          ) : (

            filteredBookings.map((booking) => (

              <tr

                key={booking._id}

                className="even:bg-gray-50 hover:bg-green-50 transition"

              >

                <td className="border p-3">

                  {booking.customerName}

                </td>


                <td className="border p-3">

                  {booking.villaId?.name}

                </td>

                <td className="border p-3 text-center">

                  {booking.villaCount}

                </td>

                <td className="border p-3">

                  {

                    new Date(

                      booking.checkInDate

                    ).toLocaleDateString(

                      "en-IN",

                      {

                        day: "2-digit",

                        month: "short",

                        year: "numeric",

                      }

                    )

                  }

                </td>

                <td className="border p-3">

                  {

                    new Date(

                      booking.checkOutDate

                    ).toLocaleDateString(

                      "en-IN",

                      {

                        day: "2-digit",

                        month: "short",

                        year: "numeric",

                      }

                    )

                  }

                </td>

                <td className="border p-3">

                  {

                    booking.status === "Pending" && (

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">

                        Pending

                      </span>

                    )

                  }

                  {

                    booking.status === "Confirmed" && (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">

                        Confirmed

                      </span>

                    )

                  }

                  {

                    booking.status === "Cancelled" && (

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">

                        Cancelled

                      </span>

                    )

                  }

                </td>


                <td className="border p-3">

                  {/* Confirm Button */}

                  {

                    booking.status !== "Confirmed" && (

                      <button

                        onClick={() =>

                          updateStatus(

                            booking._id,

                            "Confirmed"

                          )

                        }

                        className="bg-green-600 hover:bg-green-700 transition text-white px-3 py-1 rounded mr-2"

                      >

                        Confirm

                      </button>

                    )

                  }

                  {/* Cancel Button */}

                  {

                    booking.status !== "Cancelled" && (

                      <button

                        onClick={() =>

                          updateStatus(

                            booking._id,

                            "Cancelled"

                          )

                        }

                        className="bg-red-600 hover:bg-red-700 transition text-white px-3 py-1 rounded mr-2"

                      >

                        Cancel

                      </button>

                    )

                  }

                  {/* Delete Button */}

                  <button

                    onClick={() =>

                      deleteBooking(

                        booking._id

                      )

                    }

                    className="bg-gray-700 hover:bg-black transition text-white px-3 py-1 rounded"

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

  );

}

export default AdminBookings;