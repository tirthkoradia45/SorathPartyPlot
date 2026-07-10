import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaDirections,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject.trim()) {
      toast.error("Please enter a subject.");
      return;
    }

    toast.success("Thanks! Your message has been sent.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };
  return (
    <section
      id="contact"
      className="bg-[#111111] py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
    >
      <Toaster position="top-right" toastOptions={{duration: 3000, style: {background: "#1A1A1A", color: "#fff", border: "1px solid #D4AF37"}}} />
      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div
          className="text-center mb-14 sm:mb-16 lg:mb-20"
          data-aos="fade-up"
        >

          <p className="gallery-subtitle">

            ✦ CONTACT & LOCATION ✦

          </p>

          <h2 className="facility-title">

            Plan Your Perfect Celebration

          </h2>

          <div className="facility-divider">

            <span></span>

            <div className="facility-diamond">

              ✦

            </div>

            <span></span>

          </div>

          <p className="facility-description">

          Whether you're planning a dream wedding,
          a family celebration, or a relaxing getaway,
          we're here to make every moment unforgettable.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

          {/* Left */}

          <div className="contact-card">

            <div className="contact-item">

              <FaMapMarkerAlt className="contact-icon"/>

              <div>

                <h3>📍 Resort Address</h3>

                <p>

                  Near Novelty Furniture,
                  <br/>

                  Shree Vallabhacharya Dwar,
                  <br/>

                  Vaadla Faatak,
                  <br/>

                  Junagadh–Somnath Highway,
                  <br/>

                  Junagadh, Gujarat – 362015

                </p>

              </div>

            </div>

            <div className="contact-item">

              <FaPhoneAlt className="contact-icon"/>

              <div>

                <h3>📞 Call Us</h3>

                <p>

                  <a href="tel:+919428575445">

                    +91 94285 75445

                  </a>

                </p>

              </div>

            </div>

            <div className="contact-item">

              <FaEnvelope className="contact-icon"/>

              <div>

                <h3>✉ Email Us</h3>

                <p>

                  <a href="mailto:info@sorathresort.com">

                    info@sorathresort.com

                  </a>

                </p>

              </div>

            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-5">

              <a
                href="tel:+919428575445"
                className="contact-btn"
              >

                Call Now

              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Sorath+Resort+Party+Lawns+Junagadh"
                target="_blank"
                rel="noopener noreferrer"
                className="direction-btn"
              >

                <FaDirections />

                Get Directions

              </a>

            </div>

          </div>

          {/* Right */}

          <div className="space-y-6">
            <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#D4AF37] mb-4">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#252525] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#252525] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#252525] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#252525] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] text-black font-semibold py-3 rounded-xl hover:bg-[#c49b2c] transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="map-wrapper">

              <iframe
                title="Sorath Resort Map"
                src="https://www.google.com/maps?q=Sorath+Resort+Party+Lawns+Junagadh&output=embed"
                loading="lazy"
                allowFullScreen
              ></iframe>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;