import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

import logo from "../assets/logo.png";

function Navbar() {

  const [mobileMenu, setMobileMenu] = useState(false);
  const [bookMenu, setBookMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const dropdownRef = useRef(null);

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 40);

      const sections = [
        "home",
        "about",
        "facilities",
        "gallery",
        "contact",
      ];

      sections.forEach((section) => {

        const element = document.getElementById(section);

        if (!element) return;

        const top = element.offsetTop - 120;
        const height = element.offsetHeight;

        if (
          window.scrollY >= top &&
          window.scrollY < top + height
        ) {
          setActiveSection(section);
        }

      });

    };

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {

        setBookMenu(false);

      }

    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {

      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  const closeMenus = () => {

    setBookMenu(false);
    setMobileMenu(false);

  };

  return (

    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#111111]/95 backdrop-blur-xl border-b border-[#D4AF37]/30 shadow-[0_6px_30px_rgba(0,0,0,.45)]"
          : "bg-[#111111] border-b border-[#D4AF37]/30"
      }`}
    >

      <div
        className={`max-w-[1600px] mx-auto flex items-center justify-between px-6 xl:px-12 transition-all duration-500 ${
          scrolled ? "h-[60px]" : "h-[72px]"
        }`}
      >

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          onClick={closeMenus}
          className="flex items-center flex-shrink-0"
        >

          <img
            src={logo}
            alt="Sorath Resort"
            className={`transition-all duration-500 ${
              scrolled
                ? "h-[48px]"
                : "h-[60px]"
            } w-auto object-contain hover:scale-105`}
          />

        </Link>

        {/* ================= DESKTOP MENU ================= */}

        <div className="hidden lg:flex flex-1 justify-center items-center gap-12">

          <a
            href="#home"
            className={`nav-link ${
              activeSection === "home"
                ? "text-[#D4AF37]"
                : ""
            }`}
          >
            Home
          </a>

          <a
            href="#about"
            className={`nav-link ${
              activeSection === "about"
                ? "text-[#D4AF37]"
                : ""
            }`}
          >
            About
          </a>

          <a
            href="#facilities"
            className={`nav-link ${
              activeSection === "facilities"
                ? "text-[#D4AF37]"
                : ""
            }`}
          >
            Facilities
          </a>

          <a
            href="#gallery"
            className={`nav-link ${
              activeSection === "gallery"
                ? "text-[#D4AF37]"
                : ""
            }`}
          >
            Gallery
          </a>

          <a
            href="#contact"
            className={`nav-link ${
              activeSection === "contact"
                ? "text-[#D4AF37]"
                : ""
            }`}
          >
            Contact
          </a>

          <Link
            to="/check-availability"
            onClick={closeMenus}
            className="px-5 py-2 rounded-full border border-[#D4AF37]
                       text-[#D4AF37] font-semibold
                       hover:bg-[#D4AF37]
                       hover:text-black
                       transition-all duration-300"
          >
            Check Availability
          </Link>

          {/* BOOK NOW */}

          <div
            className="relative"
            ref={dropdownRef}
          >

            <button
              onClick={() => setBookMenu(!bookMenu)}
              className="flex items-center gap-2 nav-link"
            >

              Book Now

              <FaChevronDown
                className={`text-xs transition-transform duration-300 ${
                  bookMenu ? "rotate-180" : ""
                }`}
              />

            </button>
                        {bookMenu && (

              <div className="absolute right-0 mt-4 w-72 rounded-2xl overflow-hidden bg-[#1B1B1B] border border-[#D4AF37]/40 shadow-[0_15px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">

                <Link
                  to="/villas"
                  onClick={closeMenus}
                  className="flex items-center gap-3 px-6 py-4 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                >

                  <span className="text-xl">🏡</span>

                  <div>

                    <p className="font-semibold">

                      Luxury Villas

                    </p>

                    <p className="text-xs opacity-70">

                      Premium stay experience

                    </p>

                  </div>

                </Link>

                <Link
                  to="/party-plot"
                  onClick={closeMenus}
                  className="flex items-center gap-3 px-6 py-4 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                >

                  <span className="text-xl">💍</span>

                  <div>

                    <p className="font-semibold">

                      Party Plot Booking

                    </p>

                    <p className="text-xs opacity-70">

                      Weddings & Grand Events

                    </p>

                  </div>

                </Link>

                <Link
                  to="/check-availability"
                  onClick={closeMenus}
                  className="flex items-center gap-3 px-6 py-4 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                >

                  <span className="text-xl">📅</span>

                  <div>

                    <p className="font-semibold">

                      Check Availability

                    </p>

                    <p className="text-xs opacity-70">

                      View available dates instantly

                    </p>

                  </div>

                </Link>

              </div>

            )}

          </div>

          {/* ================= ADMIN BUTTON ================= */}

          <Link
            to="/admin/login"
            onClick={closeMenus}
            className="ml-6 border border-[#D4AF37]
                       text-[#D4AF37]
                       px-7 py-2 rounded-full
                       hover:bg-[#D4AF37]
                       hover:text-black
                       transition-all duration-300
                       hover:shadow-[0_0_20px_rgba(212,175,55,.35)]"
          >

            Admin

          </Link>

        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}

        <button
          className="lg:hidden text-[#D4AF37] text-3xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >

          {mobileMenu ? <FaTimes /> : <FaBars />}

        </button>

      </div>
            {/* ================= MOBILE MENU ================= */}

      {mobileMenu && (

        <div className="lg:hidden bg-[#111111]/95 backdrop-blur-xl border-t border-[#D4AF37]/30 shadow-2xl">

          <div className="flex flex-col py-6">

            <a
              href="#home"
              onClick={closeMenus}
              className={`mobile-link ${
                activeSection === "home"
                  ? "text-[#D4AF37]"
                  : ""
              }`}
            >
              Home
            </a>

            <a
              href="#about"
              onClick={closeMenus}
              className={`mobile-link ${
                activeSection === "about"
                  ? "text-[#D4AF37]"
                  : ""
              }`}
            >
              About
            </a>

            <a
              href="#facilities"
              onClick={closeMenus}
              className={`mobile-link ${
                activeSection === "facilities"
                  ? "text-[#D4AF37]"
                  : ""
              }`}
            >
              Facilities
            </a>

            <a
              href="#gallery"
              onClick={closeMenus}
              className={`mobile-link ${
                activeSection === "gallery"
                  ? "text-[#D4AF37]"
                  : ""
              }`}
            >
              Gallery
            </a>

            <a
              href="#contact"
              onClick={closeMenus}
              className={`mobile-link ${
                activeSection === "contact"
                  ? "text-[#D4AF37]"
                  : ""
              }`}
            >
              Contact
            </a>

            <div className="border-t border-[#D4AF37]/20 my-4"></div>

            <Link
              to="/check-availability"
              onClick={closeMenus}
              className="mobile-link text-[#D4AF37] font-semibold"
            >
              📅 Check Availability
            </Link>

            <Link
              to="/villas"
              onClick={closeMenus}
              className="mobile-link"
            >
              🏡 Luxury Villas
            </Link>

            <Link
              to="/party-plot"
              onClick={closeMenus}
              className="mobile-link"
            >
              💍 Party Plot Booking
            </Link>

            <div className="border-t border-[#D4AF37]/20 my-4"></div>

            <Link
              to="/admin/login"
              onClick={closeMenus}
              className="mx-6 text-center border border-[#D4AF37]
                         text-[#D4AF37]
                         py-3 rounded-full
                         hover:bg-[#D4AF37]
                         hover:text-black
                         transition-all duration-300"
            >
              Admin
            </Link>

          </div>

        </div>

      )}

    </nav>

  );

}

export default Navbar;