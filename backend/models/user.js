    const mongoose = require('../config/dbConfig')
    const userschema = new mongoose.Schema({
        phoneNo: {
            type: String,
            // pattern: "@mongodb\.com$",
            required: true,
            description: "Must be a valid number",
        },
        username: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            // regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$",
            description: "enter valid 8 digit password"
        },
        date: {
            type: Date
        },
        role: {
            type: String
        }
    })
    const usermodel = mongoose.model('user', userschema);
    module.exports = usermodel;
