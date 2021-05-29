const mongoose = require('mongoose');
const validator = require('validator');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 5,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error("invalid Email")
        }
    },
    Phone: {
            type: Number,
            required: true,
            unique: true
        },
    website: {
            type: String,
            required: true
        },
    address: {
            type: String,
            required: true,
        }
    });


const Hotel = new mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;