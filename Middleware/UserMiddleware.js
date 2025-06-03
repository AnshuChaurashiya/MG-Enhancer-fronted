const jwt = require('jsonwebtoken')
const UserModel = require('../Models/UserModels')
module.exports.autUser = async (req, res, next) => {

    const token = req.cookies.token ||  req.response.headers.authorization?.split(" ")[1]
    
    if(!token){
        return res.status(401).json({message: "Unauthorized" })
    
    }
    
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findById(decoded.id)
        if(!user){
            return res.status(401).json({message: "Unauthorized" })
            }
            req.user = user
            next()
        
    } catch (error) {
        return res.status(500).json({message: 'Authentication failed'})

        
    }
}
