const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: Object,
        required: false
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
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
})

const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel;