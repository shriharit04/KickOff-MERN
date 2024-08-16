
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    // lister : {
    //     type : Boolean,
    //     default : false,
    //     required : true,
    // },
    name: {
        type : String,
        required : true,
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type : String,
    },
    phoneNo:{
        type : Number,
    }
})

//static signup method
userSchema.statics.signup = async  function (name,email, password,phoneNo){
    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Enter valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Pwd not strong enough')
    }

    if(!validator.isMobilePhone(phoneNo,['en-IN'])) {
        throw Error('Invalid phone number');
    }

    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email already in use')
    }
    //pwd hashing by bcrypt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({name,email, phoneNo, password : hash})
    return user
}

//static login method
userSchema.statics.login = async function (email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('Accout not fouond')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }
    return user
}

module.exports = mongoose.model('User',userSchema)