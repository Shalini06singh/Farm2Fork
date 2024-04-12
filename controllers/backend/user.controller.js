const userModel = require("../../models/user.model");
const fs = require("fs");
const path = require("path")
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    let users = await userModel.find();

    res.json(users);
}

const storeUser = async (req, res) => {
    let category = await userModel.findOne({
        email: req.body.email
    });

    if (category) {
        return res.json({
            status: 400,
            message: "Email already exists"
        })
    }

    try {

        let hashPassword = await bcrypt.hash(req.body.password, 10);

        await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            image: req.file ? req.file.path.replace('public', '') : '',
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zipCode: req.body.zipCode,
            contactNumber: req.body.contactNumber,
            status: req.body.status

        })

        res.json({
            status: 201,
            message: "user added successfully"
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

const editUser = async (req, res) => {
    try {
        let user = await userModel.findOne({
            _id: req.params.id
        });

        if (user) {
            return res.json({
                status: 200,
                message: "user exists",
                data: user
            })
        }else {
            return res.json({
                status: 404,
                message: "User not found",
                data: {}
            })
        }

    } catch (error) {
        return res.json({
            status: 400,
            message: "user not found",
            data: {}
        })
    }
}

const updateUser = async (req, res) => {
    try {
        if (req.file) {
            let user = await userModel.findOne({
                _id: req.params.id
            });

            if (user.image && fs.existsSync(path.join(__dirname, '../../public/', user.image))) {
                fs.unlinkSync(path.join(__dirname, '../../public/', user.image))
            }

            await userModel.updateOne({
                _id: req.params.id
            }, {
                name: req.body.name,
                email: req.body.email,
                image: req.file ? req.file.path.replace('public', '') : '',
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                zipCode: req.body.zipCode,
                contactNumber: req.body.contactNumber,
                status: req.body.status
            })
        } else {
            await userModel.updateOne({
                _id: req.params.id
            }, {
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                zipCode: req.body.zipCode,
                contactNumber: req.body.contactNumber,
                status: req.body.status
            })
        }

        let currentUser = await userModel.findById(req.params.id)

        res.json({
            status: 201,
            message: "user updated successfully",
            user: currentUser
        })
    } catch (err) {
        console.log(err);
        res.json({
            status: 400,
            message: "id not exist"
        })
    }
}

const deleteUser = async (req, res) => {

    try {
        let user = await userModel.findOne({_id: req.params.id});
        
        if(!user) {
            return res.json({
                status: 400,
                message: "id not found"
            })
        }

        await userModel.deleteOne({_id: req.params.id})

        res.json({
            status: 201,
            message: "user deleted successfully"
        })
    } catch (error) {
       
        res.json({
            status: 400,
            message: "id not found"
        })
    }
}

module.exports = {
    getUsers,
    storeUser,
    editUser,
    updateUser,
    deleteUser
}