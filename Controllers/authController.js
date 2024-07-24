const User = require('../Models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, gender, password, schoolName, role } = req.body

    const encryptedPass = await bcrypt.hash(password, 10)

    if(!firstName || !lastName || !email || !gender || !password || !schoolName || !role){
        res.status(400)
        throw new Error("Please Input All Fields")
    }

    const user = await User.create({
        firstName,
        lastName, 
        email, 
        gender,
        password: encryptedPass, 
        schoolName,
        role
    })

    res.status(200).json({mssg: "User Registered Successfully!"})
})  

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user){
        res.status(400).json({message: "Incorrect Email"})
        console.log("use not found")
    }

    if (!password) {
        res.status(400)
        throw new Error("Input Password")
    }

    const dcryptedPass = await bcrypt.compare(password, user.password)

    if (!dcryptedPass) {
        res.status(400)
        throw new Error("Incorrect Password")
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {expiresIn: "1h"})

    res.status(200).json({
        email,
        Token: token,
    })

})

const updatePass = asyncHandler(async (req, res) => {
    const { email, schoolName, newPassword, conPassword } = req.body

    const user = await User.findOne({email})

    if (!email || !schoolName || !newPassword || !conPassword) {
        res.status(400)
        throw new Error("Please Input All Fields")
    }

    if (!user) {
        res.status(404)
        throw new Error("User not Found")
    }

    if (newPassword !== conPassword) {
        res.status(400)
        throw new Error("Password didn't match")
    }
    
    if (user.schoolName !== schoolName) {
        res.status(400)
        throw new Error("Verification Faild")
    }

    const decryptedPass = await bcrypt.compare(newPassword, user.password)

    if (decryptedPass) {
        res.status(400)
        throw new Error("You have entered an old password")
    }

    const encryptedPass = await bcrypt.hash(newPassword, 10)

    const updateUser = await User.findOneAndUpdate({ _id: user._id }, {
        password: encryptedPass
    })
     
    res.status(200).json("Password Updated")

})

const getProfile = asyncHandler(async (req, res) => {
    
    const id = req.user

    const user = await User.findOne({_id: id})
    res.status(200).json(user)

})

const updateProfile = asyncHandler(async (req, res) => {
    // const id = req.user
    // const { firstName, lastName, schoolName } = req.body

    // if (!firstName || !lastName, !schoolName) {
    //     res.status(400)
    //     throw new Error("You can't enter empty fields")
    // }

    // const response = await User.findOneAndUpdate(_id, {
    //     firstName, 
    //     lastName, 
    //     schoolName
    // })

    res.status(200).json({mssg: "Profile Updated"})
})

module.exports = {
    register, 
    login,
    updatePass,
    getProfile,
    updateProfile
}