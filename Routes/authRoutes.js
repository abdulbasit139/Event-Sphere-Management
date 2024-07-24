const express = require('express')

// controller imports 
const {
    register,
    login,
    updatePass,
    getProfile,
    updateProfile,
} = require('../Controllers/authController')

// middleware imports
const {
    requrieSignIn,
    isOrganizer,
    isExhibitor
} = require('../Middlewares/authMiddleware')

const router = express.Router()

// Routes
router.post("/register", register)
router.post("/login", login)
router.post("/updatePassword", updatePass)
router.get("/getProfile", requrieSignIn, getProfile)
router.post("/updateProfile", requrieSignIn, updateProfile)

module.exports = router