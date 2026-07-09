const {
    isValidPhone,
    isValidEmail,
    isValidDateRange,
    hasRequiredFields
} = require("../utils/validators");

const validateWeddingBooking = (req, res, next) => {

    const {

        customerName,
        phone,
        email,
        startDate,
        endDate,
        swimmingPool,
        generator,
        estimatedAmount

    } = req.body;

    // Required Fields
  

    if (

        !hasRequiredFields({

            customerName,
            phone,
            email,
            startDate,
            endDate,
            estimatedAmount

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

    // Date Validation

    if (

        !isValidDateRange(

            startDate,

            endDate

        )

    ) {

        return res.status(400).json({

            success: false,
            message:
                "Please enter valid wedding booking dates."

        });

    }

    // Estimated Amount
  

    const amount = Number(estimatedAmount);

    if (

        Number.isNaN(amount) ||

        amount <= 0

    ) {

        return res.status(400).json({

            success: false,
            message: "Estimated amount must be greater than zero."

        });

    }

    // Optional Boolean Validation


    if (

        swimmingPool !== undefined &&

        typeof swimmingPool !== "boolean"

    ) {

        return res.status(400).json({

            success: false,
            message: "Invalid swimming pool selection."

        });

    }

    if (

        generator !== undefined &&

        typeof generator !== "boolean"

    ) {

        return res.status(400).json({

            success: false,
            message: "Invalid generator selection."

        });

    }

    next();

};

module.exports = {

    validateWeddingBooking

};