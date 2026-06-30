import { useEffect, useState } from "react";
import axios from "axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/bookings/${bookingId}`, { status });
      alert("Booking status updated.");
      fetchBookings();
    } catch (error) {
      console.error(error);
      alert("Failed to update booking status.");
    }
  };

  const deleteBooking = async (bookingId) => {
    const confirmed = window.confirm("Delete this booking?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      alert("Booking deleted.");
      fetchBookings();
    } catch (error) {
      console.error(error);
      alert("Failed to delete booking.");
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
      statusFilter === "All" ? true : booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[0.35em] text-[#D4AF37] mb-3">Sorath Resort</p>
          <h1 className="text-5xl font-serif font-bold mb-4">Admin Bookings</h1>
          <p className="text-gray-400 max-w-3xl">
            Manage villa reservations, update booking status, and remove invalid entries from the system.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_220px] mb-8">
          <input
            className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-3 text-white outline-none focus:border-[#D4AF37]"
            type="text"
            placeholder="Search by customer name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-3 text-white outline-none focus:border-[#D4AF37]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-[#D4AF37]/20 bg-[#111111]/80">
          <table className="min-w-full divide-y divide-[#D4AF37]/20 text-left text-sm">
            <thead className="border-b border-[#D4AF37]/20 bg-[#111111] uppercase tracking-[0.18em] text-[#D4AF37]">
              <tr>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Villa</th>
                <th className="px-5 py-4">Villas</th>
                <th className="px-5 py-4">Dates</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ffffff0d]">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center text-gray-400">
                    No bookings found matching the current filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-white/5">
                    <td className="px-5 py-4">{booking.customerName}</td>
                    <td className="px-5 py-4">{booking.villaId?.name || "Unknown Villa"}</td>
                    <td className="px-5 py-4">{booking.villaCount}</td>
                    <td className="px-5 py-4">
                      {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">{booking.status}</td>
                    <td className="px-5 py-4 space-x-2">
                      <button
                        className="rounded-full border border-[#D4AF37] px-3 py-1 text-sm text-[#D4AF37] hover:bg-[#D4AF37]/10"
                        onClick={() => updateStatus(booking._id, "Confirmed")}
                      >
                        Confirm
                      </button>
                      <button
                        className="rounded-full border border-[#D4AF37] px-3 py-1 text-sm text-white hover:bg-[#D4AF37]/10"
                        onClick={() => updateStatus(booking._id, "Cancelled")}
                      >
                        Cancel
                      </button>
                      <button
                        className="rounded-full border border-red-500 px-3 py-1 text-sm text-red-400 hover:bg-red-500/10"
                        onClick={() => deleteBooking(booking._id)}
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
    </div>
  );
}

export default AdminBookings;
