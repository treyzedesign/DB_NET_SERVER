const express = require('express')
const server = express()
const mongoose = require('mongoose')
const cors = require('cors')
const corsOptions = require('./config/CorsOption')
require('dotenv').config()

// const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4444
server.use(cors(corsOptions));
server.use(express.json())
// server.use(bodyParser())

const path = require('path')
server.use('/tmp/uploads', express.static(path.join(__dirname, 'uploads')))

server.use('/api', require('./routes/Auth'))
server.use('/api', require('./routes/Post'))


const startServer = async()=>{
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("db connected");
    }).catch((err)=>{
        console.log(err);
    })
    server.listen(PORT, console.log(`server is running on port ${PORT}`))
}
startServer()