const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    qty: {
        type: Number,
        default: 1
    }
})

const orderItemModel = mongoose.model('OrderItem', orderItemSchema)

module.exports = orderItemModel;