const { User } = require("../models")
const bcrypt = require('bcryptjs');
const signToken = require("../helpers/jwt");

class Controller {
    static async test(req, res, next) {
        try {
            res.status(200).json({ message: "Typing Game" })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    
    //-----Register-----
    static async postRegister(req, res, next) {
        try {
            const { name, email, password } = req.body
            let user = await User.create({ name, email, password })
            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    //-----Login-----
    static async postLogin(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) {
                throw ({ name: "HttpError", status: 400, message: "Email is required" })
            }

            if (!password) {
                throw ({ name: "HttpError", status: 400, message: "Password is required" })
            }

            let user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                throw ({ name: "HttpError", status: 401, message: "Invalid email/password" })
            }

            let isValidPassword = bcrypt.compareSync(password, user.password);
            
            if (!isValidPassword) {
                throw ({ name: "HttpError", status: 401, message: "Invalid email/password" })
            }

            let token = signToken({ id: user.id })
            res.status(200).json({ 
                access_token: token,  
                email: user.email
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = Controller