// Import React hooks for state and lifecycle management
import { useEffect, useState } from "react";

// Import axios library for HTTP requests to the backend API
import axios from "axios";

function VillaBooking() {

  // Store the list of villas retrieved from backend
  const [villas, setVillas] = useState([]);

  // Store availability details for the selected villa and date range
  const [availability, setAvailability] = useState(null);

  // Store values from the booking form fields
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    villaId: "",
    villaCount: 1,
    checkInDate: "",
    checkOutDate: "",
  });

  // ===============================
  // FETCH ALL VILLAS
  // ===============================
  useEffect(() => {

    const fetchVillas = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/villas"
        );

        setVillas(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchVillas();

  }, []);

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================
  const handleChange = (e) => {

    const value =
      e.target.type === "number"
        ? Number(e.target.value)
        : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });

  };

  // ===============================
  // CHECK AVAILABILITY
  // ===============================
  // Fetch availability from the backend for the selected villa and dates.
  // The backend returns booked and available villa counts.
  const checkAvailability = async () => {

    if (
      !formData.villaId ||
      !formData.checkInDate ||
      !formData.checkOutDate
    ) {
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/bookings/availability?villaId=${formData.villaId}&checkInDate=${formData.checkInDate}&checkOutDate=${formData.checkOutDate}`
      );

      // save availability response in state for UI display and validation
      setAvailability(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ===============================
  // AUTO CHECK AVAILABILITY
  // ===============================
  // Run availability check whenever the selected villa or dates change.
  useEffect(() => {
    checkAvailability();
  }, [
    formData.villaId,
    formData.checkInDate,
    formData.checkOutDate,
  ]);

  // ===============================
  // SUBMIT BOOKING
  // ===============================
  const handleSubmit = async (e) => {

    e.preventDefault();

    // Frontend Validation
    if (
      availability &&
      formData.villaCount >
      availability.availableVillas
    ) {

      alert(
        `Only ${availability.availableVillas} villas available`
      );

      return;

    }

    try {

      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        formData
      );

      alert("Booking Created Successfully!");

      console.log(response.data);

      setFormData({
        customerName: "",
        phone: "",
        email: "",
        villaId: "",
        villaCount: 1,
        checkInDate: "",
        checkOutDate: "",
      });

      setAvailability(null);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Booking Failed"
      );

    }

  };

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Villa Booking
      </h1>

      {/* Villa Cards */}
      <div className="grid gap-4 mb-10">

        {villas.map((villa) => (

          <div
            key={villa._id}
            className="border p-4 rounded"
          >

            <h2 className="text-xl font-semibold">
              {villa.name}
            </h2>

            <p>{villa.description}</p>

            <p>₹ {villa.price}</p>

            <p>Capacity: {villa.capacity}</p>

            <p>Total Villas: {villa.totalUnits}</p>

            {availability && formData.villaId === villa._id && (

              <>
                <p className="text-red-600 font-semibold">
                  Booked Villas: {availability.bookedVillas}
                </p>

                <p className="text-green-600 font-semibold">
                  Available Villas: {availability.availableVillas}
                </p>
              </>

            )}

          </div>

        ))}

      </div>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="customerName"
          placeholder="Full Name"
          value={formData.customerName}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <select
          name="villaId"
          value={formData.villaId}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        >

          <option value="" disabled>
            {villas.length === 0 ? "Loading villas..." : "Select Villa"}
          </option>

          {villas.map((villa) => (

            <option
              key={villa._id}
              value={villa._id}
            >
              {villa.name}
            </option>

          ))}

        </select>

        <input
          type="number"
          name="villaCount"
          placeholder="Number of Villas"
          value={formData.villaCount}
          onChange={handleChange}
          min="1"
          required
          className="border p-2 w-full"
        />

        <input
          type="date"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />

        <input
          type="date"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 rounded"
        >
          Book Now
        </button>

      </form>

    </div>

  );
}

export default VillaBooking;