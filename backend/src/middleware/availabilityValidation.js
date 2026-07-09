const {
    isValidObjectId,
    isValidDateRange
} = require("../utils/validators");

const validateAvailability = (req, res, next) => {

    const {

        villaId,
        checkInDate,
        checkOutDate

    } = req.query;

    // Required Fields


    if (

        !villaId ||
        !checkInDate ||
        !checkOutDate

    ) {

        return res.status(400).json({

            success: false,

            message: "Villa ID, check-in date and check-out date are required."

        });

    }
    // Villa ID Validation
    if (!isValidObjectId(villaId)) {

        return res.status(400).json({

            success: false,

            message: "Invalid villa selected."

        });

    }

    // Date Validation
    if (!isValidDateRange(checkInDate, checkOutDate)) {

        return res.status(400).json({

            success: false,

            message: "Please enter valid booking dates."

        });

    }

    next();

};

module.exports = {

    validateAvailability

};