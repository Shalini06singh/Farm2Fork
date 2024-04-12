const productModel = require("../../models/product.model");

const getProducts = async (req, res) => {
    let products = await productModel.find().populate('category');

    res.json(products);
}

const productById = async (req, res) => {
    try {
        let product = await productModel.findOne({_id: req.params.id});

        if(product) {
            return res.json({
                status: 200,
                message: "Product exists",
                data: product
            })
        }
        
    } catch (error) {
        return res.json({
            status: 400,
            message: "Product not found",
            data: {}
        })
    }
}

module.exports = {
    getProducts,
    productById
}