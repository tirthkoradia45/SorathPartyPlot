require("dotenv").config();

const app = require("./src/app");

const connectDB = require("./src/config/db");

const Villa = require("./src/models/Villa");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

const ensureDefaultVilla = async () => {
  try {
    const count = await Villa.countDocuments();

    if (count === 0) {
      await Villa.create({
        name: "Sorath Villa",
        description: "Luxury villa with private pool, garden, and premium resort amenities.",
        price: 12000,
        capacity: 8,
        totalUnits: 8,
      });

      console.log("Default Sorath Villa created.");
    }
  } catch (error) {
    console.warn("Default villa seed skipped:", error.message);
  }
};

connectDB()
  .then(async () => {
    await ensureDefaultVilla();
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });