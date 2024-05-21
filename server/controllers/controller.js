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
}

module.exports = Controller