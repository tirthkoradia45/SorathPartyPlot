import {
  FaHotel,
  FaSwimmingPool,
  FaParking,
  FaLandmark,
} from "react-icons/fa";

import { MdCelebration } from "react-icons/md";

const facilities = [
  {
    icon: <FaHotel />,
    title: "40 Premium Villas",
    description:
      "Luxury stay experience with modern comforts and elegant interiors.",
  },
  {
    icon: <FaLandmark />,
    title: "Grand AC Banquet Hall",
    description:
      "Spacious and fully air-conditioned hall with a capacity of up to 1000 guests.",
  },
  {
    icon: <MdCelebration />,
    title: "Wedding Party Lawn",
    description:
      "Expansive lawn perfect for grand weddings and memorable celebrations.",
  },
  {
    icon: <FaSwimmingPool />,
    title: "Swimming Pool",
    description:
      "Relax and refresh in our clean and well-maintained swimming pool.",
  },
  {
    icon: <FaParking />,
    title: "200+ Car Parking",
    description:
      "Spacious and secure parking area for more than 200 vehicles.",
  },
];

function Facilities() {
  return (
    <section
      id="facilities"
      className="bg-[#111111] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

<div
  className="text-center mb-14 sm:mb-20 lg:mb-24"
  data-aos="fade-up"
>



  <h2 className="facility-title">

    Our Facilities

  </h2>

  <div className="facility-divider">

    <span></span>

    <div className="facility-diamond">

      ✦

    </div>

    <span></span>

  </div>

  <p className="facility-description">

    Experience world-class amenities designed to make your stay and
    celebrations

    <span className="text-[#D4AF37] font-semibold">

      {" "}truly unforgettable.

    </span>

  </p>

</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">

          {facilities.slice(0, 3).map((facility, index) => (

            <div
              key={index}
              className="facility-card"
              data-aos="zoom-in"
              data-aos-delay={index * 120}
            >

              <div className="facility-icon-circle">

                <div className="facility-icon">

                  {facility.icon}

                </div>

              </div>

              <h3>

                {facility.title}

              </h3>

              <div className="facility-small-divider"></div>

              <p>

                {facility.description}

              </p>

            </div>

          ))}

        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-8 lg:mt-10">

          {facilities.slice(3).map((facility, index) => (

            <div
              key={index}
              className="facility-card w-full sm:max-w-[420px]"
              data-aos="zoom-in"
              data-aos-delay={(index + 3) * 120}
            >

              <div className="facility-icon-circle">

                <div className="facility-icon">

                  {facility.icon}

                </div>

              </div>

              <h3>

                {facility.title}

              </h3>

              <div className="facility-small-divider"></div>

              <p>

                {facility.description}

              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Facilities;