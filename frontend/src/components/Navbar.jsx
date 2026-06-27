import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

import logo from "../assets/logo.png";

function Navbar() {

  const [mobileMenu, setMobileMenu] = useState(false);
  const [bookMenu, setBookMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 40) {

        setScrolled(true);

      } else {

        setScrolled(false);

      }

    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (

    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#111111]/95 backdrop-blur-xl border-b border-[#D4AF37]/30 shadow-[0_6px_30px_rgba(0,0,0,0.45)]"
          : "bg-[#111111] border-b border-[#D4AF37]/30"
      }`}
    >
    <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 xl:px-12 h-[72px]">

        {/* ================= LOGO ================= */}

        <Link to="/" className="flex items-center flex-shrink-0">

          <img
            src={logo}
            alt="Sorath Resort"
            className="h-[60px] w-auto object-contain transition-transform duration-300 hover:scale-105"
          />

        </Link>

        {/* ================= DESKTOP MENU ================= */}

        <div className="hidden lg:flex flex-1 justify-center items-center gap-14">

          <a href="#home" className="nav-link">
            Home
          </a>

          <a href="#about" className="nav-link">
            About
          </a>

          <a href="#facilities" className="nav-link">
            Facilities
          </a>

          <a href="#gallery" className="nav-link">
            Gallery
          </a>

          <a href="#contact" className="nav-link">
            Contact
          </a>

          {/* BOOK NOW */}

          <div className="relative">

            <button
              onClick={() => setBookMenu(!bookMenu)}
              className="flex items-center gap-2 nav-link"
            >

              Book Now

             <FaChevronDown className={`text-xs transition-transform duration-300 ${bookMenu ? "rotate-180" : ""}`}/>

            </button>

            {bookMenu && (

              <div className="absolute right-0 mt-4 w-60 rounded-xl overflow-hidden bg-[#1B1B1B] border border-[#D4AF37] shadow-2xl">

                <Link
                  to="/villas"
                  className="block px-6 py-4 hover:bg-[#D4AF37] hover:text-black transition"
                >
                  🏡 Book Villas
                </Link>

                <Link
                  to="/party-plot"
                  className="block px-6 py-4 hover:bg-[#D4AF37] hover:text-black transition"
                >
                  💍 Book Wedding
                </Link>

              </div>

            )}

          </div>

          {/* ADMIN */}

          <Link
            to="/admin"
            className="ml-8 border border-[#D4AF37] text-[#D4AF37] px-7 py-2 rounded-full hover:bg-[#D4AF37] hover:text-[#111111] transition-all  duration-300"
          >

            Admin

          </Link>

        </div>

        {/* MOBILE ICON */}

        <button
          className="lg:hidden text-[#D4AF37] text-3xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >

          {mobileMenu ? <FaTimes /> : <FaBars />}

        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}

      {mobileMenu && (

        <div className="lg:hidden bg-[#111111] border-t border-[#D4AF37]">

          <div className="flex flex-col py-6 text-center">

            <a href="#home" className="mobile-link">
              Home
            </a>

            <a href="#about" className="mobile-link">
              About
            </a>

            <a href="#facilities" className="mobile-link">
              Facilities
            </a>

            <a href="#gallery" className="mobile-link">
              Gallery
            </a>

            <a href="#contact" className="mobile-link">
              Contact
            </a>

            <Link to="/villas" className="mobile-link">
              🏡 Book Villas
            </Link>

            <Link to="/party-plot" className="mobile-link">
              💍 Book Wedding
            </Link>

            <Link to="/admin" className="mobile-link">
              Admin
            </Link>

          </div>

        </div>

      )}

    </nav>

  );

}

export default Navbar;