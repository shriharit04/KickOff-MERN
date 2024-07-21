const Turf = require('../models/turfModel')
const mongoose = require('mongoose')
//add turf (post)
const  createNewTurf = async (req,res) =>{
    const {name,photos,address,price,geolocation,contactNo,contactMail} = req.body

    let emptyFields = []
    if(!name){
        emptyFields.push("name")
    }if(!photos){
        emptyFields.push("photos")
    }if(!address){contactNo
        emptyFields.push("address")
    }if(!price){
        emptyFields.push("price")
    }if(!geolocation){
        emptyFields.push("geolocation")
    }if(!contactNo){
        emptyFields.push("contactNo")
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: "Please fill in all the fields" , emptyFields})
    }
    try {
        const turf = await Turf.create({name,photos,address,price,geolocation,contactNo,contactMail})
        res.status(200).json(turf)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
// update turf (add)


//view account data (get)




module.exports = {createNewTurf}