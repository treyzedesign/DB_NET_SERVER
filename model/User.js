const mongoose = require('mongoose')
const uuid = require('uuid')
const userSchema = new mongoose.Schema({
    id:{
        type: String,
        
    },
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    studentNumber :{
        type: String,
        required: true
    },
    password: {
        type : String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})
const User = mongoose.model('User', userSchema)
module.exports = User