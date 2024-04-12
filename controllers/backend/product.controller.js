const productModel = require("../../models/product.model");
const fs = require("fs");
const path = require("path")

const getProducts = async (req, res) => {
    let products = await productModel.find();

    res.json(products);
}

const storeProduct = async (req, res) => {
    let category = await productModel.findOne({
        name: req.body.name
    });

    if (category) {
        return res.json({
            status: 400,
            message: "Product name already exists"
        })
    }

    try {
        await productModel.create({
            name: req.body.name,
            slug: req.body.slug,
            image: req.file ? req.file.path.replace('public', '') : '',
            shortDescription: req.body.shortDescription,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            status: req.body.status
        })

        res.json({
            status: 201,
            message: "product added successfully"
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

const editProduct = async (req, res) => {
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

const updateProduct = async (req, res) => {
    try {

        if(req.file) {
            let product = await productModel.findOne({_id: req.params.id});
                   
            if(fs.existsSync(path.join(__dirname, '../../public/',product.image))) {
                fs.unlinkSync(path.join(__dirname, '../../public/',product.image))
            }           

            await productModel.updateOne({_id: req.params.id} , {
                name: req.body.name,
                slug: req.body.slug,
                image: req.file.path.replace('public', ''),
                shortDescription: req.body.shortDescription,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category,
                status: req.body.status
            })
        }else {
            await productModel.updateOne({_id: req.params.id} , {
                name: req.body.name,
                slug: req.body.slug,
                shortDescription: req.body.shortDescription,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category,
                status: req.body.status
            })
        }
        
    
        res.json({
            status: 201,
            message: "product updated successfully"
        })
    } catch (err) {
        console.log(err);
        res.json({
            status: 400,
            message: "id not exist"
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        let product = await productModel.findOne({_id: req.params.id});
        
        if(!product) {
            return res.json({
                status: 400,
                message: "id not found"
            })
        }

        await productModel.deleteOne({_id: req.params.id})

        res.json({
            status: 201,
            message: "product deleted successfully"
        })
    } catch (error) {
       
        res.json({
            status: 400,
            message: "id not found"
        })
    }
}

module.exports = {
    getProducts,
    storeProduct,
    editProduct,
    updateProduct,
    deleteProduct
}