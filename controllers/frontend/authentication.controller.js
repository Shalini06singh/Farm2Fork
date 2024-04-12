const userModel = require("../../models/user.model");
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const register = async(req, res) => {
    let user = await userModel.findOne({
        email: req.body.email
    });

    if (user) {
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
        })

        return res.json({
            status: 201,
            message: "user added successfully"
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: error.message
        })
    }
}

const login = async(req, res) => {
    try {
        let user = await userModel.findOne({email: req.body.email});

        if(user) {
           let authenticatePassword = await bcrypt.compare(req.body.password, user.password);

           if(authenticatePassword) {
                var token = jwt.sign({user}, 'secret');
                return res.json({
                    status: 200,
                    message: "Login successfully",
                    token: token,
                    user: user
                })
           }else {
                return res.json({
                    status: 404,
                    message: "Email id and password do not match"
                })
           }

        }else {
            return res.json({
                status: 404,
                message: "User not found"
            })
        }

    } catch (error) {
        return res.json({
            status: 404,
            message: "User not found"
        })
    }
}

module.exports = {
    register,
    login
}