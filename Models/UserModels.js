const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
        required: true,
        default: "default-avatar.png"
    },
});

// ✅ Instance methods
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

// ✅ Static method
userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
