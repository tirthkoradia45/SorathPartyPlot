import entrance from "../assets/entrance.jpg";
import { Link } from "react-router-dom";
import {FaHome,FaSwimmingPool,FaParking,FaBuilding,FaTree,
} from "react-icons/fa";

import { MdMeetingRoom } from "react-icons/md";

function About() {

  return (

    <section
      id="about"
      className="bg-[#111111] py-24"
    >

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}

        <div
          className="text-center mb-12"
          data-aos="fade-up"
        >

          <p className="text-[#D4AF37] uppercase tracking-[8px] mb-4">

            About Us

          </p>

          <h2 className="text-5xl font-serif font-bold text-white">

            Where Every Celebration

          </h2>

          <h2 className="text-5xl font-serif font-bold text-[#D4AF37] mt-3">

            Becomes A Memory

          </h2>

        </div>

        {/* Two Column Layout */}

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Resort Image */}

          <div data-aos="fade-right">

            <img
            src={entrance}
            alt="Sorath Resort"
            className="about-image w-full h-[500px] object-cover rounded-3xl border-2 border-[#D4AF37]/30 shadow-2xl"
            />

          </div>

          

          {/* Content */}

          <div data-aos="fade-left">

            <p className="text-gray-300 leading-8 text-lg">
Sorath Resort & Party Lawns is a premium destination in Junagadh, thoughtfully designed for dream weddings, elegant celebrations, relaxing villa stays, and memorable family gatherings. With luxurious villas, a spacious AC banquet hall, lush green party lawns, and modern amenities, we create experiences that become cherished memories.

            </p>

            {/* Features */}

      <div className="grid grid-cols-2 gap-5 mt-10">

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

              className="inline-block mt-10 border-2 border-[#D4AF37]
              px-10 py-4 rounded-full text-[#D4AF37]
              hover:bg-[#D4AF37]
              hover:text-black transition"

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