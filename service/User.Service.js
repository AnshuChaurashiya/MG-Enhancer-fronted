const UserModel = require("../Models/UserModels");

module.exports.createUser = async (userData) => {
    const {name, email, password} = userData;

    try {

        if(!userData.name || !userData.email || !userData.password) {
            throw new Error("All fields are required")
        }

        const user = await UserModel.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
        })
        return user
        
        
        
    } catch (error) {
        throw new Error(error, "There was an error creating the user")

    }
}