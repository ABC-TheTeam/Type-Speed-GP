function errorHandlers(err, req, res, next) {
    if (err.name == "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: err.errors[0].message })
    } else if (err.name == "SequelizeValidationError") {
        res.status(400).json({ message: err.errors[0].message })
    } else if (err.name == "HttpError") {
        res.status(err.status).json({ message: err.message })
    } else {
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = errorHandlers