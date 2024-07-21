const Turf = require('../models/turfModel')
const mongoose = require('mongoose')

const viewTurfs = async (req,res)=>{
    const turfs = await Turf.find({}).sort({createdAt:-1})
    res.status(200).json(turfs)
}

const viewTurf = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error: 'No such turf'})
    }
    console.log(id)
    const turf = await Turf.findById(id)
    if(!turf){
        return res.status(404).json({error: 'No such turf'})
    }
    res.status(200).json(turf)
}

const viewTurfSortedBy = async(req,res) =>{
    const {sortBy} = req.params
    const turfs = await Turf.find({}).sort({[sortBy]:-1})
    res.status(200).json(turfs)
}

const viewTurfsFilterBy = async(req,res) =>{ // yet to implement
    const {filterBy} = req.params
    const turfs = await Turf.find({filterBy}).sort({createdAt:-1})
    res.status(200).json(turfs)
}
module.exports = {
    viewTurfs,
    viewTurf,
    viewTurfSortedBy,

}