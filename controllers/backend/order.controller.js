const orderModel = require("../../models/order.model");
const orderItemModel = require("../../models/orderItem.model");

const getOrders = async (req, res) => {
    let orders = await orderModel.find();

    let responseData = [];

    for (const order of orders) {
        let orderItems = await orderItemModel.find({order: order._id}).populate("product");

        responseData.push({...order._doc, items: orderItems});
    }

    res.json(responseData);
}

module.exports = {
    getOrders
}