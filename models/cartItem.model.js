const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    qty: {
        type: Number,
        default: 1
    }
})

const cartItemModel = mongoose.model('CartItem', cartItemSchema)

module.exports = cartItemModel;