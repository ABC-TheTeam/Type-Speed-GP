const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY

function signToken(data) {
    return (jwt.sign(data, SECRET_KEY));
}

module.exports = signToken