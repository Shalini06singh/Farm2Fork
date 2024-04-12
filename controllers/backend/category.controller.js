const categoryModel = require("../../models/category.model")
const fs = require("fs");
const path = require("path")

const getCategories = async (req, res) => {
    let categories = await categoryModel.find();

    res.json(categories);
}

const storeCategory = async (req, res) => {
   
    let category = await categoryModel.findOne({name: req.body.name});

    if(category) {
        return res.json({
            status: 400,
            message: "Category name already exists"
        })
    }

    try {
        await categoryModel.create({
            "name": req.body.name,
            "image": req.file ? req.file.path.replace('public', '') : '',
            "status": req.body.status
        })

        res.json({
            status: 201,
            message: "category added successfully"
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

const editCategory = async(req, res) => {

    try {
        let category = await categoryModel.findOne({_id: req.params.id});

        if(category) {
            return res.json({
                status: 200,
                message: "Category exists",
                data: category
            })
        }
        
    } catch (error) {
        return res.json({
            status: 400,
            message: "Category not found",
            data: {}
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        if(req.file) {
            let category = await categoryModel.findOne({_id: req.params.id});
                   
            if(fs.existsSync(path.join(__dirname, '../../public/',category.image))) {
                fs.unlinkSync(path.join(__dirname, '../../public/',category.image))
            }           

            await categoryModel.updateOne({_id: req.params.id} , {
                "name": req.body.name,
                "image": req.file.path.replace('public', ''),
                "status": req.body.status
            })
        }else {
            await categoryModel.updateOne({_id: req.params.id} , {
                "name": req.body.name,
                "status": req.body.status
            })
        }
        
        res.json({
            status: 201,
            message: "category updated successfully"
        })
    } catch (err) {
        console.log(err);
        res.json({
            status: 400,
            message: "id not exist"
        })
    }
}

const deleteCategory = async (req, res) => {

    try {
        let category = await categoryModel.findOne({_id: req.params.id});
        
        if(!category) {
            return res.json({
                status: 400,
                message: "id not found"
            })
        }

        await categoryModel.deleteOne({_id: req.params.id})

        res.json({
            status: 201,
            message: "category deleted successfully"
        })
    } catch (error) {
       
        res.json({
            status: 400,
            message: "id not found"
        })
    }
}

module.exports = {
    getCategories,
    storeCategory,
    editCategory,
    updateCategory,
    deleteCategory
}