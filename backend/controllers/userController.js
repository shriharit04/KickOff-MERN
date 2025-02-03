const User = require('../models/userModel')
const Turf = require('../models/turfModel')

const jwt = require('jsonwebtoken')
const {authMiddleware} = require('../middleware/authMiddleware.js')
require('dotenv').config()
const axios = require('axios')




//logjn user
const loginUser = async (req,res) => {
    const {email,password} = req.body
    try {
        const user = await User.login(email,password)
        //create token
        jwt.sign({email:user.email,_id:user._id},process.env.SECRET,{expiresIn:'3d'},(err,token)=>{
            if(err) throw err;
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Ensure this is true in production
                sameSite: 'None', // Necessary for cross-origin requests
              });
            res.json(user)})
        // res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

const loginUserGoogle = async (req,res)=>{
    const {code} = req.body

    try{
          // Exchange the authorization code for an access token
    const response = await axios.post('https://oauth2.googleapis.com/token', null, {
        params: {
          code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code',
        },
      });
      const {access_token} =  response.data;

      // Retrieve user information from Google
      const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });


      const userInfo = userInfoResponse.data;
      const {email,name} = userInfo
      console.log(name,email)

      let userDoc = await User.findOne({email});
      if(!userDoc){
        userDoc = await User.create({
            name,email
        })
      }
      jwt.sign({email:userDoc.email,_id:userDoc._id} , process.env.SECRET , {expiresIn:'3d'},(err,token)=>{
        if(err) throw err;
        res.cookie('token',token,{
            httpOnly:true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : 'None',
        })
        res.json(userDoc)
      })
    }catch(error){
        res.status(400).json({error:error.message})
        }

        
    
}

//sign up user
const signupUser = async (req,res) => {
    const {name,email,password,phoneNo} = req.body
    try {
        const user = await User.signup(name,email,password,phoneNo)
        //console.log(user)
        const token = jwt.sign({email:user.email,_id:user._id,phoneNo:user.phoneNo},process.env.SECRET,{expiresIn:'3d',},(err,token)=>{
            if(err) throw err;
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Ensure this is true in production
                sameSite: 'None', // Necessary for cross-origin requests
              });
              res.json(user)
        })

        // res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

const logout = async(req,res)=>{
    // res.cookie('token','')
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure this is true in production
        sameSite: 'None', // Necessary for cross-origin requests
      });
    res.status(200).json('logged out')
}


const getProfile = async (req, res) => {
    const { token } = req.cookies;

    if (token) {
        try {
            // Verify the token
            const userToken = jwt.verify(token, process.env.SECRET);

            // Find the user by the ID stored in the token
            const user = await User.findById(userToken._id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Send the user's name, email, and ID as a response
            const { name, email, _id ,phoneNo} = user;
            res.json({ name, email, _id,phoneNo});
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                // Handle token expiration
                return res.status(401).json({ message: 'Session expired. Please log in again.' });
            } else {
                // Handle other errors, such as invalid tokens
                return res.status(401).json({ message: 'Invalid token. Please log in again.' });
            }
        }
    } else {
        // If no token is provided, return null
        res.json(null);
    }
};


const updateUser =  (req,res) =>{
    // res.json('userinfo')
    const{token} = req.cookies
    const updateData = req.body
    if(token){
        jwt.verify(token,process.env.SECRET,{}, async (err,userToken)=>{
            if(err) throw err;
            const {name,email,_id} = await User.findById(userToken._id)
            const updatedUser = await User.findByIdAndUpdate(userToken._id,updateData, { new: true, runValidators: true })
            if (!updatedUser) {
                return res.status(400).json({ userNotFound: true });
            }
            
            res.send(updatedUser)
            try{
                await Turf.findOneAndUpdate(
                    { lister_id: userToken._id },
                    {
                        contactNo: updatedUser.phoneNo,
                        contactMail: updatedUser.email
                    }
                );
            }catch(err){
                console.log(err)
                console.log('error in updating contact info')
            }
        })
    }else{
        res.json(null)
    }
}



module.exports = { loginUser,signupUser,getProfile,logout,updateUser,loginUserGoogle}