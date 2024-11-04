const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTION_STRING).then(
    result=>{
        console.log("Mongodb atlas connected with pfServer")
    }
).catch(err=>{
    console.log(err);
    console.log("connection failed")
})