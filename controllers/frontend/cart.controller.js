const cartModel = require("../../models/cart.model");
const cartItemModel = require("../../models/cartItem.model");
const userModel = require("../../models/user.model");

const getCart = async (req, res) => {
    try {
        let cart = await cartModel.findOne({
            user: req.params.userId,
            orderPlaced: false
        }).populate('user')

        if (cart) {
            let response = await responseData(cart);

            return res.json({
                status: 200,
                message: "Cart found",
                data: response
            })

        } else {
            return res.json({
                status: 404,
                message: "Cart not created",
                data: {}
            })
        }

    } catch (error) {
       return res.json({
            status: 500,
            message: "Something went wrong",
            data: {}
        })
    }
}

const addCart = async (req, res) => {
    try {
        let user = await userModel.findOne({
            _id: req.params.userId
        })

        if (user) {
            let cart = await cartModel.findOne({
                user: req.params.userId,
                orderPlaced: false
            })

            if (cart) {
                let itemExist = await cartItemModel.findOne({
                    cartId: cart.id,
                    product: req.body.productId,
                })

                if (itemExist) { 
                    await cartItemModel.updateOne({
                      _id: itemExist._id
                    }, {
                        qty: itemExist.qty + 1
                    })
                } else {
                    await cartItemModel.create({
                        cartId: cart.id,
                        product: req.body.productId,
                        qty: 1
                    })
                }

            } else {
                let cart = await cartModel.create({
                    user: req.params.userId
                })

                await cartItemModel.create({
                    cartId: cart.id,
                    product: req.body.productId,
                    qty: req.body.qty
                })
            }
            // console.log(cart.id);
            await collectTotal(cart.id);

            let response = await responseData(cart);

            return res.json({
                status: 200,
                message: "Cart found",
                data: response
            })
        }

        return res.json({
            status: 404,
            message: "Customer not found",
            data: {}
        })

    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Something went wrong",
            data: {}
        })
    }
}

const updateCart = async (req, res) => {
    try {
        let user = await userModel.findOne({
            _id: req.params.userId
        })

        if (user) {
            let cart = await cartModel.findOne({
                user: req.params.userId,
                orderPlaced: false
            })

            if (cart) {
                let itemExist = await cartItemModel.findOne({
                    cartId: cart.id,
                    product: req.body.productId,
                })

                if (itemExist) { 
                    await cartItemModel.updateOne({
                      _id: itemExist._id
                    }, {
                        qty: req.body.qty
                    })
                }else {
                    return res.json({
                        status: 404,
                        message: "Product not found",
                        data: {}
                    })
                }
            } 

            await collectTotal(cart.id);

            return res.json({
                status: 200,
                message: "Cart updated successfully",
                data: {}
            })
        }

        return res.json({
            status: 404,
            message: "Customer not found",
            data: {}
        })

    } catch (error) {
        return res.json({
            status: 500,
            message: "Something went wrong",
            data: {}
        })
    }
}

const destroyCart = async (req, res) => {
    try {
        let user = await userModel.findOne({
            _id: req.params.userId
        })

        if (user) {
            let cart = await cartModel.findOne({
                user: req.params.userId,
                orderPlaced: false
            })

            if (cart) {
                let itemExist = await cartItemModel.findOne({
                    cartId: cart.id,
                    product: req.body.productId,
                })

                if (itemExist) { 
                    await cartItemModel.deleteOne({_id: itemExist._id})
                }else {
                    return res.json({
                        status: 404,
                        message: "Product not found",
                        data: {}
                    })
                }
            } 

            await collectTotal(cart.id);

            return res.json({
                status: 200,
                message: "Item deleted successfully",
                data: {}
            })
        }

        return res.json({
            status: 404,
            message: "Customer not found",
            data: {}
        })

    } catch (error) {
        return res.json({
            status: 500,
            message: "Something went wrong",
            data: {}
        })
    }
}

const responseData = async (cart) => {
    let newCart = {
        ...cart._doc
    };

    let cartItems = await cartItemModel.find({
        cartId: cart.id
    }).populate('product')

    newCart.items = cartItems

    return newCart
}

const collectTotal = async (cartId) => {
    let cart = await cartModel.findOne({
        _id: cartId
    })

    let cartItems = await cartItemModel.find({
        cartId: cart.id
    }).populate('product');

    let subTotal = 0;
    let tax = 0;
    let grandTotal = 0;

    for (const item of cartItems) {
        subTotal = subTotal + item.product.price * item.qty;
    }

    console.log(cartItems, subTotal, grandTotal, tax);

    grandTotal = subTotal + tax;

    await cartModel.updateOne({
        _id: cart.id
    }, {
        subTotal,
        tax,
        grandTotal
    })
}

module.exports = {
    getCart,
    addCart,
    updateCart,
    destroyCart
}