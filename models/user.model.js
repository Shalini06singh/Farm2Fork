const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    zipCode: {
        type: Number,
        required: false
    },
    contactNumber: {
        type: String,
        required: false
    },
    role: {
        type: Boolean,
        required: false,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;
