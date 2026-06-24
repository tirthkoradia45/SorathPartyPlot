const Villa = require("../models/Villa");

const getAllVillas = async (req, res) => {
  try {
    const villas = await Villa.find().lean();

    console.log("RAW VILLAS:");
    console.log(JSON.stringify(villas, null, 2));

    res.json(villas);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllVillas
};