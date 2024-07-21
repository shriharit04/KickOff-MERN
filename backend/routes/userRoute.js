//route -> /user/

const express = require('express')
const router = express.Router()


const {loginUser, signupUser, getProfile, logout} = require('../controllers/userController')


//login
router.post('/login',loginUser)

//sign up
router.post('/signup',signupUser)
router.get('/profile',getProfile)
router.post('/logout',logout)

module.exports = router

