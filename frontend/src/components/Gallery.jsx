import entrance from "../assets/entrance.jpg";
import villa from "../assets/villa.jpg";
import hall from "../assets/hall.jpg";
import lawn from "../assets/lawn.jpg";
import pool from "../assets/pool.jpg";

function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-[#111111] py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* ==========================
              SECTION HEADING
        ========================== */}

        <div
          className="text-center mb-20"
          data-aos="fade-up"
        >

          <p className="gallery-subtitle">

            ✦ DISCOVER OUR GALLERY ✦

          </p>

          <h2 className="facility-title">

            Discover Sorath Resort

          </h2>

          <div className="facility-divider">

            <span></span>

            <div className="facility-diamond">

              ✦

            </div>

            <span></span>

          </div>

          <p className="facility-description">

            Step inside Sorath Resort and experience the elegance,
            luxury and beauty that make every celebration unforgettable.

          </p>

        </div>

        {/* ==========================
              FEATURE IMAGE
        ========================== */}

        <div
          className="gallery-hero"
          data-aos="fade-up"
        >

          <img
            src={entrance}
            alt="Main Entrance"
            className="gallery-image"
          />

          <div className="gallery-overlay">

            <div>

             <h2>

            Where Luxury Meets Nature

            </h2>

             <p>

            Sorath Resort • Junagadh
      
            </p>

            </div>

          </div>

        </div>

        {/* ==========================
                GALLERY GRID
        ========================== */}

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          {/* Villas */}

          <div
            className="gallery-card"
            data-aos="zoom-in"
          >

            <img
              src={villa}
              alt="Luxury Villas"
              className="gallery-image"
            />

            <div className="gallery-overlay">

              <h3>

                Luxury Villas

              </h3>

            </div>

          </div>

          {/* Lawn */}

          <div
            className="gallery-card"
            data-aos="zoom-in"
            data-aos-delay="100"
          >

            <img
              src={lawn}
              alt="Wedding Lawn"
              className="gallery-image"
            />

            <div className="gallery-overlay">

              <h3>

                Wedding Party Lawn

              </h3>

            </div>

          </div>

          {/* Pool */}

          <div
            className="gallery-card"
            data-aos="zoom-in"
            data-aos-delay="200"
          >

            <img
              src={pool}
              alt="Swimming Pool"
              className="gallery-image"
            />

            <div className="gallery-overlay">

              <h3>

                Swimming Pool

              </h3>

            </div>

          </div>

          {/* Hall */}

          <div
            className="gallery-card"
            data-aos="zoom-in"
            data-aos-delay="300"
          >

            <img
              src={hall}
              alt="Banquet Hall"
              className="gallery-image"
            />

            <div className="gallery-overlay">

              <h3>

                Grand AC Banquet Hall

              </h3>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Gallery;