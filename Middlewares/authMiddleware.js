const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../Models/userModel')

const requrieSignIn = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    
        token = req.headers.authorization.split(" ")[1]

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const id = decoded.userId
        req.user = id
        next()
    } else {
        res.status(401) 
        throw new Error("Invalid Token or Expired")
    }
})

const isOrganizer = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        token = req.headers.authorization.split(" ")[1]

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const id = decoded.userId
        const organizer = await User.findOne({_id: id}, {role: "Organizer"})

        if (!organizer) {
            res.status(400)
            throw new Error("Access Denied")
        } 

        req.user = id
        next()
    } else {
        res.status(401) 
        throw new Error("Invalid Token or Expired")
    }
})

const isExhibitor = asyncHandler(async (req, res, next) => {

})

module.exports = {
    requrieSignIn,
    isOrganizer,
    isExhibitor
}