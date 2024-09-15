const jwt = require('jsonwebtoken');
// const dotenv = require("dotenv")
// dotenv.config()
module.exports = (req, res, next) => {
    var token = req.headers.token;
    try {
        var decode = jwt.verify(token,"random")
            next();
    } catch {
        res.json({
            success: false,
            msg: "invalid token Auth failed"
        })
    }
}