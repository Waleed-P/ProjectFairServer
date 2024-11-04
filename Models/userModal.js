const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    github:{
        type:String
    },
    linkedIn:{
        type:String
    },
    profile:{
        type:String
    }
})
// modal name and collection  name should be same

const users = mongoose.model("users",userSchema)
module.exports = users