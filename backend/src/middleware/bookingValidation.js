const {
    isValidPhone,
    isValidEmail,
    isValidObjectId,
    isValidDateRange,
    hasRequiredFields
} = require("../utils/validators");

const validateBooking = (req, res, next) => {

    const {

        customerName,
        phone,
        email,
        villaId,
        villaCount,
        checkInDate,
        checkOutDate

    } = req.body;
    // Required Fields


    if (

        !hasRequiredFields({

            customerName,
            phone,
            email,
            villaId,
            villaCount,
            checkInDate,
            checkOutDate

        })

    ) {

        return res.status(400).json({

            success: false,
            message: "All fields are required."

        });

    }

    // Customer Name

    if (customerName.trim().length < 3) {

        return res.status(400).json({

            success: false,
            message: "Customer name must contain at least 3 characters."

        });

    }

    // Phone
    if (!isValidPhone(phone)) {

        return res.status(400).json({

            success: false,
            message: "Please enter a valid Indian mobile number."

        });

    }

    // Email


    if (!isValidEmail(email)) {

        return res.status(400).json({

            success: false,
            message: "Please enter a valid email address."

        });

    }

    // Villa ID
  

    if (!isValidObjectId(villaId)) {

        return res.status(400).json({

            success: false,
            message: "Invalid villa selected."

        });

    }

    // Villa Count
  

    const villaCountNumber = Number(villaCount);

    if (

        !Number.isInteger(villaCountNumber) ||

        villaCountNumber < 1

    ) {

        return res.status(400).json({

            success: false,
            message: "At least one villa must be booked."

        });

    }

    // Date Validation
   

    if (

        !isValidDateRange(

            checkInDate,

            checkOutDate

        )

    ) {

        return res.status(400).json({

            success: false,
            message:
                "Please enter valid check-in and check-out dates."

        });

    }

    next();

};

module.exports = {

    validateBooking

};