// Import React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import Home from "./pages/Home";
import VillaBooking from "./pages/VillaBooking";
import PartyPlotBooking from "./pages/PartyPlotBooking";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";

/**
 * Main App Component
 * Manages application routing and displays different pages based on URL path
 */
function App() {
  return (
    // BrowserRouter: Enables client-side routing in the application
    <BrowserRouter>
      {/* Routes: Container for all route definitions */}
      <Routes>

        {/* Homepage: Welcome page with resort information */}
        <Route path="/" element={<Home />} />

        {/* Villa Booking Page: Allows users to browse and book villas */}
        <Route path="/villas" element={<VillaBooking />} />

        {/* Party Plot Booking Page: Allows users to book party plots */}
        <Route path="/party-plot" element={<PartyPlotBooking />} />

        {/* Contact Page: Displays contact information and inquiries */}
        <Route path="/contact" element={<Contact />} />

        {/* Admin Login Page: Administrative access for staff */}
        <Route path="/admin" element={<AdminLogin />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;