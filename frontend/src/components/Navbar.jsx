import { Link } from "react-router-dom";

/**
 * Navbar Component
 * Displays the navigation bar with resort logo and menu links
 */
function Navbar() {
  return (
    // Navigation bar with dark green background and white text
    <nav className="bg-green-800 text-white px-8 py-4">

      <div className="flex justify-between items-center">

        {/* Resort Logo/Name */}
        <h1 className="text-3xl font-bold">
          Sorath Resort
        </h1>

        {/* Navigation Links */}
        <div className="space-x-6">
          {/* Link to Homepage */}
          <Link to="/">Home</Link>

          {/* Link to Villas Booking Page */}
          <Link to="/villas">Villas</Link>

          {/* Link to Party Plot Booking Page */}
          <Link to="/party-plot">Party Plot</Link>

          {/* Link to Contact Page */}
          <Link to="/contact">Contact</Link>

          {/* Link to Admin Login Page */}
          <Link to="/admin">Admin</Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;