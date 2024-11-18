const mongoose = require("mongoose");
const genToken = require("../../../helper/genToken");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    token: {
        type: String,
        default: genToken.genToken(10)
    }
})
const User = mongoose.model("User", userSchema, "user")
module.exports = User 