const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const turfSchema = new Schema({
    lister_id: {
        type : mongoose.Schema.Types.ObjectId, ref:'User',
        unique : true,
        required : true,
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        unique : true
    },
    desc : {
        type : String,
        required : true,
    },
    photos :{ //rough
        // type : BinData,
        type : [String],
        required : true
    },
    price: {
        type: Number,
        required: true
    },
    // perks:{
    //     type : [String],
    //     // required : true,
    // },
    open : String,
    close : String,
    maxPlayers: {
        type : Number,
        required : true,
    },
    contactNo:{
        type: Number,
        // required: true,
        // unique:true
    },
    contactMail :{
        type:String,
        // unique : true
    },
    
    geolocation : {
        type : String,
        // required : true,
        // unique : true
    },
    slotsBusy : {
        type : [[Date]]
    }
}, { timestamps: true }); // Correct placement of timestamps option



module.exports = mongoose.model('Turf',turfSchema) //model with the defined schema is exported

