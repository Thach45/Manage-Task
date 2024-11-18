const User = require("../models/user.model");
const md5 = require("md5");

module.exports.register = async (req, res) => {
    try {
        const emailExist = await User.findOne({email: req.body.email});
        if (emailExist) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }
        else{
            const user = new User({
                ...req.body,
                password: md5(req.body.password)
            });
            const use = await  user.save();
            const token = use.token
            res.cookie("token", token);
            res.status(200).json({
                message: "Register Success",
                data: user,
                token: token
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
    
}