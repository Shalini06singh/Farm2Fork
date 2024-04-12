const categoryModel = require("../../models/category.model")

const getCategories = async (req, res) => {
    let categories = await categoryModel.find();

    res.json(categories);
}



module.exports = {
    getCategories
}