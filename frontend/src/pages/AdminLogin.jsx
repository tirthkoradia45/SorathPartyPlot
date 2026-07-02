import { useState,useEffect } from "react";
import { FaUserShield, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { buildApiUrl } from "../config/api";

import logo from "../assets/logo.png";

function AdminLogin() {

  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {

  const token = localStorage.getItem("adminToken");

  if (token && location.pathname === "/admin") {

    navigate("/admin/dashboard", { replace: true });

  }

}, [navigate, location.pathname]);

const handleLogin = async (e) => {

  e.preventDefault();

  if (!username.trim()) {
    setError("Please enter your username.");
    return;
  }

  if (!password.trim()) {
    setError("Please enter your password.");
    return;
  }

  setLoading(true);
  setError("");

  try {

    const response = await axios.post(
      buildApiUrl("/api/admin/login"),
      {
        username,
        password,
      }
    );

  if (response.data.success) {

  toast.success("Login successful.");

  localStorage.setItem(
    "adminToken",
    response.data.token
  );

  navigate("/admin/dashboard");

}

  } catch (error) {

    console.error(error);

    if (!error.response) {
      setError("Unable to connect to the server. Please try again later.");
    } else {
      setError(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );
    }

  } finally {

    setLoading(false);

  }

};
  return (

    <div className="min-h-screen bg-[#111111] text-white flex">

      {/* ==========================================
          LEFT SECTION
      ========================================== */}

      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-20 bg-gradient-to-br from-[#111111] to-[#1A1A1A]">

        <img
          src={logo}
          alt="Sorath Resort"
          className="w-40 mb-10"
        />

        <p className="uppercase tracking-[0.4em] text-[#D4AF37] mb-6">

          Luxury Resort Management

        </p>

        <h1 className="font-serif text-6xl font-bold leading-tight mb-8">

          Administrator Portal

        </h1>

        <p className="text-gray-400 text-xl leading-9 max-w-xl">

          Securely manage villa bookings, wedding reservations,
          customer records and resort operations from one premium dashboard.

        </p>

      </div>

      {/* ==========================================
          RIGHT SECTION
      ========================================== */}

      <div className="flex-1 flex items-center justify-center px-8 py-16">

        <div className="w-full max-w-md bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-10 shadow-[0_0_40px_rgba(212,175,55,.15)]">

          <div className="flex justify-center mb-8">

            <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">

              <FaUserShield
                className="text-[#D4AF37]"
                size={36}
              />

            </div>

          </div>

          <h2 className="text-center font-serif text-4xl font-bold mb-3">

            Admin Login

          </h2>

          <p className="text-center text-gray-400 mb-10">

            Authorized Personnel Only

          </p>
                    {/* ==========================================
              LOGIN FORM
          ========================================== */}

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >

            {/* Username */}

            <div>

              <label className="block text-gray-300 mb-2 font-medium">

                Username

              </label>

              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#111111]
                           border border-[#D4AF37]/20
                           rounded-xl
                           px-5
                           py-4
                           text-white
                           placeholder:text-gray-500
                           focus:outline-none
                           focus:border-[#D4AF37]
                           focus:ring-2
                           focus:ring-[#D4AF37]/20
                           transition-all duration-300"
              />

            </div>

            {/* Password */}

            <div>

              <label className="block text-gray-300 mb-2 font-medium">

                Password

              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#111111]
                             border border-[#D4AF37]/20
                             rounded-xl
                             px-5
                             py-4
                             pr-14
                             text-white
                             placeholder:text-gray-500
                             focus:outline-none
                             focus:border-[#D4AF37]
                             focus:ring-2
                             focus:ring-[#D4AF37]/20
                             transition-all duration-300"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#D4AF37] hover:scale-110 transition-all"
                >

                  {showPassword ? (

                    <FaEyeSlash />

                  ) : (

                    <FaEye />

                  )}

                </button>

              </div>

            </div>
                        {/* ==========================================
                ERROR MESSAGE
            ========================================== */}

            {error && (

              <div className="bg-red-500/10 border border-red-500 rounded-xl p-4">

                <p className="text-red-400 text-center">

                  {error}

                </p>

              </div>

            )}

            {/* ==========================================
                LOGIN BUTTON
            ========================================== */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#D4AF37] text-black hover:bg-[#e4c25a] hover:shadow-[0_0_25px_rgba(212,175,55,.40)] hover:-translate-y-1"
              }`}
            >

              {loading ? (

                <div className="flex justify-center items-center gap-3">

                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>

                  Logging In...

                </div>

              ) : (

                "Login to Dashboard"

              )}

            </button>

            <p className="text-center text-gray-500 text-sm mt-6">

              Secure Access • Sorath Resort Management System

            </p>

          </form>
                    {/* ==========================================
              SECURITY NOTICE
          ========================================== */}

          <div className="mt-10 pt-6 border-t border-[#D4AF37]/20">

            <p className="text-center text-gray-500 text-sm">

              🔒 This portal is restricted to authorized Sorath Resort administrators only.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminLogin;