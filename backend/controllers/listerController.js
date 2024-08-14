const Turf = require('../models/turfModel')
const mongoose = require('mongoose')
const User = require('../models/userModel')
//add turf (post)
const jwt = require('jsonwebtoken')
const  createNewTurf = async (req,res) =>{
    const {name,address,desc,addedPhotos:photos,price,open,close,size:maxPlayers} = req.body
    const {token} = req.cookies;
    jwt.verify(token,process.env.SECRET,{}, async (err,userToken)=>{
        if(err) throw err;
        console.log(userToken)
        const placeDoc = await Turf.create({
            lister_id: userToken._id,
            contactMail : userToken.email,
            contactNo : userToken.phoneNo,
            name,address,desc,photos,price,open,close,maxPlayers

        })
        res.json(placeDoc);
        // res.json({userToken})
    })
}

const getTurfByLister = async (req, res) => {
    
    //get id from token
    const{token} = req.cookies
    if(token){
        jwt.verify(token,process.env.SECRET,{}, async (err,userToken)=>{
            if(err) throw err;
            const {_id} = await User.findById(userToken._id)
            try {
                // Find the document by lister_id
                const turf = await Turf.findOne({ lister_id: _id });
        
                if (!turf) {
                    return res.status(400).json({ turfExists : false});
                }
                res.status(200).json(turf);
            } catch (error) {
                console.error('Error fetching turf:', error);
                res.status(500).json({ error: 'Internal server error' });
            }


        })
    }else{
        res.json(null)
    }

    
};
// update turf (add)


//view account data (get)




module.exports = {createNewTurf,getTurfByLister}