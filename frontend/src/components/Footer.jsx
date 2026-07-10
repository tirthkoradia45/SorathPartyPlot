import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="footer">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top */}

        <div className="footer-grid">

          {/* Resort */}

          <div>

            <img
              src={logo}
              alt="Sorath Resort"
              className="footer-logo"
            />

            <h2>

              Sorath Resort & Party Lawns

            </h2>

            <p>

              Experience luxury villas, destination weddings,
              elegant celebrations and unforgettable hospitality
              in the heart of Junagadh.

            </p>

          </div>

          {/* Links */}

          <div>

            <h3>

              Quick Links

            </h3>

            <ul>

              <li><a href="/">Home</a></li>

              <li><a href="#about">About</a></li>

              <li><a href="#facilities">Facilities</a></li>

              <li><a href="#gallery">Gallery</a></li>

              <li><a href="#contact">Contact</a></li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3>

              Contact

            </h3>

            <p>

              <FaMapMarkerAlt />

              Near Novelty Furniture,
              Junagadh–Somnath Highway,
              Junagadh – 362015

            </p>

            <p>

              <FaPhoneAlt />

              <a href="tel:+919428575445">

                +91 94285 75445

              </a>

            </p>

            <p>

              <FaEnvelope />

              <a href="mailto:info@sorathresort.com">

                info@sorathresort.com

              </a>

            </p>

          </div>

        </div>

        {/* Social */}

        <div className="footer-social mt-10">

          <a href="#">

            <FaInstagram />

          </a>

          <a href="#">

            <FaFacebookF />

          </a>

          <a href="https://wa.me/919428575445">

            <FaWhatsapp />

          </a>

        </div>

        {/* Bottom */}

        <div className="footer-bottom">

          © 2026 Sorath Resort & Party Lawns.
          All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;