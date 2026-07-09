const mongoose = require("mongoose");

// Phone Validation
const phoneRegex = /^[6-9]\d{9}$/;
const repeatedDigitsRegex = /^(\d)\1{9}$/;

const isValidPhone = (phone) => {
    if (!phoneRegex.test(phone)) {
        return false;
    }

    if (repeatedDigitsRegex.test(phone)) {
        return false;
    }

    return true;
};
// Email Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (email) => {
    return emailRegex.test(email);
};

// Mongo ObjectId Validation


const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

// Date Validation
const isValidDateRange = (startDate, endDate) => {

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (
        isNaN(start.getTime()) ||
        isNaN(end.getTime())
    ) {
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
        return false;
    }

    if (end <= start) {
        return false;
    }

    return true;
};

// Required Fields Validation

const hasRequiredFields = (fields) => {

    return Object.values(fields).every((value) => {

        if (value === undefined || value === null) {
            return false;
        }

        if (typeof value === "string" && value.trim() === "") {
            return false;
        }

        return true;

    });

};

module.exports = {

    isValidPhone,

    isValidEmail,

    isValidObjectId,

    isValidDateRange,

    hasRequiredFields

};