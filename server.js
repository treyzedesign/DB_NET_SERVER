const express = require('express')
const server = express()
const mongoose = require('mongoose')
const cors = require('cors')
// const bodyParser = require('body-parser')
const PORT = 4444
require('dotenv').config()
server.use(cors({
    credentials: true
}))
server.use(express.json())
// server.use(bodyParser())

const path = require('path')
server.use('/uploads', express.static(path.join(__dirname, 'uploads')))

server.use('/api', require('./routes/Auth'))
server.use('/api', require('./routes/Post'))


const startServer = async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017").then(()=>{
        console.log("db connected");
    }).catch((err)=>{
        console.log(err);
    })
    server.listen(PORT, console.log(`server is running on port ${PORT}`))
}
startServer()