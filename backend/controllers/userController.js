const User = require('../models/userModel')
const jwt = require('jsonwebtoken')



const createToken = (email,_id) =>{
    return jwt.sign({email,_id},process.env.SECRET,{expiresIn:'3d'},(err,token)=>{
        if(err) throw err;
        res.cookie('token',token).json("pass ok")
    }) // (payload,secrety key, options)
}

//logjn user
const loginUser = async (req,res) => {
    const {email,password} = req.body
    try {
        const user = await User.login(email,password)
        //create token
        jwt.sign({email:user.email,_id:user._id},process.env.SECRET,{expiresIn:'3d'},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json(user)})
        // res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}


//sign up user
const signupUser = async (req,res) => {
    const {name,email,password} = req.body
    try {
        const user = await User.signup(name,email,password)
        //console.log(user)
        const token = jwt.sign({email:user.email,_id:user._id},process.env.SECRET,{expiresIn:'3d'},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json(user)
        })

        // res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

const logout = async(req,res)=>{
    res.cookie('token','')
    res.status(200).json('logged out')
}
const bookTurf = async(req,res) =>{
    // body must have {user,turf}
    // const {user,turf} = req.body
    // try {
    //     const bookedTurf = await Turf.book(user,turf)
    //     res.status(200).json(bookedTurf)
    // } catch (error) {
    //     res.status(400).json({error : error.message})
    // }
}

const getProfile = (req,res) =>{
    // res.json('userinfo')
    const{token} = req.cookies
    if(token){
        jwt.verify(token,process.env.SECRET,{}, async (err,userToken)=>{
            if(err) throw err;
            const {name,email,_id} = await User.findById(userToken._id)
            res.json({name,email,_id})
            // res.json({userToken})
        })
    }else{
        res.json(null)
    }
}

module.exports = { loginUser,signupUser,getProfile,logout}