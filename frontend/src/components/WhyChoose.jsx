import {
  FaHotel,
  FaCar,
  FaSwimmingPool,
} from "react-icons/fa";

import { MdCelebration } from "react-icons/md";

const reasons = [
  {
    icon: <FaHotel />,
    title: "40 Luxury Villas",
    description:
      "Experience premium accommodation with spacious villas designed for comfort and relaxation.",
  },
  {
    icon: <MdCelebration />,
    title: "Destination Weddings",
    description:
      "Celebrate unforgettable weddings and events in our elegant banquet hall and party lawn.",
  },
  {
    icon: <FaSwimmingPool />,
    title: "Swimming Pool",
    description:
      "Relax, unwind and enjoy refreshing moments with family and friends.",
  },
  {
    icon: <FaCar />,
    title: "200+ Car Parking",
    description:
      "Ample secure parking space ensuring convenience for every guest and event.",
  },
];

function WhyChoose() {
  return (
    <section
      id="why"
      className="bg-[#111111] py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div
          className="text-center mb-14 sm:mb-16 lg:mb-20"
          data-aos="fade-up"
        >

          <p className="gallery-subtitle">

           ✦ WHY CHOOSE SORATH ✦

          </p>

          <h2 className="facility-title">

           Experience Luxury Beyond Expectations

          </h2>

          <div className="facility-divider">

            <span></span>

            <div className="facility-diamond">

              ✦

            </div>

            <span></span>

          </div>

          <p className="facility-description">

          From luxurious villas to unforgettable weddings,
          every experience at Sorath Resort is thoughtfully crafted
          to create lasting memories.

</p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mt-10 sm:mt-14 lg:mt-16">

         {reasons.map((item, index) => (

  <div
    key={index}
    className="why-card"
    data-aos="fade-up"
    data-aos-delay={index * 120}
  >

    <div className="why-top">

      <div className="why-icon-circle">

        <div className="why-icon">

          {item.icon}

        </div>

      </div>

      <div>

        <h3>

          {item.title}

        </h3>

        <div className="why-divider"></div>

      </div>

    </div>

    <p>

      {item.description}

    </p>

  </div>

))}

        </div>

      </div>
    </section>
  );
}

export default WhyChoose;