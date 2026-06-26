// Import React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import Home from "./pages/Home";
import VillaBooking from "./pages/VillaBooking";
import PartyPlotBooking from "./pages/PartyPlotBooking";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminBookings from "./pages/AdminBookings"; // NEW IMPORT

/**
 * Main App Component
 * Manages application routing and displays different pages based on URL path
 */
function App() {
  return (
    // BrowserRouter: Enables client-side routing
    <BrowserRouter>

      {/* All Application Routes */}
      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Villa Booking */}
        <Route
          path="/villas"
          element={<VillaBooking />}
        />

        {/* Party Plot Booking */}
        <Route
          path="/party-plot"
          element={<PartyPlotBooking />}
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Admin Login */}
        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        {/* Admin Bookings */}
        <Route
          path="/admin/bookings"
          element={<AdminBookings />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;