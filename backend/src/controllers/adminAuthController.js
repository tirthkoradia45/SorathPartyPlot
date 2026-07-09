const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin Login
exports.loginAdmin = async (req, res) => {

  try {

    const { username, password } = req.body;

    // Check for empty fields
    if (!username || !password) {

      return res.status(400).json({
        success: false,
        message: "Username and Password are required.",
      });

    }

    // Find Admin
    const admin = await Admin.findOne({ username: username.trim() });

    if (!admin) {

      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });

    }

    // Compare Password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordCorrect) {

      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });

    }
    if (!process.env.JWT_SECRET) {

    return res.status(500).json({

        success: false,

        message: "JWT secret is not configured."

    });

}

    // Generate JWT Token
    const token = jwt.sign(

      {
        id: admin._id,
        username: admin.username,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: process.env.JWT_EXPIRE,
      }

    );

    return res.status(200).json({

      success: true,

      message: "Login Successful",

      token,

      admin: {

        id: admin._id,
        username: admin.username,

      }

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error",

    });

  }

};