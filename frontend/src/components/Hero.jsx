import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";

function Hero() {

  return (

    <section

      id="home"

      className="relative min-h-screen w-full overflow-hidden"

    >

      {/* ===============================
          BACKGROUND IMAGE
      ================================ */}

      <img

        src={hero}

        alt="Sorath Resort"

        className="absolute inset-0 w-full h-full object-cover hero-image"

      />

      {/* ===============================
          DARK OVERLAY
      ================================ */}

      <div

        className="absolute inset-0" style={{background:"linear-gradient(rgba(0,0,0,0.55), rgba(17,17,17,0.75))",
      }}

      />

      {/* ===============================
          HERO CONTENT
      ================================ */}

      <div

        className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-8 lg:px-10"

      >

        {/* Welcome */}

        <p
          data-aos = "fade-down"
          className="uppercase tracking-[6px] sm:tracking-[8px] text-[#D4AF37] text-xs sm:text-sm md:text-lg mb-4"

        >

          Welcome To

        </p>

        {/* Main Heading */}

        <h1
          data-aos="zoom-in"
          data-aos-delay="200"
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"

        >

          Sorath Resort

        </h1>

        {/* Subtitle */}

        <h2
          data-aos="fade-up"
          data-aos-delay="400"
          className="mt-5 text-[#D4AF37] text-xl sm:text-2xl md:text-3xl font-semibold"

        >

          Where Luxury Meets Celebration

        </h2>

        {/* Description */}

        <p
          data-aos="fade-up"
          data-aos-delay="600"
          className="mt-6 max-w-3xl text-base sm:text-lg md:text-xl text-gray-200 leading-8 px-2"

        >

          Celebrate weddings, family gatherings and unforgettable

          moments surrounded by luxury villas, beautiful lawns,

          a grand banquet hall and premium hospitality.

        </p>

        {/* Buttons */}

 <div
  data-aos="fade-up"
  data-aos-delay="800"
  className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-5 w-full"
>

  {/* Book Villas */}

  <Link
    to="/villas"
    className="inline-flex items-center justify-center w-full max-w-[320px] sm:w-72 h-14 sm:h-[68px] border-2 border-[#D4AF37] rounded-full text-[#D4AF37] text-lg sm:text-xl font-bold whitespace-nowrap transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#111111] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]"
  >
    Book Villas
  </Link>

  {/* Book Wedding */}

  <Link
    to="/party-plot"
    className="inline-flex items-center justify-center w-full max-w-[320px] sm:w-72 h-14 sm:h-[68px] border-2 border-[#D4AF37] rounded-full text-[#D4AF37] text-lg sm:text-xl font-bold whitespace-nowrap transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#111111] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]"
  >
    Book Wedding
  </Link>

</div>
</div>
{/* ===============================
    LUXURY SCROLL INDICATOR
================================ */}

<div
  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
  data-aos="fade-up"
  data-aos-delay="1200"
>

  <div className="flex flex-col items-center">

    {/* Text */}

    <p className="text-[#D4AF37] text-base font-semibold tracking-[12px] uppercase mb-1">

      SCROLL DOWN

    </p>

    {/* Arrow */}

    <span className="luxury-arrow -mt-2">

      ↓

    </span>

  </div>

</div>

    </section>

  );

}

export default Hero;