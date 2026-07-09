const jwt = require("jsonwebtoken");

exports.verifyAdmin = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided.",
      });

    }

    if (!process.env.JWT_SECRET) {

      return res.status(500).json({
        success: false,
        message: "JWT secret is not configured.",
      });

    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.admin = decoded;

    next();

  }

  catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token.",
    });

  }

};