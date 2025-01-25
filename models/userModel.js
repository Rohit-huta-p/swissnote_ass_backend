const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt= require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        // required: true,
    }, 
    password: {
        type: String,
        // required: true,
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
    }],
}, {
    timestamps: true
})

userSchema.statics.encyptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log('Error hashing the password', error);
        throw error;
    }
}

userSchema.statics.comparePass = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if(isMatch) return true
    } catch (error) {
        console.log("Password does not match", error);
        throw error;
    }
}


userSchema.statics.generateToken = (user, guest) => {
    let expiresIn;

    if(guest){ 
        expiresIn = { expiresIn: "12h"} 
    }else {
        expiresIn = { expiresIn: "1h"}
    }
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, expiresIn)
}



const userModel = new mongoose.model("users", userSchema);

module.exports = userModel;