const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true, 
        trim: true
    }, 
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    }, 
    password: {
        type: String,
        required: true,
        trim: true
    }, 
    schoolName: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        default: "attendee",
        enum: ["organizer", "exhibitor", "attendee"], 
        required: true 
    }

}, {timestamps: true})

module.exports = mongoose.model("user", userSchema)