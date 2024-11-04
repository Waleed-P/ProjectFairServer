// loads .env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')
//create an express application
const pfServer = express()

//use cors in express server
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
// below line s used to allow uploads folder is accessible to another application
//for setting that you need to make the folder static
// for making the  folder static you need to use express.static()
//inside static  you need to pass the path of the folder
//by doing this you can access the filder by using /uploads
pfServer.use('/uploads',express.static('./uploads'))
const PORT = 3001 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log("project server stated at port:",PORT);
})

pfServer.get("/",(req,res)=>{
    res.status(200).send(`<h1>SERVER STARTED</h1>`)
})