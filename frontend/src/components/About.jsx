import entrance from "../assets/entrance.jpg";
import { Link } from "react-router-dom";
import {FaHome,FaSwimmingPool,FaParking,FaBuilding,FaTree,
} from "react-icons/fa";

import { MdMeetingRoom } from "react-icons/md";

function About() {

  return (

    <section
      id="about"
      className="bg-[#111111] py-16 sm:py-20 lg:py-24"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}

        <div
          className="text-center mb-12"
          data-aos="fade-up"
        >

          <p className="text-[#D4AF37] uppercase tracking-[4px] sm:tracking-[6px] md:tracking-[8px] text-xs sm:text-sm mb-4">

            About Us

          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">

            Where Every Celebration

          </h2>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#D4AF37] mt-2 sm:mt-3 leading-tight">

            Becomes A Memory

          </h2>

        </div>

        {/* Two Column Layout */}

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Resort Image */}

          <div data-aos="fade-right">

            <img
            src={entrance}
            alt="Sorath Resort"
            className="about-image w-full h-[260px] sm:h-[380px] lg:h-[500px] object-cover rounded-2xl lg:rounded-3xl border-2 border-[#D4AF37]/30 shadow-2xl"
            />

          </div>

          

          {/* Content */}

          <div data-aos="fade-left">

            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8 text-center lg:text-left">
Sorath Resort & Party Lawns is a premium destination in Junagadh, thoughtfully designed for dream weddings, elegant celebrations, relaxing villa stays, and memorable family gatherings. With luxurious villas, a spacious AC banquet hall, lush green party lawns, and modern amenities, we create experiences that become cherished memories.

            </p>

            {/* Features */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-8">

  <div className="feature-box">
    <FaHome className="feature-icon" />
    <span>40 Luxury Villas</span>
  </div>

  <div className="feature-box">
    <FaBuilding className="feature-icon" />
    <span>AC Banquet Hall</span>
  </div>

  <div className="feature-box">
    <FaTree className="feature-icon" />
    <span>Wedding Party Plot</span>
  </div>

  <div className="feature-box">
    <FaSwimmingPool className="feature-icon" />
    <span>Swimming Pool</span>
  </div>

  <div className="feature-box">
    <MdMeetingRoom className="feature-icon" />
    <span>Conference Hall</span>
  </div>

  <div className="feature-box">
    <FaParking className="feature-icon" />
    <span>200+ Car Parking</span>
  </div>

</div>

            {/* Button */}

            <Link

              to="/villas"

           className="inline-flex justify-center items-center mt-8 w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-4 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] font-semibold transition-all duration-300 hover:bg-[#D4AF37] hover:text-black"

            >

              Explore Villas

            </Link>

          </div>

        </div>

      </div>

    </section>

  );

}

export default About;