const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subTotal: {
        type: Number,
        default: 0.0,
        required: true
    },
    tax: {
        type: Number,
        default: 0.0,
        required: true
    },
    grandTotal: {
        type: Number,
        default: 0.0,
        required: true
    },
    orderPlaced: {
        type: Boolean,
        default: false
    }
})

const cartModel = mongoose.model('Cart', cartSchema)

module.exports = cartModel;