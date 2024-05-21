const { User } = require("../models")

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
}

module.exports = Controller