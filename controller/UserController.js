const { model } = require("mongoose");
const UserModel = require("../Models/UserModels");
const UserService = require("../service/User.Service");
const {validationResult} = require("express-validator");


module.exports.registerUser = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: errors.array()[0].msg,
                success: false,
                data: null,
            })
        }

        const {name, email, password} = req.body;
        const hashedPassword = await UserModel.hashPassword(password);
        const user = await UserService.createUser({name, email, password: hashedPassword});
        
        // Generate token for new user
        const token = user.generateAuthToken()
        res.cookie('token', token)
        
        res.status(201).json({
            message: "User created successfully",
            success: true,
            user,
            token
        })
        
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
            data: null,
        })
    }
}




module.exports.loginUser = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: errors.array()[0].msg,
                success: false,
                data: null,
            })
        }

        const {email, password} = req.body;
        const user = await UserModel.findOne({email}).select("+password");
        
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid email or password",
            })
        }


        const token = user.generateAuthToken()
        res.cookie('token', token)
        res.status(200).json({user, token})

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
            data: null,
        })
    }
}



// user profile
module.exports.getUserProfile = async (req, res, next) => {
    try {
        const user = req.user
        res.status(200).json({user})
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}


// logout
module.exports.logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token')
        const token = req.cookies.token || req.headers.authorization.split(" ")[1]
        res.status(200).json({message: "Logged out successfully"})
        
    } catch (error) {
        
    }
}