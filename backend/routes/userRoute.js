//route -> /user/

const express = require('express')
const router = express.Router()


const {loginUser, signupUser, getProfile, logout, updateUser, loginUserGoogle} = require('../controllers/userController')


//login
router.post('/login',loginUser)

//sign up
router.post('/signup',signupUser)
router.put('/update',updateUser)
router.get('/profile',getProfile)
router.post('/logout',logout)
router.post('/login/google',loginUserGoogle)

module.exports = router

