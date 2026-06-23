// Import React hooks for state management and side effects
import { useEffect, useState } from "react";
// Import axios for making HTTP requests to backend API
import axios from "axios";

/**
 * VillaBooking Page Component
 * Page for customers to browse available villas and create bookings
 * Features:
 *   - Display list of all available villas with details
 *   - Show villa information (name, price, capacity, units)
 *   - Allow customers to fill booking form with their details
 *   - Submit bookings to backend API
 */
function VillaBooking() {
  // State to store list of all available villas fetched from backend
  const [villas, setVillas] = useState([]);

  // State to store booking form data entered by user
  const [formData, setFormData] = useState({
    customerName: "",      // Customer's full name
    phone: "",             // Customer's phone number
    email: "",             // Customer's email address
    villaId: "",           // Selected villa ID from dropdown
    checkInDate: "",       // Booking check-in date
    checkOutDate: "",      // Booking check-out date
  });

  /**
   * useEffect: Fetch villas from backend API on component mount
   * Runs once when component loads (empty dependency array)
   * Makes GET request to retrieve all available villas from backend
   */
  useEffect(() => {
    const fetchVillas = async () => {
      try {
        // Call backend API to get all villas
        const response = await axios.get(
          "http://localhost:5000/api/villas"
        );
        // Update state with fetched villas data
        setVillas(response.data);
      } catch (error) {
        // Log error if API call fails (e.g., backend not running)
        console.log(error);
      }
    };

    // Execute fetch function immediately
    fetchVillas();
  }, []); // Empty dependency array means this runs only once on mount

  /**
   * Handle form input changes
   * Updates formData state when user types in any form field
   * Uses dynamic property name to update correct field
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Submit booking form to backend API
   * Makes POST request with all booking details
   * Resets form on success, shows alert on failure
   */
  const handleSubmit = async (e) => {
    // Prevent default form submission and page reload
    e.preventDefault();

    try {
      // Call backend API to create new booking
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        formData
      );

      // Show success message to user
      alert("Booking Created Successfully!");
      // Log response for debugging
      console.log(response.data);

      // Clear all form fields after successful booking
      setFormData({
        customerName: "",
        phone: "",
        email: "",
        villaId: "",
        checkInDate: "",
        checkOutDate: "",
      });

    } catch (error) {
      // Log error for debugging
      console.log(error);
      // Show error message to user
      alert("Booking Failed");
    }
  };

  return (
    <div className="p-8">

      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        Villa Booking
      </h1>

      {/* Villa List Section: Display all available villas */}
      <div className="grid gap-4 mb-10">

        {/* Map through villas array and display each villa */}
        {villas.map((villa) => (
          <div
            key={villa._id}
            className="border p-4 rounded"
          >
            {/* Villa Name/Type */}
            <h2>{villa.name}</h2>

            {/* Price per Night in Indian Rupees */}
            <p>₹ {villa.price}</p>

            {/* Maximum number of guests */}
            <p>Capacity: {villa.capacity}</p>

            {/* Total units available */}
            <p>Total Villas: {villa.totalUnits}</p>

          </div>
        ))}

      </div>

      {/* Booking Form: Collect customer and booking details */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Customer Name Input */}
        <input
          type="text"
          name="customerName"
          placeholder="Full Name"
          value={formData.customerName}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        {/* Phone Number Input */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        {/* Email Address Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="border p-2 w-full"
        />

        {/* Villa Selection Dropdown */}
        <select
          name="villaId"
          onChange={handleChange}
          value={formData.villaId}
          className="border p-2 w-full"
        >
          <option value="">
            Select Villa
          </option>

          {/* Generate options for each available villa */}
          {villas.map((villa) => (
            <option
              key={villa._id}
              value={villa._id}
            >
              {villa.name}
            </option>
          ))}
        </select>

        {/* Check-in Date Input */}
        <input
          type="date"
          name="checkInDate"
          onChange={handleChange}
          value={formData.checkInDate}
          className="border p-2 w-full"
        />

        {/* Check-out Date Input */}
        <input
          type="date"
          name="checkOutDate"
          onChange={handleChange}
          value={formData.checkOutDate}
          className="border p-2 w-full"
        />

        {/* Submit Button */}
        <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded">
          Book Now
        </button>

      </form>

    </div>
  );
}

export default VillaBooking;