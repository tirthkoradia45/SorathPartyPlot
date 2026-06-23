/**
 * Footer Component
 * Displays resort contact information and branding in the page footer
 */
function Footer() {
  return (
    // Footer with dark background and white text
    <footer className="bg-black text-white p-10 text-center">

      {/* Resort Name */}
      <h2 className="text-3xl font-bold">
        Sorath Resort
      </h2>

      {/* Location Information */}
      <p className="mt-4">
        Rajkot, Gujarat
      </p>

      {/* Contact Phone Number (placeholder) */}
      <p>
        Phone: +91 XXXXX XXXXX
      </p>

      {/* Contact Email */}
      <p>
        Email: info@sorathresort.com
      </p>

    </footer>
  );
}

export default Footer;